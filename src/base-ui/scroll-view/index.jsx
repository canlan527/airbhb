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
    function updatePosition() {
      const wrapper = ScrollViewRef.current;
      const innerView = wrapper?.children?.[0];
      const target = innerView?.children?.[curIndex];
      if (!wrapper || !innerView || !target) return;

      const maxDistance = Math.max(innerView.scrollWidth - wrapper.clientWidth, 0);
      const nextDistance = Math.min(target.offsetLeft, maxDistance);

      moveDistance.current = nextDistance;
      innerView.style.transform = `translateX(-${nextDistance}px)`;
      setShowRBtn(nextDistance < maxDistance);
      setShowLBtn(nextDistance > 0);
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [curIndex, props.children]);

  useEffect(() => {
    setCurIndex(0);
  }, [props.children]);

  function getMaxIndex() {
    const innerView = ScrollViewRef.current.children[0];
    return Math.max(innerView.children.length - 1, 0);
  }

  function handleRight() {
    setCurIndex((index) => Math.min(index + 1, getMaxIndex()));
  }

  function handleLeft() {
    setCurIndex((index) => Math.max(index - 1, 0))
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

export default ScrollView;
