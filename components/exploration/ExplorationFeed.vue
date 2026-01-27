<script setup lang="ts">
import { ref } from 'vue'
import { Tweet } from '../../types'
import { TRANSLATIONS } from '../../constants'
import BlogCard from '../layout/BlogCard.vue'
import StreamModal from '../layout/StreamModal.vue'

const props = defineProps<{
  tweets: Tweet[]
  lang: 'en' | 'zh'
}>()

const displayCount = ref(9)
const selectedTweet = ref<Tweet | null>(null)

const t = () => TRANSLATIONS[props.lang]

const getRankStyles = (r?: string) => {
  switch (r) {
    case 'S': return 'bg-gradient-to-br from-yellow-300 to-orange-500 text-white border-yellow-600'
    case 'A': return 'bg-red-500 text-white border-red-700'
    case 'B': return 'bg-blue-400 text-white border-blue-600'
    case 'C': return 'bg-gray-400 text-white border-gray-600'
    default: return 'bg-gray-400 text-white border-gray-600'
  }
}

const getTitle = (tweet: Tweet) => {
  return tweet.title || (tweet.type === 'user'
    ? (props.lang === 'zh' ? '林间日志' : 'Woodland Journal')
    : (props.lang === 'zh' ? `奇遇 #${tweet.id.slice(-4)}` : `Strange Encounter #${tweet.id.slice(-4)}`))
}
</script>

<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <BlogCard
        v-for="tweet in tweets.slice(0, displayCount)"
        :key="tweet.id"
        :title="getTitle(tweet)"
        :content="tweet.content"
        :image="tweet.image"
        :tags="[tweet.type === 'user' ? 'Journal' : 'Event', 'Fox']"
        :author="tweet.author"
        :timestamp="tweet.timestamp"
        :rank="tweet.rank"
        @click="selectedTweet = tweet"
      />
    </div>

    <div v-if="tweets.length > displayCount" class="flex justify-center mt-16 mb-8">
      <button
        @click="displayCount += 9"
        class="wobbly-box bg-[var(--accent-color)] hover:bg-[var(--accent-pop)] text-white px-12 py-3 rounded-full font-title text-lg font-bold flex items-center gap-3 shadow-sm hover:scale-105 active:translate-y-1 transition-all cursor-pointer"
      >
        <i class="fas fa-scroll text-xl"></i>
        {{ t().viewOlder }}
      </button>
    </div>

    <!-- Tweet Detail Modal -->
    <StreamModal
      v-if="selectedTweet"
      :title="selectedTweet.title || (lang === 'zh' ? '日志详情' : 'Log Details')"
      @close="selectedTweet = null"
    >
      <div class="flex-1 overflow-y-auto bg-[var(--bg-color)] p-6 md:p-10">
        <div class="max-w-4xl mx-auto flex flex-col gap-8 pb-10">
          <!-- Image Section -->
          <div class="flex justify-center w-full">
            <div class="relative w-fit max-w-full">
              <div class="rounded-[var(--radius-lg)] overflow-hidden relative z-0">
                <img
                  :src="selectedTweet.image || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'"
                  class="max-w-full max-h-[65vh] w-auto h-auto object-contain block"
                />
              </div>
              <div
                class="absolute inset-0 wobbly-box rounded-[var(--radius-lg)] pointer-events-none z-10 bg-transparent"
                style="--border-width: 6px"
              ></div>
              <div
                v-if="selectedTweet.rank"
                :class="['absolute top-4 left-4 w-16 h-16 flex items-center justify-center rounded-full font-title font-bold text-3xl border-4 shadow-lg z-20 wobbly-box', getRankStyles(selectedTweet.rank)]"
              >
                {{ selectedTweet.rank }}
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="wobbly-box bg-card-context p-8 md:p-10 rounded-[var(--radius-lg)] relative">
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b-2 border-[var(--border-color)]/20 pb-6">
              <div class="w-20 h-20 rounded-full bg-[var(--bg-color)] border-2 border-[var(--border-color)] flex items-center justify-center text-4xl shadow-sm wobbly-box">
                {{ selectedTweet.type === 'user' ? '📝' : '🦊' }}
              </div>
              <div>
                <h1 class="font-title text-3xl md:text-4xl text-[var(--text-title)] mb-2">{{ selectedTweet.title }}</h1>
                <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[var(--text-main)] opacity-70 font-bold text-sm md:text-base">
                  <span><i class="fas fa-user-circle mr-2"></i>{{ selectedTweet.author }}</span>
                  <span class="hidden md:inline">•</span>
                  <span><i class="far fa-clock mr-2"></i>{{ selectedTweet.timestamp }}</span>
                  <span class="hidden md:inline">•</span>
                  <span>{{ selectedTweet.handle }}</span>
                </div>
              </div>
            </div>

            <div class="font-body text-xl leading-relaxed text-[var(--text-main)] whitespace-pre-wrap">
              {{ selectedTweet.content }}
            </div>

            <div class="mt-10 pt-6 border-t-2 border-[var(--border-color)]/10 flex gap-8">
              <div class="flex items-center gap-2 font-bold text-[var(--text-main)] hover:text-red-500 transition-colors cursor-pointer group">
                <div class="w-10 h-10 rounded-full bg-[var(--bg-color)] flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <i class="fas fa-heart"></i>
                </div>
                <span>{{ selectedTweet.likes }} Likes</span>
              </div>
              <div class="flex items-center gap-2 font-bold text-[var(--text-main)] hover:text-blue-500 transition-colors cursor-pointer group">
                <div class="w-10 h-10 rounded-full bg-[var(--bg-color)] flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <i class="fas fa-retweet"></i>
                </div>
                <span>{{ selectedTweet.retweets }} Reposts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StreamModal>
  </div>
</template>
