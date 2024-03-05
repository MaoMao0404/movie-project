// pages/home/home.js
import { getHome, getTop } from "../../api/index/home";
import { getMovieReviews } from "../../api/index/movie";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiper:[],
    // 文章咨询
    article:[],
    // 即将上映
    coming:{
      data:[],
      total:0
    },
    // 正在热映
    theater:{
      data:{},
      total:0
    },
    // 高分电影
    top:[],
    // 那年今日
    today:{
      data:[],
      total:0
    },
  },

  // 获取首页信息
  async getHomeData(){
    const {code,data} = await getHome()
    if(code==200){
      const {swiper,coming,theater,today}=data
      this.setData({
        swiper,coming,theater,today
      })
    }
  },
  // 获取主页高分电影
  async getTop(){
    const {code,data} = await getTop()
    if(code==200){
      this.setData({
        top:data
      })
    }
  },
  // 获取优质影评
  async getMovieReviews(){
    const {code,data} =await getMovieReviews(1197950,{page:1,per_page:2,sortby:'hot'})
    if (code==200) {
      this.setData({
        article:data
      })
    }
  },

  // 跳转搜索页
  pathTo(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHomeData()
    this.getTop()
    this.getMovieReviews()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '影评网',
      imageUrl: '/images/logo.png',
      path: '/pages/home/home'
    }
  }
})