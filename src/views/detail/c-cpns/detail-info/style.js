import styled from "styled-components";

export const DetailInfoWrapper = styled.div`
.detail-info-main {}
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .detail-info-left {
    width: 60%;
    padding: 0 50px;
    .detail-info-title {
      font-size: 28px;
      font-weight:600;
      line-height: 38px;
    }
    .detail-info-verify {
      padding:10px 0;
      margin: 10px 0;
      .detail-info-tag {
        display: inline-block;
        padding: 6px 10px;
        margin-right: 10px;
        background: #e3e3e3;
        color: #444;
        font-size: 12px;
        border-radius: 6px;
      }
    }
    .detail-info-rating {
      padding: 26px 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      h2 {
        font-size: 28px;
      }
      .detail-info-rating-count {
        margin: 14px 0;
      }
      .detail-info-rating-section {
        width: 100%;
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .detail-info-rating-item {
          font-size: 16px;
          width: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-right: 20px;
          &:nth-of-type(2n) {
            padding-right: 0;
            padding-left: 20px;
          }
        }
      }
    }
    .detail-info-comment {
      margin: 20px 0;
      .detail-info-comment-item {

        margin: 10px 0;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        .comment-top {
          padding-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .detail-info-comment-avatar {
            width: 50px;
            height: 50px;
            margin-right: 20px;
            img {
              width: 100%;
              height: 100%;
            border-radius: 50%;
              object-fit: cover;
            }
          }
          .comment-info {
            flex: 1;
           
            .name {
              font-size:16px;
              font-weight: 600;
            }
            .time {
              font-size: 14px;
              color: #ccc;
            }
          }
        }
        .comment-content {
          line-height:28px;
        }
      }
    }
  }

  .detail-info-right {
    padding: 20px;
    border: 1px solid #ccc;
    width: 375px;
    .detail-info-price {
      h3 {
        font-size: 28px;
        line-height: 36px;
      }
      .detail-info-rate {
        cursor: pointer;
        .rate {
          font-size: 14px;
          margin-right: 12px;
          .ant-rate-star {
      margin:0;
    }
        }
      }
    }
    .detail-btn {
      width: 100%;
      margin-top: 12px  ;
      padding: 12px 0;
      background: #FF5A5F;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
    .tip {
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #b2b2b2;
      padding: 12px;
      font-size: 12px;
    }
  }
  .rate {
    
    color: ${props => props.theme.color.secondaryColor};
    margin-right: 12px;
  }
`;
