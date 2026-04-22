import React, { memo } from "react";
import { CardSkeletonWrapper } from "./style";

const RoomCardSkeleton = memo((props) => {
  const { itemWidth = "25%" } = props;

  return (
    <CardSkeletonWrapper itemWidth={itemWidth}>
      <div className="cover skeleton-block"></div>
      <div className="meta skeleton-block"></div>
      <div className="title skeleton-block"></div>
      <div className="price skeleton-block"></div>
    </CardSkeletonWrapper>
  );
});

export default RoomCardSkeleton;
