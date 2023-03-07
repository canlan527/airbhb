import React, { memo, useState, useEffect } from 'react'
import { RightWrapper } from './styled'

import IconGlobal from '@/assets/svg/icon_global'
import IconList from '@/assets/svg/icon_list'
import IconUsesr from '@/assets/svg/icon_user';

const HeaderRight = memo(() => {
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    window.addEventListener('click', () => {
      setShowPanel(false)
    }) 
  }, [])

  function handleShowPanel(e) {
    e.stopPropagation();// 阻止事件冒泡
    setShowPanel(!showPanel)
  }

  return (
    <RightWrapper>
      <div className="menu-left">
        <span className="menu-left-item">登录</span>
        <span className="menu-left-item">注册</span>
        <span className="menu-left-item">
          <IconGlobal/>
        </span>
      </div>

      <div className="menu-right" onClick={handleShowPanel}>
        <span className="menu-right-item">
          <IconList/>
        </span>
        <span className="menu-right-item right">
          <IconUsesr/>
        </span>
        
        {/* panel */}
       {
        showPanel && (<div className="panel">
         <div className="panel-top">
           <div className="panel-item login">登录</div>
           <div className="panel-item">注册</div>
         </div>
         <div className="panel-bottom">
           <div className="panel-item">来爱彼迎发布房源</div>
           <div className="panel-item">开展体验</div>
           <div className="panel-item">帮助</div>
         </div>
       </div>)
       }
      </div>
        
    </RightWrapper>
  )
})

export default HeaderRight