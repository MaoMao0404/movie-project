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
// 获取影片长评列表
export const getMovieReviews = (id,params)=>request.get(`/movies/${id}/reviews`,params)
// 获取影片长评详情
export const getReview = (id)=>request.get(`/reviews/${id}`)
// 用户点赞评论
export const createLike = (id)=>request.post(`/comments/${id}/like`)
// 用户取消点赞评论
export const deleteLike = (id)=>request.delete(`/comments/${id}/like`)
// 用户创建评论
export const createMovieComment = (id,params)=>request.post(`/movies/${id}/comments`,params)
// 用户删除评论
export const deleteComment = (id)=>request.delete(`/comments/${id}`)
// 用户举报评论
export const createReport = (params)=>request.post('/reports',params)
// 获取电影演员表
export const getMovieCast = (id)=>request.get(`/movies/${id}/cast`)
// 获取电影相册
export const getMoviePhotos = (id,params)=>request.get(`/movies/${id}/photos`,params)
// 获取电影奖项
export const getMovieAwards = (id)=>request.get(`/movies/${id}/awards`)
// 获取上映日期
export const getMoviePubdates = (id,params)=>request.get(`/movies/${id}/pubdates`,params)
// 获取家长引导
export const getMovieLevels = (id)=>request.get(`/movies/${id}/levels`)
// 获取幕后知识
export const getMovieKnowledges = (id,params)=>request.get(`/movies/${id}/knowledges`,params)
// 获取经典台词
export const getMovieDialogues = (id)=>request.get(`/movies/${id}/dialogues`)
// 获取制作发行
export const getMovieCompanies = (id)=>request.get(`/movies/${id}/companies`)
// 获取系列影视
export const getSerial = (id)=>request.get(`/serials/${id}/movies`)