<template>
  <section class="page-shell home-page">
    <section class="home-hero">
      <div class="home-hero__copy">
        <span class="eyebrow">DevTools Hub</span>
        <h1 class="hero-title">常用工具，集中处理。</h1>
        <p class="hero-text">
          PDF、图片、坐标与 JSON 工具。所有数据仅在当前浏览器中处理，无需上传。
        </p>
        <div class="actions-row">
          <a href="#tool-catalog" class="button">查看全部工具</a>
          <RouterLink to="/json-format" class="button button--ghost">打开 JSON 工具</RouterLink>
        </div>
      </div>

      <dl class="home-summary" aria-label="项目概览">
        <div v-for="stat in heroStats" :key="stat.label">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </section>

    <section id="tool-catalog" class="catalog-section">
      <div class="catalog-heading">
        <div>
          <span class="eyebrow">Tools</span>
          <h2 class="section-title">选择一个工具</h2>
        </div>
        <p>轻量、直接，在浏览器中完成。</p>
      </div>

      <div class="catalog-grid">
        <template v-for="group in toolGroups" :key="group.id">
          <RouterLink
            v-for="tool in group.children"
            :key="tool.path"
            :to="tool.path"
            class="catalog-item"
          >
            <div class="catalog-item__meta">
              <span>{{ group.eyebrow }}</span>
              <span>{{ tool.highlight }}</span>
            </div>
            <h3>{{ tool.title }}</h3>
            <p>{{ tool.summary }}</p>
            <span class="catalog-item__action">打开工具 <span aria-hidden="true">→</span></span>
          </RouterLink>
        </template>
      </div>
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { heroStats, toolGroups } from '@/data/tools'
</script>

<style scoped>
.home-page {
  gap: 0;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 820px);
  gap: 56px;
  padding: clamp(56px, 8vw, 112px) 0;
  border-bottom: 1px solid var(--line);
}

.home-hero__copy {
  max-width: 760px;
}

.home-hero .hero-title {
  max-width: none;
  margin: 20px 0;
}

.home-hero .hero-text {
  max-width: 580px;
  margin: 0 0 32px;
  font-size: 1.08rem;
}

.home-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin: 0;
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
}

.home-summary div {
  display: grid;
  gap: 4px;
  padding: 20px 28px;
  border-right: 1px solid var(--line);
}

.home-summary div:first-child {
  padding-left: 0;
}

.home-summary div:last-child {
  border-right: 0;
}

.home-summary dt {
  color: var(--text-soft);
  font-size: 0.88rem;
}

.home-summary dd {
  grid-row: 1;
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
}

.catalog-section {
  padding: clamp(48px, 7vw, 88px) 0;
}

.catalog-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
}

.catalog-heading .section-title {
  margin-top: 14px;
}

.catalog-heading p {
  margin: 0;
  color: var(--text-soft);
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line-strong);
  border-left: 1px solid var(--line-strong);
}

.catalog-item {
  display: flex;
  min-height: 280px;
  flex-direction: column;
  padding: clamp(24px, 4vw, 40px);
  border-right: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.catalog-item:hover {
  background: var(--surface-muted);
}

.catalog-item:hover .catalog-item__action {
  color: var(--text);
}

.catalog-item__meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--text-soft);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.catalog-item h3 {
  margin: 36px 0 10px;
  font-size: 1.5rem;
}

.catalog-item p {
  max-width: 44ch;
  margin: 0;
  color: var(--text-soft);
}

.catalog-item__action {
  margin-top: auto;
  padding-top: 28px;
  color: var(--accent-strong);
  font-weight: 700;
}

@media (max-width: 1000px) {
  .catalog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .home-hero {
    padding: 48px 0;
    gap: 40px;
  }

  .home-summary {
    grid-template-columns: 1fr;
  }

  .home-summary div,
  .home-summary div:first-child {
    padding: 14px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .home-summary div:last-child {
    border-bottom: 0;
  }

  .catalog-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .catalog-grid {
    grid-template-columns: 1fr;
  }

  .catalog-item {
    min-height: 220px;
  }
}
</style>
