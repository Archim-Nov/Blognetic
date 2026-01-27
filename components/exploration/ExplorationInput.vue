<script setup lang="ts">
import { ref } from 'vue'
import { TRANSLATIONS } from '../../constants'

const props = defineProps<{
  lang: 'en' | 'zh'
}>()

const emit = defineEmits<{
  userPost: [text: string, image?: string]
}>()

const inputText = ref('')
const selectedImage = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const t = () => TRANSLATIONS[props.lang]

const handleImageSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      selectedImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handlePost = () => {
  if (!inputText.value.trim() && !selectedImage.value) return
  emit('userPost', inputText.value, selectedImage.value || undefined)
  inputText.value = ''
  selectedImage.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}
</script>

<template>
  <div class="wobbly-box bg-card-context p-8 mb-16 rounded-[var(--radius-lg)]">
    <div class="flex flex-col gap-6">
      <h3 class="font-title text-2xl text-[var(--text-title)] flex items-center gap-3">
        <i class="fas fa-pencil-alt text-[var(--accent-pop)]"></i>
        {{ t().shareJourney }}
      </h3>

      <textarea
        v-model="inputText"
        :placeholder="t().writeStory"
        class="w-full bg-[var(--bg-color)] border-[3px] border-[var(--border-color)] rounded-[var(--radius-md)] p-6 outline-none transition-all text-[var(--text-main)] min-h-[140px] resize-none text-lg font-body placeholder:text-[var(--text-main)]/50 wobbly-box"
      />

      <div v-if="selectedImage" class="relative inline-block w-40 h-40 rounded-[var(--radius-md)] overflow-hidden wobbly-box">
        <img :src="selectedImage" class="w-full h-full object-cover" />
        <button
          @click="selectedImage = null"
          class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer z-10 hover:scale-110 transition-transform"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <label class="cursor-pointer group flex items-center gap-3 text-[var(--text-main)] transition-colors">
          <div class="w-12 h-12 bg-[var(--card-bg)] rounded-full flex items-center justify-center group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all wobbly-box shadow-sm">
            <i class="far fa-images text-xl"></i>
          </div>
          <span class="font-title text-lg font-bold">{{ t().addPhoto }}</span>
          <input
            type="file"
            ref="fileInputRef"
            class="hidden"
            accept="image/*"
            @change="handleImageSelect"
          />
        </label>

        <button
          @click="handlePost"
          class="wobbly-box bg-[var(--accent-color)] hover:bg-[var(--accent-pop)] text-white px-8 py-3 rounded-full font-title text-xl font-bold flex items-center gap-3 shadow-sm hover:scale-105 active:translate-y-1 transition-all cursor-pointer"
        >
          <i class="fas fa-paper-plane text-xl"></i>
          {{ t().publishPost }}
        </button>
      </div>
    </div>
  </div>
</template>
