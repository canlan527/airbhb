import React, { memo, useState, useEffect } from 'react'
import storage from 'store'
import { Modal, Form, Input, Button, message } from 'antd';
import { RightWrapper } from './styled'
import { useNavigate } from 'react-router-dom';

import IconGlobal from '@/assets/svg/icon_global'
import IconList from '@/assets/svg/icon_list'
import IconUsesr from '@/assets/svg/icon_user';
import LogoText from '@/assets/img/home/logo-text.jpeg'

const HeaderRight = memo(() => {
  const [messageApi, contextHolder] = message.useMessage() // antd message组件
  const [userinfo, setUserinfo] = useState(storage.get('airbnb-info') || []) // 存储本地用户信息
  const [currentUsername, setCurrentUsername] = useState(storage.get('airbnb-info-cur') || '') // 当期登录的用户名
  const [showPanel, setShowPanel] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // 处理isLogin
    const name = storage.get('airbnb-info-cur')
    if (name) {
      setIsLogin(true)
    }
    // 处理面板点击事件
    const handleClick = () => {
      setShowPanel(false)
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])
  // 处理面板点击事件
  function handleShowPanel(e) {
    e.stopPropagation();// 阻止事件冒泡
    setShowPanel(!showPanel)
  }
  // 处理注册按钮点击事件，弹出注册modal
  function handleRegister(e) {
    setIsRegisterModalOpen(true);
  }
  // 关闭注册modal
  function handleRegisterCancel() {
    setIsRegisterModalOpen(false);
  };

  // 取消登录modal
  function handleLoginCancel() {
    setIsLoginModalOpen(false);
  };

  /**
   * 处理注册表单提交
   * @param {object} values 表单填写的值
   */
  const onRegisterFinish = (values) => {
    // 先对比本地存储是否已存在该用户
    // 循环查找本地数据
    if (userinfo.length) {
      for (const user of userinfo) {
        if (values.username === user.username) {
          setIsRegister(true) // 如果找到 代表已注册过
          // 关闭register modal
          setIsRegisterModalOpen(false)
          messageApi.info('您已注册，请直接登录！');
          return
        } else {
          // 未找到，代表是新用户，将表单信息推进infos中
          const info = {
            username: values.username,
            password: values.password
          }
          userinfo.push(info)
          setUserinfo([].concat(info))
          // 本地化存储用户信息
          storage.set('airbnb-info', userinfo)
          if (!isLogin) {
            setIsLogin(true) // 设置isLogin为true
            // 关闭register modal
            setIsRegisterModalOpen(false)
            navigate('/') // 跳转首页
            // 记录当前用户
            setCurrentUsername(values.username)
            // 存储当前用户
            storage.set('airbnb-info-cur', values.username)
            // 弹出message
            messageApi.info('欢迎来到爱彼迎！')
            return
          }
        }
      }
    } else {
      // userinfo 没有数据，将表单信息推进infos中
      const info = {
        username: values.username,
        password: values.password
      }
      userinfo.push(info)
      setUserinfo(userinfo)
      // 本地化存储用户信息
      storage.set('airbnb-info', userinfo)
      // 记录当前用户
      setCurrentUsername(values.username)
      // 存储当前用户
      storage.set('airbnb-info-cur', values.username)
      // 关闭register modal
      setIsRegisterModalOpen(false)
      if (!isLogin) {
        setIsLogin(true) // 设置isLogin为true
        navigate('/') // 跳转首页
        // 弹出message
        messageApi.info('欢迎来到爱彼迎！');
      }
    }


  };

  /**
   * 处理登录表单项验证失败，输出打印信息
   * @param {object} errorInfo 
   */
  const onLoginFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  /**
   * 处理登录表单提交事件
   * @param {object} values 表单填写的值
   */
  const onLoginFinish = (values) => {
    // 从本地存储里取出airbnb-info，循环
    const infos = storage.get('airbnb-info')
    const names = []
    for (const user of infos) {
      // 提取用户名到一个新数组中 判断用户名是否存在
      names.push(user.username)
      // 如果匹配用户名成功
      if (values.username === user.username) {
        // 判断密码
        if (values.password === user.password) { //如果密码匹配成功
          setIsLoginModalOpen(false);// 关闭login modal
          // 记录当前用户
          setCurrentUsername(values.username)
          // 存储当前用户
          storage.set('airbnb-info-cur', values.username)
          setIsLogin(true)
          // 提示成功登录
          messageApi.info('欢迎来到爱彼迎！')
          return
        } else {
          // 密码不匹配
          // 提示成功登录
          messageApi.info('密码不正确，请重新输入')
        }
      }
    }

    // 判断用户名
    const isUsernameExist = names.includes(values.username)
    if (!isUsernameExist) {
      // 无法匹配用户名，证明是新用户未注册，提示注册
      messageApi.info('用户名不存在，请注册')
      setIsLoginModalOpen(false);// 关闭login modal
    }

  }

  /**
   * 处理注册表单项验证失败，输出打印信息
   * @param {object} errorInfo 
   */
  const onRegisterFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 处理登录按钮点击事件，弹出登录modal
  function handleLogin() {
    setIsLoginModalOpen(true)
  }

  function handleLoginOk() {
    setIsLoginModalOpen(false);
  };
  // 退出按钮点击事件
  function handleLogout() {
    setIsLogin(false)
    // 弹出message
    messageApi.info('已登出');
    // 清除当前用户
    setCurrentUsername('')
    // 清除存储当前用户记录
    storage.set('airbnb-info-cur', '')
  }


  return (
    <RightWrapper>
      <div className="menu-left">
        {
          isLogin ? <>
            <span className="menu-left-item">
              {storage.get('airbnb-info-cur')}
            </span>
            <span className="menu-left-item" onClick={handleLogout}>
              退出
            </span>
          </> :
            <>
              <span className="menu-left-item" onClick={handleLogin}>登录</span>
              <span className="menu-left-item" onClick={handleRegister}>注册</span>
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

        {/* panel */}
        {
          showPanel && (<div className="panel">
            <div className="panel-top">

              {isLogin
                ? <div className="panel-item login">{storage.get('airbnb-info-cur')}</div>
                : <>
                  <div className="panel-item login" onClick={handleLogin}>登录</div>
                  <div className="panel-item" onClick={handleRegister}>注册</div>
                </>
              }

            </div>

            <div className="panel-bottom">
              <div className="panel-item">来爱彼迎发布房源</div>
              <div className="panel-item">开展体验</div>
              <div className="panel-item">帮助</div>
            </div>
          </div>)
        }


      </div>

      {/* register */}
      <Modal className='register-modal' destroyOnClose title="用户注册" centered footer={null} open={isRegisterModalOpen} onOk={handleRegister} onCancel={handleRegisterCancel}>
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
        <Form
          name="registerForm"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onRegisterFinish}
          onFinishFailed={onRegisterFinishFailed}
          preserve={false}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="password2"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('您所输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px', background: "#00848a" }}>
              提交
            </Button>
            <Button htmlType="button" onClick={handleRegisterCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* login */}
      <Modal title="用户登录" centered destroyOnClose footer={null} open={isLoginModalOpen} onOk={handleLoginOk} onCancel={handleLoginCancel}>
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
        <Form
          name="loginForm"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onLoginFinish}
          onFinishFailed={onLoginFinishFailed}
          preserve={false}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ marginRight: '8px', background: "#00848a" }}>
              提交
            </Button>
            <Button htmlType="button" onClick={handleLoginCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </RightWrapper>
  )
})

export default HeaderRight