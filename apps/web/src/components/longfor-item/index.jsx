import PropTypes from "prop-types";
import React, { memo } from "react";
import "./style.scss";

const LongforItem = memo((props) => {
  const { item } = props;
  return (
    <div className="longfor-item">
      <div className="longfor-shadow"></div>
      <div className="longfor-img">
        <img src={item.picture_url} alt="" />
      </div>

      <div className="longfor-item-info">
        <span className="item-city">{item.city}</span>
        <div className="item-price">{item.price}</div>
      </div>
    </div>
  );
});

LongforItem.propTypes = {
  item: PropTypes.object,
};

export default LongforItem;
