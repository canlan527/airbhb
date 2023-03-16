import styled from "styled-components";

export const ItemWrapper = styled.div`
  width: ${(props) => props.itemWidth};
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
      cursor: pointer;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .item-swiper {
      position: relative;
      .ant-carousel .slick-slider .slick-list {
        border-radius: 22px !important;
      }

      .indicator-list {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: 0 auto;
        overflow: hidden;
        width: 30%;
        z-index: 330;

        .indicator-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 14.29%;
          .dot {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            &.active {
              width: 10px;
              height: 10px;
              background: #fff;
            }
            &.activeAside {
              width: 8px;
              height: 8px;
              background: rgba(255, 255, 255, 0.7);
            }
          }
        }
      }
      .item-swiper-control {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 12px;
        border-radius: 22px;
        z-index: 220;
        &:hover {
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.2) 10px,
            transparent 30%,
            rgba(0, 0, 0, 0.2)
          );
        }
        &:hover .btn {
          opacity: 1;
        }
        .btn {
          opacity: 0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          z-index: 250;
          &.left {
            left: 16px;
          }
          &.right {
            right: 16px;
          }
        }
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
        background: #e9e9e9;
        border-radius: 3px;
        font-size: 12px;
        color: ${(prop) => prop.verifyColor};
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
      cursor: pointer;
    }

    .item-price {
      span {
        font-weight: 700;
      }

      padding: 7px 0;
    }
    .item-extra {
      font-size: 12px;
      color: ${(props) => props.theme.text.lightColor};
      .item-rate {
        font-size: 10px;
        color: ${(props) => props.starColor};
        margin-right: 6px;
        li.ant-rate-star {
          margin-right: -1px;
        }
      }
      .item-reviews {
        margin-right: 6px;
      }
      .item-extar-tag {
        color: ${(props) => props.tagColor};
      }
    }
  }
`;
