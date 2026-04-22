import React, { memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Pagination, ConfigProvider } from "antd";
import { fetchEntireRoomlistAction } from "@/store/modules/entire/actionCreators";
import { PaginationWrapper } from "./style";

const EntirePagination = memo((props) => {
  // 从redux拿取数据
  const { totalCount, currentPage, roomlist } = useSelector((state) => ({
    totalCount: state.entire.totalCount, // 总条数
    currentPage: state.entire.currentPage, // 当前页
    roomlist: state.entire.roomList, // entire页面房间数据
  }), shallowEqual);

  const start = currentPage * 20 + 1; // 每页的起始数
  const end = (currentPage + 1) * 20; // 每页的结尾数
  const pageSize = 20; // 每页条数

  const dispatch = useDispatch();
  function handleChange(page) {
    dispatch(fetchEntireRoomlistAction(page));
  }

  return (
    <PaginationWrapper>
      <ConfigProvider
        theme={{ token: { colorPrimary: "#222", borderRadius: "50%" } }}
      >
        {!!roomlist.length && (
          <div className="pagination-info">
            <Pagination
              defaultCurrent={currentPage + 1}
              defaultPageSize={pageSize}
              total={totalCount}
              onChange={handleChange}
            />
            <div className="entire-pagination-desc">
              第 {start} - {end} 个房源，共超过 {totalCount} 个
            </div>
          </div>
        )}
      </ConfigProvider>
    </PaginationWrapper>
  );
});

export default EntirePagination;
