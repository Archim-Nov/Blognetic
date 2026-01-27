# Blognetic - 异界博主

[English](#english) | [中文](#中文)

---

## English

A fantasy world travel blogger simulation game built with Vue 3 + TypeScript + Pinia.

### Introduction

Blognetic is a unique web game where you play as a blogger who has traveled to another world. Explore fantasy lands, collect materials, post adventure logs, and live stream to earn tips from viewers.

### Tech Stack

- **Vue 3** - Progressive JavaScript Framework (Composition API)
- **TypeScript** - Type-safe JavaScript superset
- **Pinia** - Official Vue state management library
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework

### Project Structure

```
Blognetic/
├── App.vue                 # Main application component
├── main.ts                 # Application entry
├── types.ts                # TypeScript type definitions
├── constants.ts            # Game constants, careers, translations
├── events.ts               # Game event definitions
├── stores/
│   ├── game.ts             # Game state, exploration, streaming logic
│   └── ui.ts               # UI state, theme, language settings
├── services/
│   ├── aiService.ts        # OpenAI/Gemini API integration
│   └── geminiService.ts    # Stream comment generation
└── components/
    ├── layout/             # Header, Hero, Settings, Modals
    ├── exploration/        # Post input, Feed display
    ├── streaming/          # Live streaming window
    ├── growth/             # Character attributes & career panel
    └── wardrobe/           # Character selection panel
```

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Or double-click `start.bat` on Windows.

Visit http://localhost:5173 to play.

### Game Features

#### Exploration System
- Auto-exploration with progress bar
- Random events with three rarity levels (Common/Uncommon/Rare)
- Event outcomes based on attribute checks (success/failure)
- Collect materials for streaming

#### Character System
- **8 Attributes**: Strength, Intelligence, Willpower, Agility, Speed, Endurance, Personality, Luck
- **Career System**: Multiple career categories with unique base stats and growth rates
- **Level System**: Max level 100, max attribute 300
- **Experience**: Gain EXP from exploration and streaming

#### Streaming System
- Start streaming when materials > 20
- Consumes materials, earns viewer donations
- Real-time chat comments with random donations

#### Character Wardrobe
- 3 selectable characters: Forest Elf, Desert Knight, Abyssal Maiden
- Each with unique artwork

#### AI Integration (Optional)
- Supports OpenAI-compatible APIs and Google Gemini
- Auto-generates blog post content based on events
- Configurable API endpoint, model, and key

#### Theme System

| Theme | Description |
|-------|-------------|
| Meadow | Default light theme |
| Midnight | Dark theme |
| Deep Forest | Deep green theme |
| Sakura | Pink theme |
| Ocean | Blue theme |
| Ink | Monochrome theme |

#### Time & Weather System
- Elder Scrolls-style calendar (12 months, 7-day weeks)
- Dynamic weather: Sunny, Rainy, Cloudy, Stormy, Foggy, Snowy, Windy, Meteor Shower, Auroras, Acid Rain

#### Exploration Maps
- Emerald Whispering Woods
- Arid Papercraft Dunes
- Frozen Peaks of Cardboard
- Tamriel Border Outpost
- Abyssal Sukuyan Realm

#### Multi-language
- English
- Chinese (中文)

---

## 中文

一款基于 Vue 3 + TypeScript + Pinia 的奇幻世界旅行博主模拟游戏。

### 项目简介

Blognetic 是一款独特的网页游戏，你将扮演一位穿越到异世界的博主。在奇幻大陆探索冒险、收集素材、发布探险日志，并通过直播获得观众打赏。

### 技术栈

- **Vue 3** - 渐进式 JavaScript 框架 (Composition API)
- **TypeScript** - 类型安全的 JavaScript 超集
- **Pinia** - Vue 官方状态管理库
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 原子化 CSS 框架

### 项目结构

```
Blognetic/
├── App.vue                 # 主应用组件
├── main.ts                 # 应用入口
├── types.ts                # TypeScript 类型定义
├── constants.ts            # 游戏常量、职业、翻译
├── events.ts               # 游戏事件定义
├── stores/
│   ├── game.ts             # 游戏状态、探索、直播逻辑
│   └── ui.ts               # UI 状态、主题、语言设置
├── services/
│   ├── aiService.ts        # OpenAI/Gemini API 集成
│   └── geminiService.ts    # 直播评论生成
└── components/
    ├── layout/             # 头部、主视觉、设置、模态框
    ├── exploration/        # 发帖输入、动态流
    ├── streaming/          # 直播窗口
    ├── growth/             # 角色属性与职业面板
    └── wardrobe/           # 角色换装面板
```

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

或在 Windows 上双击 `start.bat` 启动。

访问 http://localhost:5173 开始游戏。

### 游戏功能

#### 探索系统
- 自动探索进度条
- 随机事件，分为三种稀有度（普通/稀有/传说）
- 事件结果基于属性检定（成功/失败）
- 收集素材用于直播

#### 角色系统
- **8 种属性**：力量、智力、意志、敏捷、速度、耐力、魅力、幸运
- **职业系统**：多种职业类别，各有独特的初始属性和成长率
- **等级系统**：最高 100 级，属性上限 300
- **经验值**：通过探索和直播获得经验

#### 直播系统
- 素材 > 20 时可开启直播
- 消耗素材，获得观众打赏
- 实时聊天评论流，随机打赏

#### 角色换装
- 3 个可选角色：森林精灵、沙漠骑士、深渊少女
- 各有独特立绘

#### AI 集成（可选）
- 支持 OpenAI 兼容接口和 Google Gemini
- 根据事件自动生成博文内容
- 可配置 API 地址、模型和密钥

#### 主题系统

| 主题 | 说明 |
|------|------|
| Meadow (林间) | 默认浅色主题 |
| Midnight (深夜) | 深色主题 |
| Deep Forest (深林) | 深绿色主题 |
| Sakura (樱粉) | 粉色主题 |
| Ocean (海蓝) | 蓝色主题 |
| Ink (水墨) | 单色主题 |

#### 时间与天气系统
- 上古卷轴风格日历（12 月份、7 天周期）
- 动态天气：晴天、雨天、多云、暴风雨、雾天、雪天、大风、流星雨、极光、酸雨

#### 探索地图
- 翠绿低语森林
- 干涸纸艺沙丘
- 纸板冰冻巅峰
- 泰姆瑞尔边境前哨
- 深渊宿愿领域

#### 多语言支持
- English (英文)
- 中文

---

## License

MIT
