import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import Banner from "./c-cpns/banner";
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
        <h2>{goodPriceInfo.title}</h2>
        <ul> 
          {
            goodPriceInfo?.list?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
        </ul>
      </div>
    </HomeWrapper>
  );
});

export default Home;
