import request from '@/utils/request.js'
// 获取文章评论列表
export const getComments = params => request({ url: '/app/v1_0/comments', params })
// 发布评论
export const addComment = data => request({ url: '/app/v1_0/comments', data, method: 'post' })
// 对评论点赞
export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消评论点赞
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
