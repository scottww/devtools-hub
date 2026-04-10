<template>
  <section class="page-shell">
    <section class="hero-panel">
      <span class="eyebrow">DEV</span>
      <h1 class="page-title">JSON 格式化</h1>
      <p class="hero-text">
        支持格式化、压缩、校验和按键名排序，适合快速处理接口响应、配置文件和测试数据。
      </p>
    </section>

    <section class="tool-panel">
      <div class="field-grid">
        <div class="field field--third">
          <label for="indent-size">缩进空格</label>
          <select id="indent-size" v-model.number="indentSize">
            <option :value="2">2 spaces</option>
            <option :value="4">4 spaces</option>
          </select>
        </div>

        <div class="field field--third">
          <label>排序规则</label>
          <div class="toggle-row">
            <label class="toggle">
              <input v-model="sortKeys" type="checkbox" />
              <span>按键名排序输出对象</span>
            </label>
          </div>
        </div>

        <div class="field field--third">
          <label>输入统计</label>
          <div class="metric-row">
            <span class="metric-chip">{{ inputStats.lines }} 行</span>
            <span class="metric-chip">{{ inputStats.characters }} 字符</span>
          </div>
        </div>
      </div>

      <div class="button-row">
        <button type="button" class="button" @click="formatJson">格式化</button>
        <button type="button" class="button button--warm" @click="minifyJson">压缩</button>
        <button type="button" class="button button--ghost" @click="validateJson">仅校验</button>
        <button type="button" class="button button--ghost" @click="fillExample">填充示例</button>
        <button type="button" class="button button--ghost" @click="copyOutput" :disabled="!output">
          复制结果
        </button>
        <button type="button" class="button button--ghost" @click="clearAll">清空</button>
      </div>

      <div v-if="error" class="message message--error">
        {{ error }}
      </div>
      <div v-else-if="feedback" class="message message--success">
        {{ feedback }}
      </div>

      <div class="field-grid">
        <div class="field field--half">
          <label for="json-input">输入内容</label>
          <textarea
            id="json-input"
            v-model="input"
            placeholder="在这里粘贴 JSON 文本"
          />
        </div>

        <div class="field field--half">
          <label for="json-output">输出结果</label>
          <textarea
            id="json-output"
            :value="output"
            readonly
            placeholder="格式化或压缩后的 JSON 会显示在这里"
          />
        </div>
      </div>

      <div class="metric-row">
        <span class="metric-chip">输出 {{ outputStats.lines }} 行</span>
        <span class="metric-chip">输出 {{ outputStats.characters }} 字符</span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const exampleText = `{
  "name": "DevTools Hub",
  "modules": [
    "pdf-to-image",
    "image-compress",
    "coord-transform",
    "json-format"
  ],
  "meta": {
    "pureFrontend": true,
    "deployTarget": "GitHub Pages"
  }
}`

const input = ref(exampleText)
const output = ref('')
const error = ref('')
const feedback = ref('')
const indentSize = ref(2)
const sortKeys = ref(false)

const inputStats = computed(() => summarizeText(input.value))
const outputStats = computed(() => summarizeText(output.value))

function summarizeText(text) {
  const safeText = text ?? ''

  return {
    lines: safeText ? safeText.split(/\r?\n/).length : 0,
    characters: safeText.length
  }
}

function deepSort(value) {
  if (Array.isArray(value)) {
    return value.map((item) => deepSort(item))
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)

    if (sortKeys.value) {
      entries.sort(([left], [right]) => left.localeCompare(right))
    }

    return Object.fromEntries(entries.map(([key, nested]) => [key, deepSort(nested)]))
  }

  return value
}

function parseInput() {
  if (!input.value.trim()) {
    throw new Error('请输入要处理的 JSON 内容。')
  }

  return JSON.parse(input.value)
}

function applySuccess(message) {
  error.value = ''
  feedback.value = message
}

function applyFailure(message) {
  output.value = ''
  feedback.value = ''
  error.value = message
}

function formatJson() {
  try {
    const parsed = deepSort(parseInput())
    output.value = JSON.stringify(parsed, null, indentSize.value)
    applySuccess('JSON 已格式化。')
  } catch (err) {
    applyFailure(err.message)
  }
}

function minifyJson() {
  try {
    const parsed = deepSort(parseInput())
    output.value = JSON.stringify(parsed)
    applySuccess('JSON 已压缩为单行。')
  } catch (err) {
    applyFailure(err.message)
  }
}

function validateJson() {
  try {
    parseInput()
    applySuccess('JSON 校验通过。')
  } catch (err) {
    applyFailure(err.message)
  }
}

function fillExample() {
  input.value = exampleText
  output.value = ''
  error.value = ''
  feedback.value = '已填充示例数据。'
}

async function copyOutput() {
  if (!output.value) {
    return
  }

  try {
    await navigator.clipboard.writeText(output.value)
    applySuccess('结果已复制到剪贴板。')
  } catch (err) {
    applyFailure(`复制失败：${err.message}`)
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  feedback.value = ''
}

formatJson()
</script>
