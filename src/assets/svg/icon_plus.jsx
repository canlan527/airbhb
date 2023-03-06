import React, { memo } from 'react'
import cssToObj from './utils'
const IconPlus = memo(() => {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={cssToObj("display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;")}><path d="m2 16h28m-14-14v28"></path></svg>
  )
})

export default IconPlus