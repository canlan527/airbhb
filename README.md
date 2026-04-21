# Airbnb

Airbnb 是一个基于 React 的仿 Airbnb 房源浏览项目，包含首页、房源列表页、房源详情页、图片预览、本地用户状态和简单支付流程。项目当前支持部署到 Vercel，并通过 Vercel Function 代理后端接口，避免线上 HTTPS 页面请求 HTTP 接口时出现 mixed content 问题。

## 功能

- 首页房源模块：高性价比、热门推荐、折扣房源、热门目的地、想去的城市等
- 房源列表页：分类标签、分页、房源卡片和 Redux 数据管理
- 房源详情页：图片展示、图片预览、预订和支付交互
- 本地注册、登录和用户状态持久化
- 基于 styled-components、Less、Ant Design 和基础组件封装的页面 UI
- 生产环境通过 Vercel Function 代理 API 请求

## 技术栈

- React 18
- React Router 6
- Redux Toolkit
- Axios
- Vite
- Less
- styled-components
- Ant Design
- pnpm
- Vercel Functions

## 本地运行

安装依赖：

```bash
pnpm install
```

启动开发服务：

```bash
pnpm start
# 或
pnpm dev
```

构建生产包：

```bash
pnpm run build
```

## 环境变量

项目在线上默认请求 `/api/proxy`，再由 Vercel Function 在服务端读取真实接口地址并转发请求。

如果本地开发时想直接请求真实接口，可以创建不会提交到 GitHub 的 `.env.local`：

```env
VITE_API_BASE_URL=http://your-api-host/airbnb/api
```

部署到 Vercel 时，需要在项目的 Environment Variables 中添加：

```env
API_BASE_URL=http://your-api-host/airbnb/api
```

线上不要配置 `VITE_API_BASE_URL`，除非你明确希望浏览器直接请求该地址。保持它为空时，生产环境会使用 `/api/proxy`，由 Vercel 服务端完成转发。

`.env.example` 是可提交的环境变量示例文件；`.env.local`、`.env.development.local`、`.env.production.local` 等本地配置文件已被 Git 忽略。

## API 代理

代理函数入口：

```text
api/proxy.js
```

请求流程：

```text
浏览器 -> /api/proxy/home/goodprice -> Vercel Function -> API_BASE_URL/home/goodprice
```

这样浏览器始终请求当前 Vercel 站点的 HTTPS 同源接口，真实 HTTP 接口由 Vercel Function 在服务端访问。

## Vercel 部署

将 GitHub 仓库导入 Vercel 后，建议使用以下配置：

```text
Framework Preset: Create React App
Install Command: pnpm install
Build Command: pnpm run build
Output Directory: dist
```

然后在 Vercel 项目设置中添加环境变量：

```env
API_BASE_URL=http://your-api-host/airbnb/api
```

保存后重新部署，页面数据会通过 `/api/proxy` 加载。

## 项目结构

```text
src
├── assets       静态图片、SVG、CSS、主题配置和本地 JSON 数据
├── base-ui      图片预览、滚动视图、指示器等基础 UI 组件
├── components   Header、Footer、房源卡片、Section 等通用组件
├── hooks        自定义 React Hooks
├── router       路由配置
├── services     Axios 请求封装和接口模块
├── store        Redux Store 和业务模块
├── utils        通用工具函数
└── views        首页、房源列表页和房源详情页
```

## 常用脚本

```bash
pnpm start
pnpm run build
pnpm test
```

## 后续迭代计划

后续计划对项目进行一次现代化升级，重点包括：

- 升级到 React 19，跟进新版 React 的能力和生态支持
- 更新路由方案，整理当前页面路由和详情页跳转逻辑
- 使用 Zustand 替换 Redux Toolkit，简化全局状态管理
- 引入 Tailwind CSS，逐步统一样式组织方式并减少样式文件维护成本
- 梳理接口代理和环境变量配置，使本地开发、预览环境和生产环境保持一致

## 说明

- 项目使用 `HashRouter`，部署后刷新页面通常不需要额外配置前端路由重写。
- 当前项目已迁移到 `Vite`，生产构建输出目录为 `dist`。
