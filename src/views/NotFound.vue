<template>
  <section class="page-shell">
    <section class="hero-panel not-found">
      <span class="eyebrow">404</span>
      <h1 class="page-title">这个页面不存在。</h1>
      <p class="hero-text">
        当前地址没有对应的工具页。可以回到首页继续浏览已经整理好的工具模块。
      </p>

      <div class="actions-row">
        <RouterLink to="/" class="button">返回首页</RouterLink>
        <RouterLink to="/json-format" class="button button--ghost">打开 JSON 工具</RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    radial-gradient(circle at top right, rgba(200, 112, 31, 0.14), transparent 28%),
    radial-gradient(circle at bottom left, rgba(15, 118, 110, 0.12), transparent 26%),
    var(--surface-strong);
}
</style>
