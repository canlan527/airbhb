import React, { memo } from 'react'
import { RightWrapper } from './styled'

import IconGlobal from '@/assets/svg/icon_global'
import IconList from '@/assets/svg/icon_list'
import IconUsesr from '@/assets/svg/icon_user';

const HeaderRight = memo(() => {
  return (
    <RightWrapper>
      <div className="menu-left">
        <span className="menu-left-item">登录</span>
        <span className="menu-left-item">注册</span>
        <span className="menu-left-item">
          <IconGlobal/>
        </span>
      </div>

      <div className="menu-right">
        <span className="menu-right-item">
          <IconList/>
        </span>
        <span className="menu-right-item right">
          <IconUsesr/>
        </span>
      </div>
    </RightWrapper>
  )
})

export default HeaderRight