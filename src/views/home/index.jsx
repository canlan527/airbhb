import React, { memo, useState, useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/utils";

import { fetchHomeDataAction } from "@/store/modules/home";
import { HomeWrapper } from "./style";
import Banner from "./c-cpns/banner";
import HomeSectionV1 from "./c-cpns/home-section-v1";
import HomeSectionV2 from './c-cpns/home-section-v2'
import HomeLongfor from './c-cpns/home-longfor'
import SectionHeader from "@/components/section-header";
import SectionRoom from "@/components/section-room";
import SectionTabs from "@/components/section-tabs";
const Home = memo(() => {
  // 从redux里拿数据
  const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
    }),
    shallowEqual
  );
  // 派发异步事件，发送网络请求
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, [dispatch]);



  return (
    <HomeWrapper>
      <Banner />
      <div className="content">
        {isEmpty(discountInfo) && <HomeSectionV2 info={discountInfo} />}
        {isEmpty(goodPriceInfo) && <HomeSectionV1 info={goodPriceInfo} />}
        {isEmpty(longforInfo) && <HomeLongfor info={longforInfo}/>}
        {isEmpty(highScoreInfo) && <HomeSectionV1 info={highScoreInfo} />}
        {isEmpty(recommendInfo) && <HomeSectionV2 info={recommendInfo}/>}
      </div>
    </HomeWrapper>
  );
});

export default Home;
