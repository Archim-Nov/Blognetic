<script setup lang="ts">
const props = defineProps<{
  title: string
  content: string
  image?: string
  tags: string[]
  author: string
  timestamp: string
  rank?: 'C' | 'B' | 'A' | 'S'
}>()

const emit = defineEmits<{
  click: []
}>()

const getRankStyles = (r?: string) => {
  switch (r) {
    case 'S': return 'bg-gradient-to-br from-yellow-300 to-orange-500 text-white border-yellow-600'
    case 'A': return 'bg-red-500 text-white border-red-700'
    case 'B': return 'bg-blue-400 text-white border-blue-600'
    case 'C': return 'bg-gray-400 text-white border-gray-600'
    default: return 'bg-gray-400 text-white border-gray-600'
  }
}
</script>

<template>
  <article
    @click="emit('click')"
    class="wobbly-box bg-card-context p-5 rounded-[var(--radius-md)] flex flex-col hover:-translate-y-2 transition-all h-full group cursor-pointer"
  >
    <div class="relative h-52 mb-5 wobbly-box z-10 rounded-[12px]">
      <div class="w-full h-full overflow-hidden rounded-[inherit]">
        <span
          v-if="tags.length > 0"
          class="absolute top-2 right-2 bg-[var(--accent-color)] text-white text-[10px] px-3 py-1 rounded-full font-title font-bold z-20 wobbly-box shadow-sm"
        >
          {{ tags[0] }}
        </span>

        <div
          v-if="rank"
          :class="['absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full font-title font-bold text-xl border-2 shadow-lg z-20 wobbly-box', getRankStyles(rank)]"
        >
          {{ rank }}
        </div>

        <img
          :src="image || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'"
          class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </div>

    <div class="flex flex-col flex-1">
      <h3 class="font-title text-xl text-[var(--text-title)] mb-3 leading-snug group-hover:text-[var(--accent-pop)] transition-colors">
        {{ title }}
      </h3>
      <p class="text-[var(--text-main)] text-sm mb-4 line-clamp-3 leading-relaxed opacity-80 font-body">
        {{ content }}
      </p>
      <div class="mt-auto pt-4 border-t-2 border-dashed border-[var(--border-color)]/20 flex justify-between text-xs font-bold text-[var(--text-main)] opacity-60">
        <span><i class="far fa-calendar-alt mr-2"></i>{{ timestamp }}</span>
        <span class="flex gap-2">
          <i class="far fa-heart hover:text-red-500 cursor-pointer"></i>
          <i class="far fa-share-square hover:text-blue-500 cursor-pointer"></i>
        </span>
      </div>
    </div>
  </article>
</template>
