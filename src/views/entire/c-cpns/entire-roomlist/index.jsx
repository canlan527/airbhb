import React, { memo, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomItem from "@/components/room-item";
import { changeDetailInfoAction } from "@/store/modules/detail";
import { EntireRoomListWrapper } from "./style";

const EntireRoomList = memo((props) => {
  // 从redux拿取数据
  const { roomlist, totalCount, isloading } = useSelector(
    (state) => ({
      roomlist: state.entire.roomList, // roomlist数据
      totalCount: state.entire.totalCount, // totalCount
      isloading: state.entire.isloading, // 拿取isloading
    }),
    shallowEqual
  );
  // 获取路由导航
  const navigate = useNavigate();
  // 获取dispatch
  const dispatch = useDispatch()

  // 点击每个room-item，派发请求详情的action，并跳转路由
  const handleItemClick = useCallback(
    (item) => {
      dispatch(changeDetailInfoAction(item));
      navigate(`/detail/${item.id}`);
    },
    [dispatch, navigate]
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

export default EntireRoomList;
