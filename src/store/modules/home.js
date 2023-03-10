import {getHomeGoodPriceData, getHomeHighScoreData} from '@/services' 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeDataAction = createAsyncThunk('fetch/homeData',  (payload, {dispatch, getState}) => {
  getHomeGoodPriceData().then(res => {
    dispatch(changeGoodPriceInfoAction(res))
  })
  getHomeHighScoreData().then(res => {
    dispatch(changeHighScoreInfo(res))
  })
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {}, //高性价比数据 包含list和title
    highScoreInfo: {}, // 高评分 包含list和title
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfo(state, {payload}) {
      state.highScoreInfo = payload
    }
  },
});

export const { changeGoodPriceInfoAction, changeHighScoreInfo, } = homeSlice.actions;

export default homeSlice.reducer;
