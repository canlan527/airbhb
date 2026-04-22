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
  async (payload, { dispatch }) => {
    dispatch(changeHomeLoadingAction(true));
    try {
      const [goodPrice, highScore, discount, recommend, longfor, plus] = await Promise.all([
        getHomeGoodPriceData(),
        getHomeHighScoreData(),
        getHomeDiscountData(),
        getHomeRecommendData(),
        getHomeLongForData(),
        getHomePlusData(),
      ]);
      dispatch(changeGoodPriceInfoAction(goodPrice));
      dispatch(changeHighScoreInfo(highScore));
      dispatch(changeDiscountAction(discount));
      dispatch(changeRecommendAction(recommend));
      dispatch(changeLongForAction(longfor));
      dispatch(changePlusAction(plus));
    } finally {
      dispatch(changeHomeLoadingAction(false));
    }
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
    isLoading: false,
  },
  reducers: {
    changeHomeLoadingAction(state, { payload }) {
      state.isLoading = payload;
    },
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
  changeHomeLoadingAction,
  changeGoodPriceInfoAction,
  changeHighScoreInfo,
  changeDiscountAction,
  changeRecommendAction,
  changeLongForAction,
  changePlusAction,
} = homeSlice.actions;

export default homeSlice.reducer;
