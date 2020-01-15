import request from '@/utils/request.js'
// 搜索联想建议
export const searchSuggestion = params => request({ url: '/app/v1_0/suggestion', params })
// 获取搜索结果
export const searchResult = params => request({ url: '/app/v1_0/search', params })
