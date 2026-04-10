<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">DH</span>
        <span class="brand-copy">
          <strong>DevTools Hub</strong>
          <small>Frontend utility workbench</small>
        </span>
      </RouterLink>

      <div class="site-header__right">
        <nav class="site-nav" aria-label="Primary">
          <RouterLink
            v-for="link in primaryNav"
            :key="link.path"
            :to="link.path"
            class="nav-link"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <span class="site-status">4 tools live</span>
      </div>
    </header>

    <main class="site-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <p>纯前端工具集合，适合作为 GitHub Pages 项目站点或作品集模块。</p>
      <div class="footer-meta">
        <span>Vue 3</span>
        <span>Vite</span>
        <span>Client-side only</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { primaryNav } from '@/data/tools'
</script>
