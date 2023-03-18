import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";

import IconClose from '@/assets/svg/icon_close'
import { PreviewWrapper } from "./style";

const PicturePreview = memo((props) => {
  const {showPreview} = props
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return <PreviewWrapper>
  <div className="close-btn" onClick={showPreview}>
    <IconClose />
  </div>
  </PreviewWrapper>;
});

PicturePreview.propTypes = {};

export default PicturePreview;
