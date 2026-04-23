import PropTypes from "prop-types";
import React, { memo } from "react";

import SectionHeader from "@/components/section-header";
import LongforItem from "@/components/longfor-item";
import ScrollView from '@/base-ui/scroll-view';
import "./style.scss";

const HomeLongfor = memo((props) => {
  // 获取 info 数据
  const {info} = props
  return (
    <div className="home-longfor">
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <ScrollView>
        <div className="longfor-list">
          {info.list.map((item, index) => (
            <LongforItem key={index} item={item}></LongforItem>
          ))}
        </div>
      </ScrollView>
    </div>
  );
});

HomeLongfor.propTypes = {
  info: PropTypes.object,
};

export default HomeLongfor;
