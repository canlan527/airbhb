import request from '../request'

export function getMyOrders() {
  return request.get({ url: '/me/orders' })
}

export function getMyFavorites() {
  return request.get({ url: '/me/favorites' })
}

export function getMyHistories() {
  return request.get({ url: '/me/histories' })
}

export function getMyHouses() {
  return request.get({ url: '/me/houses' })
}

export function createMyHouse(data) {
  return request.post({ url: '/me/houses', data })
}

export function updateMyHouse(id, data) {
  return request.patch({ url: `/me/houses/${id}`, data })
}

export function deleteMyHouse(id) {
  return request.delete({ url: `/me/houses/${id}` })
}

export function createOrder(data) {
  return request.post({ url: '/orders', data })
}

export function payOrder(orderNo) {
  return request.patch({ url: `/orders/${orderNo}/pay` })
}

export function favoriteHouse(id) {
  return request.post({ url: `/houses/${id}/favorite` })
}

export function unfavoriteHouse(id) {
  return request.delete({ url: `/houses/${id}/favorite` })
}

export function recordHouseView(id) {
  return request.post({ url: `/houses/${id}/view` })
}
