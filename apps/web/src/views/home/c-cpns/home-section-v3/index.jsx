import PropTypes from "prop-types";
import React, { memo } from "react";
import SectionHeader from "@/components/section-header";
import SectionBottom from '@/components/section-bottom'
import RoomItem from "@/components/room-item";
import ScrollView from '@/base-ui/scroll-view';
import "./style.scss";

const HomeSectionV3 = memo((props) => {
  const { info } = props;
  return (
    <div className="home-section-v3">
      <SectionHeader title={info.title} subTitle={info.subtitle} />
      <ScrollView>
        <div className="v3room-item">
        {info.list.map((item) => (
          <RoomItem
            key={item.id}
            item={item}
            itemWidth="33.33%"
            tabletWidth="320px"
            mobileWidth="280px"
            compactWidth="min(78vw, 240px)"
          />
        ))}
      </div>
      </ScrollView>
      <SectionBottom text="Plus" />
    </div>
  );
});

HomeSectionV3.propTypes = {
  info: PropTypes.object,
};

export default HomeSectionV3;
