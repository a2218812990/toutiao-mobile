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
  try {
    // 正常的话它使用的 JSON.parse 对数据进行转换
    // return JSON.parse(data)

    // 这里我们定制使用 json-bigint 这个第三方工具包来帮我们转换
    // 如果转换成功，就直接返回数据
    // 如果转换失败，就进入 catch 返回一个空对象给用户
    return jsonBigInt.parse(data)
  } catch (err) {
    return {}
  }
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
