import request from "../request";

// 获取分类页信息

// 获取影片分类菜单
export const getMovieCategories = ()=> request.get('/categories')
// 获取分类页面中的电影列表
export const getMovies = (params)=>request.get('/movies',params)