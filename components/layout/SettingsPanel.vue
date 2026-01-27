<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadAIConfig, saveAIConfig, testAIConnection, type AIConfig } from '../../services/aiService'

const props = defineProps<{
  lang: 'en' | 'zh'
}>()

const emit = defineEmits<{
  close: []
}>()

const config = ref<AIConfig>({
  enabled: false,
  provider: 'openai',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo'
})

const isTesting = ref(false)
const testResult = ref<'success' | 'fail' | null>(null)

onMounted(() => {
  config.value = loadAIConfig()
})

const handleSave = () => {
  saveAIConfig(config.value)
  emit('close')
}

const handleTest = async () => {
  isTesting.value = true
  testResult.value = null
  const success = await testAIConnection(config.value)
  testResult.value = success ? 'success' : 'fail'
  isTesting.value = false
}

const t = (en: string, zh: string) => props.lang === 'zh' ? zh : en
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]" @click.self="emit('close')">
    <div class="wobbly-box bg-card-context p-6 rounded-[var(--radius-lg)] w-full max-w-md mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-title text-2xl text-[var(--text-title)] flex items-center gap-2">
          <i class="fas fa-cog text-[var(--accent-pop)]"></i>
          {{ t('AI Settings', 'AI 设置') }}
        </h2>
        <button @click="emit('close')" class="text-[var(--text-main)] hover:text-[var(--accent-pop)] cursor-pointer">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Enable Toggle -->
      <div class="flex items-center justify-between mb-4 p-3 bg-[var(--bg-color)] rounded-lg">
        <span class="font-bold text-[var(--text-title)]">{{ t('Enable AI Generation', '启用 AI 生成') }}</span>
        <button
          @click="config.enabled = !config.enabled"
          :class="[
            'w-12 h-6 rounded-full transition-all cursor-pointer relative',
            config.enabled ? 'bg-[var(--accent-pop)]' : 'bg-[var(--border-color)]'
          ]"
        >
          <div
            :class="[
              'absolute top-1 w-4 h-4 bg-white rounded-full transition-all',
              config.enabled ? 'left-7' : 'left-1'
            ]"
          ></div>
        </button>
      </div>

      <!-- Provider Selection -->
      <div class="mb-4">
        <label class="block font-bold text-[var(--text-title)] mb-2">{{ t('Provider', '服务商') }}</label>
        <div class="flex gap-2">
          <button
            @click="config.provider = 'openai'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-bold transition-all cursor-pointer',
              config.provider === 'openai'
                ? 'bg-[var(--accent-pop)] text-white'
                : 'bg-[var(--bg-color)] text-[var(--text-main)] hover:bg-[var(--accent-color)]/20'
            ]"
          >
            OpenAI
          </button>
          <button
            @click="config.provider = 'gemini'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-bold transition-all cursor-pointer',
              config.provider === 'gemini'
                ? 'bg-[var(--accent-pop)] text-white'
                : 'bg-[var(--bg-color)] text-[var(--text-main)] hover:bg-[var(--accent-color)]/20'
            ]"
          >
            Gemini
          </button>
        </div>
      </div>

      <!-- API Key -->
      <div class="mb-4">
        <label class="block font-bold text-[var(--text-title)] mb-2">API Key</label>
        <input
          v-model="config.apiKey"
          type="password"
          :placeholder="t('Enter your API key', '输入你的 API 密钥')"
          class="w-full p-3 rounded-lg bg-[var(--bg-color)] border-2 border-[var(--border-color)] text-[var(--text-main)] focus:border-[var(--accent-color)] outline-none"
        />
      </div>

      <!-- Base URL (OpenAI only) -->
      <div v-if="config.provider === 'openai'" class="mb-4">
        <label class="block font-bold text-[var(--text-title)] mb-2">
          {{ t('API Base URL', 'API 基础地址') }}
        </label>
        <input
          v-model="config.baseUrl"
          type="text"
          placeholder="https://api.openai.com/v1"
          class="w-full p-3 rounded-lg bg-[var(--bg-color)] border-2 border-[var(--border-color)] text-[var(--text-main)] focus:border-[var(--accent-color)] outline-none"
        />
        <p class="text-xs text-[var(--text-main)] mt-1 opacity-60">
          {{ t('Compatible with OpenAI-style APIs', '兼容 OpenAI 格式的接口') }}
        </p>
      </div>

      <!-- Model -->
      <div class="mb-6">
        <label class="block font-bold text-[var(--text-title)] mb-2">{{ t('Model', '模型') }}</label>
        <input
          v-model="config.model"
          type="text"
          :placeholder="config.provider === 'gemini' ? 'gemini-pro' : 'gpt-3.5-turbo'"
          class="w-full p-3 rounded-lg bg-[var(--bg-color)] border-2 border-[var(--border-color)] text-[var(--text-main)] focus:border-[var(--accent-color)] outline-none"
        />
      </div>

      <!-- Test Result -->
      <div v-if="testResult" :class="['mb-4 p-3 rounded-lg text-center font-bold', testResult === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400']">
        {{ testResult === 'success' ? t('Connection successful!', '连接成功！') : t('Connection failed', '连接失败') }}
      </div>

      <!-- Buttons -->
      <div class="flex gap-3">
        <button
          @click="handleTest"
          :disabled="isTesting || !config.apiKey"
          class="flex-1 py-3 px-4 rounded-lg font-bold bg-[var(--bg-color)] border-2 border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent-color)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i v-if="isTesting" class="fas fa-spinner fa-spin mr-2"></i>
          {{ t('Test', '测试') }}
        </button>
        <button
          @click="handleSave"
          class="flex-1 py-3 px-4 rounded-lg font-bold bg-[var(--accent-pop)] text-white hover:opacity-90 transition-all cursor-pointer"
        >
          {{ t('Save', '保存') }}
        </button>
      </div>
    </div>
  </div>
</template>
