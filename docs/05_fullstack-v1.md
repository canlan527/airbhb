# Airbhb Fullstack V1 项目说明

## 项目定位

Airbhb Fullstack V1 是在原纯前端 Airbnb 仿站基础上升级出的全栈房源预订项目。项目保留原首页、房源列表、详情页等展示体验，同时补齐用户注册登录、个人中心、发布房源、收藏、浏览历史、订单支付、管理后台审核和平台自营房源管理等业务链路。

这个版本的目标不是一次性做成完整商业系统，而是优先跑通一套可演示、可部署、可迭代的全栈闭环：React 前端负责用户体验和后台管理，NestJS 提供业务接口，Prisma 管理数据模型，PostgreSQL 保存用户、房源、订单和运营数据。

## 当前阶段说明

截至 2026-04-24，项目已经完成：

- 前后端分层重构
- 个人中心、发布房源、管理后台等全栈业务闭环
- `styled-components` 向 `SCSS + Tailwind @apply` 的样式迁移
- 首页、列表页、详情页、后台的响应式与主要交互修正

当前更适合将项目定位为：

- 可演示
- 可答辩
- 可继续扩展

而不是立即进入正式线上运营阶段。

## 部署计划（暂缓）

部署工作暂时后置，等其他项目完成后再统一评估并尝试集中上线。

当前决定如下：

1. 先继续完善业务体验和项目说明
2. 暂不单独为本项目购买付费部署资源
3. 后续和其他项目一起比较部署方案与成本，再决定是否统一上线

后续部署时，优先考虑的目标是：

- 低成本或免费演示环境
- 前端、后端、数据库分离部署
- 适合项目展示和求职作品集访问

部署前建议补齐：

- 生产环境变量整理
- 部署文档
- CORS 与 JWT_SECRET 的生产配置
- 数据库迁移与 seed 流程说明

## 技术栈

### 前端

- React 18
- React Router 6，使用 HashRouter 适配静态站点部署
- Redux Toolkit / React Redux，承接原项目首页和房源列表状态
- Zustand 计划引入，用于后续替换轻量业务状态
- TypeScript 迁移计划，当前项目仍以 JSX 为主
- Ant Design 5，用于 Form、Table、Modal、Upload、Tabs、Message 等复杂交互
- styled-components，承接原项目历史样式
- Sass + Tailwind CSS，已安装配置，优先用于新页面和后续样式迁移
- Vite，替换原 CRACO/CRA 构建链路
- Axios，请求封装、Token 注入和后续拦截器扩展

### 后端

- NestJS 10
- Express adapter
- Prisma ORM
- PostgreSQL
- JWT 鉴权
- bcryptjs 密码加密
- class-validator / class-transformer DTO 校验
- Guard + Decorator 实现用户鉴权和管理员角色控制

### 工程化

- pnpm workspace monorepo
- Docker Compose 本地启动 PostgreSQL
- Prisma migration 管理数据库结构
- Prisma seed 导入初始用户、房源和原接口数据
- Vite production build
- Nest build

## 项目架构

```text
airbhb
├── apps
│   ├── web              # React 前端应用
│   │   ├── src
│   │   │   ├── components
│   │   │   ├── views
│   │   │   ├── services
│   │   │   ├── store
│   │   │   ├── router
│   │   │   ├── hooks
│   │   │   └── assets
│   │   └── vite.config.mjs
│   └── api              # NestJS 后端应用
│       ├── prisma
│       │   ├── schema.prisma
│       │   ├── migrations
│       │   └── seed.ts
│       └── src
│           ├── modules
│           │   ├── auth
│           │   ├── houses
│           │   ├── orders
│           │   ├── favorites
│           │   ├── histories
│           │   └── admin
│           ├── common
│           └── prisma
├── docs
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
```

### 前端设计

前端仍保留原业务页面：

- 首页 `/home`
- 全部房源 `/entire`
- 房源详情 `/detail/:id`

新增全栈业务页面：

- 个人中心 `/profile`
- 用户发布房源 `/publish-house`
- 管理后台 `/admin`

用户侧和管理端的发布表单已抽成公共组件：

```text
apps/web/src/components/house-publish-form
```

这个组件统一处理房源基础信息、价格规格、图片上传、图片压缩、图片预览、拖拽排序、封面图规则和提交 payload 组装。用户侧提交后进入待审核状态，管理端提交后直接作为平台自营房源上架。

### 后端设计

后端按业务模块拆分：

- `auth`：注册、登录、获取当前用户
- `houses`：公共房源、用户房源、首页兼容接口、列表兼容接口
- `orders`：创建订单、支付、取消、查询
- `favorites`：收藏和取消收藏
- `histories`：浏览历史
- `admin`：后台看板、房源管理、订单管理、用户管理

核心鉴权设计：

- 普通接口通过 `JwtAuthGuard` 校验登录态
- 管理端接口通过 `JwtAuthGuard + RolesGuard(['ADMIN'])`
- 当前用户通过 `@CurrentUser()` 装饰器注入

## 数据模型

当前核心模型：

- `User`：用户、房东、管理员
- `House`：房源
- `Order`：订单
- `Favorite`：收藏
- `BrowseHistory`：浏览历史

核心枚举：

- `UserRole`：`USER`、`HOST`、`ADMIN`
- `HouseSource`：`USER`、`PLATFORM`
- `HouseStatus`：`DRAFT`、`PENDING`、`PUBLISHED`、`REJECTED`、`OFFLINE`
- `OrderStatus`：`PENDING`、`PAID`、`CANCELLED`、`COMPLETED`、`REFUNDED`

房源删除规则已经按业务调整：

- 没有历史订单的房源可以物理删除
- 有历史订单的房源不物理删除，改为 `OFFLINE`
- 成交金额来自已支付订单，不会因为房源下架而消失

## 业务角色

### 普通用户 USER

普通用户可以浏览房源、查看详情、收藏房源、查看浏览历史、下单、模拟支付。用户也可以申请发布房源，发布后角色会升级为 `HOST`。

### 房东 HOST

房东本质上仍是前台用户，不进入平台管理后台。房东可以在个人中心查看自己的房源。用户发布房源后，房源状态为 `PENDING`，需要管理员审核通过后才会公开展示。

### 管理员 ADMIN

管理员登录后进入 `/admin`。管理员负责平台运营，包括房源审核、平台自营房源创建、房源上下架、订单状态管理、用户状态管理和数据看板查看。

## 核心业务流程

### 注册登录

1. 用户注册账号
2. 后端使用 bcryptjs 加密密码
3. 登录成功后返回 JWT 和用户信息
4. 前端保存 token 和 user
5. 请求拦截器后续携带 token 访问受保护接口
6. 如果用户是管理员，登录后进入 `/admin`

### 用户发布房源

1. 用户进入 `/publish-house`
2. 填写房源标题、城市、地址、价格、卧室、卫生间、标签和描述
3. 上传房源图片
4. 前端压缩图片，并以第一张作为封面图
5. 提交到 `POST /api/me/houses`
6. 后端创建 `source=USER`、`status=PENDING` 的房源
7. 用户进入个人中心查看自己的房源
8. 管理员审核通过后，房源变为 `PUBLISHED`

### 管理员新增平台房源

1. 管理员进入 `/admin`
2. 点击“新增平台房源”
3. 使用和用户侧复用的房源发布表单
4. 提交到 `POST /api/admin/houses`
5. 后端创建 `source=PLATFORM`、`status=PUBLISHED` 的房源
6. 房源直接展示在前台

### 房源上下架

1. 管理员在后台房源列表点击“下架”
2. 前端调用 `PATCH /api/admin/houses/:id/status`
3. 房源状态变为 `OFFLINE`
4. 前台公共列表不再展示该房源
5. 如果需要恢复，管理员点击“重新上架”
6. 房源状态变回 `PUBLISHED`

### 收藏和取消收藏

1. 用户在详情页点击收藏
2. 前端根据当前收藏状态决定调用收藏或取消收藏接口
3. 收藏状态写入 `Favorite`
4. 个人中心展示“我的收藏”

### 下单和模拟支付

1. 用户在详情页选择入住日期和人数
2. 创建订单，状态为 `PENDING`
3. 用户完成模拟支付
4. 后端将订单状态更新为 `PAID`
5. 管理后台成交金额按 `PAID` 订单聚合
6. 个人中心展示“我的订单”

## 接口设计

### Auth

| Method | Path | 说明 | 权限 |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | 用户注册 | Public |
| POST | `/api/auth/login` | 用户登录 | Public |
| GET | `/api/auth/profile` | 获取当前用户 | User |

### Houses

| Method | Path | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/houses` | 公共房源列表，支持 city/page/pageSize | Public |
| GET | `/api/houses/:id` | 房源详情 | Public |
| POST | `/api/houses/:id/view` | 记录浏览历史 | User |
| GET | `/api/me/houses` | 我的房源 | User |
| POST | `/api/me/houses` | 用户发布房源 | User |
| PATCH | `/api/me/houses/:id` | 修改我的房源 | User |
| DELETE | `/api/me/houses/:id` | 删除我的房源 | User |

### Orders

| Method | Path | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/me/orders` | 我的订单 | User |
| POST | `/api/orders` | 创建订单 | User |
| GET | `/api/orders/:orderNo` | 订单详情 | User |
| PATCH | `/api/orders/:orderNo/pay` | 模拟支付 | User |
| PATCH | `/api/orders/:orderNo/cancel` | 取消订单 | User |

### Favorites / Histories

| Method | Path | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/me/favorites` | 我的收藏 | User |
| POST | `/api/houses/:id/favorite` | 收藏房源 | User |
| DELETE | `/api/houses/:id/favorite` | 取消收藏 | User |
| GET | `/api/me/histories` | 浏览历史 | User |
| DELETE | `/api/me/histories/:id` | 删除浏览历史 | User |

### Admin

| Method | Path | 说明 | 权限 |
| --- | --- | --- | --- |
| GET | `/api/admin/dashboard` | 管理后台看板 | Admin |
| GET | `/api/admin/houses` | 房源管理列表 | Admin |
| POST | `/api/admin/houses` | 创建平台自营房源 | Admin |
| PATCH | `/api/admin/houses/:id` | 修改房源信息 | Admin |
| PATCH | `/api/admin/houses/:id/status` | 修改房源状态 | Admin |
| DELETE | `/api/admin/houses/:id` | 物理删除无订单房源，有订单时转为下架 | Admin |
| GET | `/api/admin/orders` | 订单管理 | Admin |
| GET | `/api/admin/orders/:orderNo` | 订单详情 | Admin |
| PATCH | `/api/admin/orders/:orderNo/status` | 修改订单状态 | Admin |
| GET | `/api/admin/users` | 用户管理 | Admin |
| PATCH | `/api/admin/users/:id/status` | 修改用户状态 | Admin |

### 原接口兼容层

为了保留原纯前端页面的数据结构，后端提供了一组兼容原 `codercba` 接口的数据接口：

- `/api/home/goodprice`
- `/api/home/highscore`
- `/api/home/discount`
- `/api/home/hotrecommenddest`
- `/api/home/longfor`
- `/api/home/plus`
- `/api/entire/list`

这让原首页、热门目的地、探索佛山、你可能想去、全部房源列表可以逐步迁移，而不是一次性推翻重写。

## 图片上传方案

### 当前方案

当前版本为了优先跑通全栈闭环，没有先引入对象存储，而是在前端完成图片压缩后，把图片转成 base64 data URL，随房源 payload 一起提交到后端，保存到数据库字段：

- `coverUrl`
- `imageUrls: String[]`

当前前端支持：

- 多图选择
- 最多 24 张图片
- JPG / PNG / WebP
- 单图最大 8MB
- 上传后自动压缩
- 第一张图片作为封面图
- 图片预览
- 左右箭头浏览预览图
- 拖拽排序

当前方案的优点：

- 实现简单，不依赖第三方存储
- 本地开发和演示稳定
- 便于快速跑通发布房源、管理审核和详情展示链路

当前方案的缺点：

- base64 体积比二进制更大
- 大量图片会增加请求体积
- 图片写入数据库不适合长期生产使用
- 不方便做 CDN、缓存、裁剪和访问权限控制

### 后续 `/api/uploads` 升级计划

下一阶段计划新增独立上传接口：

```text
POST /api/uploads
```

升级方向：

1. 前端仍保留压缩、预览、拖拽排序能力
2. 提交房源前，先把图片上传到 `/api/uploads`
3. 后端使用 `multipart/form-data` 接收文件
4. 后端返回图片 URL、宽高、大小、mimeType 等元信息
5. 房源接口只保存图片 URL，不再保存 base64
6. 本地开发可先保存到 `apps/api/uploads`
7. 生产环境升级到对象存储，比如 S3、Cloudflare R2、阿里云 OSS、七牛云
8. 图片通过 CDN 加速
9. 增加图片删除和无引用图片清理任务

后续可扩展的数据模型：

```text
UploadAsset
├── id
├── url
├── key
├── mimeType
├── size
├── width
├── height
├── ownerId
└── createdAt
```

房源图片可继续使用 `imageUrls: String[]`，也可以升级为 `HouseImage` 表，用于支持排序、封面标记和图片元信息。

## Tailwind + Sass 全量升级计划

当前项目处于过渡状态：

- 老页面大量使用 styled-components
- 新页面已开始使用 SCSS
- Tailwind CSS 已安装配置
- 新增业务页面优先使用 Sass + Tailwind `@apply`

迁移原则：

1. 不一次性推翻旧页面，避免破坏已有 UI
2. 先迁移新增页面和业务页面
3. 稳定后再迁移公共组件
4. 最后迁移首页、详情页和全部房源页

迁移阶段：

### Phase 1：新页面优先

- `/profile`
- `/publish-house`
- `/admin`
- `HousePublishForm`

目标：新业务页面统一使用 SCSS + Tailwind `@apply`。

### Phase 2：公共业务组件

- 房源卡片
- Header 菜单
- Footer
- Section Header
- Section Tabs
- 图片上传组件

目标：减少 styled-components 和 SCSS 混用带来的维护成本。

### Phase 3：原首页和详情页

- `/home`
- `/entire`
- `/detail`

目标：统一设计 token、间距、字体、按钮、卡片和响应式布局。

### Phase 4：样式规范沉淀

- 建立颜色变量
- 建立 spacing 规范
- 建立按钮、表单、卡片、表格的复用样式
- 删除无用 styled-components 文件
- 清理历史 Less 文件

## i18n 国际化计划

当前项目文案以中文为主。后续计划引入国际化能力，支持中文和英文，适配远程岗位对英文读写和国际化经验的要求。

建议技术方案：

- `react-i18next`
- `i18next-browser-languagedetector`
- 文案资源拆分为 `zh-CN` 和 `en-US`
- 后端枚举状态保留英文 code，前端通过 i18n 映射展示文案

目录规划：

```text
apps/web/src/i18n
├── index.ts
├── locales
│   ├── zh-CN
│   │   ├── common.json
│   │   ├── house.json
│   │   ├── order.json
│   │   └── admin.json
│   └── en-US
│       ├── common.json
│       ├── house.json
│       ├── order.json
│       └── admin.json
```

落地步骤：

1. 先抽取 Header、Footer、登录注册弹窗文案
2. 再抽取个人中心和管理后台文案
3. 然后抽取房源发布表单、订单状态、房源状态
4. 最后处理首页运营数据文案
5. 对不同语言长度做 UI 适配，避免固定宽度文本溢出

国际化需要重点关注：

- 中文和英文长度差异
- 按钮文案换行
- 表格列宽
- 状态枚举翻译
- 日期、货币、数字格式
- SEO 和路由语言前缀，后续如走 SSR 再考虑

## 部署方式

### 本地开发

启动 PostgreSQL：

```bash
pnpm db:up
```

执行 Prisma migration：

```bash
pnpm prisma:migrate
```

生成 Prisma Client：

```bash
pnpm prisma:generate
```

导入初始化数据：

```bash
pnpm prisma:seed
```

启动后端：

```bash
pnpm dev:api
```

启动前端：

```bash
pnpm dev:web
```

前端默认访问：

```text
http://localhost:5173
```

后端默认访问：

```text
http://localhost:3001/api
```

### 构建验证

前端构建：

```bash
pnpm build:web
```

后端构建：

```bash
pnpm build:api
```

### 生产部署建议

当前项目可以按三部分部署：

1. 前端静态站点
2. NestJS API 服务
3. PostgreSQL 数据库

前端部署建议：

- Vercel
- Netlify
- Cloudflare Pages

因为当前使用 HashRouter，前端部署到静态站点时对刷新路径更友好，不需要复杂 rewrite 配置。

后端部署建议：

- Render
- Railway
- Fly.io
- Zeabur
- 自建云服务器 Docker 部署

数据库部署建议：

- Supabase PostgreSQL
- Neon PostgreSQL
- Railway PostgreSQL
- Render PostgreSQL
- 自建 PostgreSQL

生产环境需要配置：

```text
DATABASE_URL=postgresql://...
JWT_SECRET=...
PORT=3001
CORS_ORIGIN=https://your-web-domain.com
```

后续如果接入 `/api/uploads`：

```text
UPLOAD_DRIVER=local | s3 | r2 | oss
UPLOAD_PUBLIC_BASE_URL=...
S3_BUCKET=...
S3_REGION=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
```

## 项目亮点

### 1. 从纯前端升级为全栈闭环

项目不是简单写几个 CRUD，而是把原纯前端 Airbnb 页面升级成完整业务闭环：用户、房源、订单、收藏、历史记录和管理后台都有真实数据链路。

### 2. 保留旧页面并逐步迁移

没有推翻原项目，而是通过后端兼容原接口结构，让旧首页和列表页继续可用，再逐步接入新业务。这种迁移方式风险更低，也更符合真实项目重构场景。

### 3. 角色和权限边界清晰

普通用户、房东、管理员职责分离：

- 房东仍属于前台用户
- 管理员才进入后台
- 管理接口统一走 JWT + Admin Role Guard
- 用户发布房源需要审核，管理员平台房源直接上架

### 4. 管理后台具备真实业务语义

管理端不是简单表格展示，而是考虑了订单和财务数据的不可破坏性：

- 有订单的房源下架，不物理删除
- 成交金额按已支付订单统计
- 下架房源可重新上架
- 用户发布房源可审核上架或驳回

### 5. 图片上传体验完整

当前虽然还没有接对象存储，但前端体验已经完整：

- 多图上传
- 图片压缩
- 图片预览
- 左右切换
- 拖拽排序
- 封面图规则
- 管理端和用户端复用同一套表单组件

### 6. 重视前端体验和控制台质量

项目修复了 React Router future warning、Redux selector warning 和 react-transition-group `findDOMNode` warning，避免演示时控制台出现明显噪音。

### 7. 有明确的后续工程化路线

项目已经规划了：

- `/api/uploads` 文件上传服务
- Tailwind + Sass 全量样式迁移
- i18n 国际化
- TypeScript 逐步迁移
- 生产环境分层部署
- 后续对象存储和 CDN

## 当前边界和后续优化

当前 V1 仍有一些边界：

- 图片暂存为 base64 data URL，不适合长期生产
- 支付是模拟支付，没有接真实支付渠道
- 前端仍存在 styled-components、SCSS、Less 多套样式并存
- Redux Toolkit 和未来 Zustand 状态边界需要继续梳理
- 当前还是 React 18，后续可评估升级 React 19
- i18n 还处于计划阶段
- API 需要补充 Swagger 文档和 e2e 测试

后续优先级建议：

1. 接入 `/api/uploads`
2. 抽离图片组件为更纯的业务组件
3. 管理端增加编辑房源能力
4. 订单详情和售后状态完善
5. 引入 i18n
6. 样式逐步统一到 Sass + Tailwind
7. 增加接口测试和核心流程 e2e 测试
