import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import "./style.scss";

const SearchTabs = memo((props) => {
  const { titles, tabClick } = props;
  const [curIndex, setCurIndex] = useState(0);
  
  // 处理tab点击事件，调用父组件的tabClick方法并触发
  function handleClick(index) {
    setCurIndex(index);
    tabClick && tabClick(index);
  }

  return (
    <div className="search-tabs">
      {titles.map((item, index) => (
        <div
          key={index}
          className={classNames("search-tabs-item", {
            active: index === curIndex,
          })}
          onClick={() => handleClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
});

SearchTabs.propTypes = {
  titles: PropTypes.array,
  tabClick: PropTypes.func,
};
export default SearchTabs;
