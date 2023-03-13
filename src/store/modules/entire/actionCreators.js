import { getEntireRoomList } from '@/services'
import * as actionTypes from './constants'

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage
})

export const changeRoomList = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList
})

export const changeTotalCount = (totalCount) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount
})

export const changeLoadingAction = (isloading) => ({
  type: actionTypes.CHAGNE_IS_LOADING,
  isloading
}) 

export const fetchEntireRoomlistAction = (page = 0) => {
  return (dispatch, getState) => {
    // 获取请求接口的动态参数
    const currentPage = getState().entire.currentPage;
    dispatch(changeCurrentPageAction(page))
    dispatch(changeLoadingAction(true)) //  发送网路请求前设置isloading为 true
    getEntireRoomList(currentPage * 20).then(res => {
      // console.log(res);
      const {list, totalCount} = res
      dispatch(changeLoadingAction(false)) // 拿到返回的数据后设置isloading为false
      dispatch(changeRoomList(list))
      dispatch(changeTotalCount(totalCount))
    })
  }
}