import axios from "axios";
import { BASE_URL, TIMEOUT} from './config'
import storage from 'store'

// 封装axios
class Request {
  constructor(baseURL, timeout) {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(config => {
      const token = storage.get('airbhb-token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    // 统一拦截：实例response拦截一层data，直接返回res.data,报错的话也返回err
    this.instance.interceptors.response.use(res => res.data, err => {
      return Promise.reject(err?.response?.data || err)
    })
  }

  // 提供请求方法
  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({...config, method: 'get'})
  }

  post(config) {
    return this.request({...config, method: 'post'})
  }

  patch(config) {
    return this.request({...config, method: 'patch'})
  }

  delete(config) {
    return this.request({...config, method: 'delete'})
  }
}

const request = new Request(BASE_URL,TIMEOUT)

export default request
