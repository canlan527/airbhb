import React, { memo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import PicturePreview from "@/base-ui/picture-preview";
import "./style.scss";

const DetailPicture = memo((props) => {
  const [showPreview, setShowPreview] = useState(false); //显示预览
  const [showIndex, setShowIndex] = useState(0); // 当前预览的图片的索引
  
  // 从redux里获取详情info
  const { info } = useSelector((state) => ({
    info: state.detail.detailInfo,
  }), shallowEqual);

  // 图片预览处理事件
  function handlePreview(pic, index) {
    setShowPreview(!showPreview);
    pic === "midPic" ? setShowIndex(index + 1) : setShowIndex(0);
  }

  return (
    <div className="detail-picture">
      <div className="picture-left">
        <div className="div-pic-item" onClick={handlePreview}>
          <img src={info.picture_url} alt="" />
          <div className="detail-pic-cover"></div>
        </div>
      </div>
      <div className="picture-right">
        {info?.picture_urls?.slice(1, 5).map((item, index) => (
          <div
            className="div-pic-item right"
            key={item}
            onClick={() => handlePreview("midPic", index)}
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
          showIndex={showIndex}
        />
      )}
    </div>
  );
});

export default DetailPicture;
