import React, { memo, useEffect } from 'react'
import {useSelector} from 'react-redux'
import HeaderLeft from './c-cpns/header-left'
import HeaderCenter from './c-cpns/header-center'
import HeaderRight from './c-cpns/header-right'

import { HeaderWrapper } from './style'
import classNames from 'classnames'

const Header = memo(() => {

  const {homeHeader} = useSelector((state) => ({
    homeHeader: state.main.homeHeader
  }))
  const { isFixed } = homeHeader
  console.log(isFixed);
  return (
    <HeaderWrapper className={classNames({fixed: isFixed})}>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </HeaderWrapper>
  )
})

export default Header