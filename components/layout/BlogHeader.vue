<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TRANSLATIONS } from '../../constants'
import { type ThemeType } from '../../stores'

const props = defineProps<{
  activeTab: string
  lang: 'en' | 'zh'
  theme: ThemeType
  enableWobble: boolean
}>()

const emit = defineEmits<{
  tabChange: [tab: string]
  langChange: [lang: 'en' | 'zh']
  themeChange: [theme: ThemeType]
  wobbleChange: [enabled: boolean]
  openSettings: []
}>()

const langOpen = ref(false)
const themeOpen = ref(false)

const themes: { id: ThemeType; icon: string; labelEn: string; labelZh: string }[] = [
  { id: 'light', icon: 'fa-sun', labelEn: 'Meadow', labelZh: '林间' },
  { id: 'dark', icon: 'fa-moon', labelEn: 'Midnight', labelZh: '深夜' },
  { id: 'deep-green', icon: 'fa-leaf', labelEn: 'Deep Forest', labelZh: '深林' },
  { id: 'pink', icon: 'fa-heart', labelEn: 'Sakura', labelZh: '樱粉' },
  { id: 'blue', icon: 'fa-water', labelEn: 'Ocean', labelZh: '海蓝' },
  { id: 'mono', icon: 'fa-ghost', labelEn: 'Ink', labelZh: '水墨' }
]

const currentTheme = () => themes.find(th => th.id === props.theme) || themes[0]

const handleClickOutside = () => {
  langOpen.value = false
  themeOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

const t = () => TRANSLATIONS[props.lang]
</script>

<template>
  <header class="flex flex-col md:flex-row justify-between items-center mb-10 p-4 rounded-[var(--radius-md)] wobbly-box bg-card-context gap-6 relative z-[60]">
    <div class="font-title text-3xl flex items-center gap-2 text-[var(--text-title)]">
      <i class="fas fa-tree text-[var(--accent-pop)]"></i>
      {{ t().gameTitle }}
    </div>

    <nav class="flex flex-wrap justify-center gap-2">
      <button
        v-for="tab in [t().home, t().travel, t().growth, t().wardrobe]"
        :key="tab"
        @click="emit('tabChange', tab)"
        :class="[
          'nav-btn px-6 py-2 rounded-full font-bold text-lg',
          activeTab === tab
            ? 'active text-[var(--text-title)]'
            : 'text-[var(--text-main)] hover:text-[var(--text-title)]'
        ]"
      >
        {{ tab }}
      </button>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Settings Button -->
      <div class="relative" @click.stop>
        <button
          @click="emit('openSettings')"
          class="w-10 h-10 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-color)] flex items-center justify-center transition-all cursor-pointer wobbly-box shadow-sm hover:bg-[var(--accent-color)]/20 text-[var(--text-title)]"
          :title="lang === 'zh' ? 'AI 设置' : 'AI Settings'"
        >
          <i class="fas fa-cog"></i>
        </button>
      </div>

      <!-- Wobble Toggle -->
      <div class="relative" @click.stop>
        <button
          @click="emit('wobbleChange', !enableWobble)"
          :class="[
            'w-10 h-10 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center transition-all cursor-pointer wobbly-box shadow-sm',
            enableWobble
              ? 'bg-[var(--bg-color)] text-[var(--text-title)] hover:bg-[var(--accent-color)]/20'
              : 'bg-[var(--accent-color)] text-white hover:bg-[var(--accent-pop)]'
          ]"
          :title="enableWobble ? (lang === 'zh' ? '停止抖动' : 'Stop Wobble') : (lang === 'zh' ? '开启抖动' : 'Start Wobble')"
        >
          <i :class="['fas', enableWobble ? 'fa-pause' : 'fa-play']"></i>
        </button>
      </div>

      <!-- Language Dropdown -->
      <div class="relative" @click.stop>
        <button
          @click="langOpen = !langOpen; themeOpen = false"
          class="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-title)] font-bold wobbly-box hover:bg-[var(--accent-color)]/20 transition-all cursor-pointer"
        >
          <i class="fas fa-globe-asia text-[var(--accent-color)]"></i>
          <span class="uppercase">{{ lang }}</span>
          <i :class="['fas fa-chevron-down text-[10px] transition-transform', langOpen ? 'rotate-180' : '']"></i>
        </button>

        <div
          v-if="langOpen"
          class="absolute top-full right-0 mt-3 w-32 bg-card-context rounded-[var(--radius-md)] border-2 border-[var(--border-color)] overflow-hidden z-[100] wobbly-box shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <button
            @click="emit('langChange', 'en'); langOpen = false"
            :class="['w-full text-left px-4 py-2 hover:bg-[var(--accent-color)]/10 font-bold transition-colors cursor-pointer', lang === 'en' ? 'text-[var(--accent-pop)]' : 'text-[var(--text-main)]']"
          >
            English
          </button>
          <button
            @click="emit('langChange', 'zh'); langOpen = false"
            :class="['w-full text-left px-4 py-2 hover:bg-[var(--accent-color)]/10 font-bold transition-colors border-t border-[var(--border-color)]/10 cursor-pointer', lang === 'zh' ? 'text-[var(--accent-pop)]' : 'text-[var(--text-main)]']"
          >
            中文
          </button>
        </div>
      </div>

      <!-- Theme Dropdown -->
      <div class="relative" @click.stop>
        <button
          @click="themeOpen = !themeOpen; langOpen = false"
          class="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-title)] font-bold wobbly-box hover:bg-[var(--accent-color)]/20 transition-all cursor-pointer"
        >
          <i :class="['fas', currentTheme().icon, 'text-[var(--accent-pop)]']"></i>
          <span class="hidden sm:inline">{{ lang === 'zh' ? currentTheme().labelZh : currentTheme().labelEn }}</span>
          <i :class="['fas fa-chevron-down text-[10px] transition-transform', themeOpen ? 'rotate-180' : '']"></i>
        </button>

        <div
          v-if="themeOpen"
          class="absolute top-full right-0 mt-3 w-48 bg-card-context rounded-[var(--radius-md)] border-2 border-[var(--border-color)] overflow-hidden z-[100] wobbly-box shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <button
            v-for="th in themes"
            :key="th.id"
            @click="emit('themeChange', th.id); themeOpen = false"
            :class="[
              'w-full text-left px-4 py-3 hover:bg-[var(--accent-color)]/10 font-bold flex items-center gap-3 transition-colors border-b border-[var(--border-color)]/5 last:border-b-0 cursor-pointer',
              theme === th.id ? 'bg-[var(--accent-color)]/5 text-[var(--accent-pop)]' : 'text-[var(--text-main)]'
            ]"
          >
            <i :class="['fas', th.icon, 'w-5 text-center opacity-70']"></i>
            <span>{{ lang === 'zh' ? th.labelZh : th.labelEn }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
