import request from '../request'

// 获取电影详情

// 获取电影详细信息
export const getMovie = (id)=>request.get(`/movies/${id}`)
// 用户想看
export const createOrDeleteMovieWish = (id)=>request.post(`/user/movies/${id}/wish`)
// 创建用户收藏夹
export const createUserFavorite = (params)=>request.post('/user/favorites',params)
// 用户收藏
export const updateUserFavoriteMovie = (id,params)=>request.put(`/user/movies/${id}/favorites`,params)
// 用户评分
export const createMovieRating = (id,params)=>request.post(`/user/movies/${id}/rating`,params)
// 获取影片评论
export const getMovieComments = (id,params)=>request.get(`/movies/${id}/comments`,params)
// 获取影片长评
export const getMovieReviews = (id,params)=>request.get(`/movies/${id}/reviews`,params)