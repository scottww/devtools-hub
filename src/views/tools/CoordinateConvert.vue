<template>
  <section class="page-shell">
    <section class="hero-panel">
      <span class="eyebrow">GIS</span>
      <h1 class="page-title">坐标转换</h1>
      <p class="hero-text">
        输入任意一种坐标系下的经纬度，自动换算出 WGS84、GCJ02 和 BD09 三组结果，
        适合地图调试、数据核对和前端开发时的快速验证。
      </p>
    </section>

    <section class="tool-panel">
      <div class="field-grid">
        <div class="field field--third">
          <label for="source-system">输入坐标系</label>
          <select id="source-system" v-model="form.source">
            <option v-for="item in COORDINATE_SYSTEMS" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>

        <div class="field field--third">
          <label for="lng-input">经度</label>
          <input id="lng-input" v-model.trim="form.lng" type="text" placeholder="120.155070" />
        </div>

        <div class="field field--third">
          <label for="lat-input">纬度</label>
          <input id="lat-input" v-model.trim="form.lat" type="text" placeholder="30.274085" />
        </div>
      </div>

      <div class="button-row">
        <button type="button" class="button" @click="runConvert">开始转换</button>
        <button type="button" class="button button--ghost" @click="loadPreset(presets[0])">
          杭州示例
        </button>
        <button type="button" class="button button--ghost" @click="loadPreset(presets[1])">
          上海示例
        </button>
        <button type="button" class="button button--ghost" @click="clearForm">清空</button>
      </div>

      <div v-if="error" class="message message--error">
        {{ error }}
      </div>
      <div v-else-if="note" class="message message--neutral">
        {{ note }}
      </div>

      <div class="result-grid">
        <article
          v-for="item in resultCards"
          :key="item.key"
          class="result-card"
        >
          <div class="tool-card-top">
            <span class="tag">{{ item.key }}</span>
            <button type="button" class="button button--ghost result-copy" @click="copyResult(item)">
              复制
            </button>
          </div>

          <h2>{{ item.label }}</h2>
          <div class="code-line">
            <code>lng: {{ item.coord.lng }}</code>
          </div>
          <div class="code-line">
            <code>lat: {{ item.coord.lat }}</code>
          </div>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="section-copy">
        <span class="eyebrow">Samples</span>
        <h2 class="section-title">常用示例坐标</h2>
      </div>

      <div class="card-grid">
        <button
          v-for="preset in presets"
          :key="preset.name"
          type="button"
          class="mini-card preset-card"
          @click="loadPreset(preset)"
        >
          <div class="tool-card-top">
            <span class="tag">{{ preset.source }}</span>
            <span class="metric-chip">{{ preset.name }}</span>
          </div>
          <p class="muted">{{ preset.description }}</p>
          <code>{{ preset.lng }}, {{ preset.lat }}</code>
        </button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

import { COORDINATE_SYSTEMS, convertCoordinate } from '@/utils/coordTransform'

const presets = [
  {
    name: '杭州西湖',
    description: '公开景区坐标，适合验证国内坐标偏移效果。',
    source: 'WGS84',
    lng: '120.155070',
    lat: '30.274085'
  },
  {
    name: '上海外滩',
    description: '常见城市地标，可用于对比另一组国内结果。',
    source: 'WGS84',
    lng: '121.490317',
    lat: '31.241701'
  },
  {
    name: '新加坡滨海湾',
    description: '中国区域外坐标，结果会提示无偏移。',
    source: 'WGS84',
    lng: '103.860730',
    lat: '1.282302'
  }
]

const form = ref({
  source: 'WGS84',
  lng: presets[0].lng,
  lat: presets[0].lat
})

const result = ref(null)
const error = ref('')
const note = ref('')

const resultCards = computed(() => {
  if (!result.value) {
    return []
  }

  return Object.entries(result.value.systems).map(([key, coord]) => ({
    key,
    label: key,
    coord
  }))
})

function runConvert() {
  const lng = Number(form.value.lng)
  const lat = Number(form.value.lat)

  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    error.value = '请输入有效的经纬度数字。'
    note.value = ''
    result.value = null
    return
  }

  result.value = convertCoordinate({
    lng,
    lat,
    source: form.value.source
  })

  error.value = ''
  note.value = result.value.outsideChina
    ? '该坐标位于中国区域外，WGS84 与 GCJ02 之间不会发生偏移。'
    : '已输出三种坐标系结果，可直接复制。'
}

function loadPreset(preset) {
  form.value = {
    source: preset.source,
    lng: preset.lng,
    lat: preset.lat
  }

  runConvert()
}

function clearForm() {
  form.value = {
    source: 'WGS84',
    lng: '',
    lat: ''
  }

  result.value = null
  error.value = ''
  note.value = ''
}

async function copyResult(item) {
  const content = `${item.key}: ${item.coord.lng}, ${item.coord.lat}`

  try {
    await navigator.clipboard.writeText(content)
    note.value = `${item.key} 坐标已复制。`
    error.value = ''
  } catch (err) {
    error.value = `复制失败：${err.message}`
  }
}

runConvert()
</script>

<style scoped>
.preset-card {
  text-align: left;
}

.result-copy {
  min-height: 38px;
  padding-inline: 14px;
}
</style>
