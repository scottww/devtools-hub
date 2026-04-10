import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'DevTools Hub | 前端工具合集'
    }
  },
  {
    path: '/pdf-to-image',
    name: 'pdf-to-image',
    component: () => import('@/views/pdf/PdfToImage.vue'),
    meta: {
      title: 'PDF 转图片 | DevTools Hub'
    }
  },
  {
    path: '/image-compress',
    name: 'image-compress',
    component: () => import('@/views/tools/ImageCompress.vue'),
    meta: {
      title: '图片压缩 | DevTools Hub'
    }
  },
  {
    path: '/coord',
    name: 'coord',
    component: () => import('@/views/tools/CoordinateConvert.vue'),
    meta: {
      title: '坐标转换 | DevTools Hub'
    }
  },
  {
    path: '/json-format',
    name: 'json-format',
    component: () => import('@/views/tools/JsonFormatter.vue'),
    meta: {
      title: 'JSON 格式化 | DevTools Hub'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面不存在 | DevTools Hub'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ?? 'DevTools Hub'
})

export default router
