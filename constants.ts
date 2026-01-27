export const LOCATIONS = {
  en: [
    "Emerald Whispering Woods",
    "Arid Papercraft Dunes",
    "Frozen Peaks of Cardboard",
    "Tamriel Border Outpost",
    "Abyssal Sukuyan Realm"
  ],
  zh: [
    "翠绿低语森林",
    "干涸纸艺沙丘",
    "纸板冰冻巅峰",
    "泰姆瑞尔边境前哨",
    "深渊宿愿领域"
  ]
};

// Mapping locations to provided background images
export const LOCATION_ASSETS = [
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSn1pVqs-ycjTblYGYp-hoQaVcDusGQACBDoAArdzuVbf1rRqes-7dTgE.png", // 翠绿低语森林
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSnxpVqs8ICiLlN8dfPueQeo2-pzx5AACAzoAArdzuVaRByOGq3qv7jgE.png", // 干涸纸艺沙丘
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSntpVqs4MQ1DdUMjN-JMVTEFqc9Z0AACAjoAArdzuVZ4DDTmv-_WPjgE.png",   // 纸板冰冻巅峰
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSn1pVqs-ycjTblYGYp-hoQaVcDusGQACBDoAArdzuVbf1rRqes-7dTgE.png", // 边境前哨 (复用森林)
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSntpVqs4MQ1DdUMjN-JMVTEFqc9Z0AACAjoAArdzuVZ4DDTmv-_WPjgE.png"    // 宿愿领域 (复用雪山)
];

// Mapping characters to provided sprites
export const CHARACTER_ASSETS = [
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSnlpVqs00fkHKGwyvDV-uZ9lg5aodgADOgACt3O5ViuTMx-4lvLVOAQ.png",    // 精灵 (对应森林)
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSnhpVqswYPtVbSfn2Z8HT_Be-ntKpgAC_zkAArdzuVaE30QPKOwsvDgE.png", // 骑士 (对应沙漠/边境)
    "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEPSnppVqs3l3tHPuNZzAv3gVkzBjSXYgACAToAArdzuVZ5_A_s-uRZaTgE.png" // 魅魔 (对应领域)
];

export const TES_MONTHS = {
  en: ["Morning Star", "Sun's Dawn", "First Seed", "Rain's Hand", "Second Seed", "Mid Year", "Sun's Height", "Last Seed", "Hearthfire", "Frostfall", "Sun's Dusk", "Evening Star"],
  zh: ["星辰月", "晓星月", "初种月", "雨手月", "次种月", "年中月", "盛夏月", "末种月", "炉火月", "霜落月", "日暮月", "晚星月"]
};

export const TES_DAYS = {
  en: ["Sundas", "Morndas", "Tirdas", "Middas", "Turdas", "Fredas", "Loredas"],
  zh: ["盛阳之日", "劳作之日", "祭奠之日", "周中之日", "雷霆之日", "安息之日", "领主之日"]
};

export const WEATHER_CONDITIONS = [
  "Sunny", "Rainy", "Cloudy", "Stormy", "Foggy", "Snowy", "Windy", "Meteor Shower", "Auroras", "Acid Rain"
];

// Level system constants
export const LEVEL_SYSTEM = {
  MAX_LEVEL: 100,
  MAX_ATTRIBUTE: 300,
  BASE_EXP: 100,           // Base experience for level 2
  EXP_GROWTH_RATE: 1.12,   // Smooth exponential growth per level
};

// Experience rewards
export const EXP_REWARDS = {
  MATERIAL_GAIN: 15,       // Per material gained from exploration
  STREAM_TICK: 25,         // Per stream interval tick
  DONATION_BONUS: 10,      // Bonus per donation received
};

// Calculate experience required for a specific level
export const getExpForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return Math.floor(LEVEL_SYSTEM.BASE_EXP * Math.pow(LEVEL_SYSTEM.EXP_GROWTH_RATE, level - 2));
};

// Calculate total experience required to reach a level from level 1
export const getTotalExpForLevel = (level: number): number => {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getExpForLevel(i);
  }
  return total;
};

// Seeded random number generator for deterministic growth
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// Generate predetermined growth table for a career (100 levels)
export type LevelGrowth = Partial<Record<keyof typeof LEVEL_SYSTEM_ATTRIBUTES, number>>;
const LEVEL_SYSTEM_ATTRIBUTES = {
  strength: 0, intelligence: 0, willpower: 0, agility: 0,
  speed: 0, endurance: 0, personality: 0, luck: 0
};

export const generateCareerGrowthTable = (
  careerId: string,
  growthRates: Record<string, number>,
  primaryStats: string[]
): LevelGrowth[] => {
  const table: LevelGrowth[] = [];
  const stats = Object.keys(LEVEL_SYSTEM_ATTRIBUTES);

  // Generate growth for levels 2-100 (index 0 = level 2)
  for (let level = 2; level <= LEVEL_SYSTEM.MAX_LEVEL; level++) {
    const growth: LevelGrowth = {};

    for (const stat of stats) {
      const seed = hashCode(`${careerId}_${stat}_${level}`);
      const roll = seededRandom(seed) * 100;
      const isPrimary = primaryStats.includes(stat);
      const growthChance = growthRates[stat] || 30;

      let gain = 0;
      if (isPrimary) {
        // Primary stats always get 1, chance for 2
        gain = roll < growthChance ? 2 : 1;
      } else {
        // Non-primary: roll against growth rate
        if (roll < growthChance) {
          gain = roll < growthChance * 0.3 ? 2 : 1;
        }
      }

      if (gain > 0) {
        growth[stat as keyof typeof LEVEL_SYSTEM_ATTRIBUTES] = gain;
      }
    }

    table.push(growth);
  }

  return table;
};

// Simple string hash for deterministic seeding
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const EXPLORATION_THOUGHTS = {
    en: [
        "What's that over there?",
        "My feet are getting tired...",
        "Hope I find some loot soon!",
        "This scenery is amazing.",
        "Need more materials for my next post.",
        "Is it lunchtime yet?",
        "I should take a picture of this.",
        "Keep moving forward!",
        "Wonder what's in the next area...",
        "I love this adventuring life!"
    ],
    zh: [
        "那边那是什么？",
        "脚开始有点酸了...",
        "希望能快点找到宝箱！",
        "这里的风景真不错。",
        "得多收集点下一篇博文的素材。",
        "到吃午饭的时间了吗？",
        "我应该把这里拍下来。",
        "继续前进！",
        "不知道下一个区域有什么...",
        "我爱死这种冒险生活了！"
    ]
};

// Character data for wardrobe selection
export const CHARACTER_DATA = [
  {
    id: 'elf',
    name: { en: 'Forest Elf', zh: '森林精灵' },
    description: { en: 'A graceful elf from the ancient woods', zh: '来自古老森林的优雅精灵' },
    asset: CHARACTER_ASSETS[0]
  },
  {
    id: 'knight',
    name: { en: 'Desert Knight', zh: '沙漠骑士' },
    description: { en: 'A brave knight wandering the dunes', zh: '游荡在沙丘间的勇敢骑士' },
    asset: CHARACTER_ASSETS[1]
  },
  {
    id: 'succubus',
    name: { en: 'Abyssal Maiden', zh: '深渊少女' },
    description: { en: 'A mysterious being from the void', zh: '来自虚空的神秘存在' },
    asset: CHARACTER_ASSETS[2]
  }
];

// Career/Class data with attribute presets and growth rates
// Initial attributes compressed (10-40 range), max 300, level cap 100
// Growth rates: percentage chance (0-100) to gain 1-2 points per level
// primaryStats: attributes that ALWAYS grow on level up
export const CAREER_CATEGORIES = [
  {
    id: 'combat',
    name: { en: 'Combat', zh: '战斗/武职系' },
    icon: 'fa-sword',
    careers: [
      { id: 'knight', name: { en: 'Knight', zh: '骑士' },
        attributes: { strength: 28, intelligence: 16, willpower: 24, agility: 20, speed: 18, endurance: 26, personality: 20, luck: 16 },
        growthRates: { strength: 70, intelligence: 20, willpower: 50, agility: 40, speed: 30, endurance: 60, personality: 30, luck: 25 },
        primaryStats: ['strength', 'endurance'] },
      { id: 'paladin', name: { en: 'Paladin', zh: '圣骑士' },
        attributes: { strength: 26, intelligence: 20, willpower: 30, agility: 16, speed: 16, endurance: 24, personality: 22, luck: 18 },
        growthRates: { strength: 55, intelligence: 35, willpower: 70, agility: 25, speed: 25, endurance: 50, personality: 40, luck: 30 },
        primaryStats: ['willpower', 'strength'] },
      { id: 'general', name: { en: 'General', zh: '将军' },
        attributes: { strength: 24, intelligence: 26, willpower: 28, agility: 18, speed: 16, endurance: 22, personality: 24, luck: 14 },
        growthRates: { strength: 50, intelligence: 55, willpower: 60, agility: 30, speed: 25, endurance: 45, personality: 50, luck: 20 },
        primaryStats: ['willpower', 'intelligence'] },
      { id: 'mercenary', name: { en: 'Mercenary', zh: '佣兵' },
        attributes: { strength: 26, intelligence: 14, willpower: 20, agility: 24, speed: 22, endurance: 24, personality: 14, luck: 20 },
        growthRates: { strength: 60, intelligence: 15, willpower: 35, agility: 55, speed: 50, endurance: 55, personality: 15, luck: 40 },
        primaryStats: ['strength', 'agility'] },
      { id: 'adventurer', name: { en: 'Adventurer', zh: '冒险者' },
        attributes: { strength: 20, intelligence: 20, willpower: 20, agility: 22, speed: 22, endurance: 20, personality: 18, luck: 24 },
        growthRates: { strength: 40, intelligence: 40, willpower: 40, agility: 45, speed: 45, endurance: 40, personality: 35, luck: 55 },
        primaryStats: ['luck', 'agility'] }
    ]
  },
  {
    id: 'magic',
    name: { en: 'Magic', zh: '魔法/学术系' },
    icon: 'fa-hat-wizard',
    careers: [
      { id: 'mage', name: { en: 'Mage', zh: '魔法师' },
        attributes: { strength: 10, intelligence: 32, willpower: 28, agility: 16, speed: 14, endurance: 14, personality: 16, luck: 18 },
        growthRates: { strength: 10, intelligence: 75, willpower: 60, agility: 25, speed: 20, endurance: 20, personality: 25, luck: 30 },
        primaryStats: ['intelligence', 'willpower'] },
      { id: 'archmage', name: { en: 'Archmage', zh: '大魔法师' },
        attributes: { strength: 8, intelligence: 36, willpower: 32, agility: 14, speed: 12, endurance: 12, personality: 20, luck: 16 },
        growthRates: { strength: 5, intelligence: 85, willpower: 70, agility: 20, speed: 15, endurance: 15, personality: 35, luck: 25 },
        primaryStats: ['intelligence', 'willpower'] },
      { id: 'scholar', name: { en: 'Scholar', zh: '学者' },
        attributes: { strength: 10, intelligence: 34, willpower: 24, agility: 14, speed: 14, endurance: 16, personality: 22, luck: 16 },
        growthRates: { strength: 10, intelligence: 80, willpower: 45, agility: 20, speed: 20, endurance: 25, personality: 40, luck: 25 },
        primaryStats: ['intelligence', 'personality'] },
      { id: 'sage', name: { en: 'Sage', zh: '贤者' },
        attributes: { strength: 12, intelligence: 34, willpower: 30, agility: 16, speed: 14, endurance: 18, personality: 24, luck: 20 },
        growthRates: { strength: 15, intelligence: 75, willpower: 65, agility: 25, speed: 20, endurance: 30, personality: 50, luck: 40 },
        primaryStats: ['intelligence', 'willpower'] }
    ]
  },
  {
    id: 'politics',
    name: { en: 'Politics', zh: '政治/管理系' },
    icon: 'fa-crown',
    careers: [
      { id: 'noble', name: { en: 'Noble', zh: '贵族' },
        attributes: { strength: 14, intelligence: 24, willpower: 22, agility: 16, speed: 14, endurance: 16, personality: 30, luck: 22 },
        growthRates: { strength: 20, intelligence: 50, willpower: 45, agility: 25, speed: 20, endurance: 25, personality: 70, luck: 45 },
        primaryStats: ['personality', 'intelligence'] },
      { id: 'official', name: { en: 'Official', zh: '官员' },
        attributes: { strength: 12, intelligence: 28, willpower: 24, agility: 14, speed: 14, endurance: 18, personality: 26, luck: 18 },
        growthRates: { strength: 15, intelligence: 60, willpower: 50, agility: 20, speed: 20, endurance: 30, personality: 55, luck: 30 },
        primaryStats: ['intelligence', 'personality'] },
      { id: 'ruler', name: { en: 'Ruler', zh: '统治者' }, hidden: true,
        attributes: { strength: 20, intelligence: 32, willpower: 34, agility: 18, speed: 16, endurance: 22, personality: 32, luck: 24 },
        growthRates: { strength: 40, intelligence: 70, willpower: 75, agility: 35, speed: 30, endurance: 45, personality: 70, luck: 50 },
        primaryStats: ['willpower', 'personality'] }
    ]
  },
  {
    id: 'arts',
    name: { en: 'Arts', zh: '艺术/表演系' },
    icon: 'fa-music',
    careers: [
      { id: 'musician', name: { en: 'Musician', zh: '音乐家' },
        attributes: { strength: 12, intelligence: 22, willpower: 20, agility: 22, speed: 18, endurance: 16, personality: 28, luck: 20 },
        growthRates: { strength: 15, intelligence: 45, willpower: 40, agility: 45, speed: 35, endurance: 25, personality: 65, luck: 40 },
        primaryStats: ['personality', 'agility'] },
      { id: 'dancer', name: { en: 'Dancer', zh: '舞者' },
        attributes: { strength: 16, intelligence: 18, willpower: 22, agility: 32, speed: 28, endurance: 22, personality: 26, luck: 18 },
        growthRates: { strength: 30, intelligence: 30, willpower: 45, agility: 80, speed: 70, endurance: 45, personality: 55, luck: 30 },
        primaryStats: ['agility', 'personality'] },
      { id: 'artist', name: { en: 'Artist', zh: '艺术家' },
        attributes: { strength: 12, intelligence: 26, willpower: 24, agility: 20, speed: 16, endurance: 18, personality: 24, luck: 22 },
        growthRates: { strength: 15, intelligence: 55, willpower: 50, agility: 40, speed: 25, endurance: 30, personality: 50, luck: 45 },
        primaryStats: ['intelligence', 'personality'] },
      { id: 'playwright', name: { en: 'Playwright', zh: '剧作家' },
        attributes: { strength: 10, intelligence: 30, willpower: 22, agility: 14, speed: 14, endurance: 16, personality: 28, luck: 18 },
        growthRates: { strength: 10, intelligence: 70, willpower: 45, agility: 20, speed: 20, endurance: 25, personality: 60, luck: 30 },
        primaryStats: ['intelligence', 'personality'] }
    ]
  },
  {
    id: 'commerce',
    name: { en: 'Commerce', zh: '商业/技术系' },
    icon: 'fa-coins',
    careers: [
      { id: 'merchant', name: { en: 'Merchant', zh: '商人' },
        attributes: { strength: 14, intelligence: 24, willpower: 20, agility: 18, speed: 18, endurance: 18, personality: 28, luck: 22 },
        growthRates: { strength: 20, intelligence: 50, willpower: 40, agility: 35, speed: 35, endurance: 35, personality: 65, luck: 50 },
        primaryStats: ['personality', 'luck'] },
      { id: 'tycoon', name: { en: 'Tycoon', zh: '富商' },
        attributes: { strength: 12, intelligence: 28, willpower: 26, agility: 16, speed: 16, endurance: 20, personality: 30, luck: 26 },
        growthRates: { strength: 15, intelligence: 60, willpower: 55, agility: 25, speed: 25, endurance: 40, personality: 70, luck: 60 },
        primaryStats: ['personality', 'luck'] },
      { id: 'craftsman', name: { en: 'Craftsman', zh: '工匠' },
        attributes: { strength: 22, intelligence: 24, willpower: 22, agility: 26, speed: 18, endurance: 24, personality: 18, luck: 16 },
        growthRates: { strength: 50, intelligence: 50, willpower: 45, agility: 60, speed: 30, endurance: 55, personality: 30, luck: 25 },
        primaryStats: ['agility', 'strength'] },
      { id: 'inventor', name: { en: 'Inventor', zh: '发明家' },
        attributes: { strength: 14, intelligence: 34, willpower: 24, agility: 20, speed: 16, endurance: 18, personality: 18, luck: 22 },
        growthRates: { strength: 20, intelligence: 80, willpower: 50, agility: 40, speed: 25, endurance: 30, personality: 30, luck: 50 },
        primaryStats: ['intelligence', 'luck'] }
    ]
  },
  {
    id: 'religion',
    name: { en: 'Religion', zh: '宗教/信仰系' },
    icon: 'fa-cross',
    careers: [
      { id: 'nun', name: { en: 'Nun', zh: '修女' },
        attributes: { strength: 12, intelligence: 20, willpower: 28, agility: 16, speed: 14, endurance: 18, personality: 26, luck: 20 },
        growthRates: { strength: 15, intelligence: 40, willpower: 65, agility: 25, speed: 20, endurance: 35, personality: 55, luck: 40 },
        primaryStats: ['willpower', 'personality'] },
      { id: 'clergy', name: { en: 'Clergy', zh: '神职人员' },
        attributes: { strength: 14, intelligence: 24, willpower: 30, agility: 14, speed: 14, endurance: 20, personality: 24, luck: 18 },
        growthRates: { strength: 20, intelligence: 50, willpower: 70, agility: 20, speed: 20, endurance: 40, personality: 50, luck: 35 },
        primaryStats: ['willpower', 'intelligence'] },
      { id: 'priest', name: { en: 'Priest', zh: '圣职者' },
        attributes: { strength: 16, intelligence: 26, willpower: 32, agility: 16, speed: 16, endurance: 22, personality: 28, luck: 20 },
        growthRates: { strength: 25, intelligence: 55, willpower: 75, agility: 25, speed: 25, endurance: 45, personality: 60, luck: 40 },
        primaryStats: ['willpower', 'personality'] }
    ]
  },
  {
    id: 'life',
    name: { en: 'Life', zh: '生活/自由系' },
    icon: 'fa-home',
    careers: [
      { id: 'citizen', name: { en: 'Citizen', zh: '普通市民' },
        attributes: { strength: 16, intelligence: 18, willpower: 18, agility: 18, speed: 18, endurance: 20, personality: 20, luck: 20 },
        growthRates: { strength: 35, intelligence: 35, willpower: 35, agility: 35, speed: 35, endurance: 40, personality: 40, luck: 40 },
        primaryStats: ['luck', 'endurance'] },
      { id: 'farmer', name: { en: 'Farmer', zh: '农民' },
        attributes: { strength: 24, intelligence: 16, willpower: 20, agility: 20, speed: 18, endurance: 28, personality: 18, luck: 18 },
        growthRates: { strength: 55, intelligence: 25, willpower: 40, agility: 40, speed: 35, endurance: 70, personality: 30, luck: 35 },
        primaryStats: ['endurance', 'strength'] }
    ]
  }
];

export const TRANSLATIONS = {
  en: {
    home: "Home", travel: "Travel", growth: "Growth", wardrobe: "Wardrobe",
    energy: "Energy", items: "Topics",
    shareJourney: "Share Your Journey",
    writeStory: "Write your story here...",
    addPhoto: "Add Photo",
    publishPost: "Publish Post",
    journeySoFar: "The Journey So Far",
    viewOlder: "View Older Entries",
    liveBroadcast: "LIVE BROADCAST",
    endStream: "End Stream",
    startStream: "Start Live Broadcast",
    viewers: "Viewers",
    donated: "Donated",
    system: "SYSTEM",
    broadcastStarted: "Broadcast Started...",
    transmitting: "Transmitting Signal...",
    streamChat: "Stream Chat",
    saySomething: "Say something...",
    gameTitle: "Blognetic",
    era: "4E",
    cycle: "Day",
    weather: "Weather",
    exploring: "NOW EXPLORING",
    // Growth page
    characterAttributes: "Character Attributes",
    attributePoints: "Attribute Points",
    level: "Level",
    experience: "EXP",
    levelUp: "Level Up!",
    maxLevel: "MAX",
    // Attributes
    strength: "Strength",
    intelligence: "Intelligence",
    willpower: "Willpower",
    agility: "Agility",
    speed: "Speed",
    endurance: "Endurance",
    personality: "Personality",
    luck: "Luck"
  },
  zh: {
    home: "首页", travel: "旅行", growth: "成长", wardrobe: "换装",
    energy: "能量", items: "话题",
    shareJourney: "分享你的旅程",
    writeStory: "在这里写下你的故事...",
    addPhoto: "添加照片",
    publishPost: "发布帖子",
    journeySoFar: "至今的旅程",
    viewOlder: "查看更多",
    liveBroadcast: "现场直播",
    endStream: "结束直播",
    startStream: "开始直播",
    viewers: "观众",
    donated: "打赏",
    system: "系统",
    broadcastStarted: "直播已开始...",
    transmitting: "信号传输中...",
    streamChat: "直播聊天室",
    saySomething: "说点什么...",
    gameTitle: "异界博主",
    era: "第四纪元",
    cycle: "日",
    weather: "天气",
    exploring: "正在探索",
    // Growth page
    characterAttributes: "角色属性",
    attributePoints: "属性点数",
    level: "等级",
    experience: "经验",
    levelUp: "升级！",
    maxLevel: "满级",
    // Attributes
    strength: "力量",
    intelligence: "智力",
    willpower: "意志",
    agility: "敏捷",
    speed: "速度",
    endurance: "耐力",
    personality: "魅力",
    luck: "幸运"
  }
};

export const SNAFU_EVENTS = [
  // C Rank - Common/Trivial
  { text: "found a peculiarly shaped rock. it looks nice.", material: "pretty stone", quantity: 1, title: {en: "Nice Rock", zh: "好看的石头"}, rank: 'C' },
  { text: "i walked forward for a significant duration.", material: "foot soreness", quantity: 0, title: {en: "Lonely Trek", zh: "漫长的苦旅"}, rank: 'C' },
  { text: "the sun is emitting photons today.", material: "warmth", quantity: 0, title: {en: "Sunlit Morning", zh: "沐浴在晨光中"}, rank: 'C' },
  { text: "engaged in dialogue with npc.", material: "quest log update", quantity: 1, title: {en: "Local Rumors", zh: "乡间的传闻"}, rank: 'C' },

  // B Rank - Uncommon/Good
  { text: "consumed a very delicious ration.", material: "crumb", quantity: 1, title: {en: "Tasty Meal", zh: "美味的一餐"}, rank: 'B' },
  { text: "behold, a chest containing items.", material: "shiny metal disk", quantity: 5, title: {en: "Hidden Treasure", zh: "意外的宝藏"}, rank: 'B' },
  { text: "found a patch of rare herbs.", material: "herb leaf", quantity: 2, title: {en: "Herbalist Find", zh: "稀有草药"}, rank: 'B' },

  // A Rank - Rare/Excellent
  { text: "engaged in combat with a formidable foe and won.", material: "loot", quantity: 3, title: {en: "Epic Victory", zh: "强敌击破"}, rank: 'A' },
  { text: "discovered an ancient ruin entrance.", material: "ancient brick", quantity: 3, title: {en: "Discovery", zh: "遗迹发现"}, rank: 'A' },

  // S Rank - Legendary/Critical (The specific request)
  { text: "a goblin ambush resulted in damage to my equipment. my skirt is torn.", material: "cloth scrap", quantity: 1, title: {en: "Wardrobe Malfunction", zh: "不妙的意外"}, rank: 'S' },
  { text: "witnessed a divine beast passing by.", material: "glowing scale", quantity: 5, title: {en: "Divine Encounter", zh: "神兽降临"}, rank: 'S' }
];

export const SNAFU_COMMENTS = [
  { user: "visual_enjoyer_99", content: "this entertains my receptors", isDonation: false },
  { user: "money_haver", content: "i transfer currency to you", isDonation: true, amount: 500 },
  { user: "skeptic_dude", content: "is this event factual?", isDonation: false },
  { user: "gamer_entity", content: "perform the jumping action", isDonation: false },
  { user: "loud_noise", content: "LOUD EXCLAMATION OF JOY", isDonation: true, amount: 50 },
  { user: "internet_person", content: "poggers", isDonation: false },
  { user: "critic_bot", content: "your skill requires incrementation", isDonation: false },
];

export const SNAFU_MATERIALS = [
  "rocks",
  "twigs",
  "mysterious orb",
  "lint",
  "digital token",
  "bone fragment",
  "herb leaf"
];

export const DANMAKU_MESSAGES = [
    "LUL", "?????", "real?", "fake", "scripted", 
    "bad rng", "rigged", "developer pls fix", 
    "is this ai?", "dead game", "where is content", 
    "skip cutscene", "looks like ms paint", 
    "streamer ignored me", "refund", "bald",
    "POGGERS", "omegalul", "pepega", "my eyes", 
    "4k resolution wow", "press F", "gg", "ez", "noob",
    "lag?", "buff hero", "nerf slime", "ResidentSleeper"
];