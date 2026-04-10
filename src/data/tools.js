export const toolGroups = [
  {
    id: 'pdf',
    label: 'PDF Tools',
    eyebrow: 'PDF',
    description: '围绕 PDF 浏览、渲染和导出场景整理的小工具。',
    children: [
      {
        title: 'PDF 转图片',
        path: '/pdf-to-image',
        summary: '逐页渲染 PDF，在浏览器内导出 PNG 或 JPG。',
        status: 'Ready',
        highlight: '支持逐页下载'
      }
    ]
  },
  {
    id: 'image',
    label: 'Image Tools',
    eyebrow: 'IMG',
    description: '常见的图片优化与前端图像处理流程。',
    children: [
      {
        title: '图片压缩',
        path: '/image-compress',
        summary: '支持 JPEG / PNG / WebP 压缩，预览前后体积变化。',
        status: 'Ready',
        highlight: '批量处理'
      }
    ]
  },
  {
    id: 'gis',
    label: 'GIS Tools',
    eyebrow: 'GIS',
    description: '面向地图和地理坐标调试场景的小工具。',
    children: [
      {
        title: '坐标转换',
        path: '/coord',
        summary: 'WGS84、GCJ02、BD09 互转，并展示全部结果。',
        status: 'Ready',
        highlight: '含示例坐标'
      }
    ]
  },
  {
    id: 'dev',
    label: 'Dev Tools',
    eyebrow: 'DEV',
    description: '开发调试中常用的文本与结构化数据处理工具。',
    children: [
      {
        title: 'JSON 格式化',
        path: '/json-format',
        summary: '格式化、压缩、校验 JSON，并支持排序输出。',
        status: 'Ready',
        highlight: '复制结果'
      }
    ]
  }
]

export const primaryNav = [
  { label: '首页', path: '/' },
  { label: 'PDF 转图片', path: '/pdf-to-image' },
  { label: '图片压缩', path: '/image-compress' },
  { label: '坐标转换', path: '/coord' },
  { label: 'JSON 格式化', path: '/json-format' }
]

export const heroStats = [
  {
    value: '4',
    label: '已完成工具',
    detail: '都可以直接在浏览器内使用'
  },
  {
    value: '100%',
    label: '纯前端处理',
    detail: '不依赖后端服务或文件上传'
  },
  {
    value: 'Hash',
    label: 'Pages 友好路由',
    detail: '可以直接部署到 GitHub Pages'
  }
]

export const roadmapItems = [
  '补充更多浏览器内可完成的轻量工具，比如时间戳转换与图片尺寸调整。',
  '继续沉淀统一的页面骨架和工具面板，减少后续扩展时的重复工作。',
  '保持全部功能在本地运行，尽量让示例站同时承担作品集和工具站两种角色。'
]
