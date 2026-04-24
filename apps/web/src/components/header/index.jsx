import classNames from "classnames";
import React, { memo, useState, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import HeaderLeft from "./c-cpns/header-left";
import HeaderCenter from "./c-cpns/header-center";
import HeaderRight from "./c-cpns/header-right";
import {useScrollPosition} from "@/hooks";
import "./style.scss";

const Header = memo(() => {
  const { homeHeader } = useSelector(
    (state) => ({
      homeHeader: state.main.homeHeader,
    }),
    shallowEqual
  );
  const [isSearch, setIsSearch] = useState(false);
  const { isFixed, alpha } = homeHeader;

  function handleIsSearch() {
    setIsSearch(!isSearch);
  }
  // 监听滚动Y值，如果在isSearch的状态下，向上、向下滚动大于30就让search-detail消失
  const currentY = useRef(0);
  const { scrollY } = useScrollPosition();
  if (!isSearch) currentY.current = scrollY;
  if (isSearch && Math.abs(scrollY - currentY.current) > 30) setIsSearch(false);

  // alpha
  const isAlpha = alpha && scrollY === 0;

  return (
    <div
      className={classNames("header-root", { fixed: isFixed })}
      style={{
        "--header-top-bg": isAlpha ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
        "--header-border-color": isAlpha ? "rgba(255,255,255,0)" : "#eee",
        "--header-primary-color": "var(--color-brand)",
        "--header-left-color": isAlpha ? "#fff" : "var(--color-brand)",
        "--header-text-primary": "var(--color-ink)",
        "--header-text-light": "var(--color-ink-muted)",
        "--header-alpha-text": isAlpha ? "#fff" : "var(--color-ink)",
        "--header-alpha-title": isAlpha ? "#fff" : "#222",
        "--header-hover-text": isAlpha ? "var(--color-ink)" : "var(--color-ink-soft)",
        "--header-center-bar-text": isAlpha ? "#fff" : "#222",
        "--header-search-tabs-color": isAlpha ? "#fff" : "var(--color-ink-soft)",
        "--header-search-tabs-active-color": isAlpha ? "#fff" : "var(--color-ink-soft)",
        "--header-search-tabs-hover-color": isAlpha ? "#222222" : "var(--color-ink-subtle)"
      }}
    >
      <div className="top">
        <div className="content">
          <HeaderLeft />
          <HeaderCenter isSearch={isSearch || isAlpha} handleIsSearch={handleIsSearch} />
          <HeaderRight />
        </div>
        <div
          className="search-area"
          style={{ "--header-search-area-height": isSearch || isAlpha ? "100px" : "0" }}
        />
      </div>
      {isSearch && <div className="modal" onClick={handleIsSearch}></div>}
    </div>
  );
});

export default Header;
