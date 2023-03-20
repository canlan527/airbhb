import styled from "styled-components";

export const EntireTabsWrapper = styled.div`
  /* margin-top: 80px; */
  position: fixed;
  top:  80px;
  left: 0;
  right: 0;
  width: 100%;
  padding-left: 34px;
  background: #fff;
  z-index: 99;
  .filter-tab-list {
    @media screen and (min-width: 350px) and (max-width: 1024px){
      display:none;
    } 
    display: flex;

    .filter-tab-item {
      margin: 6px 12px 6px 0;
      padding: 6px 8px;
      font-size: 14px;
      color: rgb(72, 72, 72);
      border: 1px solid rgb(220, 224, 224);
      cursor: pointer;

      &:hover {
        background: rgb(220, 224, 224, .7);
      }
      &.active {
        color: #fff;
        background: rgb(0, 132, 137);
        border: 1px solid rgb(0, 132, 137);
      }
    }
  }
`;
