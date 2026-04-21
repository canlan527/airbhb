import PropTypes from "prop-types";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomItem from '@/components/room-item'
import { changeDetailInfoAction } from "@/store/modules/detail";
import {ListWrapper} from './style'

const SectionRoom = memo((props) => {
  const { roomlist = [], itemWidth } = props;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleItemClick(item) {
    dispatch(changeDetailInfoAction(item))
    navigate(`/detail/${item.id}`)
  }

  return (
    <ListWrapper>
      {roomlist?.slice(0, 8).map((item) => (
        <RoomItem key={item.id} item={item} itemWidth={itemWidth} itemClick={handleItemClick}></RoomItem>
      ))}
    </ListWrapper>
  );
});

SectionRoom.propTypes = {
  roomlist: PropTypes.array,
};

export default SectionRoom;
