import request from '@/utils/request.js'
// 获取文章列表
export const getArticleList = params => request({ url: '/app/v1_1/articles', params })
