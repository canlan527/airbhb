import React, { memo, useEffect } from 'react'
import {useRoutes} from 'react-router-dom'
import routes from '@/router'
import request from './services'

import Header from '@/components/header'
import Footer from '@/components/footer'

const App = memo(() => {

  return (
    <div>
      <Header></Header>

      {/* 主体 */}
      {useRoutes(routes)}

      <Footer></Footer>
    </div>
  )
})

export default App