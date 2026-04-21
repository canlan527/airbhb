import React, { memo, useState, useEffect, useRef } from "react"; // 引入react和hook函数
import { shallowEqual, useSelector } from "react-redux"; // 引入redux
import Cards from 'react-credit-cards-2'; // 引入信用卡库
import storage from 'store' // 引入本地存储库
import dayjs from 'dayjs' // 引入dayjs
import { Rate, DatePicker, InputNumber, Form, Input, Spin, Button, message } from "antd"; // 按需引入antd组件
import zhCN from 'antd/es/date-picker/locale/zh_CN'; // 引入antd-date-picker中文包
import { createOrder, favoriteHouse, payOrder, recordHouseView } from "@/services";

// 引入表单格式化工具函数
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "@/utils";

import 'react-credit-cards-2/dist/es/styles-compiled.css' // 引入信用卡样式库
import { DetailInfoWrapper } from "./style";

const { RangePicker } = DatePicker;

const DetailInfo = memo((props) => {
  // 评价介绍标题数据
  const rateTitles = [
    "如实描述",
    "入住便捷",
    "沟通顺畅",
    "位置便利",
    "干净卫生",
    "高性价比",
  ];
  const [currentUsername,  setCurrentUsername] = useState(storage.get('airbnb-info-cur') || '')
  const [dates, setDates] = useState(null); // 选择的日期
  const [value, setValue] = useState(null); // RangePicker选定的值
  const [stayDays, setStayDays] = useState(1) // 租房天数
  const [personNumber, setPersonNumber] = useState(1) // 租房人数
  const [totalPrice, setTotalPrice] = useState(0) // 总价
  const [isReserve, setIsReserve] = useState(false) // 是否预定
  const [confirmPay, setConfirmPay] = useState(false) // 是否确认支付
  const [completePay, setCompletePay] = useState(false) // 是否支付完成
  const [loading, setLoading] = useState(false) // 加载图标
  const [orderNo, setOrderNo] = useState('')
  const [card, setCard] = useState({  // 信用卡内容
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  // 卡号input引用
  const numberInputRef = useRef(null)
  // card表单布局对象
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const [messageApi, contextHolder] = message.useMessage(); // antdesign message

  // 从 store 中获取info数据
  const { info } = useSelector((state) => ({
    info: state.detail.detailInfo,
  }), shallowEqual);

  useEffect(() => {
    // 获取本地存储的支付信息，查看该用户是否完成付款
    const payInfo = storage.get('airbnb-info-pay')
    // 获取当前登录的用户名
    setCurrentUsername(storage.get('airbnb-info-cur') || '')
    // console.log(currentUsername)
    const payInfoUsername = payInfo?.username // 本地存储已完成支付的用户名
    // 是否是同用户名
    const isSameUser = currentUsername === payInfoUsername
    // 是否是同房间
    const isSameRoom = info.id === payInfo?.roomId
    // 是否完成支付
    const isComplete = payInfo?.completePay || completePay
    // 根据上述三种情况的结果来判断当前用户展示的详情页
    const complete = isSameUser && isSameRoom && isComplete
    // 之前没有完成过支付的情况，根据房间定价和人数计算总价
    if(!complete) {
      let totalPrice = (info.price * stayDays) * personNumber
      setTotalPrice(totalPrice)
    }
    // 已完成支付的情况
    if(complete) {
      setValue([dayjs(payInfo.reserveDate[0]), dayjs(payInfo.reserveDate[1])]) // 设置预定日期
      setStayDays(payInfo.stayDays) // 设置预定天数
      setPersonNumber(payInfo.personNumber) // 设定人数
      setTotalPrice(payInfo.totalPrice) // 设定总价
      setCompletePay(true); // 设置completePay
      setIsReserve(true) // 设置预定状态
    }
    
  }, [info, stayDays, personNumber, currentUsername, isReserve, completePay]) // 设置依赖项

  useEffect(() => {
    if (info?._id && storage.get('airbhb-token')) {
      recordHouseView(info._id).catch(() => {})
    }
  }, [info?._id])


  // 时间选择器处理选择不超过七天的范围
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };

  // 时间选择器限制动态的日期区间选择
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  // 设置时间选择器范围
  const onRangeChange = (value) => {
    // 设置选择的日期
    setValue(value);
    // console.log(value)
    // console.log(value[0].format(dateFormat))
    // 计算间隔的天数
    const diffTime = Math.abs(value[1] - value[0]) // 得到间隔毫秒
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 转成天数
    // 设置租房天数
    setStayDays(diffDays)
    setIsReserve(true) // 设置预定
  }
  // 选择日期区间时触发
  const onCalendarChange = (value) => {
    setDates(value);
  }

  // input数字框内容改变触发
  function onPersonChange(value) {
    setPersonNumber(value)
  }
  // 处理确定支付按钮事件
  function handleReserve() {
    let currentUser = storage.get('airbhb-user')
    if(currentUser) {
      setConfirmPay(true)
    } else {
      messageApi.info('请先登录');
    }
  }
  // 处理支付
  async function handlePay() {
    if (!confirmPay) return
    // 设置加载
    setLoading(true)
    // 弹起input onfocus
    numberInputRef.current?.focus({ cursor: 'end' })
    // 设置定时器1000毫秒
    setTimeout(async () => {
      // 完成加载
      try {
        const order = await createOrder({
          houseId: info._id,
          checkIn: value[0].toISOString(),
          checkOut: value[1].toISOString()
        })
        const paid = await payOrder(order.orderNo)
        setOrderNo(paid.orderNo)
        setCompletePay(true)
        storage.set('airbnb-info-pay', {
          username: storage.get('airbnb-info-cur'),
          roomId: info.id,
          orderNo: paid.orderNo,
          roomprice: info.price,
          reserveDate: [dayjs(value[0]), dayjs(value[1])],
          completePay: true,
          stayDays,
          personNumber,
          totalPrice: paid.amount || totalPrice,
        })
        messageApi.success(`支付成功，订单号：${paid.orderNo}`)
      } catch (error) {
        messageApi.error(error?.message || '支付失败，请稍后再试')
      } finally {
        setLoading(false)
      }
    }, 2500)

  }

  async function handleFavorite() {
    if (!storage.get('airbhb-token')) {
      messageApi.info('请先登录')
      return
    }
    try {
      await favoriteHouse(info._id)
      messageApi.success('已加入我的收藏')
    } catch (error) {
      messageApi.error(error?.message || '收藏失败')
    }
  }
  // 处理信用卡表单项输入
  const handleCardInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
      console.log(value)
    } else if (name === "cvc") {
      value = formatCVC(value);
    }
    setCard((prev) => ({ ...prev, [name]: value }));
  }
  // 处理信用卡聚焦
  const handleCardInputFocus = (evt) => {
    setCard((prev) => ({ ...prev, focus: evt.target.name }));
  }
  // card表单验证成功，处理支付事件
  const onFormFinish = (values) => {
    handlePay()
  }
  // card表单验证失败，输出打印信息
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <DetailInfoWrapper>
      {contextHolder}
      <div className="detail-info-left">
        <div className="detail-info-title">{info.name}</div>
        <Button onClick={handleFavorite} style={{ margin: '12px 0' }}>收藏房源</Button>
        <div className="detail-info-verify">
          {info?.verify_info?.messages.map((item) => (
            <span key={item} className="detail-info-tag">
              {item}
            </span>
          ))}
        </div>
        <div className="detail-info-rating">
          <h2>房客评价</h2>
          <div className="detail-info-rating-count">
            <Rate disabled defaultValue={info.star_rating} className="rate" />
            <span>共{info.reviews_count}条评价</span>
          </div>
          <div className="detail-info-rating-section">
            {rateTitles.map((item) => (
              <div key={item} className="detail-info-rating-item">
                <span>{item}</span>
                <Rate
                  disabled
                  defaultValue={info.star_rating}
                  className="rate"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="detail-info-comment">
          {info?.reviews?.map((item) => (
            <div className="detail-info-comment-item" key={item.review_id}>
              <div className="comment-top">
                <div className="detail-info-comment-avatar">
                  <img src={item.reviewer_image_url} alt="" />
                </div>
                <div className="comment-info">
                  <h3 className="name">匿名游客</h3>
                  <div className="time">{item.localized_date}</div>
                </div>
              </div>
              <div className="comment-content">{item.comments}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="detail-info-right">
        <div className="detail-info-price">
          <h3>{info.price_format} / 晚</h3>
          <span className="detail-info-rate">
            <Rate disabled defaultValue={info.star_rating} className="rate" />
            <span>{info.reviews_count}条</span>
          </span>
        </div>
        {/* 日期选择器 */}
        <div className="detail-info-right-item">
          <div className="detail-info-right-item-text">日期</div>
          <RangePicker
            value={value}
            locale={zhCN}
            size='large'
            disabledDate={disabledDate}
            onCalendarChange={onCalendarChange}
            onChange={onRangeChange}
            onOpenChange={onOpenChange}
            changeOnBlur
            disabled={completePay}
          />
        </div>
        {/* 数字输入框 */}
        <div className="detail-info-right-item">
          <div className="detail-info-right-item-text">人数</div>
          <InputNumber
            min={1}
            max={5}
            value={personNumber}
            size='large'
            onChange={onPersonChange}
            disabled={completePay}
          />
        </div>
        {/* 查看预定状态 */}
        {
          isReserve &&
          <>
            <div className="detail-info-right-item">
              <span>{info.price_format} x {stayDays}晚</span>
            </div>
            <div className="detail-info-right-item price">
              <span>总价</span>
              <span>￥{totalPrice}</span>
            </div>
            {/* 按钮逻辑 */}
            {
              !completePay && (isReserve ? <div className="detail-btn" onClick={handleReserve}>继续预定</div>
                : <div className="detail-btn">查看订阅状态</div>)
            }

            {
              completePay && (
                isReserve ? <Button type="primary" danger block disabled={completePay} onClick={handleReserve}>{orderNo ? `已支付 ${orderNo}` : '已预定'}</Button>
                : <Button type="primary" danger block>查看订阅状态</Button>
              )
            }
            {/* 信用卡 */}
            {!completePay && confirmPay &&
              <Spin spinning={loading} tip="支付中" delay={500}>
                <div className="detail-info-right-item">
                  <Cards
                    number={card.number}
                    expiry={card.expiry}
                    cvc={card.cvc}
                    name={card.name}
                    focused={card.focus}
                  />
                  {/* 信用卡表单 */}
                  <Form
                    name="card-form"
                    className="card-form"
                    onFinish={onFormFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="number"
                      {...formItemLayout}
                      label="卡号"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your card number!',
                        },
                      ]}
                      onChange={handleCardInputChange}
                      onFocus={handleCardInputFocus}
                    >
                      <InputNumber ref={numberInputRef} name='number' maxLength={16} size='large' />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label="姓名"
                      name="name"
                      className="card-form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your card name!',
                        },
                      ]}
                      onChange={handleCardInputChange}
                      onFocus={handleCardInputFocus}
                    >
                      <Input name="name" maxLength={16} size='large' />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label="逾期时间"
                      name="expiry"
                      className="card-form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your card expiry!',
                        },
                      ]}
                      onChange={handleCardInputChange}
                      onFocus={handleCardInputFocus}
                      value={value}
                    >
                      <Input  name="expiry" minLength={4} maxLength={4} size='large' />
                    </Form.Item>
                    <Form.Item
                      label="CVC"
                      name="cvc"
                      className="card-form-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your card CVC!',
                        },
                      ]}
                      onChange={handleCardInputChange}
                      onFocus={handleCardInputFocus}
                    >
                      <InputNumber name="cvc" minLength={3} maxLength={4} size='large' />
                    </Form.Item>
                    <Button htmlType="submit" type="primary" danger block>{completePay ? '完成支付' : '确定支付'}</Button>
                  </Form>
                  
                </div>
              </Spin>
            }
          </>
        }

        {/* spin加载图标 */}
        {/* {completePay && <div className="spin-wrapper">
          <Spin spinning={loading} />
        </div>} */}

        {(!confirmPay && !completePay) && <span className="tip">您暂时不会被收费</span>}
      </div>
    </DetailInfoWrapper>
  );
});

DetailInfo.propTypes = {};

export default DetailInfo;
