import request from '../request'

// 获取用户登录 注册 找回密码等关于用户身份信息的操作

// 用户登录
export const Login = (params)=>request.post('login')