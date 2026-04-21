# Airbnb

Airbnb 是一个基于 React 的仿 Airbnb 房源浏览项目，包含首页、房源列表页、房源详情页、图片预览、本地用户状态和简单支付流程。项目当前已经迁移到 Vite，并开始补充 NestJS + Prisma + PostgreSQL 后端，用于跑通登录、房源、收藏、订单、个人中心和平台后台管理链路。

## 功能

- 首页房源模块：高性价比、热门推荐、折扣房源、热门目的地、想去的城市等
- 房源列表页：分类标签、分页、房源卡片和 Redux 数据管理
- 房源详情页：图片展示、图片预览、预订和支付交互
- 本地注册、登录和用户状态持久化
- NestJS 后端接口骨架：登录鉴权、房源、收藏、浏览历史、订单、Admin 管理
- Prisma 数据模型：User、House、Order、Favorite、BrowseHistory
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
- NestJS
- Prisma
- PostgreSQL
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

启动 NestJS 后端：

```bash
cp apps/api/.env.example apps/api/.env
pnpm prisma:generate
pnpm dev:api
```

后端默认使用 `http://localhost:3001/api`。如果要连接 PostgreSQL，请在 `apps/api/.env` 中配置 `DATABASE_URL` 后执行迁移和 seed：

```bash
pnpm prisma:migrate
pnpm prisma:seed
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

## 后端业务设计

前台用户和后台管理员分开：

- `USER`：普通用户，浏览房源、收藏、浏览历史、下单和虚拟支付。
- `HOST`：前台用户的一种，发布房源后自动成为房东，可在个人中心管理自己的房源，但不能进入平台后台。
- `ADMIN`：平台运营人员，可进入 Admin 后台，管理平台自营房源、审核用户发布房源、查看订单和用户。

核心接口：

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile

GET  /api/houses
GET  /api/houses/:id
GET  /api/me/houses
POST /api/me/houses

GET    /api/me/favorites
POST   /api/houses/:id/favorite
DELETE /api/houses/:id/favorite

GET   /api/me/orders
POST  /api/orders
PATCH /api/orders/:orderNo/pay

GET  /api/admin/dashboard
GET  /api/admin/houses
POST /api/admin/houses
GET  /api/admin/orders
GET  /api/admin/users
```

后端还兼容了当前前端的旧数据接口，例如 `/api/home/goodprice`、`/api/home/highscore`、`/api/entire/list`，便于逐步从课程接口迁移到自己的 NestJS API。

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

apps/api
├── prisma       Prisma schema 和 seed
└── src          NestJS 模块、Controller、Service 和通用鉴权守卫
```

## 常用脚本

```bash
pnpm start
pnpm dev:api
pnpm run build
pnpm build:api
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
