import React, { memo, useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import HeaderLeft from "./c-cpns/header-left";
import HeaderCenter from "./c-cpns/header-center";
import HeaderRight from "./c-cpns/header-right";

import { HeaderWrapper, SearchAreaWrapper } from "./style";
import classNames from "classnames";

const Header = memo(() => {
  const { homeHeader } = useSelector((state) => ({
    homeHeader: state.main.homeHeader,
  }), shallowEqual);
  const [isSearch, setIsSearch] = useState(false)
  const { isFixed } = homeHeader;

  function handleIsSearch() {
    setIsSearch(!isSearch);
  }

  return (
    <HeaderWrapper className={classNames({ fixed: isFixed })}>
      <div className="top">
        <div className="content">
          <HeaderLeft />
          <HeaderCenter isSearch={isSearch} handleIsSearch={handleIsSearch} />
          <HeaderRight />
        </div>
        <SearchAreaWrapper isSearch={isSearch} />
      </div>
      {isSearch && <div className="modal" onClick={handleIsSearch}></div>}
    </HeaderWrapper>
  );
});

export default Header;
