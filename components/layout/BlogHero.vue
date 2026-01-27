<script setup lang="ts">
import { TRANSLATIONS, LOCATION_ASSETS, CHARACTER_DATA } from '../../constants'

const props = defineProps<{
  currentLocation: string
  locationIndex: number
  progress: number
  energy: number
  materials: number
  gameTime: string
  weather: string
  lang: 'en' | 'zh'
  thought?: string
  selectedCharacterId: string
  characterLevel: number
  characterExperience: number
  expForNextLevel: number
}>()

const t = () => TRANSLATIONS[props.lang]
const spriteUrl = () => {
  const char = CHARACTER_DATA.find(c => c.id === props.selectedCharacterId)
  return char ? char.asset : CHARACTER_DATA[0].asset
}
const bgUrl = () => LOCATION_ASSETS[props.locationIndex % LOCATION_ASSETS.length]
</script>

<template>
  <section class="mb-16 min-h-[500px] relative z-10">
    <div class="wobbly-box bg-card-context h-[560px] rounded-[var(--radius-lg)] z-10 flex flex-col relative overflow-hidden group">
      <!-- Animated Panning Background -->
      <div
        class="absolute inset-0 animate-panning bg-repeat-x"
        :style="{
          backgroundImage: `url(${bgUrl()})`,
          backgroundSize: 'auto 100%',
          opacity: 0.9
        }"
      />

      <!-- Character Container -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div class="relative animate-walking">
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/20 blur-xl rounded-full"></div>
          <img
            :src="spriteUrl()"
            alt="Hero"
            class="h-[320px] drop-shadow-2xl object-contain select-none pointer-events-none"
          />

          <!-- Thought Bubble -->
          <div
            v-if="thought"
            class="absolute -top-24 -right-16 md:-right-24 min-w-[120px] max-w-[180px] p-3 px-4 bg-white rounded-2xl wobbly-box animate-bounce z-30"
          >
            <p class="text-xs md:text-sm font-bold text-[var(--text-on-white)] text-center leading-tight">
              {{ thought }}
            </p>
            <div class="absolute -bottom-2 left-1/4 w-4 h-4 bg-white border-r-2 border-b-2 border-[var(--border-color)] rotate-45"></div>
          </div>
        </div>
      </div>

      <!-- Progress Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-8 pt-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col gap-4 z-30">
        <div class="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-white drop-shadow-md">
          <div class="flex-1 w-full text-center md:text-left">
            <div class="inline-block bg-[var(--accent-pop)] text-white px-4 py-1.5 rounded-full text-xs font-title mb-2 wobbly-box uppercase shadow-sm tracking-wider">
              {{ t().exploring }}
            </div>
            <h2 class="font-title text-3xl md:text-4xl leading-tight mb-2">{{ currentLocation }}</h2>
            <div class="flex gap-4 font-bold text-sm opacity-90 justify-center md:justify-start">
              <span><i class="far fa-clock mr-2"></i>{{ gameTime }}</span>
              <span><i class="fas fa-leaf mr-2"></i>{{ weather }}</span>
            </div>
          </div>

          <div class="flex items-center gap-6 md:gap-8 bg-white/10 backdrop-blur-md p-3 px-6 rounded-2xl wobbly-box">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <i class="fas fa-bolt-lightning text-yellow-400"></i>
                <span>{{ t().energy }}</span>
              </div>
              <div class="font-title text-3xl leading-none text-white">
                {{ energy }}<span class="text-xs ml-0.5">%</span>
              </div>
            </div>

            <div class="flex flex-col items-center border-l border-white/20 pl-6">
              <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <i class="fas fa-comment-dots text-blue-300"></i>
                <span>{{ t().items }}</span>
              </div>
              <div class="font-title text-3xl leading-none text-white">
                {{ materials }}
              </div>
            </div>

            <!-- Level & EXP -->
            <div class="flex flex-col items-center border-l border-white/20 pl-6">
              <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
                <i class="fas fa-star text-amber-400"></i>
                <span>Lv.{{ characterLevel }}</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="font-title text-lg leading-none text-white">
                  <span v-if="expForNextLevel > 0">{{ characterExperience }}/{{ expForNextLevel }}</span>
                  <span v-else class="text-amber-400">{{ t().maxLevel }}</span>
                </div>
                <div v-if="expForNextLevel > 0" class="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-300"
                    :style="{ width: `${(characterExperience / expForNextLevel) * 100}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-4 bg-white/20 border-2 border-white/40 rounded-full relative wobbly-box overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-pop)] rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
