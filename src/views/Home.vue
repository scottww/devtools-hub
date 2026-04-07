<template>
  <div class="page">
    <!-- 顶部 -->
    <div class="hero">
      <h1>DevTools Hub</h1>
      <p>A Frontend Utility Platform</p>
    </div>

    <!-- 分类 -->
    <div v-for="group in toolGroups" :key="group.name" class="section">
      <h2>{{ group.icon }} {{ group.name }}</h2>

      <div class="grid">
        <div
          v-for="item in group.children"
          :key="item.path"
          class="card"
          @click="go(item.path)"
        >
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const go = (path) => {
  router.push(path)
}

const toolGroups = [
  {
    name: 'PDF Tools',
    icon: '📄',
    children: [
      { title: 'PDF to Image', desc: 'Convert PDF pages to images', path: '/pdf-to-image' }
    ]
  },
  {
    name: 'Image Tools',
    icon: '🖼',
    children: [
      { title: 'Image Compress', desc: 'Reduce image size', path: '/image-compress' }
    ]
  },
  {
    name: 'GIS Tools',
    icon: '🌍',
    children: [
      { title: 'Coordinate Convert', desc: 'WGS84 / GCJ02 / BD09', path: '/coord' }
    ]
  },
  {
    name: 'Dev Tools',
    icon: '🧑‍💻',
    children: [
      { title: 'JSON Format', desc: 'Format & validate JSON', path: '/json-format' }
    ]
  }
]
</script>

<style scoped>
.page {
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.hero p {
  color: #666;
}

/* 分类 */
.section {
  margin-bottom: 40px;
}

.section h2 {
  margin-bottom: 16px;
}

/* 卡片 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  border-radius: 14px;
  background: #f7f8fa;
  cursor: pointer;
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  background: #e6f7ff;
}

.title {
  font-weight: bold;
  margin-bottom: 6px;
}

.desc {
  font-size: 13px;
  color: #666;
}
</style>