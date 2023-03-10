import PropTypes from "prop-types";
import React, { memo,useState, useCallback } from "react";
import { SectionV2Wrapper } from "./style";

import SectionHeader from "@/components/section-header";
import SectionRoom from "@/components/section-room";
import SectionTabs from "@/components/section-tabs";

const HomeSectionV2 = memo((props) => {
  const { info } = props;
  // 处理数据tabs
  const [tab, setTab] = useState("佛山");
  const tabs = info.dest_address?.map((item) => item.name);
  const handleTabClick = useCallback((index, name) => {
    setTab(name);
  }, []);

  return (
    <SectionV2Wrapper>
      <SectionHeader
        title={info.title}
        subTitle={info.subtitle}
      />
      <SectionTabs tabs={tabs} tabClick={handleTabClick} />
      <SectionRoom
        roomlist={info.dest_list?.[tab]}
        itemWidth="33.33%"
      />
    </SectionV2Wrapper>
  );
});

HomeSectionV2.propTypes = {
  info: PropTypes.object,
};

export default HomeSectionV2;
