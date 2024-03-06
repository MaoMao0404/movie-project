import request from '../request'

// 获取用户登录 注册 找回密码等关于用户身份信息的操作

// 用户登录
export const Login = (params)=>request.post('/login',params)
// 获取用户信息
export const getUserInfo = ()=>request.get('/user')
// 获取图片验证码
export const getCaptcha = ()=>request.get('/captcha')
// 校验账号是否存在
export const checkPhone =(params)=>request.post('/account',params)
// 发送短信验证码
export const createPhoneCode =(params)=>request.get('/code',params) 
// 用户注册
export const register =(params)=>request.post('/register',params)
// 获取用户收藏夹
export const getUserFavorites = ()=>request.get('/user/favorites')
