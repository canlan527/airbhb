import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './style.scss'
const Demo = memo(() => {
  return (
    <div className="demo-page">
      <Link to="/demo/indicator" >点击查看 Indicator 的 Demo 示例</Link> 
      <Outlet/>
    </div>
  )
})

export default Demo
