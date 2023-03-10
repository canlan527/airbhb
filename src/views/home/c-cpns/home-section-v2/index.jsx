import PropTypes from "prop-types";
import React, { memo, useState, useCallback } from "react";
import { SectionV2Wrapper } from "./style";

import SectionHeader from "@/components/section-header";
import SectionRoom from "@/components/section-room";
import SectionTabs from "@/components/section-tabs";

const HomeSectionV2 = memo((props) => {
  // 从 props 获取数据局
  const { info } = props;
  // 自定义内部state
  const initialName = Object.keys(info.dest_list)[0];
  const [tab, setTab] = useState(initialName);
  // 处理数据tabs
  const tabs = info.dest_address?.map((item) => item.name);
  // 事件处理函数
  const handleTabClick = useCallback((index, name) => {
    setTab(name);
  }, []);

  return (
    <SectionV2Wrapper>
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <SectionTabs tabs={tabs} tabClick={handleTabClick} />
      <SectionRoom roomlist={info.dest_list?.[tab]} itemWidth="33.33%" />
    </SectionV2Wrapper>
  );
});

HomeSectionV2.propTypes = {
  info: PropTypes.object,
};

export default HomeSectionV2;
