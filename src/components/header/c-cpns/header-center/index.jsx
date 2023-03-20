import React, { memo, useState } from "react";
import { CenterWrapper } from "./styled";
import SearchTabs from "./c-cpns/search-tabs";
import SearchTypes from "./c-cpns/search-types";
import IconSearch from "@/assets/svg/icon_search";
import data from "@/assets/data/search_titles.json";
const HeaderCenter = memo((props) => {
  const { isSearch,handleIsSearch } = props;
  const titles = data.map((item) => item.title);
  const [tabIndex, setTabIndex] = useState(0);
  function handleTabClick(index) {
    setTabIndex(index);
  }
  function handleSearch() {
    handleIsSearch && handleIsSearch();
  }
  return (
    <CenterWrapper>
      {!isSearch ? (
        <div className="search-bar" onClick={handleSearch}>
          <div className="text">搜索房源和体验</div>
          <span className="icon">
            <IconSearch />
          </span>
        </div>
      ) : (
        <div className="search-detail">
          <SearchTabs titles={titles} tabClick={handleTabClick} />
          <div className="search-detail-info">
            <SearchTypes info={data[tabIndex].searchInfos} />
          </div>
        </div>
      )}
    </CenterWrapper>
  );
});

export default HeaderCenter;
