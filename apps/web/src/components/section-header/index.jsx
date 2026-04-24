import PropTypes from "prop-types";
import React, { memo } from "react";
import "./style.scss";

const SectionHeader = memo((props) => {
  const { title, subTitle } = props;
  return (
    <div className="section-header">
      <h2 className="title">{title}</h2>
      <div className="subTitle">{subTitle && subTitle}</div>
    </div>
  );
});

SectionHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default SectionHeader;
