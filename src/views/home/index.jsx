import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import { HomeWrapper } from "./style";
import Banner from "./c-cpns/banner";
import HomeSectionV1 from './c-cpns/home-section-v1'
import SectionHeader from '@/components/section-header'
import SectionRoom from '@/components/section-room'
import SectionTabs from '@/components/section-tabs'
const Home = memo(() => {
  // 从redux里拿数据
  const { goodPriceInfo, highScoreInfo, discountInfo } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
    }),
    shallowEqual
  );
  // 派发异步事件，发送网络请求
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, [dispatch]);

  // 处理数据tabs
  const tabs = discountInfo.dest_address?.map(item => item.name)
  return (
    <HomeWrapper>
      <Banner />
      <div className="content">

      <div className="content-discount">
        <SectionHeader title={discountInfo.title} subTitle={discountInfo.subtitle} />
        <SectionTabs tabs={tabs} />
        <SectionRoom roomlist={discountInfo.dest_list?.['成都']} itemWidth="33.33%" />
      </div>

      <HomeSectionV1 info={goodPriceInfo} />
      <HomeSectionV1 info={highScoreInfo} />
      </div>
    </HomeWrapper>
  );
});

export default Home;
