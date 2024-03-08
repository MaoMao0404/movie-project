// pages/account/login/login.js
import { Login,getUserInfo,getUserFavorites } from "../../../api/index/account";
import { createUserFavorite } from "../../../api/index/movie";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "13831446886",
    password: "123456",
    code: "",
    isShowPassword: false,
  },
  // 清空账号
  clearAccount(){
    this.setData({
      account:""
    })
  },
  // 切换密码
  togglePassword(){
    this.setData({
      isShowPassword:!this.data.isShowPassword
    })
  },
  // 动态获取账号
  getAccount(e){
    this.setData({
      account:e.detail.value
    })
  },
   // 动态获取密码
   getPassword(e){
    this.setData({
      password:e.detail.value
    })
  },
  // 登录
  doLogin(){
    if (this.data.account === "") {
      wx.showToast({
        title: '请输入手机号',
        icon:'none',
        duration:2000
      })
      return;
    }

    if (this.data.password === "") {
      wx.showToast({
        title: '请输入密码',
        icon:'none',
        duration:2000
      })
      return;
    }
    this.Login();
    // code 通过小程序的 wx.login 方法获取，服务端通过此 code 获取到该用户的 openId，并与该账号绑定，以便下次进入小程序时可以通过 WXLogin 接口实现免登录效果
    wx.login({
      success: ({ code }) => {
        this.setData({
          code:code
        })
      },
      complete: () => {
        this.Login();
      }
    })
  },
  // 获取用户token登录 获取用户信息
  async Login(){
    try {
      let params = {
        account:this.data.account,
        password:this.data.password,
        type:'minip',
        code:this.data.code
      }
      // 发送登录请求 获取用户token
      const {code,data,message} = await Login(params);
      if (code !== 200) {
        wx.showToast({
          title: message,
          icon:'none',
          duration:2000
        })
        return;
      }
      // 存储token
      try {
        wx.setStorageSync('token',data.token)
      } catch (e) { }
    } catch (error) {

    }
      // 获取用户信息
      this.getUserInfo()
      // 获取用户收藏夹
      this.getUserFavorites()
  },

  async getUserInfo(){
    const {code,message,data} = await getUserInfo();
      // 登录成功
      if (code == 200) {
        app.globalData.userInfo = data
        wx.setStorage({
          key: "userInfo",
          data: JSON.stringify(data)
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }else{
        wx.showToast({
          title: message,
          icon:'none',
          duration:2000
        })
        return
      }
  },
  // 获取用户收藏夹
  async getUserFavorites(){
    const {code,data,total}=await getUserFavorites()
    if (code==200) {
      if (total>0) {
        wx.setStorageSync('userFavoriteId', data[0].id)
        app.globalData.userFavoriteId=data[0].id
      }else{
        this.createUserFavorite()
      }
    }
  },
  // 创建默认收藏夹
  async createUserFavorite(){
    const {code,data} = await createUserFavorite({name:'默认收藏夹'})
    if (code==200) {
      wx.setStorageSync('userFavoriteId', data.id)
      app.globalData.userFavoriteId=data.id
    }
  },

  // 跳转到注册
  pathToRegister(){
    wx.navigateTo({
      url: '/pages/account/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


})