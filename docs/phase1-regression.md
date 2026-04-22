# Phase 1 回归检查记录

> 历史快照：本文记录第一阶段迁移时的回归结果，部分命令和路径是当时的项目结构。当前请使用根目录 workspace 脚本，例如 `pnpm build:web`、`pnpm dev:web` 和 `pnpm build:api`。

## 检查时间

2026-04-21

## 当前阶段

`CRA + CRACO` 已迁移到 `Vite`。

## 已执行检查

### 生产构建

执行命令：

```bash
pnpm run build
```

结果：

- 通过
- 构建产物输出到 `dist`

构建提示：

- `store` 依赖内部存在 `eval` warning
- Vite 提示部分 chunk 体积超过 500 kB

以上两项当前不阻塞构建和部署，可在后续优化阶段处理。

### Vite 开发服务

执行命令：

```bash
pnpm run dev --host 127.0.0.1 --port 4173
```

实际端口：

```text
http://127.0.0.1:4174/
```

检查结果：

- 页面入口 HTTP 状态码为 `200`
- HTML 中正确加载 `/@vite/client`
- HTML 中正确加载 `/src/main.jsx`

### 生产预览服务

执行命令：

```bash
pnpm run preview --host 127.0.0.1 --port 4176
```

检查结果：

- 页面入口 HTTP 状态码为 `200`
- HTML 中正确加载 `dist/assets/*` 构建产物

### 真实 API 连通性

已检查接口：

```text
http://codercba.com:1888/airbnb/api/home/goodprice
http://codercba.com:1888/airbnb/api/entire/list?offset=0&size=20
```

检查结果：

- `/home/goodprice` 返回 `200`
- `/entire/list` 返回 `200`

### Vercel API 代理函数

本地 mock 调用 [api/proxy.js](/Users/canlanshaw/bishe/project/airbhb/api/proxy.js)，设置：

```env
API_BASE_URL=http://codercba.com:1888/airbnb/api
```

模拟请求：

```text
/api/proxy/home/goodprice
```

检查结果：

- 返回状态码 `200`
- 正确返回首页 `good_price` 数据

## 尚未完成的人工浏览器检查

当前仓库没有浏览器自动化工具，因此以下检查需要人工在浏览器中完成：

- 首页视觉和数据是否正常
- 列表页视觉、分页和房源卡片点击是否正常
- 详情页图片预览是否正常
- 登录弹窗是否正常
- 注册弹窗是否正常
- 退出是否正常
- 日期选择器是否正常
- 支付流程是否正常

## 本轮结论

从命令行和服务层检查结果看，`Vite` 迁移后的基础链路已通过：

- 本地开发入口可访问
- 生产构建可通过
- 生产预览入口可访问
- 真实 API 可达
- Vercel 代理函数逻辑可用

下一步建议先进行人工浏览器回归。如果核心页面和交互都正常，可以提交 Phase 1 迁移改动。
