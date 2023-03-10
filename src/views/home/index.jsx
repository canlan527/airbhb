import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import { HomeWrapper } from "./style";
import Banner from "./c-cpns/banner";
import HomeSectionV1 from './c-cpns/home-section-v1'

const Home = memo(() => {
  // 从redux里拿数据
  const { goodPriceInfo, highScoreInfo,  } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
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
      <HomeSectionV1 info={goodPriceInfo} />
      <HomeSectionV1 info={highScoreInfo} />
      </div>
    </HomeWrapper>
  );
});

export default Home;
