import React, { memo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import SearchTabs from "./c-cpns/search-tabs";
import SearchTypes from "./c-cpns/search-types";
import IconSearch from "@/assets/svg/icon_search";
import data from "@/assets/data/search_titles.json";
import "./style.scss";

const HeaderCenter = memo((props) => {
  const { isSearch, handleIsSearch } = props;
  const titles = data.map((item) => item.title);
  const [tabIndex, setTabIndex] = useState(0);
  const searchBarRef = useRef(null);
  const searchDetailRef = useRef(null);
  // tab点击事件，根据点击的tab的索引切换tab：搜索房源和搜索体验
  function handleTabClick(index) {
    setTabIndex(index);
  }
  // 根据isSearch状态切换动画
  function handleSearch() {
    handleIsSearch && handleIsSearch();
  }
  return (
    <div className="header-center">
      <CSSTransition
        in={!isSearch}
        classNames="bar"
        nodeRef={searchBarRef}
        timeout={250}
        unmountOnExit={true}
      >
        <div className="search-bar" ref={searchBarRef} onClick={handleSearch}>
          <div className="text">搜索房源和体验</div>
          <span className="icon">
            <IconSearch />
          </span>
        </div>
      </CSSTransition>

      <CSSTransition
        in={isSearch}
        classNames="detail"
        nodeRef={searchDetailRef}
        timeout={250}
        unmountOnExit={true}
      >
        <div className="search-detail" ref={searchDetailRef}>
          <SearchTabs titles={titles} tabClick={handleTabClick} />
          <div className="search-detail-info">
            <SearchTypes info={data[tabIndex].searchInfos} />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
});

export default HeaderCenter;
