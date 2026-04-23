import styled from "styled-components";

export const HeaderWrapper = styled.div`
  
  /* background: #fff; */

  .top {
    position: relative;
    background: ${props => props.theme.isAlpha ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)'};
    z-index: 19;
    .content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      padding: 0 24px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      border-color: ${props => props.theme.isAlpha ? 'rgba(255,255,255, 0)' : '#eee'};
      z-index: 100;
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

  @media screen and (max-width: 1024px) {
    .top {
      .content {
        height: 72px;
        padding: 0 20px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .top {
      .content {
        height: 68px;
        padding: 0 16px;
      }
    }
  }

  @media screen and (max-width: 560px) {
    .top {
      .content {
        height: 64px;
        padding: 0 12px;
      }
    }
  }
`;

export const SearchAreaWrapper = styled.div`
  transition: all 200ms ease;
  height: ${props => props.isSearch ? '100px' : '0'};
`;
