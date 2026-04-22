# Airbnb 当前功能基线

> 历史快照：本文记录的是迁移前后的阶段性基线，部分路径仍保留旧的根目录 `src/*` 写法。当前前端工程已迁移到 `apps/web`，实际入口以 `apps/web/src/main.jsx` 和 `apps/web/src/router/index.jsx` 为准。

## 目的

本文档用于记录当前项目在重构开始前的可见行为、数据流和关键依赖，作为后续迁移到 `Vite`、接入 `Tailwind CSS`、逐步替换 `styled-components` 时的回归依据。

## 当前路由

路由定义见 [src/router/index.js](/Users/canlanshaw/bishe/project/airbhb/src/router/index.js)。

当前主要路由如下：

- `/`：重定向到 `/home`
- `/home`：首页
- `/entire`：房源列表页
- `/detail/:id`：房源详情页
- `/demo`：演示页
- `/demo/indicator`：指示器演示页

其中业务主路径为 `/home`、`/entire`、`/detail/:id`。

## 当前全局运行方式

入口见 [src/main.jsx](/Users/canlanshaw/bishe/project/airbhb/src/main.jsx)。

当前全局运行特征：

- 使用 `HashRouter`
- 使用 `Redux Toolkit` 组织全局状态
- 使用 `styled-components` 的 `ThemeProvider`
- 使用 `normalize.css`
- 使用全局 `Less reset`
- 使用 `Ant Design reset`

## 当前页面与核心行为

### 首页 `/home`

页面入口见 [src/views/home/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/home/index.jsx)。

当前行为：

- 页面加载时会滚动到顶部
- 页面加载时会设置 Header 为固定状态，且启用透明态
- 页面加载时会并行请求首页多组数据
- 页面渲染包含以下内容块：
  - Banner
  - 热门目的地
  - 高性价比房源
  - 你可能想去
  - 高分好评房源
  - 热门推荐目的地
  - Plus 房源

首页接口定义见 [src/services/modules/home.js](/Users/canlanshaw/bishe/project/airbhb/src/services/modules/home.js)。

当前首页接口包括：

- `/home/goodprice`
- `/home/highscore`
- `/home/discount`
- `/home/hotrecommenddest`
- `/home/longfor`
- `/home/plus`

首页状态模块见 [src/store/modules/home.js](/Users/canlanshaw/bishe/project/airbhb/src/store/modules/home.js)。

### 房源列表页 `/entire`

页面入口见 [src/views/entire/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/entire/index.jsx)。

当前行为：

- 页面加载时会滚动到顶部
- 页面加载时会设置 Header 为固定状态，关闭透明态
- 页面加载时会拉取房源列表数据
- 页面包含筛选标签区、房源列表区和分页区
- 点击房源卡片会写入详情数据到 store，并跳转到对应详情页
- 分页使用 `Ant Design Pagination`

列表接口定义见 [src/services/modules/entire.js](/Users/canlanshaw/bishe/project/airbhb/src/services/modules/entire.js)。

当前列表接口：

- `/entire/list`

分页与列表逻辑见：

- [src/views/entire/c-cpns/entire-roomlist/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/entire/c-cpns/entire-roomlist/index.jsx)
- [src/views/entire/c-cpns/entire-pagination/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/entire/c-cpns/entire-pagination/index.jsx)
- [src/store/modules/entire/actionCreators.js](/Users/canlanshaw/bishe/project/airbhb/src/store/modules/entire/actionCreators.js)

当前已知实现特征：

- 每页 20 条
- 页码切换时会更新 store 中的 `currentPage`
- 点击房源卡片后并不会重新请求详情接口，而是直接使用列表项数据写入详情 store

### 房源详情页 `/detail/:id`

页面入口见 [src/views/detail/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/detail/index.jsx)。

当前行为：

- 页面加载时会滚动到顶部
- 页面加载时会设置 Header 为非固定状态，关闭透明态
- 页面由图片区域和详情信息区域组成
- 页面详情数据主要来自 `detail` store，而不是通过详情路由参数重新请求接口

详情数据模块见 [src/store/modules/detail.js](/Users/canlanshaw/bishe/project/airbhb/src/store/modules/detail.js)。

当前已知实现特征：

- `detail` store 内含一份默认详情数据，作为直接访问详情页时的兜底
- 从列表页点击进入详情页时，会把列表项写入 store，覆盖默认详情数据

#### 详情页图片区

相关文件：

- [src/views/detail/c-cpns/detail-pictures/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/detail/c-cpns/detail-pictures/index.jsx)
- [src/base-ui/picture-preview/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/base-ui/picture-preview/index.jsx)

当前行为：

- 左侧主图和右侧缩略图都可触发预览
- 点击“查看照片”会打开图片预览

#### 详情页预订与支付

核心逻辑见 [src/views/detail/c-cpns/detail-info/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/detail/c-cpns/detail-info/index.jsx)。

当前行为：

- 可选择日期区间
- 可选择入住人数
- 会根据房价、天数和人数计算总价
- 未登录时点击继续预定，会提示“请先登录”
- 已登录后可进入信用卡支付表单
- 支付过程有 loading 状态
- 支付完成后按钮显示为“已预定”
- 已支付订单会从本地存储恢复，恢复内容包括：
  - 日期
  - 入住天数
  - 人数
  - 总价
  - 支付完成状态

## Header、登录与用户状态

相关文件：

- [src/components/header/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/components/header/index.jsx)
- [src/components/header/c-cpns/header-right/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/components/header/c-cpns/header-right/index.jsx)
- [src/store/modules/main.js](/Users/canlanshaw/bishe/project/airbhb/src/store/modules/main.js)

当前 Header 行为：

- 会根据页面切换 `isFixed` 和 `alpha`
- 首页顶部支持透明态 Header
- 搜索区域支持展开/收起
- 打开搜索态后，滚动超过一定距离会自动收起

当前登录与注册行为：

- 用户注册和登录通过 `Ant Design Modal + Form` 完成
- 用户信息保存在浏览器本地存储
- 登录成功后 Header 展示当前用户名和退出入口
- 退出后会清空当前登录用户名

## 当前本地存储键

当前代码中使用的本地存储键包括：

- `airbnb-info`：用户列表
- `airbnb-info-cur`：当前登录用户名
- `airbnb-info-pay`：当前支付记录

键使用位置可参考：

- [src/components/header/c-cpns/header-right/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/components/header/c-cpns/header-right/index.jsx)
- [src/views/detail/c-cpns/detail-info/index.jsx](/Users/canlanshaw/bishe/project/airbhb/src/views/detail/c-cpns/detail-info/index.jsx)

## 当前部署与接口代理基线

当前前端请求基线配置见 [src/services/request/config.js](/Users/canlanshaw/bishe/project/airbhb/src/services/request/config.js)。

当前基线：

- 前端默认请求 `/api/proxy`
- 本地开发可通过 `VITE_API_BASE_URL` 直接指向真实接口

当前 Vercel 代理相关文件：

- [api/proxy.js](/Users/canlanshaw/bishe/project/airbhb/api/proxy.js)
- [vercel.json](/Users/canlanshaw/bishe/project/airbhb/vercel.json)

当前部署依赖的服务端环境变量：

- `API_BASE_URL`

## 当前样式基线

当前样式来源：

- `styled-components`
- 全局 `Less`
- `Ant Design`
- `normalize.css`

主要样式入口：

- [src/main.jsx](/Users/canlanshaw/bishe/project/airbhb/src/main.jsx)
- [src/assets/css/reset.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/reset.less)
- [src/assets/css/variable.less](/Users/canlanshaw/bishe/project/airbhb/src/assets/css/variable.less)
- [src/assets/theme/index.js](/Users/canlanshaw/bishe/project/airbhb/src/assets/theme/index.js)

## 重构期间必须保持不变的事项

以下行为在第一轮重构期间应尽量保持不变：

- `/home`、`/entire`、`/detail/:id` 三个核心业务页面继续可用
- Header 在三个主页面的固定/透明逻辑保持一致
- 首页与列表页的数据仍能正常加载
- 点击列表项仍能进入详情页
- 详情页图片预览仍能工作
- 登录、注册、退出逻辑仍能工作
- 详情页支付与已预定恢复逻辑仍能工作
- Vercel 部署后 API 代理继续可用

## 每次阶段提交前的回归检查项

### 基础检查

- 本地开发服务可启动
- 生产构建可通过
- 首页可打开
- 列表页可打开
- 详情页可打开

### 数据检查

- 首页各板块数据能正常渲染
- 列表页房源列表可加载
- 分页可切换
- 详情页价格、评论、图片可显示

### 交互检查

- Header 搜索展开/收起正常
- 登录弹窗正常
- 注册弹窗正常
- 退出正常
- 日期选择器正常
- 人数输入正常
- 预定和支付流程正常

### 部署检查

- `pnpm build` 正常
- Vercel 部署正常
- 浏览器中 `/api/proxy/*` 请求不返回 404
