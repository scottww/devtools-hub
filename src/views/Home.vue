<template>
  <section class="page-shell home-page">
    <section class="hero-panel home-hero">
      <div class="home-hero__copy">
        <span class="eyebrow">Frontend Utility Workspace</span>
        <h1 class="hero-title">把常用前端工具整理成一个能直接部署的站点。</h1>
        <p class="hero-text home-hero__text">
          这个版本已经补齐 PDF 转图片、图片压缩、坐标转换和 JSON
          格式化四个核心功能，全部在浏览器内完成处理，不依赖后端。
        </p>

        <div class="actions-row">
          <RouterLink to="/pdf-to-image" class="button">先试试 PDF 转图片</RouterLink>
          <a href="#tool-groups" class="button button--ghost">浏览全部工具</a>
        </div>
      </div>

      <div class="home-hero__aside">
        <div class="stats-grid">
          <article v-for="stat in heroStats" :key="stat.label" class="stat-card">
            <strong>{{ stat.value }}</strong>
            <div>{{ stat.label }}</div>
            <p class="muted">{{ stat.detail }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="panel home-promise">
      <div class="section-copy">
        <span class="eyebrow">Why This Works</span>
        <h2 class="section-title">不只是工具列表，也是一套适合继续扩展的前端壳层。</h2>
        <p class="section-text">
          现在的页面骨架、导航、工具卡片、输入区和结果区都已经统一，后续增加新工具时可以直接复用。
        </p>
      </div>

      <div class="card-grid">
        <article class="mini-card">
          <div class="tag-row">
            <span class="tag">Client-side</span>
            <span class="tag">Safe Demo</span>
          </div>
          <h3>本地处理</h3>
          <p class="muted">文件和文本都在浏览器中完成处理，适合作为演示站点或轻量工具站。</p>
        </article>

        <article class="mini-card">
          <div class="tag-row">
            <span class="tag">Reusable</span>
            <span class="tag">Consistent UI</span>
          </div>
          <h3>统一界面模式</h3>
          <p class="muted">首页、工具页、结果卡片和异常反馈都已经统一到同一套视觉和结构中。</p>
        </article>

        <article class="mini-card">
          <div class="tag-row">
            <span class="tag">Pages Ready</span>
            <span class="tag">Hash Router</span>
          </div>
          <h3>部署更直接</h3>
          <p class="muted">当前配置适合直接打包到 GitHub Pages，作为线上作品集的一部分也比较自然。</p>
        </article>
      </div>
    </section>

    <section id="tool-groups" class="panel">
      <div class="section-copy">
        <span class="eyebrow">Tool Catalog</span>
        <h2 class="section-title">当前已经可用的工具</h2>
        <p class="section-text">按模块拆分，后面扩展新功能时可以继续沿用这一层级。</p>
      </div>

      <div class="group-stack">
        <article v-for="group in toolGroups" :key="group.id" class="home-group">
          <div class="home-group__head">
            <span class="tag">{{ group.eyebrow }}</span>
            <div>
              <h3>{{ group.label }}</h3>
              <p class="muted">{{ group.description }}</p>
            </div>
          </div>

          <div class="tool-card-grid">
            <RouterLink
              v-for="tool in group.children"
              :key="tool.path"
              :to="tool.path"
              class="tool-card"
            >
              <div class="tool-card-top">
                <span class="tag">{{ group.eyebrow }}</span>
                <span class="status-badge">{{ tool.status }}</span>
              </div>
              <h4>{{ tool.title }}</h4>
              <p class="muted">{{ tool.summary }}</p>
              <div class="tool-card__foot">
                <span class="metric-chip">{{ tool.highlight }}</span>
                <span class="tool-card__link">打开工具</span>
              </div>
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="panel roadmap">
      <div class="section-copy">
        <span class="eyebrow">Roadmap</span>
        <h2 class="section-title">下一步可以继续补的方向</h2>
      </div>

      <div class="card-grid">
        <article v-for="item in roadmapItems" :key="item" class="mini-card">
          <p>{{ item }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { heroStats, roadmapItems, toolGroups } from '@/data/tools'
</script>

<style scoped>
.home-page {
  gap: 24px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.9fr);
  gap: 26px;
  background:
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.14), transparent 30%),
    radial-gradient(circle at bottom right, rgba(200, 112, 31, 0.14), transparent 26%),
    var(--surface-strong);
}

.home-hero__copy {
  max-width: 680px;
}

.home-hero__text {
  max-width: 58ch;
  font-size: 1.02rem;
}

.home-hero__aside {
  display: flex;
  align-items: stretch;
}

.home-promise,
.roadmap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-copy {
  max-width: 760px;
}

.group-stack {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.home-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-group__head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.home-group__head h3,
.tool-card h4,
.mini-card h3 {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.tool-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tool-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
}

.tool-card__link {
  font-weight: 700;
  color: var(--accent-strong);
}

@media (max-width: 920px) {
  .home-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home-group__head,
  .tool-card__foot {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
