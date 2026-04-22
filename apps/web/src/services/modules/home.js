import request from '../request'

// 请求 高性价比房源 数据接口
export function getHomeGoodPriceData() {
  return  request.get({
    url: '/home/goodprice'
  })
}

// 请求 高分好评房源 接口
export function getHomeHighScoreData() {
  return request.get({
    url: '/home/highscore'
  })
}

// 请求 热门目的地 接口
export function getHomeDiscountData() {
  return request.get({
    url: '/home/discount'
  })
}

// 请求 探索佛山的精彩之地 数据接口
export function getHomeRecommendData() {
  return request.get({
    url: '/home/hotrecommenddest'
  })
}

// 请求 你可能想去 数据接口
export function getHomeLongForData() {
  return request.get({
    url: '/home/longfor'
  })
}

// 请求 佛山的爱彼迎Plus房源 数据接口
export function getHomePlusData() {
  return request.get({
    url: '/home/plus'
  })
}