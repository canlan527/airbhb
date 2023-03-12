import PropTypes from "prop-types";
import React, { memo } from "react";
import { useSelector } from 'react-redux'

import RoomItem from '@/components/room-item'
import { EntireRoomListWrapper } from "./style";
const EntireRoomList = memo((props) => {

  const {roomlist, totalCount} = useSelector((state) => ({
    roomlist: state.entire.roomList,
    totalCount: state.entire.totalCount
  }))

  return <EntireRoomListWrapper>
  <h2 className="entire-desc">{totalCount}多处住所</h2>
  <div className="entire-room-list">
    {roomlist.map(item => <RoomItem key={item.id} item={item} itemWidth="20%" /> )}
  </div>

  </EntireRoomListWrapper>;
});

EntireRoomList.propTypes = {};

export default EntireRoomList;
