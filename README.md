# DevTools Hub

一个适合部署到 GitHub Pages 的前端工具合集示例项目。

## 项目简介

`DevTools Hub` 基于 `Vue 3 + Vite` 构建，定位是一个纯前端工具站点模板。当前版本已经补齐了几类常见工具页面，同时保留了适合继续扩展的整体壳层和页面结构。

当前已实现的功能：

- `PDF 转图片`：逐页渲染 PDF，并导出 PNG / JPG
- `图片压缩`：批量压缩图片，支持格式转换和尺寸限制
- `坐标转换`：WGS84 / GCJ02 / BD09 互转
- `JSON 格式化`：格式化、压缩、校验和复制 JSON

项目特点：

- 全部处理逻辑在浏览器内完成，不依赖后端
- 使用 `hash` 路由，适合直接部署到 GitHub Pages
- 页面骨架、交互区和结果区已经统一，后续便于继续加工具

## 技术栈

- `Vue 3`
- `Vite`
- `Vue Router`
- `Ant Design Vue`
- `pdfjs-dist`

## 本地运行

```bash
npm install
npm run dev
```

开发环境默认地址：

```text
http://localhost:5173
```

## 打包构建

```bash
npm run build
```

## 部署到 GitHub Pages

项目已配置：

- `vite.config.js` 中的 `base: '/devtools-hub/'`
- `createWebHashHistory(import.meta.env.BASE_URL)` 路由模式

部署命令：

```bash
npm run deploy
```

## 后续扩展建议

- 增加时间戳转换、图片尺寸调整、文本差异对比等轻量工具
- 将工具配置进一步抽离成统一元数据，减少新增页面时的重复代码
- 继续沉淀结果下载、复制、错误提示等通用交互
