import styled from "styled-components";

export const HeaderWrapper = styled.div`
  
  /* background: #fff; */

  .top {
    position: relative;
    background: ${props => props.theme.isAlpha ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)'};
    z-index: 19;
    .content {
      display: flex;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #eee;
      border-color: ${props => props.theme.isAlpha ? 'rgba(255,255,255, 0)' : '#eee'};
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