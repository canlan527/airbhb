import PropTypes from "prop-types";
import React, { memo } from "react";
import { Rate } from "antd";
import { ItemWrapper } from "./style";
import IconStar from "@/assets/svg/icon_star";

const RoomItem = memo((props) => {
  const { item, itemWidth = '25%' } = props;
  return (
    <ItemWrapper
      verifyColor={item?.verify_info?.text_color || "#333"}
      starColor={item?.star_rating_color ?? "#008489"}
      tagColor={item?.bottom_info?.content_color ?? ""}
      itemWidth={itemWidth}
    >
      <div className="item-inner">
        <div className="item-cover">
          <img src={item.picture_url} alt="" />
        </div>
        <div className="item-desc">
          <span className="item-tag">
            {item.verify_info.messages.join(" · ")}
          </span>
          <span className="item-star">
            <span className="item-icon-star">
              <IconStar />
            </span>
            <div className="item-rating">{item.star_rating || "暂无评分"}</div>
          </span>
        </div>
        <div className="item-title">{item.name}</div>
        <div className="item-price">
          <span>{item.price_format}</span>
          /晚
        </div>
        <div className="item-extra">
          <Rate
            className="item-rate"
            disabled
            defaultValue={item.star_rating ?? 5}
          />
          <span className="item-reviews">{item.reviews_count}</span>
          <span className="item-extar-tag">
            {item.bottom_info?.content ? "· " + item.bottom_info?.content : ""}
          </span>
        </div>
      </div>
    </ItemWrapper>
  );
});

RoomItem.propTypes = {
  item: PropTypes.object,
};

export default RoomItem;
