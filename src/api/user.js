// 用户登录接口
import request from '@/utils/request.js'

// 用户认证（登录注册）
export const login = data => request({ url: '/app/v1_0/authorizations', method: 'POST', data })
// 发送验证码
export const phoneCode = mobile => request({ url: `/app/v1_0/sms/codes/${mobile}` })
