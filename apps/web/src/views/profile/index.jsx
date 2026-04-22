import React, { memo, useEffect, useState } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Empty, List, Space, Tabs, Tag, message } from 'antd'
import { getMyFavorites, getMyHistories, getMyHouses, getMyOrders } from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'
import { ProfileWrapper } from './style'

const Profile = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const [orders, setOrders] = useState([])
  const [favorites, setFavorites] = useState([])
  const [histories, setHistories] = useState([])
  const [houses, setHouses] = useState([])
  const user = storage.get('airbhb-user')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
    if (!user) {
      messageApi.info('请先登录')
      navigate('/home')
      return
    }
    loadData()
  }, [])

  async function loadData() {
    try {
      const [orderRes, favoriteRes, historyRes, houseRes] = await Promise.all([
        getMyOrders(),
        getMyFavorites(),
        getMyHistories(),
        getMyHouses()
      ])
      setOrders(orderRes)
      setFavorites(favoriteRes)
      setHistories(historyRes)
      setHouses(houseRes)
    } catch (error) {
      messageApi.error(error?.message || '个人中心数据加载失败')
    }
  }

  const tabItems = [
    {
      key: 'orders',
      label: `我的订单${orders.length ? ` (${orders.length})` : ''}`,
      children: <OrderList orders={orders} />
    },
    {
      key: 'favorites',
      label: `我的收藏${favorites.length ? ` (${favorites.length})` : ''}`,
      children: <HouseRelationList data={favorites} emptyText="暂无收藏房源" />
    },
    {
      key: 'histories',
      label: `历史记录${histories.length ? ` (${histories.length})` : ''}`,
      children: <HouseRelationList data={histories} emptyText="暂无浏览历史" />
    }
  ]

  if (user?.role === 'HOST' || houses.length > 0) {
    tabItems.push({
      key: 'houses',
      label: `我的房源${houses.length ? ` (${houses.length})` : ''}`,
      children: <MyHouseList houses={houses} navigate={navigate} />
    })
  }

  return (
    <ProfileWrapper>
      {contextHolder}
      <Card className="profile-card">
        <div className="profile-head">
          <div>
            <h1>{user?.name || '用户'}的个人中心</h1>
            <p>{user?.email}</p>
            <Space>
              <Tag color="cyan">{user?.role || 'USER'}</Tag>
              {user?.role === 'HOST' && <Tag color="gold">房东</Tag>}
            </Space>
          </div>
          <Button type="primary" onClick={() => navigate('/publish-house')}>发布房源</Button>
        </div>
      </Card>

      <Card className="content-card">
        <Tabs items={tabItems} />
      </Card>
    </ProfileWrapper>
  )
})

function OrderList({ orders }) {
  if (!orders.length) return <Empty description="暂无订单" />
  return (
    <List
      itemLayout="vertical"
      dataSource={orders}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={`${item.house?.title || '房源'} · ${item.orderNo}`}
            description={`${new Date(item.checkIn).toLocaleDateString()} - ${new Date(item.checkOut).toLocaleDateString()}`}
          />
          <Space>
            <Tag color={item.status === 'PAID' ? 'green' : 'blue'}>{item.status}</Tag>
            <span>￥{item.amount}</span>
            <span>{item.nights} 晚</span>
          </Space>
        </List.Item>
      )}
    />
  )
}

function HouseRelationList({ data, emptyText }) {
  if (!data.length) return <Empty description={emptyText} />
  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={data}
      renderItem={(item) => {
        const house = item.house
        return (
          <List.Item>
            <Card cover={<img src={house.coverUrl} alt={house.title} />}>
              <Card.Meta title={house.title} description={`${house.city} · ￥${house.price}/晚`} />
            </Card>
          </List.Item>
        )
      }}
    />
  )
}

function MyHouseList({ houses, navigate }) {
  if (!houses.length) return <Empty description="暂无发布房源" />
  return (
    <List
      dataSource={houses}
      renderItem={(house) => (
        <List.Item actions={[<Button key="edit" onClick={() => navigate('/publish-house')}>继续发布</Button>]}>
          <List.Item.Meta title={house.title} description={`${house.city} · ${house.source} · ${house.status}`} />
          <Tag color={house.status === 'PUBLISHED' ? 'green' : 'orange'}>{house.status}</Tag>
        </List.Item>
      )}
    />
  )
}

export default Profile
