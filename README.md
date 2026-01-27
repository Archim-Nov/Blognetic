# Blognetic - 异界博主

一款基于 Vue 3 + TypeScript + Pinia 的森林冒险博主模拟游戏。

## 项目简介

Blognetic 是一个独特的网页游戏，玩家扮演一位穿越异世界的博主，在奇幻森林中探索、收集素材、发布动态，并进行直播与观众互动。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架 (Composition API)
- **TypeScript** - 类型安全的 JavaScript 超集
- **Pinia** - Vue 官方状态管理库
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 原子化 CSS 框架

## 项目结构

```
Blognetic/
├── App.vue                 # 主应用组件
├── main.ts                 # 应用入口
├── env.d.ts                # Vue SFC 类型声明
├── types.ts                # TypeScript 类型定义
├── constants.ts            # 游戏常量和多语言翻译
├── stores/                 # Pinia 状态管理
│   ├── index.ts            # Store 导出
│   ├── game.ts             # 游戏状态 Store
│   └── ui.ts               # UI 状态 Store
├── services/
│   └── geminiService.ts    # API 服务
└── components/
    ├── layout/             # 布局组件
    │   ├── BlogHeader.vue  # 顶部导航栏
    │   ├── BlogHero.vue    # 主视觉区域
    │   ├── BlogCard.vue    # 动态卡片
    │   └── StreamModal.vue # 模态框组件
    ├── exploration/        # 探索相关组件
    │   ├── ExplorationInput.vue  # 发帖输入框
    │   └── ExplorationFeed.vue   # 动态流列表
    └── streaming/          # 直播相关组件
        └── StreamingWindow.vue   # 直播窗口
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

## 游戏功能

### 探索系统

- 自动探索进度条，每次填满触发随机事件
- 事件分为 C/B/A/S 四个稀有度等级
- 探索获得素材，用于直播消耗

### 动态系统

- 自动生成探索日志
- 支持用户手动发帖（文字+图片）
- 动态卡片展示，点击查看详情

### 直播系统

- 素材 > 20 时可开启直播
- 直播消耗素材，获得观众打赏
- 实时聊天评论流

### 主题系统

支持 6 种主题切换：

| 主题 | 说明 |
|------|------|
| Meadow (林间) | 默认浅色主题 |
| Midnight (深夜) | 深色主题 |
| Deep Forest (深林) | 深绿色主题 |
| Sakura (樱粉) | 粉色主题 |
| Ocean (海蓝) | 蓝色主题 |
| Ink (水墨) | 单色主题 |

### 多语言支持

- 中文 (zh)
- English (en)

### 其他功能

- 摇晃动画效果开关
- 上古卷轴风格的游戏内时间系统
- 5 个不同的探索地图区域

## 许可证

MIT
