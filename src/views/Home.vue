<template>
  <section class="page-shell home-page">
    <section class="hero-panel home-hero">
      <div class="home-hero__copy">
        <div class="tag-row">
          <span class="eyebrow">Frontend Utility Workspace</span>
          <span class="hero-signal">Deploy-ready</span>
        </div>

        <h1 class="hero-title">把常用前端工具整理成一个看起来更像作品的站点。</h1>
        <p class="hero-text home-hero__text">
          当前版本已经补齐 PDF 转图片、图片压缩、坐标转换和 JSON 格式化四个核心功能，
          所有处理都直接在浏览器内完成，既能演示能力，也能真的拿来用。
        </p>

        <div class="hero-strip">
          <span class="hero-strip__item">Client-side only</span>
          <span class="hero-strip__item">Hash router for Pages</span>
          <span class="hero-strip__item">Reusable tool layout</span>
        </div>

        <div class="actions-row">
          <RouterLink to="/pdf-to-image" class="button">先试试 PDF 转图片</RouterLink>
          <a href="#tool-groups" class="button button--ghost">浏览全部工具</a>
        </div>
      </div>

      <div class="home-hero__aside">
        <section class="hero-console">
          <div class="hero-console__bar">
            <span />
            <span />
            <span />
          </div>

          <div class="hero-console__content">
            <p class="hero-console__title">Workspace snapshot</p>
            <div class="hero-console__lines">
              <div>pdf-to-image<span>ready</span></div>
              <div>image-compress<span>ready</span></div>
              <div>coord-transform<span>ready</span></div>
              <div>json-format<span>ready</span></div>
            </div>
          </div>
        </section>

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
        <h2 class="section-title">现在这套样式更像一个工具工作台，而不是默认卡片列表。</h2>
        <p class="section-text">
          视觉层级、主次对比、信息密度和留白都重新整理了一遍，后续再加工具页时也能自然复用。
        </p>
      </div>

      <div class="card-grid promise-grid">
        <article class="mini-card promise-card">
          <div class="tag-row">
            <span class="tag">Client-side</span>
            <span class="tag">Safe Demo</span>
          </div>
          <h3>本地处理</h3>
          <p class="muted">文件和文本都在浏览器中完成处理，适合作为演示站点或轻量工具站。</p>
        </article>

        <article class="mini-card promise-card">
          <div class="tag-row">
            <span class="tag">Reusable</span>
            <span class="tag">Systematic UI</span>
          </div>
          <h3>统一结构</h3>
          <p class="muted">首页、工具页、结果卡片和异常反馈都已经落到同一套组件语义里。</p>
        </article>

        <article class="mini-card promise-card">
          <div class="tag-row">
            <span class="tag">Pages Ready</span>
            <span class="tag">Portfolio Fit</span>
          </div>
          <h3>可展示</h3>
          <p class="muted">不只是能运行，也更接近作品集项目该有的观感和完成度。</p>
        </article>
      </div>
    </section>

    <section id="tool-groups" class="panel">
      <div class="section-copy">
        <span class="eyebrow">Tool Catalog</span>
        <h2 class="section-title">当前已经可用的工具</h2>
        <p class="section-text">按模块拆分，每一组都有统一介绍和单独入口，结构更清楚。</p>
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
        <article v-for="item in roadmapItems" :key="item" class="mini-card roadmap-card">
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
  gap: 22px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.88fr);
  gap: 24px;
  overflow: hidden;
}

.home-hero::after {
  content: '';
  position: absolute;
  inset: auto -6% -34% auto;
  width: 420px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(15, 198, 174, 0.22) 0%, rgba(15, 198, 174, 0.06) 34%, transparent 66%);
  pointer-events: none;
}

.home-hero__copy {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.home-hero__text {
  max-width: 58ch;
  font-size: 1.04rem;
}

.home-hero__aside {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.hero-signal {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 28, 56, 0.1);
  color: var(--text);
  font-size: 0.82rem;
  font-weight: 700;
}

.hero-strip {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0 2px;
}

.hero-strip__item {
  padding: 8px 11px;
  border-radius: 6px;
  background: rgba(15, 28, 56, 0.06);
  color: var(--text-soft);
  font-size: 0.88rem;
  font-weight: 600;
}

.hero-console {
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
  background: linear-gradient(180deg, #0f1a2e 0%, #13233e 100%);
  box-shadow: 0 26px 44px rgba(11, 17, 30, 0.24);
}

.hero-console__bar {
  display: flex;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-console__bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
}

.hero-console__bar span:nth-child(1) {
  background: #ff8e70;
}

.hero-console__bar span:nth-child(2) {
  background: #ffd06b;
}

.hero-console__bar span:nth-child(3) {
  background: #49d7a0;
}

.hero-console__content {
  padding: 18px 16px;
  color: #f3f7ff;
}

.hero-console__title {
  margin: 0 0 16px;
  color: rgba(243, 247, 255, 0.7);
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-console__lines {
  display: grid;
  gap: 8px;
}

.hero-console__lines div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.hero-console__lines span {
  padding: 5px 9px;
  border-radius: 6px;
  background: rgba(73, 215, 160, 0.14);
  color: #80efc4;
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
}

.home-promise,
.roadmap {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-copy {
  max-width: 760px;
}

.promise-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.promise-card,
.roadmap-card {
  min-height: 164px;
}

.group-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.home-group {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  background: rgba(13, 20, 36, 0.03);
  border: 1px solid rgba(13, 20, 36, 0.08);
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
  font-size: 1.22rem;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tool-card::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%);
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
  color: var(--accent-2-strong);
}

@media (max-width: 1080px) {
  .home-hero {
    grid-template-columns: 1fr;
  }

  .promise-grid {
    grid-template-columns: 1fr;
  }

  .home-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home-group__head,
  .tool-card__foot {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-console__lines div {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
