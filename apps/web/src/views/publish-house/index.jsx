import React, { memo, useEffect, useMemo } from 'react'
import storage from 'store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import HousePublishForm from '@/components/house-publish-form'
import { createMyHouse, updateMyHouse } from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'

const PublishHouse = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = storage.get('airbhb-user')
  const editingHouse = location.state?.mode === 'edit' ? location.state?.house : null
  const isEditMode = Boolean(editingHouse?.id)

  const formInitialValues = useMemo(() => {
    if (!editingHouse) return undefined
    return {
      ...editingHouse,
      tags: Array.isArray(editingHouse.tags) ? editingHouse.tags.join(',') : editingHouse.tags,
      imageUrls: Array.isArray(editingHouse.imageUrls) ? editingHouse.imageUrls.join('\n') : editingHouse.imageUrls
    }
  }, [editingHouse])

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
  }, [dispatch])

  async function handleSubmit(payload) {
    if (!user) {
      navigate('/home')
      throw new Error('请先登录')
    }
    if (isEditMode) {
      await updateMyHouse(editingHouse.id, payload)
      return
    }
    await createMyHouse(payload)
    storage.set('airbhb-user', { ...user, role: 'HOST' })
  }

  return (
    <HousePublishForm
      heroKicker={isEditMode ? 'Host Editing' : 'Host Onboarding'}
      heroTitle={isEditMode ? '修改你的房源信息' : '来爱彼迎发布房源'}
      heroDescription={isEditMode ? '你可以更新房源资料、图片和描述；保存后房源会重新进入待审核状态，管理员审核通过后再公开展示。' : '提交后房源会进入待审核状态，管理员审核通过后即可出现在平台列表中。'}
      flowSteps={isEditMode ? ['查看详情', '修改信息', '提交更新'] : ['填写信息', '平台审核', '公开展示']}
      initialValues={formInitialValues}
      cancelText="返回个人中心"
      submitText={isEditMode ? '保存修改' : '提交发布'}
      successText={isEditMode ? '房源修改已保存，已重新进入审核队列' : '房源已提交，等待平台审核'}
      errorText={isEditMode ? '修改失败' : '发布失败'}
      onCancel={() => navigate('/profile')}
      onSubmit={handleSubmit}
      onSuccess={() => setTimeout(() => navigate('/profile'), 600)}
    />
  )
})

export default PublishHouse
