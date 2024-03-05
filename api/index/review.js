import request from '../request'

// 获取长篇影评页详细信息

// 支持或反对影评
export const createReviewVoter = (id,params)=>request.post(`/reviews/${id}/voters`,params)
// 影评评论
export const getReviewComments = (id,params)=>request.get(`/reviews/${id}/comments`,params)
// 发布评论
export const createReviewComment = (id,params)=>request.post(`/reviews/${id}/comments`,params)