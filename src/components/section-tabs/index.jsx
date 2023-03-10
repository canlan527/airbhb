import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";

import { TabsWrapper } from "./style";
const SectionTabs = memo((props) => {
  const { tabs } = props;
  const [tabIndex, setTabIndex] = useState(0);

  function handleClick(index) {
    setTabIndex(index);
  }

  return (
    <TabsWrapper>
      {tabs?.map((item, index) => (
        <div
          key={index}
          className={classNames("tabs-item", { active: tabIndex === index })}
          onClick={() => handleClick(index)}
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
