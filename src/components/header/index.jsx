import classNames from "classnames";
import React, { memo, useState, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import HeaderLeft from "./c-cpns/header-left";
import HeaderCenter from "./c-cpns/header-center";
import HeaderRight from "./c-cpns/header-right";
import useScrollPosition from "@/hooks";
import { HeaderWrapper, SearchAreaWrapper } from "./style";

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
    <ThemeProvider theme={{isAlpha}}>
      <HeaderWrapper className={classNames({ fixed: isFixed })}>
        <div className="top">
          <div className="content">
            <HeaderLeft />
            <HeaderCenter isSearch={isSearch || isAlpha} handleIsSearch={handleIsSearch} />
            <HeaderRight />
          </div>
          <SearchAreaWrapper isSearch={isSearch || isAlpha} />
        </div>
        {isSearch && <div className="modal" onClick={handleIsSearch}></div>}
      </HeaderWrapper>
    </ThemeProvider>
  );
});

export default Header;
