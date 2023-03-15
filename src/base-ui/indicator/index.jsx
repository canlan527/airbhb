import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props) => {
  const {children, curIndex} = props
  const IndiactorRef = useRef(null)
  useEffect(() => {
    // console.log(curIndex, 'useEffect');
    const selectItem = IndiactorRef.current.children[curIndex]; // 当前选中的item dom
    const itemWidth = selectItem.clientWidth;
    const itemOffsetLeft = selectItem.offsetLeft;
    const indicatorWidth = IndiactorRef.current.clientWidth;
    const scrollWidth = IndiactorRef.current.scrollWidth;
    // 计算滚动的距离
    let distance = itemOffsetLeft + itemWidth * 0.5 - indicatorWidth * 0.5;
    // 一共能滚动的距离
    const totalDistance = scrollWidth - indicatorWidth;
    if(distance < 0) distance = 0;
    if(distance >= totalDistance) distance = totalDistance
    // console.log(curIndex, distance, totalDistance);
    IndiactorRef.current.style.transform = `translateX(${-distance}px)`
  }, [curIndex])


  return (
    <IndicatorWrapper ref={IndiactorRef}>
      {children}
    </IndicatorWrapper>
  )
})

Indicator.propTypes = {
  children: PropTypes.array,
  curIndex: PropTypes.number,
}

export default Indicator