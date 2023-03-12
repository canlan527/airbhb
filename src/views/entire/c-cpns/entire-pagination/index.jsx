import PropTypes from "prop-types";
import React, { memo } from "react";
import { Pagination, ConfigProvider } from 'antd'

import { PaginationWrapper } from "./style";

const EntirePagination = memo((props) => {
  return <PaginationWrapper>
    <ConfigProvider theme={{token: {colorPrimary: '#222', borderRadius: '50%' }}}>
    <Pagination defaultCurrent={6} total={500} />
    </ConfigProvider>
  </PaginationWrapper>;
});

EntirePagination.propTypes = {};

export default EntirePagination;
