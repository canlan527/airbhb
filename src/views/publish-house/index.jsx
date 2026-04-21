import React, { memo } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input, InputNumber, message } from 'antd'
import { createMyHouse } from '@/services'
import { PublishHouseWrapper } from './style'

const PublishHouse = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const user = storage.get('airbhb-user')

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
    <PublishHouseWrapper>
      {contextHolder}
      <Card title="来爱彼迎发布房源" className="publish-card">
        <Form layout="vertical" onFinish={onFinish} initialValues={{
          city: '广州',
          price: 399,
          bedrooms: 2,
          bathrooms: 1,
          tags: '近地铁,自助入住,可做饭',
          coverUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
          imageUrls: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
        }}>
          <Form.Item label="房源标题" name="title" rules={[{ required: true, message: '请输入房源标题' }]}>
            <Input placeholder="例如：城市中心设计师套房" />
          </Form.Item>
          <Form.Item label="城市" name="city" rules={[{ required: true, message: '请输入城市' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="详细地址" name="address" rules={[{ required: true, message: '请输入地址' }]}>
            <Input />
          </Form.Item>
          <div className="form-grid">
            <Form.Item label="每晚价格" name="price" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="卧室" name="bedrooms" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="卫生间" name="bathrooms" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <Form.Item label="封面图 URL" name="coverUrl" rules={[{ required: true, message: '请输入封面图' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="图片 URL，每行一个" name="imageUrls" rules={[{ required: true, message: '请输入图片' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="标签，逗号分隔" name="tags" rules={[{ required: true, message: '请输入标签' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="房源描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Button type="primary" htmlType="submit">提交发布</Button>
        </Form>
      </Card>
    </PublishHouseWrapper>
  )
})

export default PublishHouse
