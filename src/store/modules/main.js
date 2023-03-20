import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    homeHeader: {
      isFixed: false,
    },
  },
  reducers: {
    changeHomeHeaderAction(state, { payload }) {
      state.homeHeader = payload;
    },
  },
});

export const { changeHomeHeaderAction } = mainSlice.actions;

export default mainSlice.reducer;
