import {
  getHomeGoodPriceData,
  getHomeHighScoreData,
  getHomeDiscountData,
  getHomeRecommendData,
  getHomeLongForData,
  getHomePlusData,
} from "@/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeDataAction = createAsyncThunk(
  "fetch/homeData",
  (payload, { dispatch, getState }) => {
    getHomeGoodPriceData().then((res) => {
      dispatch(changeGoodPriceInfoAction(res));
    });
    getHomeHighScoreData().then((res) => {
      dispatch(changeHighScoreInfo(res));
    });
    getHomeDiscountData().then((res) => {
      dispatch(changeDiscountAction(res));
    });
    getHomeRecommendData().then((res) => {
      dispatch(changeRecommendAction(res));
    });
    getHomeLongForData().then((res) => {
      dispatch(changeLongForAction(res));
    });
    getHomePlusData().then((res) => {
      dispatch(changePlusAction(res));
    });
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {}, //高性价比数据 包含list和title
    highScoreInfo: {}, // 高评分 包含list和title
    discountInfo: {}, // 折扣数据
    recommendInfo: {}, // 热门推荐
    longforInfo: {}, // 向往城市数据
    plusInfo: {}, // plus数据
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfo(state, { payload }) {
      state.highScoreInfo = payload;
    },
    changeDiscountAction(state, { payload }) {
      state.discountInfo = payload;
    },
    changeRecommendAction(state, { payload }) {
      state.recommendInfo = payload;
    },
    changeLongForAction(state, { payload }) {
      state.longforInfo = payload;
    },
    changePlusAction(state, { payload }) {
      state.plusInfo = payload;
    },
  },
});

export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfo,
  changeDiscountAction,
  changeRecommendAction,
  changeLongForAction,
  changePlusAction,
} = homeSlice.actions;

export default homeSlice.reducer;
