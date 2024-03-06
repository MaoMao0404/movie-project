import request from '../request'

// 获取用户相关的操作和信息

// 用户点赞
export const createLike = (type,id)=>request.post(`/${type}/${id}/like`)
// 取消点赞
export const deleteLike = (type,id)=>request.delete(`/${type}/${id}/like`)
// 用户收藏
export const createUserCollection =(type,id)=>request.post(`/user/${type}/${id}/collections`)
// 取消收藏
export const deleteUserCollection = (type,id)=>request.delete(`/user/${type}/${id}/collections`)
// 我的收藏统计
export const getUserCollectionCount = ()=>request.get('/user/collections/count')
// 我的收藏列表
export const getUserCollections = (type,params)=>request.get(`/user/collections/${type}`,params)
// 我的收藏电影列表
export const getUserFavoriteMovies = (id,params)=>request.get(`/user/favorites/${id}/movies`,params)
