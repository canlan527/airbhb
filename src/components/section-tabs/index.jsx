import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";

import { TabsWrapper } from "./style";
const SectionTabs = memo((props) => {
  const { tabs, tabClick } = props;
  const [tabIndex, setTabIndex] = useState(0);

  function handleClick(index,name) {
    setTabIndex(index);
    tabClick(index, name);
  }

  return (
    <TabsWrapper>
      {tabs?.map((item, index) => (
        <div
          key={index}
          className={classNames("tabs-item", { active: tabIndex === index })}
          onClick={() => handleClick(index,item)}
        >
          {item}
        </div>
      ))}
    </TabsWrapper>
  );
});

SectionTabs.propTypes = {
  tabs: PropTypes.array,
};

export default SectionTabs;
