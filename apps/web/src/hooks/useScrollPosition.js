import { useState, useEffect } from "react";
import { throttle } from 'underscore'

// 监听页面滚动，并返回滚动后的位置
export default function useScrollPosition() {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(function () {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }, 100)

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollX, scrollY
  };
}
