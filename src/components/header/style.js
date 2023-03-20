import styled from "styled-components";

export const HeaderWrapper = styled.div`
  border-bottom: 1px solid #eee;
  /* background: #fff; */

  .top {
    position: relative;
    background: #fff;
    z-index: 19;
    .content {
      display: flex;
      align-items: center;
      height: 80px;
    }

    .search-area {
      height: 100px;
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, .3);
    z-index: 9;
    cursor: pointer;
  }
  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }
`;

export const SearchAreaWrapper = styled.div`
  transition: all 200ms ease;
  height: ${props => props.isSearch ? '100px' : '0'};
`;