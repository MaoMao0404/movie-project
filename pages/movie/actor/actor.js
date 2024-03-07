// pages/movie/actor/actor.js
import { getMovieCast } from "../../../api/index/movie";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影id
    id:null,
    // 演员表
    moviecast:[]
  },
  // 获取演员表
  async getMovieCast(){
    const {code,data} = await getMovieCast(this.data.id)
    if (code==200) {
      this.setData({
        moviecast:data
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    this.getMovieCast()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})