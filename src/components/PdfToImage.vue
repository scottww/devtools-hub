<template>
  <div class="pdf-to-image">
    <h2>PDF 转图片</h2>
    <input type="file" @change="handleFile" accept="application/pdf" />
    <div v-if="images.length" class="images">
      <div v-for="(img, index) in images" :key="index" class="image-item">
        <p>第 {{ index + 1 }} 页</p>
        <img :src="img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
// 这里直接用 Vite 特性 ?worker 创建 Worker URL
import PdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?worker'

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker()  // v5 用 workerPort 替代 workerSrc

const images = ref([])

const handleFile = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  images.value = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: 2 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvasContext: context, viewport }).promise
    images.value.push(canvas.toDataURL('image/png'))
  }
}
</script>

<style scoped>
.pdf-to-image {
  padding: 16px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.image-item {
  width: 200px;
  text-align: center;
}

.image-item img {
  max-width: 100%;
  border: 1px solid #ccc;
}
</style>