<script setup lang="ts">
import { TRANSLATIONS, CAREER_CATEGORIES, LEVEL_SYSTEM } from '../../constants'
import { useGameStore, useUIStore } from '../../stores'
import type { CharacterAttributes } from '../../types'

const props = defineProps<{
  lang: 'en' | 'zh'
}>()

const gameStore = useGameStore()
const uiStore = useUIStore()
const t = () => TRANSLATIONS[props.lang]

const attributeKeys: (keyof CharacterAttributes)[] = [
  'strength', 'intelligence', 'willpower', 'agility',
  'speed', 'endurance', 'personality', 'luck'
]

const getAttributeIcon = (attr: keyof CharacterAttributes): string => {
  const icons: Record<keyof CharacterAttributes, string> = {
    strength: 'fa-dumbbell',
    intelligence: 'fa-brain',
    willpower: 'fa-fire',
    agility: 'fa-feather',
    speed: 'fa-bolt',
    endurance: 'fa-heart',
    personality: 'fa-star',
    luck: 'fa-clover'
  }
  return icons[attr]
}

const getCurrentCareerName = () => {
  for (const cat of CAREER_CATEGORIES) {
    const career = cat.careers.find(c => c.id === uiStore.selectedCareerId)
    if (career) return career.name[props.lang]
  }
  return ''
}

const selectCareer = (careerId: string) => {
  uiStore.setSelectedCareer(careerId)
  gameStore.setAttributesByCareer(careerId)
}
</script>

<template>
  <div class="wobbly-box bg-card-context p-8 rounded-[var(--radius-lg)]">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-title text-3xl text-[var(--text-title)] flex items-center gap-3">
        <i class="fas fa-chart-line text-[var(--accent-pop)]"></i>
        {{ t().characterAttributes }}
      </h2>
      <div class="flex items-center gap-4">
        <div class="wobbly-box bg-[var(--bg-color)] px-4 py-2 rounded-full">
          <span class="font-title text-lg text-[var(--text-title)]">
            {{ t().level }}: {{ gameStore.characterLevel }}
          </span>
        </div>
        <div class="wobbly-box bg-[var(--accent-color)]/20 px-4 py-2 rounded-full">
          <span class="font-title text-lg text-[var(--accent-pop)]">
            <i class="fas fa-briefcase mr-2"></i>{{ getCurrentCareerName() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Attributes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="attr in attributeKeys"
        :key="attr"
        class="wobbly-box bg-[var(--bg-color)] p-5 rounded-[var(--radius-md)]"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white">
              <i :class="['fas', getAttributeIcon(attr)]"></i>
            </div>
            <span class="font-title text-xl text-[var(--text-title)]">
              {{ t()[attr] }}
            </span>
          </div>
          <span class="font-title text-2xl text-[var(--accent-pop)]">
            {{ gameStore.characterAttributes[attr] }}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-3 bg-[var(--container-bg)] rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-pop)] rounded-full transition-all duration-300"
            :style="{ width: `${(gameStore.characterAttributes[attr] / LEVEL_SYSTEM.MAX_ATTRIBUTE) * 100}%` }"
          ></div>
        </div>
        <div class="text-right text-xs text-[var(--text-main)] mt-1 opacity-60">
          {{ gameStore.characterAttributes[attr] }} / {{ LEVEL_SYSTEM.MAX_ATTRIBUTE }}
        </div>
      </div>
    </div>

    <!-- Career Selection -->
    <div class="mt-10">
      <h3 class="font-title text-2xl text-[var(--text-title)] flex items-center gap-3 mb-6">
        <i class="fas fa-briefcase text-[var(--accent-pop)]"></i>
        {{ lang === 'zh' ? '职业选择' : 'Career Selection' }}
      </h3>

      <div class="space-y-4">
        <div
          v-for="category in CAREER_CATEGORIES"
          :key="category.id"
          class="wobbly-box bg-[var(--bg-color)] p-4 rounded-[var(--radius-md)]"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-2 mb-3">
            <i :class="['fas', category.icon, 'text-[var(--accent-color)]']"></i>
            <span class="font-title text-lg text-[var(--text-title)]">
              {{ category.name[lang] }}
            </span>
          </div>

          <!-- Career Buttons -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="career in category.careers.filter(c => !c.hidden)"
              :key="career.id"
              @click="selectCareer(career.id)"
              :class="[
                'px-4 py-2 rounded-full font-bold transition-all cursor-pointer wobbly-box text-sm',
                uiStore.selectedCareerId === career.id
                  ? 'bg-[var(--accent-pop)] text-white'
                  : 'bg-[var(--card-bg)] border-2 border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent-color)]'
              ]"
            >
              {{ career.name[lang] }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
