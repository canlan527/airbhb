import React, { memo, useEffect } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import HousePublishForm from '@/components/house-publish-form'
import { createMyHouse } from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'

const PublishHouse = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = storage.get('airbhb-user')

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
  }, [dispatch])

  async function handleSubmit(payload) {
    if (!user) {
      navigate('/home')
      throw new Error('请先登录')
    }
    await createMyHouse(payload)
    storage.set('airbhb-user', { ...user, role: 'HOST' })
  }

  return (
    <HousePublishForm
      heroKicker="Host Onboarding"
      heroTitle="来爱彼迎发布房源"
      heroDescription="提交后房源会进入待审核状态，管理员审核通过后即可出现在平台列表中。"
      flowSteps={['填写信息', '平台审核', '公开展示']}
      cancelText="返回个人中心"
      submitText="提交发布"
      successText="房源已提交，等待平台审核"
      errorText="发布失败"
      onCancel={() => navigate('/profile')}
      onSubmit={handleSubmit}
      onSuccess={() => setTimeout(() => navigate('/profile'), 600)}
    />
  )
})

export default PublishHouse
