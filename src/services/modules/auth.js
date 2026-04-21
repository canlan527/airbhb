import request from '../request'

export function register(data) {
  return request.post({
    url: '/auth/register',
    data
  })
}

export function login(data) {
  return request.post({
    url: '/auth/login',
    data
  })
}

export function getProfile() {
  return request.get({
    url: '/auth/profile'
  })
}
