import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import PdfToImage from '@/views/pdf/PdfToImage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pdf-to-image', component: PdfToImage }
]

const router = createRouter({
  history: createWebHashHistory(), // GitHub Pages 必须用这个
  routes
})

export default router