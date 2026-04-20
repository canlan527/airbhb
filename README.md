# airbnb 爱彼迎PC网站
本项目使用 `react18 + hooks + redux toolkit + react-router6 + axios + ant design + CSS IN JS` 完成爱彼迎PC端页面，开发首页，列表页，详情页页面，具有头部动画，图片预览、前端本地化存储实现注册、登录、支付等功能。
## 安装依赖
```bash
npm install
pnpm install
```

## 启动项目
```bash
npm run start
pnpm run start
```

## 项目打包

```bash
npm run build
pnpm run build
```

## 项目结构
```bash
├── node_modules
├── public
└── src
    ├── assets # 静态资源
    │   ├── css # css静态资源
    │   ├── data # 本地数据静态资源
    │   ├── img # 图片
    │   │   ├── common
    │   │   ├── home
    │   │   └── icon
    │   ├── svg 图标
    │   │   └── utils
    │   └── theme # css主题配置
    ├── base-ui # 项目基础ui组件
    │   ├── indicator # 指示器组件
    │   ├── picture-preview # 图片预览组件
    │   └── scroll-view # 滚动组件
    ├── components # 项目组件
    │   ├── footer # footer
    │   ├── header # header
    │   │   └── c-cpns # header子组件
    │   │       ├── header-center 
    │   │       │   └── c-cpns # header center子组件
    │   │       │       ├── search-tabs
    │   │       │       └── search-types
    │   │       ├── header-left
    │   │       └── header-right
    │   ├── longfor-item # “想去的”item组件
    │   ├── room-item # 房间 item 组件
    │   ├── section-bottom # section底部部分
    │   ├── section-header # section顶部部分
    │   ├── section-room # section-room部分
    │   └── section-tabs # section tabs部分
    ├── hooks # 项目hooks
    ├── router # 路由
    ├── services # 接口部分
    │   ├── modules # 接口modules
    │   └── request # 封装axios
    ├── store # redux
    │   └── modules # redux modules
    ├── utils # 项目工具库
    └── views # 页面
        ├── detail # 详情页
        │   └── c-cpns # 详情页子组件
        │       ├── detail-info # 详情信息组件
        │       └── detail-pictures # 图片区域组件
        ├── entire # 列表页
        │   └── c-cpns # 列表页子组件
        │       ├── entire-pagination # 分页器组件
        │       ├── entire-roomlist # 房源列表组件
        │       └── entire-tabs # 列表页tabs
        └── home # 首页
            └── c-cpns # 首页子组件
                ├── banner # 首页横幅
                ├── home-longfor # 首页想去的部分组件
                ├── home-section-v1 # 首页section布局v1
                ├── home-section-v2 # 首页section布局v2
                └── home-section-v3 # 首页section布局v3

```
## 技术栈介绍

### pnpm
添加.npmrc配置

设置 pnpm 安装依赖时，自动安装同辈 peers 依赖

```bash
auto-install-peers=true
```

### craco
全称 `create react app config`
我们想要配置 路径别名的话，除了运行 `npm run eject` 弹出 react 自动集成的 webpack 配置外，还可以使用 carco 这个工具帮助我们将我们添加的配置和 react 脚手架原本的配置合并。
```bash
pnpm add -D @craco/craco
```
配置文件，配置别名

```jsx
// craco.config.js
const path = require('path')

const resovle = (pathname) => path.resolve(__dirname, pathname) 

module.exports = {
  webpack: {
    alias: {
      '@': resovle('src')
    }
  }
}
```

修改package.json

```jsx
"scripts": {
    "start": "craco start", // 将react-scripts 改为craco
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

这样我们运行命令

```jsx
craco run start
```

项目就能启动

配置 less

craco-less的github地址：https://github.com/DocSpring/craco-less

安装

```jsx
pnpm add craco-less -D
```

配置

```jsx
// croco.config.js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
};
```

由于修改了配置文件，我们重启项目，就可以使用@别名和less语法了。

### 重置CSS样式
- normalize.css

```jsx
pnpm add normalize.css
```

引入

```jsx
// index.js
import 'normalize.css'
```

这样打包的时候该文件就在webapck依赖图里了。

- reset.css

```jsx
// assets/css
 - variable.less
 - reset.less
 - index.less

// index.js
 - import '@/assets/css/index.less';

```

### 封装SVG

- 原因：

svg是一些体积很小的资源文件，使用svg比直接使用png要好很多

#### 使用方式：

方式一： img src引入

  ```jsx
  <img src="logo.svg" />
  ```

这样做的话，用户访问页面，浏览器执行到这里会异步加载图片资源

方式二：复制svg标签到组件里

  这样做的话，svg就随着浏览器加载html一起加载svg资源，减少服务器访问次数，缓解服务器压力。

注意：

- 由于svg标签过长，直接放入业务布局组件里会导致当前组件冗长，不方便开发，所以我们需要抽离到单独度jsx文件里，直接返回svg标签即可。
- 由于svg的行内样式是html字符串，我们使用jsx语法，所以需要将样式转成对象

封装方法

```jsx
// utils
function cssToObj(css) {
  var obj = {}, s = css.toLowerCase().replace(/-(.)/g, function (m, g) {
      return g.toUpperCase();
  }).replace(/;\s?$/g,"").split(/:|;/g);
  for (var i = 0; i < s.length; i += 2)
      obj[s[i].replace(/\s/g,"")] = s[i+1].replace(/^\s+|\s+$/g,"");
  return obj;
}

export default cssToObj

// svg组件应用
import React, { memo } from 'react'
import cssToObj from './utils'

const IconArrow = memo(() => {
  return (
    <svg style={cssToObj("height: 24px; width: 24px; display: block; fill: currentcolor;")}>
				<path></path>
		</svg>
  )
})

export default IconArrow
```

### 本地化存储
项目的注册、登录和支付功能都是以本地化存储为主要技术的功能实现

安装
```bash
pnpm add store
```
通过 store 本地化存储库用localstorage存储注册信息，登录用户名信息和完成支付信息
- 存
  ```jsx
  store.set(key, value)
  ```
- 取
  ```jsx
  store.get(key)
  ```
> 使用该库的原因:
> 1. 简化接口： localStorage 作为浏览器提供的原生 API，其接口较为简单，但在大型应用中可能会涉及到复杂的数据结构和操作，通过封装可以提供更简洁、易用的接口，降低了开发者的学习成本。
> 2. 统一管理： 通过封装，你可以集中管理本地存储的操作，包括数据的读取、写入、删除等。这有助于确保在整个应用中使用一致的存储和获取数据的方法。
> 3. 类型检查和转换： 封装可以对存储的数据进行类型检查和转换，确保存储的数据类型符合预期，提高了代码的稳定性。
> 4. 错误处理： 封装可以提供更好的错误处理机制，例如处理 localStorage 容量超限、存储失败等异常情况，给开发者提供更友好的反馈。
> 5. 可配置性： 封装允许你配置一些全局的设置，例如存储前缀、存储引擎（localStorage、sessionStorage等）、存储时效性等，增加了灵活性。
> 6. 易于替换： 如果以后需要更换本地存储的实现方式，例如从 localStorage 切换到 IndexedDB，封装层可以使这个过程变得相对简单，因为只需修改封装层而不用在整个应用中修改每一处 localStorage 的调用。
> 总体而言， 封装 localStorage 有助于提高代码的可维护性、可读性和可测试性，同时通过提供一致性的接口，降低了出错的概率。在大型前端应用中，这样的封装通常是一种良好的实践。
#### 注册
注册后的用户在浏览器 `Application` 里设置 `airbnb-info` 字段，对象数组类型
```jsx
[{username: "canlan", password: "123123"}]
```
#### 登录
对于当前登录用户而言，用户登录后会在浏览器 `Application` 里设置`airbnb-info-cur` 字段，对应值为string类型，值显示当前用户名
```jsx
'canlan'
```
#### 支付
如果用户支付前处于未登录状态，会提示用户先登录。
用户登录后，可以使用支付功能
输入表单的卡号、姓名、逾期时间和CVC号码，点击支付即可完成付款操作。

### Router 配置
作为单页应用，页面跳转的路由变化全是通过router来操控

安装react-router-dom

```jsx
pnpm add react-router-dom
```

配置hash路由

```jsx
// index.js
// 导入 HashRouter
import { HashRouter } from "react-router-dom";

// 包裹App组件
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
```

配置路径 useRoutes

配置路由路径文件

```jsx
// /router/index.js
import React, {lazy} from 'react'
import { Navigate } from 'react-router-dom'

// 路由懒加载
const Home = lazy(() => import('@/views/home'))
const Detail = lazy(() => import('@/views/detail'))
const Entire = lazy(() => import('@/views/entire'))

const routes = [
  {
    path: '/', // 重定向到home
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/detail',
    element: <Detail/>
  },
  {
    path: '/entire',
    element: <Entire />
  }
]

export default routes;
```

使用路径

```jsx
// App.js
import {useRoutes} from 'react-router-dom'
import routes from '@/router'

// jsx模板里使用 useRoutes，生成route标签
{useRoutes(routes)}
```

因为是异步懒加载，模块可能没加载到，所以要配置Suspense

```jsx
import React, { Suspense } from "react";

root.render(
//  这里的’loading‘ 字符串也可以改成组件
  <Suspense fallback={'loading'}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>
);
```

### Redux状态管理
Redux 是一种状态管理库，用于在 JavaScript 应用中有效地管理应用的状态。

Redux 将应用的状态逻辑集中到一个地方，而不是分散在不同的组件中。这有助于更好地管理状态逻辑，减少了 bug 和不一致性的可能性。

#### RTK
Redux Toolkit 是用于简化 Redux 开发的官方工具包，它为开发者提供了一些强大的工具和约定，有助于更轻松、更高效地使用 Redux。
安装

```jsx
pnpm add @reduxjs/toolkit react-redux
```

配置

```jsx
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './modules/home'
import entireReducer from './modules/entire'

const store = configureStore({
  reducer:{
    home: homeReducer,
    entire: entireReducer,
  }
})

export default store;
```

每个页面抽出来独立的模块

- home 页面使用RKT方式

```jsx
// home.js  
import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    count: 0
  },
  reducers: {

  }
})

const {} = homeSlice.actions

export default homeSlice.reducer
```

- entire 页面使用传统模式

#### 普通方式

安装

```jsx
pnpm add react-redux redux
```

配置

```jsx
// modules/entire
// reducer.js
const initialState = {
  entire: true
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

// index.js
export { default }  from './reducer' // 复合写法：导出reducer里默认的东西
```

### 封装 axios
在前端开发项目中，封装 Axios 的主要目的是提高代码的可维护性、可扩展性，并提供更好的错误处理和请求配置，
- 统一配置和默认设置， 通过封装，你可以设置默认的请求头、请求超时时间等，确保整个应用中使用相同的配置的一致性，方便开发管理。
- 而且封装够可以简化请求逻辑，通过封装能够简化发起 HTTP 请求的逻辑，使得代码更加清晰，减少了重复的代码。
安装

```jsx
pnpm add axios
```
封装
```jsx
// services/request/cofig
export const BASE_URL = 'http://codercba.com:1888/airbnb/api'
export const TIMEOUT = 8000

// services/request/index
import axios from "axios";
import { BASE_URL, TIMEOUT} from './config'

class Request {
  constructor(baseURL, timeout) {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 统一拦截：实例response拦截一层data，直接返回res.data,报错的话也返回err
    this.instance.interceptors.response.use(res => res.data, err => err)
  }

  // 提供请求方法
  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({...config, method: 'get'})
  }

  post(config) {
    return this.request({...config, method: 'post'})
  }
}

export default new Request(BASE_URL,TIMEOUT)
```

services出口文件，导出request

```jsx
export { default } from "./request";

------等价于
import request from './request'

export default request
```

测试

```jsx
// 发送数据请求测试，模仿componentDidMount
useEffect(() => {
  request.get({
    url: '/home/highscore'
  })
}, [])
```