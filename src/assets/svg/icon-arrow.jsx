import React, { memo } from "react";
import cssToObj from "./utils";

const IconArrow = memo(() => {
  return (
    <svg
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      style={cssToObj(
        "height: 24px; width: 24px; display: block; fill: currentcolor;"
      )}
    >
      <path
        d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
});

export default IconArrow;
