# Airbnb 重构计划

> 历史快照：本文是早期重构计划记录，部分描述仍对应迁移前的根目录前端工程和 `/api/proxy` 方案。当前项目已整理为 `apps/web` + `apps/api` 的 pnpm workspace，前端请求 NestJS API。

## 目标

本次重构的第一轮目标聚焦在以下几件事：

- 将构建链从 `Create React App + CRACO` 迁移到 `Vite`
- 引入 `Tailwind CSS` 作为新的样式基础设施
- 保持现有业务功能、页面结构和部署能力不被破坏
- 逐步替换项目中的 `styled-components`
- 暂时保留 `Ant Design`

本次重构不追求一次性完成所有技术升级，尤其不把 `React 19`、`Zustand`、路由策略调整绑定到第一轮实施范围中。

## 重构原则

1. 先迁移基础设施，再迁移页面样式
2. 每个阶段都保持项目可运行、可构建、可部署
3. 允许新旧样式方案短期共存，不追求一步到位
4. 每完成一个阶段就单独提交，确保可以回退

## 当前项目现状

### 构建与运行

- 当前脚手架：`Create React App`
- 当前配置扩展：`CRACO`
- 当前路由：`react-router-dom` + `HashRouter`
- 当前状态管理：`Redux Toolkit`
- 当前部署：`Vercel`
- 当前 API 方案：前端请求 `/api/proxy`，再由 Vercel Function 进行转发

### 样式来源

当前项目样式来源一共有三层：

1. `styled-components`
2. 全局 `Less`
3. 第三方组件样式（`Ant Design`、`normalize.css`）

### 已确认的样式入口

- [src/main.jsx](/Users/canlanshaw/bishe/project/airbhb/src/main.jsx)
- [src/assets/css/reset.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/reset.less)
- [src/assets/css/variable.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/variable.less)
- [src/assets/theme/index.js](/Users/canlanshaw/bishe/project/airbhb/src/assets/theme/index.js)

### styled-components 分布概况

`styled-components` 已经覆盖：

- 页面级容器：`home`、`entire`、`detail`
- 通用组件：`header`、`footer`、`room-item`、`section-*`
- 基础 UI：`scroll-view`、`indicator`、`picture-preview`

这说明当前项目样式是“组件分散定义”的模式，适合按“页面 + 通用层”逐步迁移，而不适合一次性全局替换。

## 第一轮明确不做的事

为了控制风险，本轮不做以下事项：

- 不迁移到 `React 19`
- 不把 `Redux Toolkit` 替换成 `Zustand`
- 不大规模替换 `Ant Design`
- 不重做业务交互和页面信息架构

如果后续需要处理这些内容，在第一轮重构稳定后另开阶段。

## 分阶段计划

### Phase 0：建立基线

目标：先记录当前项目的真实行为，作为后续回归依据。

计划内容：

- 记录首页、列表页、详情页、登录/注册、支付流程
- 记录当前 Vercel 部署方式和环境变量依赖
- 为关键页面保留截图或对照记录
- 明确“哪些功能必须保持不变”

完成标准：

- 有一份功能基线记录
- 有一份迁移边界说明

### Phase 1：CRA/CRACO 迁移到 Vite

目标：只替换构建工具，不主动改变视觉和业务逻辑。

计划内容：

- 新建 Vite 配置
- 迁移入口文件、路径别名、环境变量使用方式
- 保留现有 `HashRouter`、`Redux Toolkit`、`Ant Design`、`axios`、Vercel API 代理
- 确认本地开发、生产构建和 Vercel 部署都正常

完成标准：

- 项目在 Vite 下可正常启动
- `pnpm build` 正常
- Vercel 可部署
- 页面和原项目行为一致

### Phase 2：接入 Tailwind CSS

目标：建立新的样式基础设施，但不要求立即替换旧样式。

计划内容：

- 配置 Tailwind CSS
- 建立基础设计 token：颜色、间距、圆角、阴影、字体、容器宽度
- 明确公共类名和布局约定
- 验证 Tailwind 与现有组件共存

完成标准：

- Tailwind 可正常编译
- 新组件或局部页面可以开始使用 Tailwind
- 不破坏当前页面

### Phase 3：迁移全局层和通用层

目标：优先迁移收益最高、复用最多的样式区域。

优先顺序：

- 全局布局容器
- Header / Footer
- Section 外层结构
- 通用卡片、标签、列表项外层
- 常见间距与排版规则

完成标准：

- 通用布局开始摆脱 `styled-components`
- 页面骨架样式趋于统一

### Phase 4：逐页迁移业务页面样式

目标：按页面而不是按零散组件推进。

推荐顺序：

1. 首页 `home`
2. 列表页 `entire`
3. 详情页 `detail`
4. 登录/注册/支付相关弹层和表单

完成标准：

- 每迁完一页都能单独验证
- 页面结构、交互和数据加载保持正常

### Phase 5：清理旧样式依赖

目标：在主要页面迁移完成后，统一收尾。

计划内容：

- 清理未使用的 `style.js` / `styled.js`
- 清理无效的主题注入
- 评估是否还能保留部分 Less
- 最终移除 `styled-components`

完成标准：

- 样式来源收敛
- 依赖关系变得更简单

## 第一阶段迁移范围

### 第一阶段纳入范围

- 构建工具迁移到 Vite
- 保留 `HashRouter`
- 保留 `Redux Toolkit`
- 保留 `Ant Design`
- 保留 Vercel API 代理能力
- 保留现有页面结构和交互逻辑

### 第一阶段排除范围

- 视觉风格大改
- 全量组件重写
- 状态管理重构
- 表单体系替换
- 日期组件替换

## 迁移顺序建议

建议按照以下顺序实际推进：

1. 建立基线和文档
2. 完成 Vite 迁移
3. 接入 Tailwind
4. 先迁移通用层
5. 再逐页迁移页面样式
6. 最后清理旧样式依赖

## 风险点

当前项目在重构过程中需要重点关注以下风险：

- `HashRouter` 在 Vite 中的入口与资源路径表现
- `styled-components` 主题对象迁移后是否仍被旧组件依赖
- Less 变量和 Tailwind token 在过渡期的重复维护
- `Ant Design` 与 Tailwind 混用时的层级、间距和重置样式冲突
- Vercel 部署时静态资源和 API 代理行为是否一致

## 每阶段完成后的检查项

- 本地开发是否正常
- 生产构建是否正常
- 首页是否正常加载数据
- 列表页分页是否正常
- 详情页信息和预览是否正常
- 登录/注册/支付流程是否正常
- Vercel 部署是否正常

## 当前分支

本轮重构分支：

```text
refactor/vite-tailwind
```

后续所有第一轮重构工作都在该分支上进行，直到迁移稳定后再决定如何合并回主线。
