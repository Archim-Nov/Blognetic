export const LOCATIONS = [
  "Emerald Whispering Woods",
  "Arid Papercraft Dunes",
  "Frozen Peaks of Cardboard",
  "Tamriel Border Outpost",
  "Abyssal Sukuyan Realm"
];

// Mapping locations to provided background images
export const LOCATION_ASSETS = [
    "https://i0.hdslb.com/bfs/new_dyn/3d312e4ca0df2646fcdba477595be01f358806.png", // Lush Forest
    "https://i0.hdslb.com/bfs/new_dyn/8360e9b63c616deac5ec46a27aaff59c358806.png", // Desert/Hills
    "https://i0.hdslb.com/bfs/new_dyn/18657fd74093571f6c9d54457612cfb6358806.png", // Snowy Mountains
    "https://i0.hdslb.com/bfs/new_dyn/3d312e4ca0df2646fcdba477595be01f358806.png", // Reusing Lush Forest
    "https://i0.hdslb.com/bfs/new_dyn/18657fd74093571f6c9d54457612cfb6358806.png"  // Reusing Snowy Mountains
];

// Mapping characters to provided sprites
export const CHARACTER_ASSETS = [
    "https://i0.hdslb.com/bfs/new_dyn/be3bd275fbea30c99851e82fdc0b2c69358806.png", // Elf
    "https://i0.hdslb.com/bfs/new_dyn/64b3dea4aaac0c4f653825b41f400ce6358806.png", // Knight
    "https://i0.hdslb.com/bfs/new_dyn/7af2b327dac9b4bbde6e3d98e08f26f1358806.png", // Succubus
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
    weather: "Weather"
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
    donated: "捐赠",
    system: "系统",
    broadcastStarted: "直播已开始...",
    transmitting: "信号传输中...",
    streamChat: "直播聊天室",
    saySomething: "说点什么...",
    gameTitle: "异界博主",
    era: "第四纪元",
    cycle: "日",
    weather: "天气"
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