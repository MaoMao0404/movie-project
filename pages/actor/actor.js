// pages/actor/actor.js
import { getActor } from "../../api/index/actor";
import { createUserCollection,deleteUserCollection } from "../../api/index/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 演员id
    id:null,
    // 演员信息
    actor:{},
    // 是否关注
    is_collection:0
  },
  // 获取演员信息
  async getActor(){
    const {code,data} = await getActor(this.data.id)
    if (code==200) {
      this.setData({
        actor:data,
        is_collection:data.is_collection
      })
    }
  },
  // 关注演员
  async createUserCollection(){
    const {code,data} = await createUserCollection('actors',this.data.id)
    if (code==200) {
      this.setData({
        is_collection:data.is_collection
      })
      wx.showToast({
        title: '关注成功',
        icon:'none',
        duration:1000
      })
    }
  },
  // 取消关注演员
  async deleteUserCollection(){
    const {code,data} = await deleteUserCollection('actors',this.data.id)
    if (code==200) {
      this.setData({
        is_collection:data.is_collection
      })
      wx.showToast({
        title: '取消关注',
        icon:'none',
        duration:1000
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
    this.getActor()
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