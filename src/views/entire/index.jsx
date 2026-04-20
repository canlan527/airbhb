import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEntireRoomlistAction } from '@/store/modules/entire/actionCreators'
import { changeHomeHeaderAction } from '@/store/modules/main'

import EntireTabs from './c-cpns/entire-tabs'
import EntireRoomlist from './c-cpns/entire-roomlist'
import EntirePagination from './c-cpns/entire-pagination'
import { EntireWrapper } from './style'
import {useScrollTop} from '@/hooks'

const Entire = memo(() => {

  // 获取dispatch
  const dispatch = useDispatch()
  // 滚动到顶部
  useScrollTop()
  // 派发header动画和派发页面数据
  useEffect(() => {
    dispatch(changeHomeHeaderAction({isFixed: true, alpha: false}))
    dispatch(fetchEntireRoomlistAction())    
  }, [dispatch])


  return (
    <EntireWrapper>
      {/* tabs */}
      <EntireTabs></EntireTabs>
      {/* 房间列表 */}
      <EntireRoomlist></EntireRoomlist>
      {/* 分页 */}
      <EntirePagination></EntirePagination>
    </EntireWrapper>
  )
})

export default Entire