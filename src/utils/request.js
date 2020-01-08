import axios from 'axios'
import jsonBigInt from 'json-bigint'

// 设置基础地址配置
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理返回的数据长度太大
request.defaults.transformResponse = [function (data) {
  // 没数据的时候返回的是null,什么也没有，可以当做是false
  return jsonBigInt.parse(data) ? jsonBigInt(data) : {}
}]
export default request
