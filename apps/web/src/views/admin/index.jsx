import React, { memo, useEffect, useState } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Descriptions, Image, Modal, Popconfirm, Select, Space, Statistic, Table, Tabs, Tag, message } from 'antd'
import HousePublishForm from '@/components/house-publish-form'
import {
  createAdminHouse,
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
  const [selectedHouse, setSelectedHouse] = useState(null)
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

  async function handleCreateHouse(payload) {
    await createAdminHouse(payload)
    loadData()
  }

  async function handleOfflineHouse(id) {
    try {
      await updateAdminHouseStatus(id, 'OFFLINE')
      messageApi.success('房源已下架，历史订单和成交金额已保留')
      loadData()
    } catch (error) {
      messageApi.error(error?.message || '下架失败')
    }
  }

  async function handlePublishHouse(id) {
    try {
      await updateAdminHouseStatus(id, 'PUBLISHED')
      messageApi.success('房源已重新上架')
      loadData()
    } catch (error) {
      messageApi.error(error?.message || '重新上架失败')
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
              { title: '操作', width: 180, render: (_, record) => (
                <Space>
                  <Button onClick={() => setSelectedHouse(record)}>查看</Button>
                  {record.status === 'OFFLINE' ? (
                    <Popconfirm title="确认重新上架房源？" onConfirm={() => handlePublishHouse(record.id)}>
                      <Button type="primary">重新上架</Button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm title="确认下架房源？" description="下架后前台不可见，历史订单和成交金额会保留。" onConfirm={() => handleOfflineHouse(record.id)}>
                      <Button danger>下架</Button>
                    </Popconfirm>
                  )}
                </Space>
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
    <div className="admin-page fullstack-page fullstack-page--admin">
      {contextHolder}
      <div className="admin-head fullstack-hero">
        <div>
          <span className="admin-kicker fullstack-kicker">Airbhb Console</span>
          <h1>平台管理后台</h1>
          <p>平台自营房源、用户发布房源、订单和用户状态统一管理。</p>
        </div>
        <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>新增平台房源</Button>
      </div>
      <div className="stats fullstack-stat-grid">
        <Card className="stat-card stat-card-users fullstack-stat-card"><Statistic title="用户数" value={dashboard.totalUsers || 0} /></Card>
        <Card className="stat-card stat-card-houses fullstack-stat-card"><Statistic title="房源数" value={dashboard.totalHouses || 0} /></Card>
        <Card className="stat-card stat-card-pending fullstack-stat-card"><Statistic title="待审核房源" value={dashboard.pendingHouses || 0} /></Card>
        <Card className="stat-card stat-card-amount fullstack-stat-card"><Statistic title="成交金额" value={dashboard.totalAmount || 0} prefix="￥" /></Card>
      </div>
      <Card className="admin-card fullstack-card fullstack-tabs">
        <Tabs items={tabs} />
      </Card>

      <Modal
        className="admin-publish-modal"
        title={null}
        width={1120}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <HousePublishForm
          embedded
          heroKicker="Admin Publishing"
          heroTitle="新增平台自营房源"
          heroDescription="由管理员录入的平台自营房源会直接上架，适合平台合作房源、城市精选房源和运营活动房源。"
          flowSteps={['填写信息', '直接上架', '运营管理']}
          initialValues={{
            city: '广州',
            price: 499,
            bedrooms: 2,
            bathrooms: 1,
            tags: '平台自营,近商圈,可长租',
            coverUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
            imageUrls: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
          }}
          cancelText="取消"
          submitText="创建并上架"
          successText="平台房源已创建并上架"
          errorText="创建失败"
          onCancel={() => setIsModalOpen(false)}
          onSubmit={handleCreateHouse}
          onSuccess={() => setTimeout(() => setIsModalOpen(false), 500)}
        />
      </Modal>

      <Modal
        className="house-detail-modal"
        title="房源审核详情"
        width={920}
        open={Boolean(selectedHouse)}
        footer={[
          <Button key="close" onClick={() => setSelectedHouse(null)}>关闭</Button>,
          selectedHouse?.status !== 'REJECTED' ? (
            <Button key="reject" danger onClick={() => updateAdminHouseStatus(selectedHouse.id, 'REJECTED').then(() => {
              setSelectedHouse(null)
              loadData()
            })}>驳回</Button>
          ) : null,
          selectedHouse?.status !== 'PUBLISHED' ? (
            <Button key="publish" type="primary" onClick={() => updateAdminHouseStatus(selectedHouse.id, 'PUBLISHED').then(() => {
              setSelectedHouse(null)
              loadData()
            })}>上架</Button>
          ) : null
        ]}
        onCancel={() => setSelectedHouse(null)}
      >
        {selectedHouse ? (
          <div className="house-detail">
            <div className="house-detail-cover">
              <Image src={selectedHouse.coverUrl} alt={selectedHouse.title} />
            </div>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="房源标题" span={2}>{selectedHouse.title}</Descriptions.Item>
              <Descriptions.Item label="城市">{selectedHouse.city}</Descriptions.Item>
              <Descriptions.Item label="价格">￥{selectedHouse.price} / 晚</Descriptions.Item>
              <Descriptions.Item label="来源"><Tag>{selectedHouse.source}</Tag></Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={selectedHouse.status === 'PUBLISHED' ? 'green' : selectedHouse.status === 'PENDING' ? 'gold' : 'default'}>{selectedHouse.status}</Tag></Descriptions.Item>
              <Descriptions.Item label="发布者">{selectedHouse.host?.name || '平台自营'}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{selectedHouse.host?.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="卧室">{selectedHouse.bedrooms}</Descriptions.Item>
              <Descriptions.Item label="卫生间">{selectedHouse.bathrooms}</Descriptions.Item>
              <Descriptions.Item label="详细地址" span={2}>{selectedHouse.address || '-'}</Descriptions.Item>
              <Descriptions.Item label="标签" span={2}>
                <Space wrap>{selectedHouse.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="房源描述" span={2}>{selectedHouse.description || '-'}</Descriptions.Item>
            </Descriptions>
            <div className="house-detail-images">
              <h3>房源图片</h3>
              <Image.PreviewGroup>
                <div className="house-detail-image-grid">
                  {selectedHouse.imageUrls?.map((url, index) => (
                    <Image key={`${url}-${index}`} src={url} alt={`${selectedHouse.title}-${index + 1}`} />
                  ))}
                </div>
              </Image.PreviewGroup>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
})

export default Admin
