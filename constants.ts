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

// 映射到本地 assets 文件夹
export const LOCATION_ASSETS = [
    "./assets/backgrounds/bg_forest.png", // 翠绿低语森林
    "./assets/backgrounds/bg_desert.png", // 干涸纸艺沙丘
    "./assets/backgrounds/bg_snow.png",   // 纸板冰冻巅峰
    "./assets/backgrounds/bg_forest.png", // 边境前哨 (复用森林)
    "./assets/backgrounds/bg_snow.png"    // 宿愿领域 (复用雪山)
];

// 映射到本地 assets 文件夹
export const CHARACTER_ASSETS = [
    "./assets/sprites/sprite_elf.png",    // 精灵 (对应森林)
    "./assets/sprites/sprite_knight.png", // 骑士 (对应沙漠/边境)
    "./assets/sprites/sprite_succubus.png" // 魅魔 (对应领域)
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

export const TRANSLATIONS = {
  en: {
    home: "Home", travel: "Travel", guide: "Guide", food: "Food",
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
    exploring: "NOW EXPLORING"
  },
  zh: {
    home: "首页", travel: "旅行", guide: "指南", food: "美食",
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
    exploring: "正在探索"
  }
};

export const SNAFU_EVENTS = [
  { text: "i have perceived a blob of slime.", material: "gooey substance unit", quantity: 1, title: {en: "Slime Sighting", zh: "史莱姆目击记录"} },
  { text: "a goblin creature did an attack maneuver.", material: "pointy stick", quantity: 1, title: {en: "Ambush!", zh: "突发遭遇战！"} },
  { text: "i walked forward for a significant duration.", material: "foot soreness", quantity: 0, title: {en: "Lonely Trek", zh: "漫长的苦旅"} },
  { text: "behold, a chest containing items.", material: "shiny metal disk", quantity: 5, title: {en: "Hidden Treasure", zh: "意外的宝藏"} },
  { text: "the sun is emitting photons today.", material: "warmth", quantity: 0, title: {en: "Sunlit Morning", zh: "沐浴在晨光中"} },
  { text: "defeated a low resolution enemy.", material: "pixels", quantity: 3, title: {en: "Victory", zh: "微小的胜利"} },
  { text: "consumed a food item for sustenance.", material: "crumb", quantity: 1, title: {en: "Quick Snack", zh: "路边的小食"} },
  { text: "engaged in dialogue with npc.", material: "quest log update", quantity: 1, title: {en: "Local Rumors", zh: "乡间的传闻"} },
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