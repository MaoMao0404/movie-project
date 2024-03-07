// pages/movie/level/level.js
import { getMovieLevels } from "../../../api/index/movie";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影id
    id:null,
    // 家长引导列表
    levellist:[]
  },
  // 获取家长引导
  async getMovieLevels(){
    const {code,data} = await getMovieLevels(this.data.id)
    if (code==200) {
      this.setData({
        levellist:data
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
    this.getMovieLevels()
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