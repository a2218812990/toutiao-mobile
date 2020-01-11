import request from '@/utils/request.js'
// 获取文章列表
export const getAllChannels = () => request({ method: 'GET', url: '/app/v1_0/channels' })
