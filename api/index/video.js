import request from "../request";

// 获取看点页信息

// 视频列表
export const getVideos = (params)=>request.get('/videos',params)