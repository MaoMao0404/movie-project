// pages/my/my.js
import { getUserCollectionCount,getUserFavoriteMovies } from "../../../api/index/user";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户是否登录
    isLogin:false,
    // Menu收藏的数据
    count: {
      actor_count: "-",
      review_count: "-",
      movie_count: "-",
    },
    // 用户信息
    userInfo:null
  },
  // 获取用户收藏统计
  async getUserCollectionCount(){
    const {code,data} = await getUserCollectionCount()
    if (code==200) {
      this.setData({
        ['count.actor_count']:data.actor_count,
        ['count.review_count']:data.review_count
      })
    }
  },
  // 获取收藏电影统计
  async getUserFavoriteMovies(){
    const {code,total} = await getUserFavoriteMovies(app.globalData.userFavoriteId,{page:1,per_page:20})
    if (code==200) {
      this.setData({
        ['count.movie_count']:total
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserCollectionCount()
    this.getUserFavoriteMovies()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo:app.globalData.userInfo,
        isLogin:true
      })
    }else{
      this.setData({
        isLogin:false,
        count: {
          actor_count: "-",
          review_count: "-",
          movie_count: "-",
        },
      })
    }
  },

  // 下拉刷新
  onPullDownRefresh(){
    this.getUserCollectionCount()
    this.getUserFavoriteMovies()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo:app.globalData.userInfo,
        isLogin:true
      })
    }else{
      this.setData({
        isLogin:false,
        count: {
          actor_count: "-",
          review_count: "-",
          movie_count: "-",
        },
      })
    }
  }
})