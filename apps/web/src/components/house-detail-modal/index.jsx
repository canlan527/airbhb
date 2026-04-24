import React, { memo } from 'react'
import { Descriptions, Image, Modal, Space, Tag } from 'antd'
import './style.scss'

function getStatusColor(status) {
  if (status === 'PUBLISHED') return 'green'
  if (status === 'PENDING') return 'gold'
  if (status === 'REJECTED') return 'red'
  return 'default'
}

const HouseDetailModal = memo(({
  open,
  house,
  title = '房源详情',
  onCancel,
  footer,
  showHostInfo = true
}) => {
  return (
    <Modal
      className="house-detail-modal"
      title={title}
      width={920}
      open={open}
      footer={footer}
      onCancel={onCancel}
      destroyOnHidden
    >
      {house ? (
        <div className="house-detail">
          <div className="house-detail-cover">
            <Image src={house.coverUrl} alt={house.title} />
          </div>
          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="房源标题" span={2}>{house.title}</Descriptions.Item>
            <Descriptions.Item label="城市">{house.city || '-'}</Descriptions.Item>
            <Descriptions.Item label="价格">￥{house.price} / 晚</Descriptions.Item>
            <Descriptions.Item label="来源"><Tag>{house.source || 'USER'}</Tag></Descriptions.Item>
            <Descriptions.Item label="状态"><Tag color={getStatusColor(house.status)}>{house.status || '-'}</Tag></Descriptions.Item>
            {showHostInfo ? (
              <>
                <Descriptions.Item label="发布者">{house.host?.name || '平台自营'}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{house.host?.email || '-'}</Descriptions.Item>
              </>
            ) : null}
            <Descriptions.Item label="卧室">{house.bedrooms ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="卫生间">{house.bathrooms ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="详细地址" span={2}>{house.address || '-'}</Descriptions.Item>
            <Descriptions.Item label="标签" span={2}>
              <Space wrap>
                {house.tags?.length ? house.tags.map(tag => <Tag key={tag}>{tag}</Tag>) : <span>-</span>}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="房源描述" span={2}>{house.description || '-'}</Descriptions.Item>
          </Descriptions>
          <div className="house-detail-images">
            <h3>房源图片</h3>
            <Image.PreviewGroup>
              <div className="house-detail-image-grid">
                {house.imageUrls?.map((url, index) => (
                  <Image key={`${url}-${index}`} src={url} alt={`${house.title}-${index + 1}`} />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
      ) : null}
    </Modal>
  )
})

export default HouseDetailModal
