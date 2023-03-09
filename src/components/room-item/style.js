import styled from "styled-components";

export const ItemWrapper = styled.div`
  width: 25%;
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;
  .item-inner {
    width: 100%;
    .item-cover {
      position: relative;
      padding: 66.66% 8px 0;
      border-radius: 18px;
      overflow: hidden;
      margin-bottom: 12px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .item-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .item-tag {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 5px;
        background: #dfdfdf;
        border-radius: 3px;
        font-size: 12px;
        color: ${prop => prop.verifyColor};
      }
      .item-star {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-icon-star {
          margin-right: 6px;
        }
        .item-rating {
        }
      }
    }

    .item-title {
      line-height: 24px;
      font-weight: 600;
      -webkit-line-clamp: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .item-price {
      span {
        font-weight: 700;
      }
      
      padding: 7px 0;
    }
  }
`;
