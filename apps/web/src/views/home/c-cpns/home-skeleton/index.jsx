import React, { memo } from "react";
import RoomCardSkeleton from "@/components/room-card-skeleton";
import "./style.scss";

const HomeSkeleton = memo(() => {
  const cardItems = Array.from({ length: 6 });
  const destinationItems = Array.from({ length: 8 });

  return (
    <div className="home-skeleton">
      <div className="section-head">
        <div className="title skeleton-block"></div>
        <div className="subtitle skeleton-block"></div>
      </div>
      <div className="tab-row">
        {destinationItems.map((_, index) => (
          <div className="tab skeleton-block" key={index}></div>
        ))}
      </div>
      <div className="card-grid">
        {cardItems.map((_, index) => (
          <RoomCardSkeleton key={index} itemWidth="33.33%" />
        ))}
      </div>
    </div>
  );
});

export default HomeSkeleton;
