import {getHomeGoodPriceData} from '@/services' 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeDataAction = createAsyncThunk('fetch/homeData', async () => {
  const res = await getHomeGoodPriceData()
  return res
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {}, //高性价比数据 包含list和title
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
  },
  extraReducers: {
    [fetchHomeDataAction.fulfilled](state, {payload}) {
      state.goodPriceInfo = payload
    }
  }
});

export const { changeGoodPriceInfoAction,} = homeSlice.actions;

export default homeSlice.reducer;
