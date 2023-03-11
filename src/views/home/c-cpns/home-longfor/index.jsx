import PropTypes from "prop-types";
import React, { memo } from "react";

import SectionHeader from "@/components/section-header";
import LongforItem from "@/components/longfor-item";
import ScrollView from '@/base-ui/scroll-view';
import { LongforWrapper } from "./style";

const HomeLongfor = memo((props) => {
  const {info} = props
  return (
    <LongforWrapper>
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <ScrollView>
        <div className="longfor-list">
          {info.list.map((item, index) => (
            <LongforItem key={index} item={item}></LongforItem>
          ))}
        </div>
      </ScrollView>
    </LongforWrapper>
  );
});

HomeLongfor.propTypes = {
  info: PropTypes.object,
};

export default HomeLongfor;
