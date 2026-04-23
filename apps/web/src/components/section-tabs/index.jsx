import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import ScrollView from "@/base-ui/scroll-view";
import "./style.scss";

const SectionTabs = memo((props) => {
  const { tabs, tabClick } = props;
  const [tabIndex, setTabIndex] = useState(0);

  function handleClick(index, name) {
    setTabIndex(index);
    tabClick(index, name);
  }

  return (
    <ScrollView>
      <div className="section-tabs">
        {tabs?.map((item, index) => (
          <div
            key={index}
            className={classNames("tabs-item", { active: tabIndex === index })}
            onClick={() => handleClick(index, item)}
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollView>
  );
});

SectionTabs.propTypes = {
  tabs: PropTypes.array,
};

export default SectionTabs;
