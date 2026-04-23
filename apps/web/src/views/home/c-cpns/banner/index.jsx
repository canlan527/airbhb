import React, { memo } from "react";
import "./style.scss";

const Banner = memo(({ loading = false }) => {
  const bannerClassName = loading ? "home-banner is-loading" : "home-banner";

  return <div className={bannerClassName}></div>;
});

export default Banner;
