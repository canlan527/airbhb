import PropTypes from "prop-types";
import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";

import RoomItem from "@/components/room-item";
import { EntireRoomListWrapper } from "./style";

const EntireRoomList = memo((props) => {
  const { roomlist, totalCount, isloading } = useSelector(
    (state) => ({
      roomlist: state.entire.roomList,
      totalCount: state.entire.totalCount,
      isloading: state.entire.isloading,
    }),
    shallowEqual
  );

  return (
    <EntireRoomListWrapper>
      <h2 className="entire-desc">{totalCount}多处住所</h2>
      <div className="entire-room-list">
        {roomlist.map((item) => <RoomItem key={item._id} item={item} itemWidth="20%" />)}
      </div>
      {isloading && <div className="entire-room-modal"></div>}
    </EntireRoomListWrapper>
  );
});

EntireRoomList.propTypes = {};

export default EntireRoomList;
