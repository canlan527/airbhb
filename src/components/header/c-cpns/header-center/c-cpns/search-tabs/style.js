import styled from "styled-components";

export const SearchTabsWrapper = styled.div`
  padding: 10px;
  margin: 0 auto;
  font-size: 18px;
  display: flex;
  .search-tabs-item {
    padding: 4px 0;
    margin-right: 30px;
    color: ${props => props.theme.isAlpha ? '#fff': '#424242'};
    cursor: pointer;
    position: relative;
    
    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 50%;
      display: block;
      height:2px;
      width: 0;
      background: #b2b2b2;
      transform: translate(-50%);
    }

    &.active {
      &:after {
        width: 100%;
        background: #424242;
      }
    }

    &:hover {
      color: #888;
      transition: all 200ms ease;
    }
    &:hover:after {
      height: 2px;
      animation: ad_width .3s linear forwards;
      background: #b2b2b2;
    }
    
    @keyframes ad_width {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
