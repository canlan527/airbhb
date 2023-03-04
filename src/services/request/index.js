import axios from "axios";
import { BASE_URL, TIMEOUT} from './config'

class Request {
  constructor(baseURL, timeout) {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 统一拦截：实例response拦截一层data，直接返回res.data,报错的话也返回err
    this.instance.interceptors.response.use(res => res.data, err => err)
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
}

export default new Request(BASE_URL,TIMEOUT)