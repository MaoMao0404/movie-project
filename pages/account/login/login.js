// pages/account/login/login.js
import { Login } from "../../../api/index/account";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    password: "",
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
        type: 'minip',
        code: this.data.code
      }
      // 发送登录请求 获取用户token
      const {code,message，、data} = await Login(params);
      if (code !== 200) {
        wx.showToast({
          title: '',
          icon:'none',
          duration:2000
        })
        return;
      }

      try {
        wx.setStorageSync('token', loginRes.data.token)
      } catch (e) { }

      const userRes = await getUserInfo();

      this.setData({ loading: false })

      // 登录成功
      if (userRes.code === 200) {

        app.user = userRes.data

        wx.$toast("登录成功");

        wx.setStorage({
          key: "user",
          data: JSON.stringify(userRes.data)
        })

        wx.navigateBack()
        // wx.switchTab({
        //   url: '/pages/home/index',
        // })
      }
    } catch (e) {
      this.setData({ loading: false })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


})