<template>
  <section class="page-shell">
    <section class="hero-panel">
      <span class="eyebrow">PDF</span>
      <h1 class="page-title">PDF 转图片</h1>
      <p class="hero-text">
        在浏览器中逐页渲染 PDF，并导出为 PNG 或 JPG。适合做文件预览、图像切页和演示素材提取。
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
        <strong>拖拽 PDF 到这里，或点击选择文件</strong>
        <p class="muted">所有页面渲染都在本地完成，不会上传到服务器。</p>
        <label class="button">
          选择 PDF
          <input type="file" accept="application/pdf" @change="handleInputChange" />
        </label>
      </div>

      <div class="field-grid">
        <div class="field field--third">
          <label for="scale-select">渲染倍率</label>
          <select id="scale-select" v-model.number="settings.scale">
            <option :value="1.5">1.5x</option>
            <option :value="2">2x</option>
            <option :value="2.5">2.5x</option>
            <option :value="3">3x</option>
          </select>
        </div>

        <div class="field field--third">
          <label for="image-type">输出格式</label>
          <select id="image-type" v-model="settings.format">
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
          </select>
        </div>

        <div class="field field--third">
          <label for="pdf-quality">JPG 质量 {{ settings.quality }}%</label>
          <input id="pdf-quality" v-model.number="settings.quality" type="range" min="50" max="100" />
        </div>
      </div>

      <div class="button-row">
        <button type="button" class="button" @click="renderPdf" :disabled="processing || !selectedFile">
          {{ processing ? '转换中...' : '开始转换' }}
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
      <div v-else-if="pages.length" class="message message--success">
        {{ selectedFile?.name }} 共 {{ pages.length }} 页，已全部转换完成。
      </div>

      <div v-if="pages.length" class="result-grid">
        <article v-for="page in pages" :key="page.pageNumber" class="result-card">
          <div class="preview-frame preview-frame--pdf">
            <img :src="page.url" :alt="`PDF Page ${page.pageNumber}`" />
          </div>

          <div class="tool-card-top">
            <span class="tag">Page {{ page.pageNumber }}</span>
            <span class="metric-chip">{{ page.width }} × {{ page.height }}</span>
          </div>

          <h2>{{ page.fileName }}</h2>
          <div class="code-line">
            <code>{{ formatBytes(page.size) }}</code>
          </div>
          <a class="button" :href="page.url" :download="page.fileName">
            下载这一页
          </a>
        </article>
      </div>

      <div v-else-if="!processing" class="empty-state">
        选择 PDF 后会在这里展示每一页的图片结果。
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import PdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?worker'

import { clamp, formatBytes } from '@/utils/format'

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker()

const selectedFile = ref(null)
const pages = ref([])
const processing = ref(false)
const error = ref('')
const isDragging = ref(false)
const progress = ref({
  current: 0,
  total: 0
})

const settings = ref({
  scale: 2,
  format: 'png',
  quality: 92
})

const progressPercent = computed(() => {
  if (!progress.value.total) {
    return 0
  }

  return (progress.value.current / progress.value.total) * 100
})

function revokePages() {
  for (const page of pages.value) {
    URL.revokeObjectURL(page.url)
  }
}

onBeforeUnmount(() => {
  revokePages()
})

function handleInputChange(event) {
  const [file] = Array.from(event.target.files ?? [])
  event.target.value = ''
  prepareFile(file)
}

function handleDrop(event) {
  isDragging.value = false
  const [file] = Array.from(event.dataTransfer?.files ?? [])
  prepareFile(file)
}

function prepareFile(file) {
  if (!file) {
    return
  }

  if (file.type !== 'application/pdf') {
    error.value = '请选择 PDF 文件。'
    return
  }

  selectedFile.value = file
  error.value = ''
  renderPdf()
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('图片导出失败。'))
        return
      }

      resolve(blob)
    }, mimeType, quality)
  })
}

function outputMimeType() {
  return settings.value.format === 'jpeg' ? 'image/jpeg' : 'image/png'
}

function outputExtension() {
  return settings.value.format === 'jpeg' ? 'jpg' : 'png'
}

async function renderPdf() {
  if (!selectedFile.value) {
    error.value = '请先选择 PDF 文件。'
    return
  }

  processing.value = true
  error.value = ''
  progress.value = {
    current: 0,
    total: 0
  }

  revokePages()
  pages.value = []

  try {
    const arrayBuffer = await selectedFile.value.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    const nextPages = []
    const mimeType = outputMimeType()

    progress.value.total = pdf.numPages

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const viewport = page.getViewport({ scale: settings.value.scale })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Canvas 上下文创建失败。')
      }

      canvas.width = viewport.width
      canvas.height = viewport.height

      if (mimeType === 'image/jpeg') {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }

      await page.render({
        canvasContext: context,
        viewport
      }).promise

      const blob = await canvasToBlob(canvas, mimeType, clamp(settings.value.quality / 100, 0.5, 1))
      const url = URL.createObjectURL(blob)
      const stem = selectedFile.value.name.replace(/\.pdf$/i, '')

      nextPages.push({
        pageNumber,
        width: Math.round(canvas.width),
        height: Math.round(canvas.height),
        size: blob.size,
        url,
        fileName: `${stem}-page-${String(pageNumber).padStart(2, '0')}.${outputExtension()}`
      })

      progress.value.current = pageNumber
    }

    pages.value = nextPages
    pdf.cleanup()
    loadingTask.destroy()
  } catch (err) {
    error.value = err.message
  } finally {
    processing.value = false
  }
}

function clearAll() {
  selectedFile.value = null
  error.value = ''
  progress.value = {
    current: 0,
    total: 0
  }
  revokePages()
  pages.value = []
}
</script>

<style scoped>
.preview-frame--pdf {
  aspect-ratio: 3 / 4;
  background: linear-gradient(180deg, rgba(20, 33, 61, 0.04), rgba(20, 33, 61, 0.1));
}
</style>
