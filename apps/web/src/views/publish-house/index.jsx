import React, { memo, useEffect, useState } from 'react'
import storage from 'store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form, Image, Input, InputNumber, Modal, Upload, message } from 'antd'
import { createMyHouse } from '@/services'
import { changeHomeHeaderAction } from '@/store/modules/main'
import './style.scss'

const defaultImageUrls = [
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
]
const maxUploadImages = 24
const maxImageSizeMB = 8
const imageMaxEdge = 1280
const imageQuality = 0.82
const maxCompressedImageSize = 512 * 1024
const maxPublishPayloadSize = 18 * 1024 * 1024
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']

const defaultImageFiles = defaultImageUrls.map((url, index) => ({
  uid: `default-${index}`,
  name: `房源图片-${index + 1}.jpg`,
  status: 'done',
  url
}))

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

async function fileToCompressedDataUrl(file) {
  const objectUrl = URL.createObjectURL(file)
  try {
    const image = await loadImage(objectUrl)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const plans = [
      { edge: imageMaxEdge, quality: imageQuality },
      { edge: 1080, quality: 0.76 },
      { edge: 960, quality: 0.7 }
    ]

    let result = ''
    for (const plan of plans) {
      const scale = Math.min(1, plan.edge / Math.max(image.naturalWidth, image.naturalHeight))
      const width = Math.max(1, Math.round(image.naturalWidth * scale))
      const height = Math.max(1, Math.round(image.naturalHeight * scale))

      canvas.width = width
      canvas.height = height
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)
      context.drawImage(image, 0, 0, width, height)

      result = canvas.toDataURL('image/jpeg', plan.quality)
      if (result.length <= maxCompressedImageSize) return result
    }

    return result
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

const PublishHouse = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [imageFiles, setImageFiles] = useState(defaultImageFiles)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [draggingUid, setDraggingUid] = useState('')
  const [dragOverUid, setDragOverUid] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = storage.get('airbhb-user')

  useEffect(() => {
    dispatch(changeHomeHeaderAction({ isFixed: true, alpha: false }))
  }, [dispatch])

  useEffect(() => {
    const urls = imageFiles.map(item => item.url || item.thumbUrl).filter(Boolean)
    form.setFieldsValue({
      coverUrl: urls[0] || '',
      imageUrls: urls.join('\n')
    })
  }, [form, imageFiles])

  async function onFinish(values) {
    if (!user) {
      messageApi.info('请先登录')
      navigate('/home')
      return
    }
    const imageUrls = values.imageUrls.split('\n').map(item => item.trim()).filter(Boolean)
    if (!imageUrls.length) {
      messageApi.info('请至少上传一张房源图片')
      return
    }
    const payload = {
        ...values,
        coverUrl: values.coverUrl || imageUrls[0],
        imageUrls,
        tags: values.tags.split(',').map(item => item.trim()).filter(Boolean)
    }
    if (JSON.stringify(payload).length > maxPublishPayloadSize) {
      messageApi.warning('图片总体积仍然偏大，请删除几张图片后再提交')
      return
    }
    try {
      await createMyHouse(payload)
      const nextUser = { ...user, role: 'HOST' }
      storage.set('airbhb-user', nextUser)
      messageApi.success('房源已提交，等待平台审核')
      setTimeout(() => navigate('/profile'), 600)
    } catch (error) {
      messageApi.error(error?.message || '发布失败')
    }
  }

  async function handleBeforeUpload(file) {
    if (!allowedImageTypes.includes(file.type)) {
      messageApi.warning('仅支持 JPG / PNG / WebP 图片')
      return Upload.LIST_IGNORE
    }
    if (file.size / 1024 / 1024 > maxImageSizeMB) {
      messageApi.warning(`单张图片请控制在 ${maxImageSizeMB}MB 内`)
      return Upload.LIST_IGNORE
    }
    const dataUrl = await fileToCompressedDataUrl(file)
    setImageFiles(prevFiles => {
      if (prevFiles.some(item => item.uid === file.uid)) return prevFiles
      if (prevFiles.length >= maxUploadImages) {
        messageApi.warning(`最多上传 ${maxUploadImages} 张房源图片`)
        return prevFiles
      }
      return [
        ...prevFiles,
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: dataUrl
        }
      ]
    })
    return Upload.LIST_IGNORE
  }

  function handleRemove(file) {
    const nextFiles = imageFiles.filter(item => item.uid !== file.uid)
    setImageFiles(nextFiles)
  }

  function handlePreview(file) {
    const nextIndex = imageFiles.findIndex(item => item.uid === file.uid)
    if (nextIndex < 0 || !imageFiles[nextIndex]?.url) {
      messageApi.warning('暂无可预览图片')
      return
    }
    setPreviewIndex(nextIndex)
    setIsPreviewOpen(true)
  }

  function handlePreviewStep(step) {
    setPreviewIndex(currentIndex => {
      if (!imageFiles.length) return 0
      return (currentIndex + step + imageFiles.length) % imageFiles.length
    })
  }

  function handleSortImages(sourceUid, targetUid) {
    if (!sourceUid || !targetUid || sourceUid === targetUid) return
    setImageFiles(prevFiles => {
      const sourceIndex = prevFiles.findIndex(item => item.uid === sourceUid)
      const targetIndex = prevFiles.findIndex(item => item.uid === targetUid)
      if (sourceIndex < 0 || targetIndex < 0) return prevFiles

      const nextFiles = [...prevFiles]
      const [movedFile] = nextFiles.splice(sourceIndex, 1)
      nextFiles.splice(targetIndex, 0, movedFile)
      return nextFiles
    })
  }

  function renderImageCard(file, index) {
    const isDragging = draggingUid === file.uid
    const isDragOver = dragOverUid === file.uid && draggingUid !== file.uid
    const imageSrc = file.url || file.thumbUrl

    return (
      <div
        className={`image-upload-card${isDragging ? ' is-dragging' : ''}${isDragOver ? ' is-drag-over' : ''}`}
        draggable
        key={file.uid}
        onDragEnd={() => {
          setDraggingUid('')
          setDragOverUid('')
        }}
        onDragEnter={event => {
          event.preventDefault()
          setDragOverUid(file.uid)
        }}
        onDragOver={event => event.preventDefault()}
        onDragStart={event => {
          setDraggingUid(file.uid)
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData('text/plain', file.uid)
        }}
        onDrop={event => {
          event.preventDefault()
          const sourceUid = event.dataTransfer.getData('text/plain') || draggingUid
          handleSortImages(sourceUid, file.uid)
          setDraggingUid('')
          setDragOverUid('')
        }}
      >
        <img alt={file.name} src={imageSrc} />
        {index === 0 ? <span className="cover-badge">封面</span> : null}
        <div className="image-card-mask">
          <Button type="text" onClick={() => handlePreview(file)}>预览</Button>
          <Button danger type="text" onClick={() => handleRemove(file)}>删除</Button>
        </div>
        <span className="drag-order-tip">拖拽排序</span>
      </div>
    )
  }

  const currentPreviewImage = imageFiles[previewIndex]?.url || imageFiles[previewIndex]?.thumbUrl || ''

  return (
    <div className="publish-house-page">
      {contextHolder}
      <Modal
        className="publish-image-preview-modal"
        title="房源图片预览"
        centered
        destroyOnHidden
        footer={null}
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
      >
        <div className="preview-stage">
          {imageFiles.length > 1 ? (
            <Button className="preview-arrow preview-arrow-left" onClick={() => handlePreviewStep(-1)}>‹</Button>
          ) : null}
          {currentPreviewImage ? <Image alt="房源图片预览" preview={false} src={currentPreviewImage} /> : null}
          {imageFiles.length > 1 ? (
            <Button className="preview-arrow preview-arrow-right" onClick={() => handlePreviewStep(1)}>›</Button>
          ) : null}
        </div>
        <div className="preview-count">{previewIndex + 1} / {imageFiles.length}</div>
      </Modal>
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
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
          city: '广州',
          price: 399,
          bedrooms: 2,
          bathrooms: 1,
          tags: '近地铁,自助入住,可做饭',
          coverUrl: defaultImageUrls[0],
          imageUrls: defaultImageUrls.join('\n')
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
                <InputNumber
                  min={1}
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value?.replace(/[￥\s,]/g, '')}
                  style={{ width: '100%' }}
                />
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
                <p>第一张图片会作为封面图，多图用于后续详情页扩展。</p>
              </div>
            </div>
            <Form.Item className="image-upload-item" label="房源图片">
              <div className="image-upload-grid">
                {imageFiles.map(renderImageCard)}
                {imageFiles.length >= maxUploadImages ? null : (
                  <Upload
                    accept="image/*"
                    beforeUpload={handleBeforeUpload}
                    multiple
                    showUploadList={false}
                  >
                    <div className="upload-trigger"><span>+</span><em>上传图片</em></div>
                  </Upload>
                )}
              </div>
              <div className="image-upload-tip">支持 JPG / PNG / WebP，最多 {maxUploadImages} 张；上传后会自动压缩，第一张为封面图。</div>
            </Form.Item>
            <Form.Item hidden name="coverUrl" rules={[{ required: true, message: '请上传封面图' }]}>
              <Input />
            </Form.Item>
            <Form.Item hidden name="imageUrls" rules={[{ required: true, message: '请上传图片' }]}>
              <Input.TextArea />
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
