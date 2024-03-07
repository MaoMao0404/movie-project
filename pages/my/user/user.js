// pages/my/user/user.js
import { updateUserInfo } from "../../../api/index/account";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo:null,
    // 是否展示改名的弹出层
    isShowName:false,
    // 新昵称
    newname:"",
    // 新头像
    imgurl:"",
    // 设置性别
    gender:"",
    // 是否展示改性别的弹出层
    isShowGender:false,
    // 选项
    actions: [
      {
        name: '未知',
      },
      {
        name: '男',
      },
      {
        name: '女',
      },
    ],
  },
  // 获取新昵称
  getNewname(e){
    this.setData({
      newname:e.detail.value
    })
  },
  // 打开修改名字的弹窗
  openNewname(){
    this.setData({
      isShowName:true
    })
  },
  // 关闭修改名字的弹窗
  closeNewname(){
    this.setData({
      isShowName:false,
      newname:""
    })
  },
  // 确认修改新名字
  async updateNewname(){
    const {code,message,data} = await updateUserInfo({username:this.data.newname})
    if (code==200) {
      // 关闭弹窗
      this.closeNewname()
      // 更新全局用户信息
      app.globalData.userInfo = data
      wx.setStorage({
        key: "userInfo",
        data: JSON.stringify(data)
      })
      // 重新获取本页中用户信息
      this.setData({
        userInfo:app.globalData.userInfo,
      })
    }else{
      wx.showToast({
        title: message,
        icon:'none',
        duration:2000
      })
    }
  },
  // 点击选择相册
  chooseImg(){
    var self = this
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType:['album'],
      success(res) {
        self.setData({
          imgurl:res.tempFiles[0].tempFilePath
        })
        // 发送请求更新头像
        self.updateNewimg()
      }
    })
  },
  // 确认修改新头像
  async updateNewimg(){
    const {code,message,data} = await updateUserInfo({username:this.data.userInfo.username,avatar:""})
    if (code==200) {
      // 更新全局用户信息
      app.globalData.userInfo = data
      wx.setStorage({
        key: "userInfo",
        data: JSON.stringify(data)
      })
      // 重新获取本页中用户信息
      this.setData({
        userInfo:app.globalData.userInfo,
      })
    }else{
      wx.showToast({
        title: message,
        icon:'none',
        duration:2000
      })
    }
  },
  // 打开性别弹窗
  openGender(){
    this.setData({
      isShowGender:true
    })
  },
  // 关闭性别弹窗
  closeGender(){
    this.setData({
      isShowGender:false
    })
  },
  // 点击选择性别
  async onSelect(e){
    this.setData({
      gender:e.detail.name
    })
    const {code,message,data} = await updateUserInfo({username:this.data.userInfo.username,gender:this.data.gender})
    if (code==200) {
      // 更新全局用户信息
      app.globalData.userInfo = data
      wx.setStorage({
        key: "userInfo",
        data: JSON.stringify(data)
      })
      // 重新获取本页中用户信息
      this.setData({
        userInfo:app.globalData.userInfo,
      })
    }else{
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo:app.globalData.userInfo,
      })
    }
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