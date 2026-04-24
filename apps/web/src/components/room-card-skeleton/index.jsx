import React, { memo } from "react";
import "./style.scss";

const RoomCardSkeleton = memo((props) => {
  const {
    itemWidth = "25%",
    tabletWidth,
    mobileWidth,
    compactWidth,
  } = props;

  return (
    <div
      className="room-card-skeleton"
      style={{
        "--room-card-skeleton-width": itemWidth,
        "--room-card-skeleton-tablet-width": tabletWidth || itemWidth,
        "--room-card-skeleton-mobile-width": mobileWidth || itemWidth,
        "--room-card-skeleton-compact-width": compactWidth || "100%",
      }}
    >
      <div className="cover skeleton-block"></div>
      <div className="meta skeleton-block"></div>
      <div className="title skeleton-block"></div>
      <div className="price skeleton-block"></div>
    </div>
  );
});

export default RoomCardSkeleton;
