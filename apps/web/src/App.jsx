import React, { memo, Suspense } from 'react'
import {useRoutes} from 'react-router-dom'
import routes from '@/router'

import Header from '@/components/header'
import Footer from '@/components/footer'

const App = memo(() => {

  return (
    <div>
      <Header></Header>
      {/* 主体 */}
      <Suspense fallback={'loading'}>
        {useRoutes(routes)}
      </Suspense>
      <Footer></Footer>
    </div>
  )
})

export default App