import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import classNames from "classnames";
import filterData from "@/assets/data/filter_data.json";
import { EntireTabsWrapper } from "./style";

const EntireTabs = memo((props) => {
  const [selectedList, setSelectedList] = useState([]); // 记录被选中的tab-item

  function handleClick(item) {
    const newList = [...selectedList]; // 拷贝一份副本
    
    if(newList.includes(item)) { // 再次点击 已包含item的话就要移除此item
      const newIndex = newList.findIndex(newItem => newItem === item);//对比找到新插入的item在新数组里的index
      newList.splice(newIndex, 1);// 移除当前项
    }else {
      newList.push(item); // 推进数组
    }
    

    setSelectedList(newList); // 设置list
  }

  return (
    <EntireTabsWrapper>
      <div className="filter-tab-list">
        {filterData.map((item) => (
          <span
            key={item}
            className={classNames("filter-tab-item", {
              active: selectedList.includes(item),
            })}
            onClick={() => handleClick(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </EntireTabsWrapper>
  );
});

EntireTabs.propTypes = {};

export default EntireTabs;
