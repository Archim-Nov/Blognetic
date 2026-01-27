<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore, useUIStore } from './stores'
import { LOCATIONS, TRANSLATIONS } from './constants'

import BlogHeader from './components/layout/BlogHeader.vue'
import BlogHero from './components/layout/BlogHero.vue'
import StreamModal from './components/layout/StreamModal.vue'
import SettingsPanel from './components/layout/SettingsPanel.vue'
import ExplorationInput from './components/exploration/ExplorationInput.vue'
import ExplorationFeed from './components/exploration/ExplorationFeed.vue'
import StreamingWindow from './components/streaming/StreamingWindow.vue'
import GrowthPanel from './components/growth/GrowthPanel.vue'
import WardrobePanel from './components/wardrobe/WardrobePanel.vue'
import { formatGameTime } from './stores/game'

const gameStore = useGameStore()
const uiStore = useUIStore()
const showSettings = ref(false)

const t = () => TRANSLATIONS[uiStore.lang]

const isGrowthTab = () => {
  const growthLabel = t().growth
  return uiStore.activeTab === growthLabel
}

const isWardrobeTab = () => {
  const wardrobeLabel = t().wardrobe
  return uiStore.activeTab === wardrobeLabel
}

onMounted(() => {
  uiStore.startThoughtCycle(() => gameStore.gameState.isStreaming)
  gameStore.startExplorationTick(() => uiStore.lang)
})

onUnmounted(() => {
  uiStore.stopThoughtCycle()
  gameStore.stopExplorationTick()
})

const handleUserPost = (text: string, image?: string) => {
  gameStore.handleUserPost(text, uiStore.lang, image)
}

const handleStartStream = () => {
  gameStore.startStream(uiStore.lang)
}
</script>

<template>
  <div class="container mx-auto px-6 py-8 max-w-[1200px] wobbly-box wobbly-box-container my-8 min-h-[90vh]">
    <BlogHeader
      :activeTab="uiStore.activeTab"
      :lang="uiStore.lang"
      :theme="uiStore.theme"
      :enableWobble="uiStore.enableWobble"
      @tabChange="uiStore.setActiveTab"
      @langChange="uiStore.setLang"
      @themeChange="uiStore.setTheme"
      @wobbleChange="uiStore.setEnableWobble"
      @openSettings="showSettings = true"
    />

    <BlogHero
      :currentLocation="LOCATIONS[uiStore.lang][gameStore.gameState.locationIndex]"
      :locationIndex="gameStore.gameState.locationIndex"
      :progress="gameStore.explorationProgress"
      :energy="gameStore.gameState.energy"
      :materials="gameStore.gameState.materials"
      :gameTime="formatGameTime(gameStore.gameState.totalHours, uiStore.lang)"
      :weather="gameStore.gameState.weather"
      :lang="uiStore.lang"
      :thought="uiStore.currentThought"
      :selectedCharacterId="uiStore.selectedCharacterId"
      :characterLevel="gameStore.characterLevel"
      :characterExperience="gameStore.characterExperience"
      :expForNextLevel="gameStore.expForNextLevel"
    />

    <!-- Main Content Area -->
    <template v-if="isGrowthTab()">
      <GrowthPanel :lang="uiStore.lang" />
    </template>

    <template v-else-if="isWardrobeTab()">
      <WardrobePanel :lang="uiStore.lang" />
    </template>

    <template v-else>
      <div class="flex items-center justify-center gap-4 my-12 text-[var(--text-title)] font-title text-2xl">
        <div class="h-1 flex-1 bg-[var(--border-color)] rounded-full animate-[squiggly-anim_0.3s_linear_infinite] max-w-[100px]"></div>
        <span>{{ t().journeySoFar }}</span>
        <div class="h-1 flex-1 bg-[var(--border-color)] rounded-full animate-[squiggly-anim_0.3s_linear_infinite] max-w-[100px]"></div>
      </div>

      <ExplorationInput :lang="uiStore.lang" @userPost="handleUserPost" />

      <ExplorationFeed :tweets="gameStore.tweets" :lang="uiStore.lang" />
    </template>

    <!-- Stream Start Button -->
    <div
      v-if="!gameStore.gameState.isStreaming && gameStore.canStartStream"
      class="fixed bottom-8 right-8 z-40"
    >
      <button
        @click="handleStartStream"
        class="bg-[var(--accent-pop)] text-white border-[3px] border-[var(--border-color)] rounded-full w-16 h-16 flex items-center justify-center shadow-[4px_4px_0_var(--border-color)] hover:translate-y-1 hover:shadow-none transition-all animate-bounce wobbly-box"
        :title="t().startStream"
      >
        <i class="fas fa-video text-xl"></i>
      </button>
    </div>

    <footer class="wobbly-box bg-card-context p-6 mt-16 rounded-[var(--radius-md)] text-center font-title text-[var(--text-main)]">
      <p>Made with ❤ and Nature | © 2026 Blognetic</p>
    </footer>

    <!-- Stream Modal -->
    <StreamModal
      v-if="gameStore.gameState.isStreaming"
      :title="`${t().liveBroadcast} - FOREST TV`"
      @close="gameStore.stopStream"
    >
      <StreamingWindow
        :gameState="gameStore.gameState"
        :comments="gameStore.streamComments"
        :lang="uiStore.lang"
        @stopStream="gameStore.stopStream"
      />
    </StreamModal>

    <!-- Settings Panel -->
    <SettingsPanel
      v-if="showSettings"
      :lang="uiStore.lang"
      @close="showSettings = false"
    />
  </div>
</template>
