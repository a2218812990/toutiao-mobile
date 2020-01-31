import request from '@/utils/request.js'
// 获取文章列表
export const getArticleList = params => request({ url: '/app/v1_1/articles', params })
// 根据文章id来获取文章详情
export const getArticleDetails = articleId => request({ url: `/app/v1_0/articles/${articleId}` })
// 收藏文章
export const collectArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
// 文章点赞
export const addLike = id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}

/**
   * 取消点赞
   */
export const deleteLike = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${id}`
  })
}
