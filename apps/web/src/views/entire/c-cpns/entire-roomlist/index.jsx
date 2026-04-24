import React, { memo, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomItem from "@/components/room-item";
import RoomCardSkeleton from "@/components/room-card-skeleton";
import { changeDetailInfoAction } from "@/store/modules/detail";
import "./style.scss";

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
  const skeletonItems = Array.from({ length: 10 });
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
    <div className="entire-room-list-shell">
      <h2 className="entire-desc">300多处住所</h2>
      <div className="entire-room-list">
        {isloading
          ? skeletonItems.map((_, index) => (
              <RoomCardSkeleton
                key={index}
                itemWidth="20%"
                tabletWidth="33.33%"
                mobileWidth="50%"
                compactWidth="100%"
              />
            ))
          : roomlist.map((item) => (
              <RoomItem
                key={item._id}
                item={item}
                itemWidth="20%"
                tabletWidth="33.33%"
                mobileWidth="50%"
                compactWidth="100%"
                itemClick={handleItemClick}
              />
            ))}
      </div>
    </div>
  );
});

export default EntireRoomList;
