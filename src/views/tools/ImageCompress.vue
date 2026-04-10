<template>
  <section class="page-shell">
    <section class="hero-panel">
      <span class="eyebrow">IMG</span>
      <h1 class="page-title">图片压缩</h1>
      <p class="hero-text">
        支持拖拽或批量选择图片，在浏览器内完成压缩和格式转换，并直接预览压缩前后的体积差异。
      </p>
    </section>

    <section class="tool-panel">
      <div
        class="dropzone"
        :class="{ 'is-dragging': isDragging }"
        @dragenter.prevent="isDragging = true"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <strong>拖拽图片到这里，或点击选择文件</strong>
        <p class="muted">支持多张图片批量处理。GIF 动图会按静态图第一帧处理。</p>
        <label class="button">
          选择图片
          <input type="file" accept="image/*" multiple @change="handleInputChange" />
        </label>
      </div>

      <div class="field-grid">
        <div class="field field--third">
          <label for="format-select">输出格式</label>
          <select id="format-select" v-model="settings.format">
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
            <option value="png">PNG</option>
            <option value="original">尽量保持原格式</option>
          </select>
        </div>

        <div class="field field--third">
          <label for="quality-range">压缩质量 {{ settings.quality }}%</label>
          <input id="quality-range" v-model.number="settings.quality" type="range" min="40" max="100" />
        </div>

        <div class="field field--third">
          <label for="max-width">最大宽度（px）</label>
          <input id="max-width" v-model.number="settings.maxWidth" type="number" min="320" max="4096" />
        </div>
      </div>

      <div class="button-row">
        <button type="button" class="button" @click="processFiles" :disabled="processing || !sourceFiles.length">
          {{ processing ? '处理中...' : '开始压缩' }}
        </button>
        <button type="button" class="button button--ghost" @click="clearAll" :disabled="processing">
          清空
        </button>
      </div>

      <div v-if="processing" class="progress-bar">
        <span :style="{ width: `${progressPercent}%` }" />
      </div>

      <div v-if="error" class="message message--error">
        {{ error }}
      </div>
      <div v-else-if="results.length" class="message message--success">
        已处理 {{ results.length }} 张图片，原始总大小 {{ summary.original }}，输出总大小 {{ summary.output }}，
        节省 {{ summary.saved }}。
      </div>

      <div v-if="results.length" class="result-grid">
        <article v-for="item in results" :key="item.id" class="result-card">
          <div class="preview-frame">
            <img :src="item.outputUrl" :alt="item.outputName" />
          </div>

          <div class="tool-card-top">
            <span class="tag">{{ item.outputExt.toUpperCase() }}</span>
            <span class="metric-chip">{{ item.width }} × {{ item.height }}</span>
          </div>

          <h2>{{ item.outputName }}</h2>

          <div class="code-line">
            <code>原始: {{ formatBytes(item.originalSize) }}</code>
          </div>
          <div class="code-line">
            <code>输出: {{ formatBytes(item.outputSize) }}</code>
          </div>
          <div class="code-line">
            <code>变化: {{ item.deltaLabel }}</code>
          </div>

          <a class="button" :href="item.outputUrl" :download="item.outputName">
            下载
          </a>
        </article>
      </div>

      <div v-else-if="!processing" class="empty-state">
        选择图片后会在这里展示压缩结果。
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

import { clamp, formatBytes } from '@/utils/format'

const sourceFiles = ref([])
const results = ref([])
const processing = ref(false)
const error = ref('')
const isDragging = ref(false)
const progress = ref({
  current: 0,
  total: 0
})

const settings = ref({
  format: 'jpeg',
  quality: 82,
  maxWidth: 1920
})

const summary = computed(() => {
  const originalBytes = results.value.reduce((sum, item) => sum + item.originalSize, 0)
  const outputBytes = results.value.reduce((sum, item) => sum + item.outputSize, 0)
  const saved = Math.max(originalBytes - outputBytes, 0)

  return {
    original: formatBytes(originalBytes),
    output: formatBytes(outputBytes),
    saved: formatBytes(saved)
  }
})

const progressPercent = computed(() => {
  if (!progress.value.total) {
    return 0
  }

  return (progress.value.current / progress.value.total) * 100
})

function revokeResults() {
  for (const item of results.value) {
    URL.revokeObjectURL(item.originalUrl)
    URL.revokeObjectURL(item.outputUrl)
  }
}

onBeforeUnmount(() => {
  revokeResults()
})

function handleInputChange(event) {
  const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/'))
  event.target.value = ''
  loadFiles(files)
}

function handleDrop(event) {
  isDragging.value = false
  const files = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
    file.type.startsWith('image/')
  )

  loadFiles(files)
}

function loadFiles(files) {
  if (!files.length) {
    error.value = '没有检测到可处理的图片文件。'
    return
  }

  sourceFiles.value = files
  error.value = ''
  processFiles()
}

function clearAll() {
  sourceFiles.value = []
  error.value = ''
  progress.value = { current: 0, total: 0 }
  revokeResults()
  results.value = []
}

function resolveMimeType(file) {
  if (settings.value.format === 'original') {
    if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpeg') {
      return file.type
    }

    return 'image/jpeg'
  }

  if (settings.value.format === 'png') {
    return 'image/png'
  }

  if (settings.value.format === 'webp') {
    return 'image/webp'
  }

  return 'image/jpeg'
}

function fileExtensionByType(type) {
  if (type === 'image/png') {
    return 'png'
  }

  if (type === 'image/webp') {
    return 'webp'
  }

  return 'jpg'
}

function createOutputName(fileName, type) {
  const dotIndex = fileName.lastIndexOf('.')
  const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName

  return `${baseName}-optimized.${fileExtensionByType(type)}`
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('图片读取失败。'))
    image.src = url
  })
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('图片编码失败。'))
        return
      }

      resolve(blob)
    }, mimeType, quality)
  })
}

async function compressOne(file) {
  const originalUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(originalUrl)
    const scale = Math.min(1, settings.value.maxWidth / image.width)
    const targetWidth = Math.max(1, Math.round(image.width * scale))
    const targetHeight = Math.max(1, Math.round(image.height * scale))
    const mimeType = resolveMimeType(file)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = targetWidth
    canvas.height = targetHeight

    if (!context) {
      throw new Error('Canvas 上下文创建失败。')
    }

    if (mimeType === 'image/jpeg') {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, targetWidth, targetHeight)
    }

    context.drawImage(image, 0, 0, targetWidth, targetHeight)

    const blob = await canvasToBlob(canvas, mimeType, clamp(settings.value.quality / 100, 0.4, 1))
    const outputUrl = URL.createObjectURL(blob)
    const outputExt = fileExtensionByType(mimeType)
    const delta = blob.size - file.size
    const deltaLabel = delta <= 0 ? `减少 ${formatBytes(Math.abs(delta))}` : `增加 ${formatBytes(delta)}`

    return {
      id: `${file.name}-${file.lastModified}`,
      originalUrl,
      outputUrl,
      outputName: createOutputName(file.name, mimeType),
      outputExt,
      originalSize: file.size,
      outputSize: blob.size,
      width: targetWidth,
      height: targetHeight,
      deltaLabel
    }
  } catch (err) {
    URL.revokeObjectURL(originalUrl)
    throw err
  }
}

async function processFiles() {
  if (!sourceFiles.value.length) {
    error.value = '请先选择要处理的图片。'
    return
  }

  processing.value = true
  error.value = ''
  progress.value = {
    current: 0,
    total: sourceFiles.value.length
  }

  revokeResults()
  results.value = []

  try {
    const nextResults = []

    for (const [index, file] of sourceFiles.value.entries()) {
      const compressed = await compressOne(file)
      nextResults.push(compressed)
      progress.value.current = index + 1
    }

    results.value = nextResults
  } catch (err) {
    error.value = err.message
  } finally {
    processing.value = false
  }
}
</script>
