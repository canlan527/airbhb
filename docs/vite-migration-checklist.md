# Airbnb Phase 1：Vite 迁移清单

## 目的

本文档用于梳理当前项目从 `Create React App + CRACO` 迁移到 `Vite` 时会涉及的文件、配置和注意事项。

本阶段目标是：

- 只替换构建工具
- 保持现有页面结构、路由、状态管理和部署方式不变
- 不主动重构 UI 和业务逻辑

## 当前 CRA / CRACO 依赖点

### 1. 脚手架与脚本

当前脚本定义见 [package.json](/Users/canlanshaw/bishe/project/airbhb/package.json)。

当前依赖点：

- `react-scripts`
- `@craco/craco`
- `craco-less`

当前脚本：

- `start: craco start`
- `build: craco build`
- `test: craco test`
- `eject: react-scripts eject`

迁移到 Vite 后，以上脚本和相关依赖都需要调整。

### 2. CRACO 配置

迁移前配置位于 `craco.config.js`。

当前 CRACO 主要承担两件事：

- 开启 Less 支持
- 配置路径别名 `@ -> src`

迁移到 Vite 后，这两项都要改到 Vite 配置里。

### 3. React 入口

迁移前入口为 `src/index.js`，迁移后入口为 [src/main.jsx](/Users/canlanshaw/bishe/project/airbhb/src/main.jsx)。

当前入口依赖：

- `react-dom/client`
- `HashRouter`
- `Redux Provider`
- `styled-components ThemeProvider`
- `normalize.css`
- `reset.less`
- `antd/dist/reset.css`

迁移到 Vite 后：

- 入口文件通常会改为 `src/main.jsx`
- 挂载逻辑本身可以保持不变
- 样式导入顺序需要保持一致

### 4. HTML 模板

当前模板见 [public/index.html](/Users/canlanshaw/bishe/project/airbhb/public/index.html)。

当前 CRA 特征：

- 使用 `%PUBLIC_URL%`
- 根节点为 `<div id="root"></div>`
- 由 CRA 自动注入脚本

迁移到 Vite 后：

- 根 HTML 会移动到项目根目录 `index.html`
- `%PUBLIC_URL%` 语法不能继续使用
- 需要手动引入入口脚本，例如 `/src/main.jsx`

### 5. public 静态资源

当前 `public` 目录包含：

- `favicon.ico`
- `logo192.png`
- `logo512.png`
- `manifest.json`
- `robots.txt`

迁移到 Vite 后：

- `public` 目录仍可保留
- 资源会按 Vite 的 `public` 规则直接拷贝
- `manifest.json` 和 CRA 默认 logo 是否继续保留，需要单独决定

### 6. 环境变量

当前环境变量使用位置见 [src/services/request/config.js](/Users/canlanshaw/bishe/project/airbhb/src/services/request/config.js)。

当前写法：

```js
process.env.REACT_APP_API_BASE_URL
```

当前环境文件：

- [.env.example](/Users/canlanshaw/bishe/project/airbhb/.env.example)
- `.env.local`（已忽略）

迁移到 Vite 后需要改成：

```js
import.meta.env.VITE_API_BASE_URL
```

对应环境文件中的键名已改成：

```env
VITE_API_BASE_URL=...
```

注意：

- `API_BASE_URL` 仍然保留给 Vercel Function 使用
- `VITE_API_BASE_URL` 只用于前端本地开发直连接口

### 7. 路径别名

当前项目大量使用 `@/` 别名。

例如：

- `@/router`
- `@/components/header`
- `@/assets/theme`

迁移到 Vite 后，必须在 Vite 配置中继续提供：

```text
@ -> /src
```

否则现有 import 会全部失效。

### 8. Less 支持

当前项目直接导入：

- [src/assets/css/reset.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/reset.less)

同时使用：

- [src/assets/css/variable.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/variable.less)

迁移到 Vite 后仍需确认：

- Less 可正常编译
- 全局 reset 不丢失
- 后续接入 Tailwind 时不会和 Less 导入顺序冲突

### 9. 路由与懒加载

当前路由定义见 [src/router/index.js](/Users/canlanshaw/bishe/project/airbhb/src/router/index.js)。

当前依赖：

- `HashRouter`
- `React.lazy`
- `Suspense`
- `useRoutes`

这些逻辑在 Vite 下可以保持不变，本阶段不调整为 `BrowserRouter`。

### 10. 测试与 CRA 默认文件

当前项目中未发现以下 CRA 常见文件：

- `reportWebVitals`
- `setupTests`
- `serviceWorker`

这意味着本次迁移不会额外处理这些文件，复杂度较低。

## Phase 1 实际迁移范围

本阶段计划改动的内容：

- 新增 `vite.config.*`
- 新增根目录 `index.html`
- 将入口从 `src/index.js` 调整为 `src/main.jsx`
- 更新 `package.json` 脚本和依赖
- 替换 CRACO 配置为 Vite 配置
- 更新前端环境变量命名
- 确认 Less、别名、HashRouter、Redux、ThemeProvider 继续正常工作

本阶段暂不改动的内容：

- 页面结构
- 业务逻辑
- `styled-components`
- `Ant Design`
- `Redux Toolkit`
- Vercel API 代理结构

## 建议的迁移步骤

1. 安装 Vite 和 React 插件
2. 新建 `vite.config.*`
3. 配置别名 `@`
4. 确认 Less 可用
5. 新建根目录 `index.html`
6. 将 `src/index.js` 改成 `src/main.jsx`
7. 更新 `package.json` 脚本
8. 删除不再需要的 CRA / CRACO 依赖
9. 将 `REACT_APP_API_BASE_URL` 改为 `VITE_API_BASE_URL`
10. 本地运行并修复构建差异
11. 跑一次生产构建
12. 验证 Vercel 部署

## 迁移后重点检查项

### 本地开发

- `pnpm dev` 能启动
- 首页能加载
- 列表页能加载
- 详情页能打开
- 登录/注册弹窗正常

### 构建

- `pnpm build` 正常
- 构建产物目录符合 Vite 习惯

### 环境变量

- 本地 `.env.local` 生效
- 线上仍然通过 `/api/proxy` 请求

### 部署

- Vercel 构建命令需要切换
- 输出目录需要从 `build` 改成 `dist`

## 迁移完成后的预期结果

完成 Phase 1 后，项目应达到以下状态：

- 使用 Vite 本地开发
- 使用 Vite 生产构建
- 页面功能与当前版本保持一致
- 样式体系暂不重构，但后续可以平稳接入 Tailwind
