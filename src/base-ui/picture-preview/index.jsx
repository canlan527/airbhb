import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";
import { CSSTransition, SwitchTransition} from 'react-transition-group'
import IconClose from "@/assets/svg/icon_close";
import IconArrowFront from '@/assets/svg/icon-arrow-front'
import IconArrowBack from '@/assets/svg/icon-arrow-back'
import { PreviewWrapper } from "./style";

const PicturePreview = memo((props) => {
  const { showPreview, pictures } = props;
  const [ curIndex, setCurIndex ] = useState(0);
  const [ direction, setDirection ] = useState('next')
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleToggle(direction = 'next') {
    let newIndex = curIndex;
    newIndex = direction === 'next' ? newIndex + 1 : newIndex - 1;
    let len = pictures.length
    if(newIndex > len - 1) newIndex = 0;
    if(newIndex < 0) newIndex = len - 1
    setCurIndex(newIndex)
    console.log(direction);
    setDirection(direction)
  }

  return (
    <PreviewWrapper direction={direction}>
    <div className="preview-top">
      <div className="close-btn" onClick={showPreview}>
        <IconClose />
      </div>
    </div>
      
      <div className="preview-main">
        <div className="arrow-control">
          <div className="arrow-btn left" onClick={() => handleToggle('prev')}>
            <IconArrowBack size='77' />
          </div>
          <div className="arrow-btn right" onClick={() => handleToggle('next')}>
            <IconArrowFront size="77" />
          </div>
        </div>
        <div className="preview-picture" onClick={() => handleToggle('next')}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={pictures[curIndex]} timeout={150} classNames="fade">
            <img src={pictures[curIndex]} alt="" />
          </CSSTransition>
        </SwitchTransition>
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
