import PropTypes from "prop-types";
import React, { memo } from "react";

import { ItemWrapper } from "./style";

const LongforItem = memo((props) => {
  const { item } = props;
  return (
    <ItemWrapper>
      <div className="longfor-shadow"></div>
      <div className="longfor-img">
        <img src={item.picture_url} alt="" />
      </div>

      <div className="longfor-item-info">
        <span className="item-city">{item.city}</span>
        <div className="item-price">{item.price}</div>
      </div>
    </ItemWrapper>
  );
});

LongforItem.propTypes = {
  item: PropTypes.object,
};

export default LongforItem;
