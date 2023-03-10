import React, { memo } from "react";
import cssToObj from "./utils";

const IconArrowDown = memo(() => {
  return (
    <svg
      viewBox="0 0 18 18"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      style={cssToObj(
        "height: 16px; width: 16px; display: block; fill: currentcolor;"
      )}
    >
      <path
        d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
});

export default IconArrowDown;
