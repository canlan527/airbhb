import request from '../request'

export function getHomeGoodPriceData() {
  return  request.get({
    url: '/home/goodprice'
  })
}

export function getHomeHighScoreData() {
  return request.get({
    url: '/home/highscore'
  })
}

export function getHomeDiscountData() {
  return request.get({
    url: '/home/discount'
  })
}


export function getHomeRecommendData() {
  return request.get({
    url: '/home/hotrecommenddest'
  })
}

export function getHomeLongForData() {
  return request.get({
    url: '/home/longfor'
  })
}

export function getHomePlusData() {
  return request.get({
    url: '/home/plus'
  })
}