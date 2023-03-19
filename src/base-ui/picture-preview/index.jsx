import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";

import IconClose from "@/assets/svg/icon_close";
import IconArrowFront from '@/assets/svg/icon-arrow-front'
import IconArrowBack from '@/assets/svg/icon-arrow-back'
import { PreviewWrapper } from "./style";

const PicturePreview = memo((props) => {
  const { showPreview, pictures } = props;
  const [ curIndex, setCurIndex ] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleToggleIndex(direction) {
    let newIndex = curIndex;
    newIndex = direction === 'next' ? newIndex + 1 : newIndex - 1;
    let len = pictures.length
    if(newIndex > len - 1) newIndex = 0;
    if(newIndex < 0) newIndex = len - 1
    setCurIndex(newIndex)
  }

  return (
    <PreviewWrapper>
    <div className="preview-top">
      <div className="close-btn" onClick={showPreview}>
        <IconClose />
      </div>
    </div>
      
      <div className="preview-main">
        <div className="arrow-control">
          <div className="arrow-btn left" onClick={() => handleToggleIndex('prev')}>
            <IconArrowBack size='77' />
          </div>
          <div className="arrow-btn right" onClick={() => handleToggleIndex('next')}>
            <IconArrowFront size="77" />
          </div>
        </div>
        <div className="preview-picture" onClick={() => handleToggleIndex('next')}>
          <img src={pictures[curIndex]} alt="" />
        </div>
      </div>
      <div className="preview-indicator">

      </div>
    </PreviewWrapper>
  );
});

PicturePreview.propTypes = {
  pictures: PropTypes.array,
};

export default PicturePreview;
