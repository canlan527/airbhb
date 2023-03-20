import PropTypes from "prop-types";
import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Rate } from "antd";
import { DetailInfoWrapper } from "./style";
const DetailInfo = memo((props) => {
  const rateTitles = [
    "如实描述",
    "入住便捷",
    "沟通顺畅",
    "位置便利",
    "干净卫生",
    "高性价比",
  ];
  const { info } = useSelector((state) => ({
    info: state.detail.detailInfo,
  }), shallowEqual);
  
  return (
    <DetailInfoWrapper>
      <div className="detail-info-left">
        <div className="detail-info-title">{info.name}</div>
        <div className="detail-info-verify">
          {info?.verify_info?.messages.map((item) => (
            <span key={item} className="detail-info-tag">
              {item}
            </span>
          ))}
        </div>
        <div className="detail-info-rating">
          <h2>房客评价</h2>
          <div className="detail-info-rating-count">
            <Rate disabled defaultValue={info.star_rating} className="rate" />
            <span>共{info.reviews_count}条评价</span>
          </div>
          <div className="detail-info-rating-section">
            {rateTitles.map((item) => (
              <div key={item} className="detail-info-rating-item">
                <span>{item}</span>
                <Rate
                  disabled
                  defaultValue={info.star_rating}
                  className="rate"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="detail-info-comment">
          {info?.reviews?.map((item) => (
            <div className="detail-info-comment-item" key={item.review_id}>
              <div className="comment-top">
                <div className="detail-info-comment-avatar">
                  <img src={item.reviewer_image_url} alt="" />
                </div>
                <div className="comment-info">
                  <h3 className="name">匿名游客</h3>
                  <div className="time">{item.localized_date}</div>
                </div>
              </div>
              <div className="comment-content">{item.comments}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="detail-info-right">
        <div className="detail-info-price">
          <h3>{info.price_format} / 晚</h3>
          <span className="detail-info-rate">
            <Rate disabled defaultValue={info.star_rating} className="rate" />
            <span>{info.reviews_count}条</span>
          </span>
        </div>
        <div className="detail-btn">查看订阅状态</div>
        <span className="tip">您暂时不会被收费</span>
      </div>
    </DetailInfoWrapper>
  );
});

DetailInfo.propTypes = {};

export default DetailInfo;
