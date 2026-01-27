<script setup lang="ts">
import { CHARACTER_DATA } from '../../constants'
import { useUIStore } from '../../stores'

const props = defineProps<{
  lang: 'en' | 'zh'
}>()

const uiStore = useUIStore()

const isSelected = (id: string) => uiStore.selectedCharacterId === id
</script>

<template>
  <div class="wobbly-box bg-card-context p-8 rounded-[var(--radius-lg)]">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-title text-3xl text-[var(--text-title)] flex items-center gap-3">
        <i class="fas fa-shirt text-[var(--accent-pop)]"></i>
        {{ lang === 'zh' ? '角色换装' : 'Character Wardrobe' }}
      </h2>
    </div>

    <!-- Character Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="char in CHARACTER_DATA"
        :key="char.id"
        @click="uiStore.setSelectedCharacter(char.id)"
        :class="[
          'wobbly-box p-6 rounded-[var(--radius-md)] cursor-pointer transition-all',
          isSelected(char.id)
            ? 'bg-[var(--accent-color)]/20 border-4 border-[var(--accent-pop)] shadow-lg'
            : 'bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-color)]'
        ]"
      >
        <!-- Character Image -->
        <div class="relative mb-4 flex justify-center">
          <div class="relative">
            <img
              :src="char.asset"
              :alt="char.name[lang]"
              style="width: 100%; height: auto; object-fit: contain;"
              class="drop-shadow-lg"
            />
            <!-- Selected Badge -->
            <div
              v-if="isSelected(char.id)"
              class="absolute -top-2 -right-2 w-8 h-8 bg-[var(--accent-pop)] rounded-full flex items-center justify-center text-white shadow-md"
            >
              <i class="fas fa-check"></i>
            </div>
          </div>
        </div>

        <!-- Character Info -->
        <div class="text-center">
          <h3 class="font-title text-xl text-[var(--text-title)] mb-2">
            {{ char.name[lang] }}
          </h3>
          <p class="text-sm text-[var(--text-main)]">
            {{ char.description[lang] }}
          </p>
        </div>

        <!-- Select Button -->
        <button
          :class="[
            'w-full mt-4 py-2 px-4 rounded-full font-bold transition-all wobbly-box',
            isSelected(char.id)
              ? 'bg-[var(--accent-pop)] text-white'
              : 'bg-[var(--card-bg)] border-2 border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--accent-color)]/10'
          ]"
        >
          {{ isSelected(char.id)
            ? (lang === 'zh' ? '当前形象' : 'Current')
            : (lang === 'zh' ? '选择' : 'Select')
          }}
        </button>
      </div>
    </div>
  </div>
</template>
