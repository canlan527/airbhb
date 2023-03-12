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

export const fetchEntireRoomlistAction = () => {
  return (dispatch, getState) => {
    // 获取请求接口的动态参数
    const currentPage = getState().entire.currentPage;

    getEntireRoomList(currentPage * 20).then(res => {
      // console.log(res);
      const {list, totalCount} = res
      dispatch(changeRoomList(list))
      dispatch(changeTotalCount(totalCount))
    })
  }
}