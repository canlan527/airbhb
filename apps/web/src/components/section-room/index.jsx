import PropTypes from "prop-types";
import React, { memo } from "react";
import RoomItem from '@/components/room-item'
import "./style.scss";

const SectionRoom = memo((props) => {
  const { roomlist = [], itemWidth } = props;

  return (
    <div className="section-room">
      {roomlist?.slice(0, 8).map((item) => (
        <RoomItem key={item.id} item={item} itemWidth={itemWidth}></RoomItem>
      ))}
    </div>
  );
});

SectionRoom.propTypes = {
  roomlist: PropTypes.array,
};

export default SectionRoom;
