import React, { memo, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import HeaderLeft from "./c-cpns/header-left";
import HeaderCenter from "./c-cpns/header-center";
import HeaderRight from "./c-cpns/header-right";

import { HeaderWrapper } from "./style";
import classNames from "classnames";

const Header = memo(() => {
  const { homeHeader } = useSelector((state) => ({
    homeHeader: state.main.homeHeader,
  }), shallowEqual);

  const { isFixed } = homeHeader;

  return (
    <HeaderWrapper className={classNames({ fixed: isFixed })}>
      <div className="top">
        <div className="content">
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight />
        </div>
        <div className="search-area"></div>
      </div>
      <div className="modal"></div>
    </HeaderWrapper>
  );
});

export default Header;
