import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import Banner from "./c-cpns/banner";
import SectionHeader from "@/components/setion-header";
import RoomItem from "@/components/room-item";
import { HomeWrapper } from "./style";

const Home = memo(() => {
  // 从redux里拿数据
  const { goodPriceInfo } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPriceInfo,
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
        <div className="good-price">
          <SectionHeader title={goodPriceInfo.title} />
          <div className="room-list">
            {goodPriceInfo.list?.slice(0, 8).map((item) => (
              <RoomItem key={item.id} item={item}></RoomItem>
            ))}
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
});

export default Home;
