// 用户登录接口
import request from '@/utils/request.js'

// 用户认证（登录注册）
export const login = data => request({ url: '/app/v1_0/authorizations', method: 'POST', data })
// 发送验证码
export const phoneCode = mobile => request({ url: `/app/v1_0/sms/codes/${mobile}` })
// 获取当前用户登录信息
export const getUserInfo = data => request({ url: '/app/v1_0/user', data })
// 获取用户频道列表
export const getChannels = data => request({ url: '/app/v1_0/user/channels', data })
// 添加关注
export const addFocus = id => request({ url: '/app/v1_0/user/followings', data: { target: id }, method: 'POST' })
// 取消关注
export const deleteFocus = id => request({ url: `/app/v1_0/user/followings/${id}`, method: 'DELETE' })
