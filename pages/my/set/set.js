// pages/my/set/set.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否登录
    isLogin:false

  },
  // 退出登录
  Logout(){
      // 清除本地存储数据
      wx.removeStorageSync('token')
      wx.removeStorageSync('userFavoriteId')
      wx.removeStorageSync('userInfo')
      // 清除全局存储
      app.globalData.userInfo = null
      app.globalData.userFavoriteId = null
      // 跳转到登录页
      wx.navigateTo({
        url: '/pages/account/login/login',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.globalData.userInfo) {
      this.setData({
        isLogin:true
      })
    }else{
      this.setData({
        isLogin:false
      })
    }
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