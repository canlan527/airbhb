import PropTypes from "prop-types";
import React, { memo, useState, useEffect, useRef } from "react";
import { Rate, Carousel, Skeleton } from "antd";
import { ItemWrapper } from "./style";
import Indicator from "@/base-ui/indicator";
import IconStar from "@/assets/svg/icon_star";
import IconArrowBack from "@/assets/svg/icon-arrow-back";
import IconArrowFront from "@/assets/svg/icon-arrow-front";
import classNames from "classnames";
const RoomItem = memo((props) => {
  const { item, itemClick, itemWidth = "25%" } = props;
  const [curIndex, setCurIndex] = useState(0);
  const [loading, setLoading] = useState(true)

  const CarouselRef = useRef(null);

  useEffect(() => {
    if(item) {
      setLoading(false)
    }
  },[item]) 
  // 处理轮播图箭头点击
  function handleArrowClick(direction, e) {
    e.stopPropagation();
    const list = item?.picture_urls;
    let newIndex = 0; //轮播点
    if (direction === "prev") {
      newIndex = curIndex - 1;
      CarouselRef.current.prev();
    } else if (direction === "next") {
      newIndex = curIndex + 1;
      CarouselRef.current.next();
    }
    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex > list.length - 1) newIndex = 0;
    setCurIndex(newIndex);
  }

  function handleItemClick(item) {
    itemClick && itemClick(item)
  }

  // 单图元素
  const SingleEl = (
    <div className="item-cover">
      <img src={item.picture_url} alt="" />
    </div>
  );
  // 轮播图元素
  const swiperEl = (
    <div className="item-swiper">
      <div className="item-swiper-control">
        <div className="btn left" onClick={(e) => handleArrowClick("prev", e)}>
          <IconArrowBack size="26" />
        </div>
        <div className="btn right" onClick={(e) => handleArrowClick("next", e)}>
          <IconArrowFront size="26" />
        </div>
      </div>
      <div className="indicator-list">
        <Indicator curIndex={curIndex}>
          {item?.picture_urls?.map((item, index) => (
            <div key={index} className="indicator-item">
              <span
                className={classNames("dot", {
                  active: curIndex === index,
                  activeAside: curIndex === index - 1 || curIndex === index + 1,
                })}
              ></span>
            </div>
          ))}
        </Indicator>
      </div>
      <Carousel dots={false} ref={CarouselRef}>
        {item?.picture_urls?.map((url) => (
          <div key={url} className="item-cover">
            <img src={url} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );

  return (
    <ItemWrapper
      verifyColor={item?.verify_info?.text_color || "#333"}
      starColor={item?.star_rating_color ?? "#008489"}
      tagColor={item?.bottom_info?.content_color ?? ""}
      itemWidth={itemWidth}
      onClick={() => handleItemClick(item)}
    >
      <div className="item-inner">
        {item?.picture_urls ? swiperEl : SingleEl}

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
        <Skeleton loading={loading} />
      </div>
    </ItemWrapper>
  );
});

RoomItem.propTypes = {
  item: PropTypes.object,
};

export default RoomItem;
