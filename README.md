# DevTools Hub

A Frontend Utility Platform for developers  
前端开发工具集合，用于学习、演示

---

## 🚀 项目介绍

DevTools Hub 是一个基于 **Vue3 + Vite** 构建的前端工具平台，涵盖 PDF、图片处理、GIS 坐标转换以及常用开发工具。  
项目完全前端实现，无后端依赖，可直接部署在 GitHub Pages。

> 🎯 目标：展示前端能力 + 项目架构能力 + UI 设计能力  
> 📌 面试亮点：模块化设计、纯前端处理、多功能扩展

---

## 🛠 功能模块

### PDF Tools
- **PDF to Image**：将 PDF 文件每页转为图片

### Image Tools
- **Image Compress**：图片压缩与优化
- **Image Resize**：图片尺寸调整

### GIS Tools
- **Coordinate Convert**：WGS84 / GCJ02 / BD09 坐标互转
- **GeoJSON Viewer**：可视化 GeoJSON 数据

### Dev Tools
- **JSON Formatter**：格式化与校验 JSON
- **Timestamp Converter**：时间戳与日期互转

---

## 🧱 技术栈

- **Vue3 + Composition API**  
- **Vite** 构建工具  
- **Vue Router**（hash 模式，支持 GitHub Pages）  
- **Ant Design Vue** UI 组件库  
- **gh-pages** 部署工具（GitHub Pages）

---

## ⚙️ 本地运行

1. 克隆仓库：

```bash
git clone https://github.com/用户名/devtools-hub.git
cd devtools-hub
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发：

```bash
npm run dev
```
打开浏览器访问：**http://localhost:5173**

4. 打包项目：

```bash
npm run build
```

5. 部署到 GitHub Pages：

```bash
npm install gh-pages -D   # 如果还没安装
npm run deploy
```
页面访问地址：**https://用户名.github.io/devtools-hub/**

🔑 注意：

- **vite.config.js** 中必须配置 **base: '/devtools-hub/'**
- 路由必须使用 hash 模式，否则 GitHub Pages 刷新会 404

## 🌟 项目亮点
- 模块化工具平台设计，方便后续扩展
- 全前端实现，无需后端服务
- GitHub Pages 在线部署，可直接展示
- 每个功能页面独立，可单独演示

## 📄 LICENSE
MIT License

