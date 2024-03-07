// pages/my/view/view.js
import { createFeedback } from "../../../api/index/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:""
  },
  // 获取反馈
  commentChange(e){
    this.setData({
      comment:e.detail.value
    })
  },
  // 提交反馈
  async createFeedback(){
    const {code,message} = await createFeedback({content:this.data.comment})
    if (code==200) {
      // 清除文本框
      this.setData({
        comment:""
      })
      wx.showToast({
        title: message,
        icon:'none',
        duration:2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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