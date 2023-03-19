import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import PicturePreview from "@/base-ui/picture-preview";
import { DetailPictureWrapper } from "./style";
const DetailPicture = memo((props) => {
  const [showPreview, setShowPreview] = useState(false);
  const { info } = useSelector((state) => ({
    info: state.detail.detailInfo,
  }));

  function handlePreview() {
    setShowPreview(!showPreview);
  }

  return (
    <DetailPictureWrapper>
      <div className="picture-left">
        <div className="div-pic-item" onClick={handlePreview}>
          <img src={info.picture_url} alt="" />
          <div className="detail-pic-cover"></div>
        </div>
      </div>
      <div className="picture-right">
        {info?.picture_urls?.slice(1, 5).map((item) => (
          <div
            className="div-pic-item right"
            key={item}
            onClick={handlePreview}
          >
            <img src={item} alt="" />
            <div className="detail-pic-cover"></div>
          </div>
        ))}
      </div>
      <div className="operation-btn" onClick={handlePreview}>
        查看照片
      </div>
      {showPreview && (
        <PicturePreview
          showPreview={handlePreview}
          pictures={info.picture_urls}
          name={info.name}
        />
      )}
    </DetailPictureWrapper>
  );
});

DetailPicture.propTypes = {};

export default DetailPicture;
