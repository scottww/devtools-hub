import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Temp from '@/views/temp.vue'
import PdfToImage from '@/views/pdf/PdfToImage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pdf-to-image', component: PdfToImage },
  {
    path: '/image-compress',
    component: Temp,
    props: {
      title: 'Image Compress',
      description: '图片压缩功能占位中，后续可在这里接入本地压缩、格式转换和批量导出。'
    }
  },
  {
    path: '/coord',
    component: Temp,
    props: {
      title: 'Coordinate Convert',
      description: '坐标转换功能占位中，后续可支持 WGS84、GCJ02 和 BD09 的互转。'
    }
  },
  {
    path: '/json-format',
    component: Temp,
    props: {
      title: 'JSON Format',
      description: 'JSON 格式化功能占位中，后续可补充校验、高亮和压缩输出能力。'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(), // GitHub Pages 必须用这个
  routes
})

export default router
