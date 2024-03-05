import request from '../request'

// 获取主页信息
export const getHome = () => request.get('/index')
// 获取搜索页信息
export const getSearch = (params)=>request.get('/search',params)

// 获取那年今日电影
export const getMovieToday =(params)=>request.get('/movie/today',params)
// 获取正在热映电影
export const getMovieTheater =(params)=>request.get('/movie/theater',params) 
// 获取主页高分top100电影
export const getTop = (params)=> request.get('/movie/top',params)
// 获取即将上映电影
export const getMovieComing = (params)=>request.get('/movie/coming',params)
// 获取奖项列表
export const getAwards = ()=>request.get('/awards')