import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import Banner from "./c-cpns/banner";
import SectionHeader from "@/components/setion-header";
import SectionRoom from "@/components/section-room";
import { HomeWrapper } from "./style";

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
        <div className="content-item">
          <SectionHeader title={goodPriceInfo.title} />
          <SectionRoom roomlist={goodPriceInfo.list} />
        </div>
        <div className="content-item">
          <SectionHeader title={highScoreInfo.title} subTitle={highScoreInfo.subtitle} />
          <SectionRoom roomlist={highScoreInfo.list} />
        </div>
      </div>
    </HomeWrapper>
  );
});

export default Home;
