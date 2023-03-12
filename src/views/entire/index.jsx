import React, { memo } from 'react'

import EntireTabs from './c-cpns/entire-tabs'
import EntireRoomlist from './c-cpns/entire-roomlist'
import Pagination from './c-cpns/pagination'
import { EntireWrapper } from './style'

const Entire = memo(() => {
  return (
    <EntireWrapper>
      <EntireTabs></EntireTabs>
      <EntireRoomlist></EntireRoomlist>
      <Pagination></Pagination>
    </EntireWrapper>
  )
})

export default Entire