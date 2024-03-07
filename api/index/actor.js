import request from '../request'

// 获取演员的信息

// 获取演员详细信息
export const getActor = (id)=>request.get(`/actors/${id}`)