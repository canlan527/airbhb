import React, { memo } from "react";
import { FooterWrapper } from "./style";
import Data from "@/assets/data/footer.json";

const Footer = memo(() => {
  return (
    <FooterWrapper>
      <div className="content">
        {Data.map((item) => (
          <div className="list" key={item.name}>
            <h5 className="title">{item.name}</h5>
            {item.list.map((innerItem) => ( 
              <li key={innerItem} className="item">{innerItem}</li>
            ))}
          </div>
        ))}
      </div>
      <div className="bottom">
        © 2023 Airbnb, Inc. All rights reserved. 条款 · 隐私政策 · 网站地图 · 全国旅游投诉渠道 12301
      </div>
    </FooterWrapper>
  );
});

export default Footer;
