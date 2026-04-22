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
- Monorepo 结构：`apps/web` 前端，`apps/api` 后端

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
- Vercel

## 本地运行

安装依赖：

```bash
pnpm install
```

启动开发服务：

```bash
pnpm dev:web
```

启动 NestJS 后端：

```bash
cp apps/api/.env.example apps/api/.env
pnpm db:up
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev:api
```

后端默认使用 `http://localhost:3001/api`。如果要连接 PostgreSQL，请在 `apps/api/.env` 中配置 `DATABASE_URL` 后执行迁移和 seed：
本地默认 PostgreSQL 连接为：

```env
DATABASE_URL="postgresql://airbhb:airbhb@localhost:54329/airbhb"
```

如果使用 Neon / Supabase / Railway PostgreSQL，把 `apps/api/.env` 里的 `DATABASE_URL` 替换为托管数据库连接串即可：

```bash
pnpm prisma:migrate
pnpm prisma:seed
```

构建生产包：

```bash
pnpm build:web
```

## 环境变量

前端环境变量放在 `apps/web/.env.local`，本地开发默认指向 NestJS 后端：

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

部署到 Vercel 时，将 `VITE_API_BASE_URL` 配置为线上后端地址：

```env
VITE_API_BASE_URL=https://你的-render-api域名/api
```

后端环境变量放在 `apps/api/.env`，参考 `apps/api/.env.example`。

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
Framework Preset: Vite
Install Command: pnpm install
Build Command: pnpm build:web
Output Directory: apps/web/dist
```

然后在 Vercel 项目设置中添加环境变量：

```env
VITE_API_BASE_URL=https://你的-render-api域名/api
```

保存后重新部署，前端会直接请求你的 NestJS 后端。

## Render 后端部署

仓库内提供了 `render.yaml`，用于部署 `apps/api`：

```text
Build Command:
cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @airbhb/api prisma generate && pnpm --filter @airbhb/api build

Start Command:
cd ../.. && pnpm --filter @airbhb/api prisma migrate deploy && pnpm --filter @airbhb/api start:prod
```

Render 环境变量需要配置：

```env
DATABASE_URL=你的 PostgreSQL 连接串
JWT_SECRET=任意安全随机字符串
PORT=3001
```

部署成功后，将前端 Vercel 的 `VITE_API_BASE_URL` 配置为：

```env
VITE_API_BASE_URL=https://你的-render-api域名/api
```

## 项目结构

```text
apps/web
├── public       前端静态资源
├── src          React 页面、组件、路由、服务和状态管理
├── index.html   Vite HTML 入口
└── vite.config.mjs

apps/api
├── prisma       Prisma schema 和 seed
└── src          NestJS 模块、Controller、Service 和通用鉴权守卫
```

## 常用脚本

```bash
pnpm dev:web
pnpm dev:api
pnpm db:up
pnpm build:web
pnpm build:api
```

## 后续迭代计划

后续计划对项目进行一次现代化升级，重点包括：

- 升级到 React 19，跟进新版 React 的能力和生态支持
- 更新路由方案，整理当前页面路由和详情页跳转逻辑
- 使用 Zustand 替换 Redux Toolkit，简化全局状态管理
- 引入 Tailwind CSS，逐步统一样式组织方式并减少样式文件维护成本
- 梳理接口代理和环境变量配置，使本地开发、预览环境和生产环境保持一致
- 图片上传后续升级为 `/api/uploads`：前端上传文件，后端使用 Multer 接收并接入对象存储或本地静态资源，数据库只保存图片 URL；当前 demo 阶段先用压缩后的 base64 dataURL 跑通发布房源流程

## 说明

- 项目使用 `HashRouter`，部署后刷新页面通常不需要额外配置前端路由重写。
- 前端生产构建输出目录为 `apps/web/dist`。
