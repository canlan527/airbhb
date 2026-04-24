import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import './style.scss'

const Indicator = memo((props) => {
  const {children, curIndex} = props
  const IndiactorRef = useRef(null)

  useEffect(() => {
    const selectItem = IndiactorRef.current.children[curIndex]; // 当前选中的item dom
    const itemWidth = selectItem.clientWidth; // 当前选中项的宽度
    const itemOffsetLeft = selectItem.offsetLeft; // 当前选中项的偏移量
    const indicatorWidth = IndiactorRef.current.clientWidth; // 指示器宽度
    const scrollWidth = IndiactorRef.current.scrollWidth; // 滚动宽度
    // 计算滚动的距离
    let distance = itemOffsetLeft + itemWidth * 0.5 - indicatorWidth * 0.5;
    // 一共能滚动的距离
    const totalDistance = scrollWidth - indicatorWidth;
    if(distance < 0) distance = 0;
    if(distance >= totalDistance) distance = totalDistance
    // 设置IndiactorRef滚动的样式
    IndiactorRef.current.style.transform = `translateX(${-distance}px)`
  }, [curIndex])


  return (
    <div className="indicator" ref={IndiactorRef}>
      {children}
    </div>
  )
})

Indicator.propTypes = {
  children: PropTypes.array,
  curIndex: PropTypes.number,
}

export default Indicator
