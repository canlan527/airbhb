import classNames from ".pnpm/classnames@2.3.2/node_modules/classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import IconSearch from "@/assets/svg/icon_search";

import { SearchTypesWrapper } from "./style";
const SearchTypes = memo((props) => {
  const { info } = props;
  const [selectIndex, setSelectIndex] = useState();

  function handleClick(index) {
    selectIndex === index ? setSelectIndex(-1) : setSelectIndex(index);
  }

  return (
    <SearchTypesWrapper>
      {info.map((item, index) => (
        <div className="type-content" key={item.title}>
          <div
            className={classNames("type-item", {
              active: selectIndex === index,
            })}
            onClick={() => handleClick(index)}
          >
            <span className="item-title">{item.title}</span>
            <span
              className={classNames("item-desc", {
                city: item.desc === "全球",
              })}
            >
              {item.desc}
            </span>
          </div>
          {info.length - 1 > index && <div className="divider"></div>}
        </div>
      ))}
      <div className="search-icon">
        <IconSearch size={18} />
      </div>
    </SearchTypesWrapper>
  );
});
SearchTypes.propTypes = {
  info: PropTypes.array,
};
export default SearchTypes;
