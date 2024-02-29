import request from '../request'

// 获取电影详情

// 获取电影详细信息
export const getMovie = (id)=>request.get(`/movies/${id}`)