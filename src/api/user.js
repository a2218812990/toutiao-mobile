// 用户登录接口
import request from '@/utils/request.js'

// 用户认证（登录注册）
export const login = data => { return request({ url: '/app/v1_0/authorizations', method: 'POST', data }) }
