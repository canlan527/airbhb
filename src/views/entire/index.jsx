import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEntireRoomlistAction } from '@/store/modules/entire/actionCreators'
import { changeHomeHeaderAction } from '@/store/modules/main'

import EntireTabs from './c-cpns/entire-tabs'
import EntireRoomlist from './c-cpns/entire-roomlist'
import EntirePagination from './c-cpns/entire-pagination'
import { EntireWrapper } from './style'

const Entire = memo(() => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeHomeHeaderAction({isFixed: true}))
    dispatch(fetchEntireRoomlistAction())
    window.scrollTo(0, 0)
  }, [dispatch])


  return (
    <EntireWrapper>
      <EntireTabs></EntireTabs>
      <EntireRoomlist></EntireRoomlist>
      <EntirePagination></EntirePagination>
    </EntireWrapper>
  )
})

export default Entire