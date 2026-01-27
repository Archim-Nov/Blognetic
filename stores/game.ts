import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GameState, Tweet, StreamComment, CharacterAttributes, GameEvent, AttributeKey, CareerSaveData } from '../types'
import {
  LOCATIONS, WEATHER_CONDITIONS, TRANSLATIONS, TES_MONTHS, TES_DAYS,
  CAREER_CATEGORIES, LEVEL_SYSTEM, getExpForLevel, EXP_REWARDS,
  generateCareerGrowthTable, LevelGrowth
} from '../constants'
import { generateStreamComment } from '../services/geminiService'
import { generateBlogContent } from '../services/aiService'
import { ALL_EVENTS } from '../events'

const MAX_MATERIALS = 100
const EXPLORATION_TICK_RATE = 200
const STREAM_TICK_RATE = 1500
const HOURS_PER_MOVE = 8
const DAYS_PER_MAP = 8
const HOURS_TO_CHANGE_MAP = 24 * DAYS_PER_MAP

// Event selection helper - weighted by rarity
const selectRandomEvent = (): GameEvent => {
  const rarityWeights = { common: 60, uncommon: 30, rare: 10 }
  const roll = Math.random() * 100

  let targetRarity: 'common' | 'uncommon' | 'rare'
  if (roll < rarityWeights.rare) {
    targetRarity = 'rare'
  } else if (roll < rarityWeights.rare + rarityWeights.uncommon) {
    targetRarity = 'uncommon'
  } else {
    targetRarity = 'common'
  }

  const filteredEvents = ALL_EVENTS.filter(e => e.rarity === targetRarity)
  if (filteredEvents.length === 0) {
    return ALL_EVENTS[Math.floor(Math.random() * ALL_EVENTS.length)]
  }
  return filteredEvents[Math.floor(Math.random() * filteredEvents.length)]
}

// Attribute check helper
const checkEventSuccess = (
  event: GameEvent,
  attributes: CharacterAttributes
): boolean => {
  const { primary, secondary, mode, threshold } = event.check
  const primaryValue = attributes[primary]
  const secondaryValue = secondary ? attributes[secondary] : 0

  // Add some randomness (roll 1-20)
  const roll = Math.floor(Math.random() * 20) + 1
  const primaryCheck = primaryValue + roll >= threshold
  const secondaryCheck = secondary ? (secondaryValue + roll >= threshold) : false

  if (mode === 'or') {
    return primaryCheck || secondaryCheck
  } else {
    return primaryCheck && (secondary ? secondaryCheck : true)
  }
}

// Get attributes for a career
const getCareerAttributes = (careerId: string): CharacterAttributes => {
  for (const cat of CAREER_CATEGORIES) {
    const career = cat.careers.find(c => c.id === careerId)
    if (career && career.attributes) {
      return { ...career.attributes }
    }
  }
  return { strength: 20, intelligence: 20, willpower: 20, agility: 22, speed: 22, endurance: 20, personality: 18, luck: 24 }
}

// Get predetermined growth table for a career
const getCareerGrowthTable = (careerId: string): LevelGrowth[] => {
  for (const cat of CAREER_CATEGORIES) {
    const career = cat.careers.find(c => c.id === careerId)
    if (career && career.growthRates && career.primaryStats) {
      return generateCareerGrowthTable(careerId, career.growthRates, career.primaryStats as string[])
    }
  }
  // Default: adventurer
  const defaultGrowth = { strength: 40, intelligence: 40, willpower: 40, agility: 45, speed: 45, endurance: 40, personality: 35, luck: 55 }
  return generateCareerGrowthTable('adventurer', defaultGrowth, ['luck', 'agility'])
}

export const formatGameTime = (totalHours: number, lang: 'en' | 'zh'): string => {
  const t = TRANSLATIONS[lang]
  const totalDays = Math.floor(totalHours / 24)
  const hourOfDay = totalHours % 24

  const year = 201 + Math.floor(totalDays / 360)
  const dayOfYear = totalDays % 360
  const monthIndex = Math.floor(dayOfYear / 30)
  const dayOfMonth = (dayOfYear % 30) + 1
  const dayOfWeekIndex = totalDays % 7

  const eraStr = t.era
  const monthStr = TES_MONTHS[lang][monthIndex]
  const dayOfWeekStr = TES_DAYS[lang][dayOfWeekIndex]

  let timePhase = ""
  if (lang === 'zh') {
    if (hourOfDay >= 6 && hourOfDay < 12) timePhase = "晨照"
    else if (hourOfDay >= 12 && hourOfDay < 18) timePhase = "正午"
    else if (hourOfDay >= 18 && hourOfDay < 22) timePhase = "薄暮"
    else timePhase = "子夜"
  } else {
    if (hourOfDay >= 6 && hourOfDay < 12) timePhase = "Morn"
    else if (hourOfDay >= 12 && hourOfDay < 18) timePhase = "Noon"
    else if (hourOfDay >= 18 && hourOfDay < 22) timePhase = "Dusk"
    else timePhase = "Midnight"
  }

  return `${eraStr} ${year}, ${monthStr} ${dayOfMonth} (${dayOfWeekStr}) - ${timePhase}`
}

export const useGameStore = defineStore('game', () => {
  // State
  const gameState = ref<GameState>({
    materials: 0,
    followers: 12,
    money: 0,
    location: LOCATIONS.en[0],
    locationIndex: 0,
    timeInLocation: 0,
    isStreaming: false,
    energy: 100,
    totalHours: 0,
    weather: WEATHER_CONDITIONS[0]
  })

  const tweets = ref<Tweet[]>([])
  const streamComments = ref<StreamComment[]>([])
  const explorationProgress = ref(0)
  const isProcessingEvent = ref(false)

  // Character attributes (determined by career)
  const characterLevel = ref(1)
  const characterExperience = ref(0)
  const currentCareerId = ref('adventurer')
  const characterAttributes = ref<CharacterAttributes>(getCareerAttributes('adventurer'))

  // Career save data - stores progress for each career
  const careerSaves = ref<Record<string, CareerSaveData>>({})

  let explorationInterval: ReturnType<typeof setInterval> | null = null
  let streamInterval: ReturnType<typeof setInterval> | null = null

  // Getters
  const canStartStream = computed(() => gameState.value.materials > 20)
  const isStreaming = computed(() => gameState.value.isStreaming)

  // Actions
  const handleExplorationEvent = async (lang: 'en' | 'zh') => {
    isProcessingEvent.value = true

    const newTotalHours = gameState.value.totalHours + HOURS_PER_MOVE
    let newTimeInLocation = gameState.value.timeInLocation + HOURS_PER_MOVE
    let newLocationIndex = gameState.value.locationIndex
    let locationChanged = false

    if (newTimeInLocation >= HOURS_TO_CHANGE_MAP) {
      newLocationIndex = (gameState.value.locationIndex + 1) % LOCATIONS.en.length
      newTimeInLocation = 0
      locationChanged = true
    }

    const currentLocationName = LOCATIONS[lang][newLocationIndex]
    let newWeather = gameState.value.weather
    if (Math.random() > 0.5 || locationChanged) {
      newWeather = WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)]
    }

    gameState.value = {
      ...gameState.value,
      totalHours: newTotalHours,
      timeInLocation: newTimeInLocation,
      locationIndex: newLocationIndex,
      location: currentLocationName,
      weather: newWeather
    }

    // Select and resolve event
    const event = selectRandomEvent()
    const isSuccess = checkEventSuccess(event, characterAttributes.value)
    const outcome = isSuccess ? event.success : event.failure

    // Update materials
    gameState.value.materials = Math.min(
      gameState.value.materials + outcome.materials,
      MAX_MATERIALS
    )

    // Award experience
    if (outcome.materials > 0) {
      addExperience(outcome.materials * EXP_REWARDS.MATERIAL_GAIN)
    }

    // Determine rank
    let rank: 'C' | 'B' | 'A' | 'S' = 'C'
    if (event.rarity === 'rare' && isSuccess) rank = 'S'
    else if (event.rarity === 'rare') rank = 'A'
    else if (event.rarity === 'uncommon' && isSuccess) rank = 'A'
    else if (event.rarity === 'uncommon') rank = 'B'
    else if (isSuccess) rank = 'B'

    // Try AI generation, fallback to default content
    let title = outcome.title[lang]
    let content = outcome.contents[Math.floor(Math.random() * outcome.contents.length)][lang]

    if (!locationChanged) {
      const aiContent = await generateBlogContent({
        eventName: event.name[lang],
        eventCategory: event.category,
        isSuccess,
        location: currentLocationName,
        weather: newWeather,
        lang
      })

      if (aiContent) {
        title = aiContent.title
        content = aiContent.content
      }
    }

    const newTweet: Tweet = {
      id: Date.now().toString(),
      author: "protagonist_man",
      handle: "@hero_guy",
      title: locationChanged
        ? (lang === 'zh' ? `新的征途` : `A New Journey`)
        : title,
      content: locationChanged
        ? (lang === 'zh'
            ? `已踏入这片名为 ${LOCATIONS.zh[newLocationIndex]} 的领地。`
            : `Stepped into the domain of ${LOCATIONS.en[newLocationIndex]}.`)
        : content,
      likes: Math.floor(Math.random() * 5),
      retweets: 0,
      timestamp: formatGameTime(newTotalHours, lang),
      type: 'event',
      rank: rank
    }

    tweets.value = [newTweet, ...tweets.value].slice(0, 50)
    isProcessingEvent.value = false
  }

  const handleUserPost = (text: string, lang: 'en' | 'zh', image?: string) => {
    const newTweet: Tweet = {
      id: Date.now().toString(),
      author: "admin",
      handle: "admin",
      title: lang === 'zh' ? "旅行者的低语" : "Traveler's Whisper",
      content: text,
      image: image,
      likes: 0,
      retweets: 0,
      timestamp: formatGameTime(gameState.value.totalHours, lang),
      type: 'user'
    }
    tweets.value = [newTweet, ...tweets.value]
  }

  const startStream = (lang: 'en' | 'zh') => {
    gameState.value.isStreaming = true
    const t = TRANSLATIONS[lang]
    streamComments.value = [{
      id: 'sys',
      user: t.system,
      content: t.broadcastStarted,
      color: 'gray'
    }]

    streamInterval = setInterval(async () => {
      gameState.value.materials -= 5
      if (gameState.value.materials <= 0) {
        gameState.value.materials = 0
        stopStream()
        return
      }

      // Award experience for streaming
      addExperience(EXP_REWARDS.STREAM_TICK)

      const commentData = await generateStreamComment(gameState.value.location)
      const newComment: StreamComment = {
        id: Date.now().toString(),
        user: commentData.user,
        content: commentData.content,
        color: 'white',
        isDonation: commentData.isDonation,
        amount: commentData.amount
      }
      if (commentData.isDonation) {
        gameState.value.money += commentData.amount || 0
        // Bonus experience for donations
        addExperience(EXP_REWARDS.DONATION_BONUS)
      }
      streamComments.value = [...streamComments.value, newComment].slice(-20)
    }, STREAM_TICK_RATE)
  }

  const stopStream = () => {
    gameState.value.isStreaming = false
    if (streamInterval) {
      clearInterval(streamInterval)
      streamInterval = null
    }
  }

  const startExplorationTick = (lang: () => 'en' | 'zh') => {
    if (explorationInterval) return

    explorationInterval = setInterval(() => {
      if (gameState.value.isStreaming || isProcessingEvent.value) return

      explorationProgress.value += 2
      if (explorationProgress.value >= 100) {
        explorationProgress.value = 0
        handleExplorationEvent(lang())
      }
    }, EXPLORATION_TICK_RATE)
  }

  const stopExplorationTick = () => {
    if (explorationInterval) {
      clearInterval(explorationInterval)
      explorationInterval = null
    }
  }

  // Character attribute methods
  const saveCurrentCareer = () => {
    if (currentCareerId.value) {
      careerSaves.value[currentCareerId.value] = {
        level: characterLevel.value,
        experience: characterExperience.value,
        attributes: { ...characterAttributes.value }
      }
    }
  }

  const setAttributesByCareer = (careerId: string) => {
    // Save current career progress before switching
    saveCurrentCareer()

    // Switch to new career
    currentCareerId.value = careerId

    // Load saved data or initialize new
    const savedData = careerSaves.value[careerId]
    if (savedData) {
      characterLevel.value = savedData.level
      characterExperience.value = savedData.experience
      characterAttributes.value = { ...savedData.attributes }
    } else {
      characterLevel.value = 1
      characterExperience.value = 0
      characterAttributes.value = getCareerAttributes(careerId)
    }
  }

  // Calculate experience needed for next level
  const expForNextLevel = computed(() => {
    if (characterLevel.value >= LEVEL_SYSTEM.MAX_LEVEL) return 0
    return getExpForLevel(characterLevel.value + 1)
  })

  // Add experience and handle level ups
  const addExperience = (amount: number): { leveledUp: boolean; gains: Partial<CharacterAttributes> } => {
    if (characterLevel.value >= LEVEL_SYSTEM.MAX_LEVEL) {
      return { leveledUp: false, gains: {} }
    }

    characterExperience.value += amount
    let leveledUp = false
    let totalGains: Partial<CharacterAttributes> = {}

    // Check for level up(s)
    while (
      characterLevel.value < LEVEL_SYSTEM.MAX_LEVEL &&
      characterExperience.value >= getExpForLevel(characterLevel.value + 1)
    ) {
      characterExperience.value -= getExpForLevel(characterLevel.value + 1)
      characterLevel.value++
      leveledUp = true

      // Apply attribute growth
      const gains = applyLevelUpGrowth()
      for (const key of Object.keys(gains) as AttributeKey[]) {
        totalGains[key] = (totalGains[key] || 0) + (gains[key] || 0)
      }
    }

    return { leveledUp, gains: totalGains }
  }

  // Apply predetermined growth on level up (uses growth table)
  const applyLevelUpGrowth = (): Partial<CharacterAttributes> => {
    const growthTable = getCareerGrowthTable(currentCareerId.value)
    const levelIndex = characterLevel.value - 2 // Level 2 = index 0

    if (levelIndex < 0 || levelIndex >= growthTable.length) {
      return {}
    }

    const growth = growthTable[levelIndex]
    const gains: Partial<CharacterAttributes> = {}

    for (const [stat, gain] of Object.entries(growth)) {
      if (gain && gain > 0) {
        const key = stat as AttributeKey
        const currentValue = characterAttributes.value[key]
        const newValue = Math.min(currentValue + gain, LEVEL_SYSTEM.MAX_ATTRIBUTE)
        const actualGain = newValue - currentValue
        if (actualGain > 0) {
          characterAttributes.value[key] = newValue
          gains[key] = actualGain
        }
      }
    }

    return gains
  }

  return {
    gameState,
    tweets,
    streamComments,
    explorationProgress,
    isProcessingEvent,
    canStartStream,
    isStreaming,
    handleExplorationEvent,
    handleUserPost,
    startStream,
    stopStream,
    startExplorationTick,
    stopExplorationTick,
    characterLevel,
    characterExperience,
    currentCareerId,
    characterAttributes,
    expForNextLevel,
    setAttributesByCareer,
    addExperience
  }
})
