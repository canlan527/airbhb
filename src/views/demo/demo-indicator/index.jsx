import React, { memo, useState } from "react";
import Indicator from "@/base-ui/indicator";
import { DemoIndicatorWrapper } from "./style";

const DemoIndicator = memo(() => {
  const list = [
    "测试111",
    "测试2222",
    "测试333",
    "测试4444",
    "测试5555",
    "测试6666",
    "测试777",
  ];
  const [curIndex, setCurIndex] = useState(0)
  function handleClick(direction) {
    let newIndex = direction === 'next' ? curIndex + 1 : curIndex - 1;
    // 判断边界情况
    if(newIndex < 0) newIndex = list.length - 1;
    if(newIndex > list.length - 1) newIndex = 0;
   setCurIndex(newIndex) 
  }

  return (
    <DemoIndicatorWrapper>
      <div className="tools">
        <button onClick={() => handleClick('prev')}>prev</button> | <button onClick={() => handleClick('next')}>next</button>
      </div>
      <div className="indicator-list">
        <Indicator curIndex={curIndex}>
          {list.map((item, index) => (
            <span key={index} className="indicator-item">
              {item}
            </span>
          ))}
        </Indicator>
      </div>
    </DemoIndicatorWrapper>
  );
});

export default DemoIndicator;
