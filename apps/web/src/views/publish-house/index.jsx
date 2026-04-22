import React, { memo, useEffect } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form, Input, InputNumber, message } from 'antd'
import { createMyHouse } from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'
import './style.scss'

const PublishHouse = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = storage.get('airbhb-user')

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
  }, [dispatch])

  async function onFinish(values) {
    if (!user) {
      messageApi.info('请先登录')
      navigate('/home')
      return
    }
    try {
      await createMyHouse({
        ...values,
        imageUrls: values.imageUrls.split('\n').map(item => item.trim()).filter(Boolean),
        tags: values.tags.split(',').map(item => item.trim()).filter(Boolean)
      })
      const nextUser = { ...user, role: 'HOST' }
      storage.set('airbhb-user', nextUser)
      messageApi.success('房源已提交，等待平台审核')
      setTimeout(() => navigate('/profile'), 600)
    } catch (error) {
      messageApi.error(error?.message || '发布失败')
    }
  }

  return (
    <div className="publish-house-page">
      {contextHolder}
      <div className="publish-hero">
        <div>
          <span className="publish-kicker">Host Onboarding</span>
          <h1>来爱彼迎发布房源</h1>
          <p>提交后房源会进入待审核状态，管理员审核通过后即可出现在平台列表中。</p>
        </div>
        <div className="publish-flow">
          <span>填写信息</span>
          <span>平台审核</span>
          <span>公开展示</span>
        </div>
      </div>

      <Card className="publish-card">
        <Form layout="vertical" onFinish={onFinish} initialValues={{
          city: '广州',
          price: 399,
          bedrooms: 2,
          bathrooms: 1,
          tags: '近地铁,自助入住,可做饭',
          coverUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
          imageUrls: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
        }}>
          <section className="form-section">
            <div className="section-head">
              <span>01</span>
              <div>
                <h2>基础信息</h2>
                <p>让用户快速理解房源位置、类型和亮点。</p>
              </div>
            </div>
            <Form.Item label="房源标题" name="title" rules={[{ required: true, message: '请输入房源标题' }]}>
              <Input placeholder="例如：城市中心设计师套房" />
            </Form.Item>
            <div className="form-grid form-grid-2">
              <Form.Item label="城市" name="city" rules={[{ required: true, message: '请输入城市' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="详细地址" name="address" rules={[{ required: true, message: '请输入地址' }]}>
                <Input placeholder="例如：天河区珠江新城附近" />
              </Form.Item>
            </div>
          </section>

          <section className="form-section">
            <div className="section-head">
              <span>02</span>
              <div>
                <h2>价格和规格</h2>
                <p>明确价格、卧室和卫生间数量，方便用户筛选。</p>
              </div>
            </div>
            <div className="form-grid">
              <Form.Item label="每晚价格" name="price" rules={[{ required: true, message: '请输入价格' }]}>
                <InputNumber min={1} addonBefore="￥" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="卧室" name="bedrooms" rules={[{ required: true, message: '请输入卧室数量' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="卫生间" name="bathrooms" rules={[{ required: true, message: '请输入卫生间数量' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </div>
          </section>

          <section className="form-section">
            <div className="section-head">
              <span>03</span>
              <div>
                <h2>图片资料</h2>
                <p>封面图用于列表展示，多图用于后续详情页扩展。</p>
              </div>
            </div>
            <Form.Item label="封面图 URL" name="coverUrl" rules={[{ required: true, message: '请输入封面图' }]}>
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item label="图片 URL，每行一个" name="imageUrls" rules={[{ required: true, message: '请输入图片' }]}>
              <Input.TextArea rows={4} placeholder="https://...\nhttps://..." />
            </Form.Item>
          </section>

          <section className="form-section">
            <div className="section-head">
              <span>04</span>
              <div>
                <h2>描述和标签</h2>
                <p>突出入住体验、周边交通和房源特色。</p>
              </div>
            </div>
            <Form.Item label="标签，逗号分隔" name="tags" rules={[{ required: true, message: '请输入标签' }]}>
              <Input placeholder="近地铁,自助入住,可做饭" />
            </Form.Item>
            <Form.Item label="房源描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
              <Input.TextArea rows={5} placeholder="描述空间布局、入住体验、交通和适合的人群。" />
            </Form.Item>
          </section>

          <div className="form-actions">
            <Button onClick={() => navigate('/profile')}>返回个人中心</Button>
            <Button type="primary" htmlType="submit">提交发布</Button>
          </div>
        </Form>
      </Card>
    </div>
  )
})

export default PublishHouse
