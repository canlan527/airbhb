import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEntireRoomlistAction } from '@/store/modules/entire/actionCreators'

import EntireTabs from './c-cpns/entire-tabs'
import EntireRoomlist from './c-cpns/entire-roomlist'
import Pagination from './c-cpns/pagination'
import { EntireWrapper } from './style'

const Entire = memo(() => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEntireRoomlistAction())
  }, [dispatch])


  return (
    <EntireWrapper>
      <EntireTabs></EntireTabs>
      <EntireRoomlist></EntireRoomlist>
      <Pagination></Pagination>
    </EntireWrapper>
  )
})

export default Entire