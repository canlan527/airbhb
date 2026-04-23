import PropTypes from "prop-types";
import React, { memo } from "react";
import RoomItem from '@/components/room-item'
import "./style.scss";

function getResponsiveWidths(itemWidth = "25%") {
  switch (itemWidth) {
    case "33.33%":
      return {
        tabletWidth: "50%",
        mobileWidth: "50%",
        compactWidth: "100%",
      };
    case "25%":
      return {
        tabletWidth: "33.33%",
        mobileWidth: "50%",
        compactWidth: "100%",
      };
    default:
      return {
        tabletWidth: itemWidth,
        mobileWidth: "50%",
        compactWidth: "100%",
      };
  }
}

const SectionRoom = memo((props) => {
  const { roomlist = [], itemWidth } = props;
  const { tabletWidth, mobileWidth, compactWidth } = getResponsiveWidths(itemWidth);

  return (
    <div className="section-room">
      {roomlist?.slice(0, 8).map((item) => (
        <RoomItem
          key={item.id}
          item={item}
          itemWidth={itemWidth}
          tabletWidth={tabletWidth}
          mobileWidth={mobileWidth}
          compactWidth={compactWidth}
        ></RoomItem>
      ))}
    </div>
  );
});

SectionRoom.propTypes = {
  roomlist: PropTypes.array,
};

export default SectionRoom;
