import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { DemoWrapper } from './style'
const Demo = memo(() => {
  return (
    <DemoWrapper>
      <Link to="/demo/indicator" >点击查看 Indicator 的 Demo 示例</Link> 
      <Outlet/>
    </DemoWrapper>
  )
})

export default Demo