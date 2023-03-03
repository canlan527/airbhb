import React, { memo } from 'react'
import {useRoutes} from 'react-router-dom'
import routes from '@/router'
const App = memo(() => {
  return (
    <div>
      <header>头部</header>

      {/* 主体 */}
      {useRoutes(routes)}

      <footer>尾部</footer>
    </div>
  )
})

export default App