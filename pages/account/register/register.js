// pages/account/register/register.js
import { getCaptcha,checkPhone,createPhoneCode,register,getUserInfo  } from "../../../api/index/account";
import { createUserFavorite } from "../../../api/index/movie";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",//账号
    password: "",//设置密码
    code: "",//短信验证码
    // 微信code
    WXcode:"",
    // 提示获取验证码
    tip:"获取验证码",
    // 计时器s
    clock:null,
    // 发送短信验证码的图片验证码
    img:"",
    // 是否展示弹出层
    show:false,
    // 图片验证码
    captcha:""
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
  // 动态获取验证码
  getCode(e){
    this.setData({
      code:e.detail.value
    })
  },
  // 动态获取图片验证码
  inputChange(e){
    this.setData({
      captcha:e.detail.value
    })
    if (this.data.captcha.length==4) {
      // 关闭图片验证码
      this.setData({
        show:false
      })
      this.createPhoneCode()
    }
  },
  // 跳转到登录
  pathToLogin(){
    wx.navigateTo({
      url: '/pages/account/login/login',
    })
  },

  // 校验账号
  accountValidate() {
    if (this.data.account === "") {
      wx.showToast({
        title: '请输入手机号',
        icon:'none',
        duration:1000
      })
      return;
    }

    if (!/^1[3456789]\d{9}$/.test(this.data.account)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
        duration:1000
      })
      return false;
    }

    return true;
  },
  // 校验密码
  passwordValidate() {
    if (this.data.password === "") {
      wx.showToast({
        title: '请输入密码',
        icon:'none',
        duration:2000
      })
      return false;
    }

    if (this.data.password.length < 6 || this.data.password.length > 16) {
      wx.showToast({
        title: '密码长度为6-16位之间',
        icon:'none',
        duration:2000
      })
      return false;
    }

    const reg = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}/;

    if (!reg.test(this.data.password)) {
      wx.showToast({
        title: '密码只能包含数字、字母和特定字符',
        icon:'none',
        duration:2000
      })
      return false;
    }

    return true;
  },
  // 关闭图片验证码
  cancel(){
    this.setData({
      show:false
    })
  },

  // 获取验证码
  async getVerifyCode(){
    // 两条短信间隔发送时间为120s 中间不可重复发送
    if (this.data.tip!="获取验证码") {
      wx.showToast({
        title: `120s后可重新获取验证码`,
        icon:'none',
        duration:2000
      })
      return
    }else{
      clearInterval(this.data.clock)
    }
    // 校验手机号
    let accountReg = this.accountValidate();
    if (!accountReg) return
    // 是否已存在此账号
    const {code,message} = await checkPhone({account:this.data.account})
    if (code!==200) {
      // 没有此账号则获取图片验证码 打开弹出层
      const {code,data} = await getCaptcha()
      if (code==200) {
        this.setData({
          show:true,
          img:data.replace(/[\r\n]/g, "")
        })
      }
    }else{
      wx.showToast({
        title: '账号已注册',
        icon:'none',
        duration:2000
      })
      return
    }
  },
  // 向手机发送短信验证码
  async createPhoneCode(){
    const {code,message} = await createPhoneCode({phone:this.data.account,code:this.data.captcha,type:"register"})
    if (code==200) {
      this.setData({
        tip:"发送成功"
      })
      this.data.clock = setInterval(() => {
        this.setData({
          tip:"获取验证码"
        })
      }, 120000);
      wx.showToast({
        title: message,
        icon:'none',
        duration:1000
      })
    }
    
  },
  // 注册
  doRegister(){
    clearInterval(this.data.clock)
    // 校验手机号
    let accountReg = this.accountValidate();
    if (!accountReg) return;

    // 校验密码格式
    let passwordReg = this.passwordValidate();
    if (!passwordReg) return;

    // 校验验证码
    if (this.data.code === "") {
      wx.showToast({
        title: '请输入短信验证码',
        icon:'none',
        duration:2000
      })
      return false;
    }

    wx.login({
      success: ({ code }) => {
        this.data.WXcode = code;
      },
      complete: () => {
        this.register();
      }
    })
  },
  // 发送请求注册
  async register(){
    const {code,message,data}=await register({account:this.data.account,password:this.data.password,code:this.data.code})
    if (code==200) {
      // 注册成功 储存token
      wx.setStorageSync('token',data.token)
      // 进行登录 获取用户信息
      this.getUserInfo();
      // 创建默认收藏夹
      this.createUserFavorite()
    }else{
      wx.showToast({
        title: message,
        icon:'none',
        duration:2000
      })
    }
  },
  // 获取用户信息
  async getUserInfo(){
    const {code,message,data} = await getUserInfo();
    // 获取成功 说明注册登录成功
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
  // 创建默认收藏夹
  async createUserFavorite(){
    const {code,data} = await createUserFavorite({name:'默认收藏夹'})
    if (code==200) {
      wx.setStorageSync('userFavoriteId', data.id)
      app.globalData.userFavoriteId=data.id
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