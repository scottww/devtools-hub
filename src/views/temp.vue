<template>
  <section class="placeholder-page">
    <div class="placeholder-card">
      <span class="status">Coming Soon</span>
      <h1>{{ title }}</h1>
      <p class="description">{{ description }}</p>
      <p class="route-path">
        当前路由：<code>{{ route.path }}</code>
      </p>

      <RouterLink to="/" class="back-home">
        返回首页
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Tool Placeholder'
  },
  description: {
    type: String,
    default: '该功能正在开发中。'
  }
})

const route = useRoute()
</script>

<style scoped>
.placeholder-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at top, rgba(24, 144, 255, 0.14), transparent 36%),
    linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%);
}

.placeholder-card {
  width: min(100%, 680px);
  padding: 40px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(24, 144, 255, 0.14);
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
  text-align: left;
}

.status {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: rgba(24, 144, 255, 0.12);
  color: #1677ff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 12px;
  font-size: clamp(32px, 5vw, 44px);
}

.description {
  margin-bottom: 18px;
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
}

.route-path {
  margin-bottom: 28px;
  color: #6b7280;
}

.back-home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 116px;
  padding: 12px 20px;
  border-radius: 12px;
  background: #1677ff;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.back-home:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(22, 119, 255, 0.24);
}

@media (max-width: 640px) {
  .placeholder-card {
    padding: 28px 22px;
  }
}
</style>
