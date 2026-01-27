<script setup lang="ts">
import { ref, watch } from 'vue'
import { GameState, StreamComment } from '../../types'
import { TRANSLATIONS } from '../../constants'

const props = defineProps<{
  gameState: GameState
  comments: StreamComment[]
  lang: 'en' | 'zh'
}>()

const emit = defineEmits<{
  stopStream: []
}>()

const chatRef = ref<HTMLDivElement | null>(null)

const t = () => TRANSLATIONS[props.lang]

watch(() => props.comments, () => {
  if (chatRef.value) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
}, { deep: true })
</script>

<template>
  <div class="flex h-full font-body bg-[var(--bg-color)] text-[var(--text-main)] overflow-hidden">
    <!-- Stream Area -->
    <div class="flex-1 relative flex flex-col border-r-4 border-[var(--border-color)]">
      <div class="flex-1 relative bg-[#0f1a0f] flex items-center justify-center overflow-hidden">
        <div
          class="absolute inset-0 opacity-20 pointer-events-none"
          style="background-image: radial-gradient(circle, #a3b18a 1px, transparent 1px); background-size: 20px 20px"
        ></div>

        <div class="text-center z-10 flex flex-col items-center gap-4">
          <div class="relative">
            <i class="fas fa-leaf text-6xl text-[var(--accent-color)] animate-spin duration-[4000ms]"></i>
            <i class="fas fa-signal absolute -top-4 -right-4 text-2xl text-orange-500 animate-pulse"></i>
          </div>
          <div class="text-xl font-title tracking-[0.2em] text-[var(--accent-color)]/50 uppercase animate-pulse">
            {{ t().transmitting }}
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="bg-card-context p-5 flex items-center justify-between border-t-4 border-[var(--border-color)]">
        <div class="flex items-center gap-5">
          <div class="w-16 h-16 rounded-2xl bg-[var(--bg-color)] border-[3px] border-[var(--border-color)] flex items-center justify-center text-4xl wobbly-box">
            🦊
          </div>
          <div>
            <h2 class="text-2xl font-bold text-[var(--text-title)] font-title leading-tight">
              FOREST LIVE: {{ gameState.location }}
            </h2>
            <div class="flex gap-4 text-sm font-bold opacity-70">
              <span class="flex items-center gap-1.5">
                <i class="fas fa-users text-blue-500"></i>{{ gameState.followers }} {{ t().viewers }}
              </span>
              <span class="flex items-center gap-1.5">
                <i class="fas fa-gem text-orange-500"></i>${{ gameState.money }}
              </span>
            </div>
          </div>
        </div>
        <button
          @click="emit('stopStream')"
          class="nav-btn bg-orange-600 text-white px-8 py-3 rounded-full font-title text-xl shadow-[0_4px_0_#9a3412] active:translate-y-1 active:shadow-none transition-all wobbly-box"
        >
          {{ t().endStream }}
        </button>
      </div>
    </div>

    <!-- Chat Panel -->
    <div class="w-96 flex flex-col bg-[var(--container-bg)]/30 backdrop-blur-sm">
      <div class="p-5 border-b-4 border-[var(--border-color)] font-title text-center text-[var(--text-title)] text-xl bg-card-context shadow-sm">
        <i class="fas fa-comments mr-2 text-[var(--accent-color)]"></i>
        {{ t().streamChat }}
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-4" ref="chatRef">
        <div
          v-for="c in comments"
          :key="c.id"
          :class="[
            'p-4 rounded-[15px] border-2 border-[var(--border-color)]/20 shadow-sm wobbly-box bg-card-context/80',
            c.isDonation ? 'bg-orange-50/10 border-orange-200' : ''
          ]"
        >
          <div class="flex items-center gap-2 mb-1">
            <span class="font-bold text-[var(--text-title)] font-title">{{ c.user }}</span>
            <span
              v-if="c.isDonation"
              class="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase"
            >
              {{ t().donated }}
            </span>
          </div>
          <p class="text-[var(--text-main)] text-sm leading-relaxed">{{ c.content }}</p>
          <div
            v-if="c.isDonation"
            class="mt-2 text-orange-600 font-bold text-lg font-title flex items-center gap-1 animate-bounce"
          >
            <i class="fas fa-gift"></i> ${{ c.amount }}
          </div>
        </div>
      </div>

      <div class="p-5 border-t-4 border-[var(--border-color)] bg-card-context">
        <div class="relative wobbly-box rounded-full border-[3px] border-[var(--border-color)] overflow-hidden">
          <input
            type="text"
            :placeholder="t().saySomething"
            class="w-full bg-[var(--bg-color)] px-6 py-3 text-[var(--text-main)] outline-none text-lg font-body pr-12 placeholder:text-[var(--text-main)]/50"
          />
          <button class="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-color)] hover:text-[var(--accent-pop)] transition-colors">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
