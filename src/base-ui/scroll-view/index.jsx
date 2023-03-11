import PropTypes from "prop-types";
import React, { memo, useState, useEffect, useRef } from "react";
import { ViewWrapper } from "./style";
import IconArrowFront from "@/assets/svg/icon-arrow-front";
import IconArrowBack from "@/assets/svg/icon-arrow-back";

const ScrollView = memo((props) => {
  const [curIndex, setCurIndex] = useState(0); // 当前滚动到的tab的index
  const [showRBtn, setShowRBtn] = useState(false); // 控制右侧按钮
  const [showLBtn, setShowLBtn] = useState(false); // 控制左侧按钮
  const ScrollViewRef = useRef(); // children 的ref
  const moveDistance = useRef(); // innerView已经滚动的距离
  useEffect(() => {
    handleMove()
  }, [curIndex]);

  // 处理滚动逻辑的函数
  function handleMove() {
    const innerView = ScrollViewRef.current.children[0];
    // 移动一个item的宽度
    moveDistance.current = innerView.children[curIndex].offsetLeft;
    innerView.style.transform = `translateX(-${moveDistance.current}px)`;
    // innerView可滚动的距离
    const distance = innerView.scrollWidth - innerView.clientWidth;
    // 显示隐藏右侧按钮，右侧按钮显示的条件是已经滚动的距离 < 可滚动的距离
    setShowRBtn(moveDistance.current < distance)
    // 显示影藏左侧按钮，左侧按钮显示的条件是已滚动的距离 > 0
    setShowLBtn(moveDistance.current > 0)
  }

  function handleRight() {
    setCurIndex(curIndex + 1);
  }

  function handleLeft() {
    setCurIndex(curIndex - 1)
  }

  return (
    <ViewWrapper>
      {showLBtn && <div className="btn left-btn" onClick={handleLeft}>
        <IconArrowBack />
      </div>}
      {showRBtn && (
        <div className="btn right-btn" onClick={handleRight}>
          <IconArrowFront />
        </div>
      )}
      <div className="scroll-content slot" ref={ScrollViewRef}>
        {props.children}
      </div>
    </ViewWrapper>
  );
});

ScrollView.propTypes = {
  // children: PropTypes.element
};

export default ScrollView;
