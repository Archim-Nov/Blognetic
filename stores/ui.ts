import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { EXPLORATION_THOUGHTS, CHARACTER_DATA } from '../constants'

export type ThemeType = 'light' | 'dark' | 'deep-green' | 'pink' | 'blue' | 'mono'

export const useUIStore = defineStore('ui', () => {
  // State
  const activeTab = ref('Home')
  const lang = ref<'en' | 'zh'>('en')
  const theme = ref<ThemeType>('light')
  const enableWobble = ref(true)
  const currentThought = ref('')
  const selectedCharacterId = ref<string>(CHARACTER_DATA[0].id)
  const selectedCareerId = ref<string>('adventurer')

  let thoughtInterval: ReturnType<typeof setInterval> | null = null

  // Watchers for side effects
  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }, { immediate: true })

  watch(enableWobble, (enabled) => {
    if (enabled) {
      document.body.classList.remove('no-wobble')
    } else {
      document.body.classList.add('no-wobble')
    }
  }, { immediate: true })

  // Initialize thought
  watch(lang, (newLang) => {
    const thoughts = EXPLORATION_THOUGHTS[newLang]
    currentThought.value = thoughts[Math.floor(Math.random() * thoughts.length)]
  }, { immediate: true })

  // Actions
  const setActiveTab = (tab: string) => {
    activeTab.value = tab
  }

  const setLang = (newLang: 'en' | 'zh') => {
    lang.value = newLang
  }

  const setTheme = (newTheme: ThemeType) => {
    theme.value = newTheme
  }

  const setEnableWobble = (enabled: boolean) => {
    enableWobble.value = enabled
  }

  const setSelectedCharacter = (characterId: string) => {
    selectedCharacterId.value = characterId
  }

  const setSelectedCareer = (careerId: string) => {
    selectedCareerId.value = careerId
  }

  const updateThought = (isStreaming: boolean) => {
    if (!isStreaming) {
      const thoughts = EXPLORATION_THOUGHTS[lang.value]
      currentThought.value = thoughts[Math.floor(Math.random() * thoughts.length)]
    }
  }

  const startThoughtCycle = (getIsStreaming: () => boolean) => {
    if (thoughtInterval) return

    thoughtInterval = setInterval(() => {
      updateThought(getIsStreaming())
    }, 8000)
  }

  const stopThoughtCycle = () => {
    if (thoughtInterval) {
      clearInterval(thoughtInterval)
      thoughtInterval = null
    }
  }

  return {
    activeTab,
    lang,
    theme,
    enableWobble,
    currentThought,
    selectedCharacterId,
    selectedCareerId,
    setActiveTab,
    setLang,
    setTheme,
    setEnableWobble,
    setSelectedCharacter,
    setSelectedCareer,
    updateThought,
    startThoughtCycle,
    stopThoughtCycle
  }
})
