import React, { memo, useEffect, useState } from 'react'
import storage from 'store'
import { Modal, Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RightWrapper } from './styled'

import IconGlobal from '@/assets/svg/icon_global'
import IconList from '@/assets/svg/icon_list'
import IconUsesr from '@/assets/svg/icon_user'
import LogoText from '@/assets/img/home/logo-text.jpeg'
import { login, register } from '@/services'

const HeaderRight = memo(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const [showPanel, setShowPanel] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(storage.get('airbhb-user') || null)
  const navigate = useNavigate()

  const isLogin = Boolean(currentUser)

  useEffect(() => {
    const handleClick = () => setShowPanel(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  function persistSession(res) {
    storage.set('airbhb-token', res.token)
    storage.set('airbhb-user', res.user)
    storage.set('airbnb-info-cur', res.user.name)
    setCurrentUser(res.user)
  }

  function handleShowPanel(e) {
    e.stopPropagation()
    setShowPanel(!showPanel)
  }

  function handleUserCenter(e) {
    e?.stopPropagation()
    if (!isLogin) {
      setIsLoginModalOpen(true)
      return
    }
    navigate('/profile')
  }

  function handlePublishHouse(e) {
    e?.stopPropagation()
    if (!isLogin) {
      setIsLoginModalOpen(true)
      messageApi.info('请先登录后再发布房源')
      return
    }
    navigate('/publish-house')
  }

  async function onRegisterFinish(values) {
    try {
      const res = await register({
        name: values.name,
        email: values.email,
        password: values.password
      })
      persistSession(res)
      setIsRegisterModalOpen(false)
      navigate('/')
      messageApi.success('欢迎来到爱彼迎！')
    } catch (error) {
      messageApi.error(error?.message || '注册失败，请稍后再试')
    }
  }

  async function onLoginFinish(values) {
    try {
      const res = await login({
        email: values.email,
        password: values.password
      })
      persistSession(res)
      setIsLoginModalOpen(false)
      messageApi.success('欢迎回来！')
    } catch (error) {
      messageApi.error(error?.message || '登录失败，请检查邮箱和密码')
    }
  }

  function handleLogout() {
    storage.remove('airbhb-token')
    storage.remove('airbhb-user')
    storage.set('airbnb-info-cur', '')
    setCurrentUser(null)
    messageApi.info('已登出')
    navigate('/home')
  }

  return (
    <RightWrapper>
      <div className="menu-left">
        {
          isLogin ? <>
            <span className="menu-left-item" onClick={handleUserCenter}>
              {currentUser.name}
            </span>
            <span className="menu-left-item" onClick={handleLogout}>
              退出
            </span>
          </> :
            <>
              <span className="menu-left-item" onClick={() => setIsLoginModalOpen(true)}>登录</span>
              <span className="menu-left-item" onClick={() => setIsRegisterModalOpen(true)}>注册</span>
            </>
        }
        <span className="menu-left-item">
          <IconGlobal />
        </span>
      </div>

      <div className="menu-right" onClick={handleShowPanel}>
        <span className="menu-right-item">
          <IconList />
        </span>
        <span className="menu-right-item right">
          <IconUsesr />
        </span>

        {
          showPanel && (
            <div className="panel">
              <div className="panel-top">
                {isLogin
                  ? <div className="panel-item login" onClick={handleUserCenter}>{currentUser.name}</div>
                  : <>
                    <div className="panel-item login" onClick={() => setIsLoginModalOpen(true)}>登录</div>
                    <div className="panel-item" onClick={() => setIsRegisterModalOpen(true)}>注册</div>
                  </>
                }
              </div>

              <div className="panel-bottom">
                <div className="panel-item" onClick={handlePublishHouse}>来爱彼迎发布房源</div>
                <div className="panel-item">开展体验</div>
                <div className="panel-item">帮助</div>
              </div>
            </div>
          )
        }
      </div>

      <Modal className="register-modal" destroyOnHidden title="用户注册" centered footer={null} open={isRegisterModalOpen} onCancel={() => setIsRegisterModalOpen(false)}>
        <LogoHeader />
        <Form name="registerForm" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onRegisterFinish} preserve={false} autoComplete="off">
          <Form.Item label="昵称" name="name" rules={[{ required: true, message: '请输入昵称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效邮箱' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="password2"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve()
                  return Promise.reject(new Error('您所输入的密码不一致'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px', background: '#00848a' }}>
              提交
            </Button>
            <Button htmlType="button" onClick={() => setIsRegisterModalOpen(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="用户登录" centered destroyOnHidden footer={null} open={isLoginModalOpen} onCancel={() => setIsLoginModalOpen(false)}>
        <LogoHeader />
        <Form name="loginForm" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onLoginFinish} preserve={false} autoComplete="off">
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效邮箱' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px', background: '#00848a' }}>
              提交
            </Button>
            <Button htmlType="button" onClick={() => setIsLoginModalOpen(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </RightWrapper>
  )
})

function LogoHeader() {
  return (
    <div className="logo-img" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4px 0 16px',
      paddingBottom: '20px',
      borderBottom: '1px dashed#ccc'
    }}>
      <img src={LogoText} alt="" />
    </div>
  )
}

export default HeaderRight
