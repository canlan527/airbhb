import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DetailPicture from './c-cpns/detail-pictures'
import DetailInfo from './c-cpns/detail-info'
import { DetailWrapper } from './style'
const Detail = memo(() => {
  const {id} = useParams()

  const {detailInfo} = useSelector((state) => ({
    detailInfo: state.detail.detailInfo
  }))

  return (
    <DetailWrapper>
      <DetailPicture />
      <DetailInfo />
    </DetailWrapper>
  )
})

export default Detail