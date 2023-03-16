import PropTypes from "prop-types";
import React, { memo, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomItem from "@/components/room-item";
import { changeDetailInfoAction } from "@/store/modules/detail";
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
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleItemClick = useCallback(
    (item) => {
      dispatch(changeDetailInfoAction(item));
      console.log(item);
      navigate(`/detail/${item.id}`);
    },
    [navigate]
  );

  return (
    <EntireRoomListWrapper>
      <h2 className="entire-desc">{totalCount}多处住所</h2>
      <div className="entire-room-list">
        {roomlist.map((item) => (
          <RoomItem
            key={item._id}
            item={item}
            itemWidth="20%"
            itemClick={handleItemClick}
          />
        ))}
      </div>
      {isloading && <div className="entire-room-modal"></div>}
    </EntireRoomListWrapper>
  );
});

EntireRoomList.propTypes = {};

export default EntireRoomList;
