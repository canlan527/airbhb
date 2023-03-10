import PropTypes from "prop-types";
import React, { memo } from "react";
import RoomItem from '@/components/room-item'
import {ListWrapper} from './style'
const SectionRoom = memo((props) => {
  const { roomlist = [] } = props;
  return (
    <ListWrapper>
      {roomlist?.slice(0, 8).map((item) => (
        <RoomItem key={item.id} item={item}></RoomItem>
      ))}
    </ListWrapper>
  );
});

SectionRoom.propTypes = {
  roomlist: PropTypes.array,
};

export default SectionRoom;
