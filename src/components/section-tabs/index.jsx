import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import ScrollView from "@/base-ui/scroll-view";

import { TabsWrapper } from "./style";
const SectionTabs = memo((props) => {
  const { tabs, tabClick } = props;
  const [tabIndex, setTabIndex] = useState(0);

  tabs.push('测试1')
  tabs.push('测试2')
  tabs.push('测试3')

  function handleClick(index, name) {
    setTabIndex(index);
    tabClick(index, name);
  }

  return (
    <ScrollView>
      <TabsWrapper>
        {tabs?.map((item, index) => (
          <div
            key={index}
            className={classNames("tabs-item", { active: tabIndex === index })}
            onClick={() => handleClick(index, item)}
          >
            {item}
          </div>
        ))}
      </TabsWrapper>
    </ScrollView>
  );
});

SectionTabs.propTypes = {
  tabs: PropTypes.array,
};

export default SectionTabs;
