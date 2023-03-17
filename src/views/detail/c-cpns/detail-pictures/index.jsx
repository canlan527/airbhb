import PropTypes from "prop-types";
import React, { memo } from "react";
import { useSelector } from "react-redux";

import { DetailPictureWrapper } from "./style";
const DetailPicture = memo((props) => {
  const { info } = useSelector((state) => ({
    info: state.detail.detailInfo,
  }));

  return (
    <DetailPictureWrapper>
      <div className="picture-left">
        <div className="div-pic-item">
          <img src={info.picture_url} alt="" />
          <div className="detail-pic-cover"></div>
        </div>
      </div>
      <div className="picture-right">
        {info?.picture_urls?.slice(1, 5).map((item) => (
          <div className="div-pic-item right" key={item}>
            <img src={item} alt="" />
            <div className="detail-pic-cover"></div>
          </div>
        ))}
      </div>
      <div className="operation-btn">
        查看照片
      </div>
    </DetailPictureWrapper>
  );
});

DetailPicture.propTypes = {};

export default DetailPicture;
