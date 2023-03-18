import React, { memo } from 'react'
import DetailPicture from './c-cpns/detail-pictures'
import DetailInfo from './c-cpns/detail-info'
import { DetailWrapper } from './style'
const Detail = memo(() => {
  return (
    <DetailWrapper>
      <DetailPicture />
      <DetailInfo />
    </DetailWrapper>
  )
})

export default Detail