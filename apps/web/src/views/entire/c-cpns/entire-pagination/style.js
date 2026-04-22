import styled from "styled-components";

export const PaginationWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .entire-pagination-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
  }

  // 修改antdesign pagination 样式
  .ant-pagination-item.ant-pagination-item-active {
    background-color: #222;
  }
  .ant-pagination-item-active a {
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
  .ant-pagination-options {
    display: none;
  }
`;
