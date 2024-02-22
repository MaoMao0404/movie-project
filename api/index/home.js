import request from '../request'

// 获取主页信息
export const getHome = () => request.get('/index')
// 获取主页高分top电影
export const getTop = (params)=> request.get('/movie/top',params)

// 获取搜索页信息
export const getSearch = (params)=>request.get('/search',params)