import request from '@/utils/request.js'
// 获取文章列表
export const getArticleList = params => request({ url: '/app/v1_1/articles', params })
// 获取文章详情
export const getArticleDetails = id => request({ url: `/app/v1_0/articles/${id}` })
