import request from '@/utils/request.js'
// 获取文章评论列表
export const getComments = params => request({ url: '/app/v1_0/comments', params })
// 发布评论
export const addComment = data => request({ url: '/app/v1_0/comments', data, method: 'post' })
