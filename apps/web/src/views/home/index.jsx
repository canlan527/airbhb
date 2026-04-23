import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isEmpty } from "@/utils";

import { fetchHomeDataAction } from "@/store/modules/home";
import Banner from "./c-cpns/banner";
import HomeSectionV1 from "./c-cpns/home-section-v1";
import HomeSectionV2 from "./c-cpns/home-section-v2";
import HomeSectionV3 from "./c-cpns/home-section-v3";
import HomeLongfor from "./c-cpns/home-longfor";
import HomeSkeleton from "./c-cpns/home-skeleton";
import { changeHomeHeaderAction } from "@/store/modules/main";
import { useScrollTop } from "@/hooks";
import "./style.scss";

const Home = memo(() => {
  // 从redux里拿数据
  const {
    goodPriceInfo, // 高分好评房源数据
    highScoreInfo, // 高性价比房源
    discountInfo, // 热门目的地房源
    recommendInfo, // 探索佛山的精彩之地数据
    longforInfo, // 你可能想去数据
    plusInfo, // Plus房源
    isLoading,
  } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
      plusInfo: state.home.plusInfo,
      isLoading: state.home.isLoading,
    }),
    shallowEqual
  );
  // 派发异步事件，发送网络请求
  const dispatch = useDispatch();
  // 滚动到页面最高处
  useScrollTop();
  // 派发header动画和获取首页数据
  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: true }));
    dispatch(fetchHomeDataAction());
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* 横幅 */}
      <Banner loading={isLoading} />
      <div className="content">
        {isLoading ? (
          <>
            <HomeSkeleton />
            <HomeSkeleton />
          </>
        ) : (
          <>
            {/* 热门目的地 */}
            {isEmpty(discountInfo) && <HomeSectionV2 info={discountInfo} />}
            {/* 佛山高性价比房源 */}
            {isEmpty(goodPriceInfo) && <HomeSectionV1 info={goodPriceInfo} />}
            {/* 你可能想去 */}
            {isEmpty(longforInfo) && <HomeLongfor info={longforInfo} />}
            {/* 佛山高分好评房源 */}
            {isEmpty(highScoreInfo) && <HomeSectionV1 info={highScoreInfo} />}
            {/* 探索佛山的精彩之地 */}
            {isEmpty(recommendInfo) && <HomeSectionV2 info={recommendInfo} />}
            {/* 佛山的爱彼迎Plus房源 */}
            {isEmpty(plusInfo) && <HomeSectionV3 info={plusInfo} />}
          </>
        )}
      </div>
    </div>
  );
});

export default Home;
