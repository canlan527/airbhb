import request from '../request'

export function getAdminDashboard() {
  return request.get({ url: '/admin/dashboard' })
}

export function getAdminHouses(params) {
  return request.get({ url: '/admin/houses', params })
}

export function createAdminHouse(data) {
  return request.post({ url: '/admin/houses', data })
}

export function updateAdminHouse(id, data) {
  return request.patch({ url: `/admin/houses/${id}`, data })
}

export function updateAdminHouseStatus(id, status) {
  return request.patch({ url: `/admin/houses/${id}/status`, data: { status } })
}

export function deleteAdminHouse(id) {
  return request.delete({ url: `/admin/houses/${id}` })
}

export function getAdminOrders(params) {
  return request.get({ url: '/admin/orders', params })
}

export function updateAdminOrderStatus(orderNo, status) {
  return request.patch({ url: `/admin/orders/${orderNo}/status`, data: { status } })
}

export function getAdminUsers(params) {
  return request.get({ url: '/admin/users', params })
}

export function updateAdminUserStatus(id, status) {
  return request.patch({ url: `/admin/users/${id}/status`, data: { status } })
}
