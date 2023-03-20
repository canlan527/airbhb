import styled from "styled-components";

export const SearchTypesWrapper = styled.div`
  position: relative;
  margin-top: 12px;
  border-radius: 38px;
  border: 1px solid #d2d2d2;
  display: flex;
  background: #fff;
  .type-content {
    position: relative;
    .type-item {
      width: 278px;
      padding: 12px 40px;
      border-radius: 38px;
      background: #fff;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      margin-right:6px;
      &:hover {
        background: #f5f5f5;
      }
      &.active {
        z-index:89;
        background: #Fff;
        box-shadow: 0px 0px 12px 4px rgba(0,0,0,.2);
      }
      .item-title {
        font-size: 14px;
        margin-bottom: 8px;
      }
      .item-desc {
        font-size: 16px;
        color: #666;
        .city {
          color: #222;
        }
      }
    }
    .divider {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background: #666;
    }
  }

  .search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: ${(props) => props.theme.color.primaryColor};
    color: #fff;
    border-radius: 50%;
  }
`;
