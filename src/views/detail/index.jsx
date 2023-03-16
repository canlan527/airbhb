import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Detail = memo(() => {
  const {id} = useParams()

  const {detailInfo} = useSelector((state) => ({
    detailInfo: state.detail.detailInfo
  }))
  
  return (
    <div>Detail: 
      {id}
      {detailInfo.name}
    </div>
  )
})

export default Detail