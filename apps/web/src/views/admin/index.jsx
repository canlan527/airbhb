import React, { memo, useEffect, useState } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Statistic, Table, Tabs, Tag, message } from 'antd'
import {
  createAdminHouse,
  deleteAdminHouse,
  getAdminDashboard,
  getAdminHouses,
  getAdminOrders,
  getAdminUsers,
  updateAdminHouseStatus,
  updateAdminOrderStatus,
  updateAdminUserStatus
} from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'
import './style.scss'

const houseStatuses = ['PENDING', 'PUBLISHED', 'REJECTED', 'OFFLINE']
const orderStatuses = ['PENDING', 'PAID', 'CANCELLED', 'COMPLETED', 'REFUNDED']
const userStatuses = ['ACTIVE', 'DISABLED']

const Admin = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const [dashboard, setDashboard] = useState({})
  const [houses, setHouses] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = storage.get('airbhb-user')

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
    if (user?.role !== 'ADMIN') {
      messageApi.info('请使用管理员账号登录')
      navigate('/home')
      return
    }
    loadData()
  }, [])

  async function loadData() {
    try {
      const [dashboardRes, housesRes, ordersRes, usersRes] = await Promise.all([
        getAdminDashboard(),
        getAdminHouses(),
        getAdminOrders(),
        getAdminUsers()
      ])
      setDashboard(dashboardRes)
      setHouses(housesRes)
      setOrders(ordersRes)
      setUsers(usersRes)
    } catch (error) {
      messageApi.error(error?.message || '后台数据加载失败')
    }
  }

  async function handleCreateHouse(values) {
    try {
      await createAdminHouse({
        ...values,
        imageUrls: values.imageUrls.split('\n').map(item => item.trim()).filter(Boolean),
        tags: values.tags.split(',').map(item => item.trim()).filter(Boolean)
      })
      setIsModalOpen(false)
      form.resetFields()
      messageApi.success('平台房源已创建')
      loadData()
    } catch (error) {
      messageApi.error(error?.message || '创建失败')
    }
  }

  const tabs = [
    {
      key: 'houses',
      label: '房源管理',
      children: (
        <>
          <Table
            rowKey="id"
            dataSource={houses}
            columns={[
              { title: '房源', dataIndex: 'title' },
              { title: '城市', dataIndex: 'city', width: 100 },
              { title: '来源', dataIndex: 'source', width: 110, render: value => <Tag>{value}</Tag> },
              { title: '状态', dataIndex: 'status', width: 140, render: (value, record) => (
                <Select value={value} style={{ width: 120 }} onChange={(status) => updateAdminHouseStatus(record.id, status).then(loadData)}>
                  {houseStatuses.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                </Select>
              ) },
              { title: '价格', dataIndex: 'price', width: 100, render: value => `￥${value}` },
              { title: '发布者', dataIndex: ['host', 'name'], width: 120, render: value => value || '平台自营' },
              { title: '操作', width: 100, render: (_, record) => (
                <Popconfirm title="确认删除房源？" onConfirm={() => deleteAdminHouse(record.id).then(loadData)}>
                  <Button danger>删除</Button>
                </Popconfirm>
              ) }
            ]}
          />
        </>
      )
    },
    {
      key: 'orders',
      label: '订单管理',
      children: (
        <Table
          rowKey="id"
          dataSource={orders}
          columns={[
            { title: '订单号', dataIndex: 'orderNo' },
            { title: '用户', dataIndex: ['user', 'name'], width: 120 },
            { title: '房源', dataIndex: ['house', 'title'] },
            { title: '金额', dataIndex: 'amount', width: 100, render: value => `￥${value}` },
            { title: '状态', dataIndex: 'status', width: 150, render: (value, record) => (
              <Select value={value} style={{ width: 130 }} onChange={(status) => updateAdminOrderStatus(record.orderNo, status).then(loadData)}>
                {orderStatuses.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
              </Select>
            ) }
          ]}
        />
      )
    },
    {
      key: 'users',
      label: '用户管理',
      children: (
        <Table
          rowKey="id"
          dataSource={users}
          columns={[
            { title: '昵称', dataIndex: 'name' },
            { title: '邮箱', dataIndex: 'email' },
            { title: '角色', dataIndex: 'role', width: 110, render: value => <Tag color={value === 'ADMIN' ? 'red' : value === 'HOST' ? 'gold' : 'cyan'}>{value}</Tag> },
            { title: '房源数', dataIndex: ['_count', 'houses'], width: 90 },
            { title: '订单数', dataIndex: ['_count', 'orders'], width: 90 },
            { title: '状态', dataIndex: 'status', width: 140, render: (value, record) => (
              <Select value={value} style={{ width: 120 }} onChange={(status) => updateAdminUserStatus(record.id, status).then(loadData)}>
                {userStatuses.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
              </Select>
            ) }
          ]}
        />
      )
    }
  ]

  return (
    <div className="admin-page">
      {contextHolder}
      <div className="admin-head">
        <div>
          <span className="admin-kicker">Airbhb Console</span>
          <h1>平台管理后台</h1>
          <p>平台自营房源、用户发布房源、订单和用户状态统一管理。</p>
        </div>
        <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>新增平台房源</Button>
      </div>
      <div className="stats">
        <Card className="stat-card stat-card-users"><Statistic title="用户数" value={dashboard.totalUsers || 0} /></Card>
        <Card className="stat-card stat-card-houses"><Statistic title="房源数" value={dashboard.totalHouses || 0} /></Card>
        <Card className="stat-card stat-card-pending"><Statistic title="待审核房源" value={dashboard.pendingHouses || 0} /></Card>
        <Card className="stat-card stat-card-amount"><Statistic title="成交金额" value={dashboard.totalAmount || 0} prefix="￥" /></Card>
      </div>
      <Card className="admin-card">
        <Tabs items={tabs} />
      </Card>

      <Modal title="新增平台自营房源" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleCreateHouse} initialValues={{
          city: '广州',
          price: 499,
          bedrooms: 2,
          bathrooms: 1,
          tags: '平台自营,近商圈,可长租',
          coverUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          imageUrls: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
        }}>
          <Form.Item label="标题" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="城市" name="city" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="地址" name="address" rules={[{ required: true }]}><Input /></Form.Item>
          <Space>
            <Form.Item label="价格" name="price" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item>
            <Form.Item label="卧室" name="bedrooms" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item>
            <Form.Item label="卫生间" name="bathrooms" rules={[{ required: true }]}><InputNumber min={1} /></Form.Item>
          </Space>
          <Form.Item label="封面图" name="coverUrl" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="图片，每行一个" name="imageUrls" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
          <Form.Item label="标签，逗号分隔" name="tags" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="描述" name="description" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          <Button type="primary" htmlType="submit">创建</Button>
        </Form>
      </Modal>
    </div>
  )
})

export default Admin
