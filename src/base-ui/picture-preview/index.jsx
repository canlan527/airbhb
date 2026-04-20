import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Indicator from "@/base-ui/indicator";
import IconClose from "@/assets/svg/icon_close";
import IconArrowFront from "@/assets/svg/icon-arrow-front";
import IconArrowBack from "@/assets/svg/icon-arrow-back";
import IconArrowTrangleUp from "@/assets/svg/icon_arrow_trangle_up";
import IconArrowTrangleDown from "@/assets/svg/icon_arrow_trangle_down";
import { PreviewWrapper } from "./style";
import classNames from "classnames";

const PicturePreview = memo((props) => {
  // 获取父组件属性
  const { showPreview, pictures, name, showIndex } = props;
  const [curIndex, setCurIndex] = useState(showIndex??0); // 当前展示的图片的索引
  const [direction, setDirection] = useState("next"); // 图片方向
  const [showIndicator, setShowIndicator] = useState(true); // 显示图片列表
  
  // 图片预览设置页面overflow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 处理图片切换事件
  function handleToggle(direction = "next") {
    let newIndex = curIndex; // 图片索引
    newIndex = direction === "next" ? newIndex + 1 : newIndex - 1; //如果是方向是next 自增索引 否则自减索引
    let len = pictures.length; // 图片数据的长度
    // 判断索引边界
    if (newIndex > len - 1) newIndex = 0;
    if (newIndex < 0) newIndex = len - 1;
    // 设置索引
    setCurIndex(newIndex);
    // 设置查看方向
    setDirection(direction);
  }
  
  // 处理indicator
  function handleIndicator(index) {
    if (curIndex > index) handleToggle("prev");
    if (curIndex < index) handleToggle("next");
    if (curIndex === index) return;
    setCurIndex(index);
  }

  return (
    <PreviewWrapper
      direction={direction}
      indicatorHeight={showIndicator ? 67 : 0}
    >
      <div className="preview-top">
        <div className="close-btn" onClick={showPreview}>
          <IconClose />
        </div>
      </div>
      <div className="preview-main">
        <div className="arrow-control">
          <div className="arrow-btn left" onClick={() => handleToggle("prev")}>
            <IconArrowBack size="77" />
          </div>
          <div className="arrow-btn right" onClick={() => handleToggle("next")}>
            <IconArrowFront size="77" />
          </div>
        </div>
        <div className="preview-picture" onClick={() => handleToggle("next")}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={pictures[curIndex]}
              timeout={150}
              classNames="fade"
            >
              <img src={pictures[curIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className="preview-indicator">
        <div className="toolbar">
          <span>
            {curIndex + 1} / {pictures.length}: {name}图片{curIndex + 1}
          </span>
          <span
            className="toolbar-btn"
            onClick={() => setShowIndicator(!showIndicator)}
          >
            {showIndicator ? "隐藏" : "显示"}图片列表
            {showIndicator ? <IconArrowTrangleDown /> : <IconArrowTrangleUp />}
          </span>
        </div>
        <div className="preview-list">
          <Indicator curIndex={curIndex}>
            {pictures.map((item, index) => (
              <li
                key={item}
                className="preview-item"
                onClick={() => handleIndicator(index)}
              >
                <img src={item} alt="" />
                <div
                  className={classNames("preview-cover", {
                    active: index === curIndex,
                  })}
                ></div>
              </li>
            ))}
          </Indicator>
        </div>
      </div>
    </PreviewWrapper>
  );
});

PicturePreview.propTypes = {
  pictures: PropTypes.array,
  name: PropTypes.string,
  showIndex: PropTypes.number,
};

export default PicturePreview;
