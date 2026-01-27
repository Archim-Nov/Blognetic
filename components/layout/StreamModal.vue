<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg-color)]/70 backdrop-blur-md p-4">
      <div class="wobbly-box bg-card-context w-full max-w-5xl h-[88vh] rounded-[var(--radius-lg)] animate-in zoom-in duration-300 relative flex flex-col">
        <div class="flex-1 flex flex-col overflow-hidden rounded-[var(--radius-lg)] relative z-10">
          <div class="flex justify-between items-center p-5 border-b-2 border-[var(--border-color)] bg-[var(--accent-color)]/10 select-none">
            <div class="flex items-center gap-3 font-title text-2xl text-[var(--text-title)]">
              <span>{{ title }}</span>
            </div>
            <button
              @click="emit('close')"
              class="w-10 h-10 rounded-full bg-card-context hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-xl border-2 border-[var(--border-color)] wobbly-box text-[var(--text-main)] cursor-pointer"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-hidden relative flex flex-col bg-card-context/50">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
