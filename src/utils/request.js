import axios from 'axios'
import jsonBigInt from 'json-bigint'
import store from '@/store'

// 设置基础地址配置
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理返回的数据长度太大
request.defaults.transformResponse = [function (data) {
  // 没数据的时候返回的是null,什么也没有，可以当做是false
  return jsonBigInt.parse(data) ? jsonBigInt.parse(data) : {}
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  let { token } = store.state
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
export default request
