import PropTypes from "prop-types";
import React, { memo } from "react";
import SectionHeader from "@/components/section-header";
import SectionBottom from '@/components/section-bottom'
import RoomItem from "@/components/room-item";
import ScrollView from '@/base-ui/scroll-view';
import { SectionV3Wrapper } from "./style";

const HomeSectionV3 = memo((props) => {
  const { info } = props;
  return (
    <SectionV3Wrapper>
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <ScrollView>
        <div className="v3room-item">
        {info.list.map((item) => (
          <RoomItem key={item.id} item={item} />
        ))}
      </div>
      </ScrollView>
      <SectionBottom text="Plus" />
    </SectionV3Wrapper>
  );
});

HomeSectionV3.propTypes = {
  info: PropTypes.object,
};

export default HomeSectionV3;
