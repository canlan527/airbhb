# Phase 6 样式迁移与主题统一记录

## 记录时间

2026-04-24

## 目标

本轮工作聚焦 Phase 6：

1. 将 `apps/web/src` 中剩余的 `styled-components` 全部迁移为 `SCSS + Tailwind @apply`
2. 保持首页、列表页、详情页、Header 等核心页面视觉一致
3. 建立 Tailwind 主题 token 作为新的样式设计基座
4. 统一 `tailwind.css` 与 `fullstack.scss` 的 token 命名

## 本轮结论

本轮迁移已完成 Web 主站样式技术栈收口：

- `apps/web/src` 业务代码中的 `styled-components` 已完成迁移
- 原 `ThemeProvider` 已从 `main.jsx` 和 `header/index.jsx` 移除
- 新样式体系统一为：
  - 组件和页面：`style.scss + @apply`
  - 复杂动画、渐变、伪元素：保留普通 SCSS
  - 主题来源：`tailwind.css` 中的 `@theme`
  - 运行时动态状态：通过 CSS 变量传递
- `pnpm build:web` 已通过

## 完成的迁移范围

### Base UI

- `base-ui/indicator`
- `base-ui/scroll-view`
- `base-ui/picture-preview`

### 公共组件

- `header`
- `header-left`
- `header-right`
- `header-center`
- `search-tabs`
- `search-types`
- `section-header`
- `section-bottom`
- `section-tabs`
- `room-item`
- `room-card-skeleton`
- `longfor-item`

### 页面级模块

- `views/entire`
- `views/detail`
- `views/demo`

### 相关支持改动

- 详情页新增真实骨架屏逻辑
- 详情页通过 `/houses/:id` 获取真实详情并映射到旧页面结构
- 首页、列表页、详情页相关响应式修复继续保留

## Tailwind 主题架构

### 新主题源

主题入口文件：

- `apps/web/src/assets/css/tailwind.css`

已建立的核心 token：

- 颜色：
  - `--color-brand`
  - `--color-accent`
  - `--color-accent-strong`
  - `--color-ink`
  - `--color-ink-strong`
  - `--color-ink-muted`
  - `--color-ink-soft`
  - `--color-ink-subtle`
  - `--color-page-text`
  - `--color-heading`
  - `--color-muted`
  - `--color-border`
  - `--color-border-soft`
  - `--color-panel`
  - `--color-surface-soft`
  - `--color-surface-hover`
  - `--color-surface-overlay`
  - `--color-surface-dark`
  - `--color-tag`
  - `--color-tag-text`
  - `--color-danger`
  - `--color-warning`
  - `--color-success`
- 圆角：
  - `--radius-md`
- 阴影：
  - `--shadow-elevated-hover`
  - `--shadow-surface-sm`
  - `--shadow-surface-md`
  - `--shadow-surface-lg`

### 使用原则

- 常规布局、间距、边框、颜色优先使用 `@apply`
- 静态色值优先改为主题 token
- 复杂 hover 阴影改为 `var(--shadow-*)`
- Header 透明态等运行时状态继续通过组件根节点 CSS 变量传递

## 命名统一结果

### 已完成

原 `fullstack.scss` 中的 `--airbhb-*` 命名已从业务样式使用面移除，统一改为：

- `--color-*`
- `--radius-*`
- `--shadow-*`

涉及文件：

- `apps/web/src/assets/css/fullstack.scss`
- `apps/web/src/views/profile/style.scss`
- `apps/web/src/views/admin/style.scss`
- `apps/web/src/components/house-publish-form/style.scss`

### 兼容层状态

以下文件仍保留，但语义已与新主题对齐：

- `apps/web/src/assets/theme/index.js`
- `apps/web/src/assets/css/variable.less`

它们当前的作用是兼容层，而不是新的主题源。

## 本轮重点修复的视觉问题

### 首页

- 修复 `Plus 房源` 在大屏下卡片宽度不一致的问题
- 修复 `Plus 房源` 在移动端图片大小不一致的问题
- 统一横向滚动区按钮和指示器样式

### Header

- 修复 Logo 颜色丢失问题
- 修复透明头部下 `menu-right` 图标颜色错误
- 保留搜索框交互逻辑和搜索态动画

### Detail

- 修复详情页 footer 上移问题
- 修复详情页顶部多余留白
- 修复详情页图片区中间空隙与 grid/gap 问题
- 新增详情页骨架屏
- 完成 `detail` 页面样式从 `styled-components` 到 `scss` 的迁移

## 当前收益

### 工程收益

- 样式技术栈统一
- 新组件开发不再需要依赖 `styled-components`
- 主题 token 开始集中管理
- 后续做换肤、色彩调整、品牌统一的成本显著下降

### 维护收益

- 样式来源更清晰
- 颜色和边框不再到处分散硬编码
- Header / 首页 / 详情 / 列表 等核心区域已具备统一的主题语义

## 尚未完全收口的部分

以下内容不影响当前使用，但后续仍可继续优化：

1. 少量 SVG 文件中的内嵌 fill 颜色
2. 少量 JSON 数据中的展示色值
3. `assets/theme/index.js` 与 `variable.less` 是否继续瘦身
4. 主题 token 是否进一步扩展为更完整的 spacing / radius / motion 体系

## 建议的下一步

### 优先建议

1. 对首页、列表页、详情页、管理后台做一次完整视觉回归
2. 检查透明 Header、搜索态、详情图片预览等高交互区域
3. 若无回归，再继续推进业务开发

### 架构方向

后续新增样式建议遵循以下规则：

1. 优先从 `tailwind.css` 的 `@theme` 取 token
2. 组件样式使用 `style.scss + @apply`
3. 复杂动画、渐变、伪元素使用普通 SCSS
4. 动态状态通过 CSS 变量传值，不重新引入运行时主题系统

## 对应提交

本轮已提交：

- `7695681` `refactor(web): replace styled-components with tailwind scss tokens`
