import * as actionTypes from './constants'

const initialState = {
  currentPage: 0, // 当前页码
  roomList: [], // 房间数据列表
  totalCount: 0, // 房间数据总数
  isloading: false, // 是否加载数据
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage};
    case actionTypes.CHANGE_ROOM_LIST:
      return {...state, roomList: action.roomList};
    case actionTypes.CHANGE_TOTAL_COUNT:
      return {...state, totalCount: action.totalCount};
    case actionTypes.CHAGNE_IS_LOADING:
      return {...state, isloading: action.isloading};
    default:
      return state;
  }
}