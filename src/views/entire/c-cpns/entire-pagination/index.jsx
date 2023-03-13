import PropTypes from "prop-types";
import React, { memo, useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Pagination, ConfigProvider } from "antd";
import { fetchEntireRoomlistAction } from "@/store/modules/entire/actionCreators";
import { PaginationWrapper } from "./style";

const EntirePagination = memo((props) => {
  const { totalCount, currentPage, roomlist } = useSelector((state) => ({
    totalCount: state.entire.totalCount,
    currentPage: state.entire.currentPage,
    roomlist: state.entire.roomList,
  }), shallowEqual);

  const start = currentPage * 20 + 1;
  const end = (currentPage + 1) * 20;
  const pageSize = 20;

  const dispatch = useDispatch();
  function handleChange(page) {
    console.log(page);
    window.scrollTo(0, 0); // 滚动到顶部
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

EntirePagination.propTypes = {};

export default EntirePagination;
