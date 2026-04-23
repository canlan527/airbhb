import React, { memo } from "react";
import Data from "@/assets/data/footer.json";
import "./style.scss";

const Footer = memo(() => {
  return (
    <div className="app-footer">
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
        © 2026 Airbnb, Inc. All rights reserved. 条款 · 隐私政策 · 网站地图 · 全国旅游投诉渠道 12301
      </div>
    </div>
  );
});

export default Footer;
