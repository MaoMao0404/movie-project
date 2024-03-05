// component/my-userInfo/my-userInfo.js
Component({
  options:{
    styleIsolation:'isolated'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    isLogin:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到登录页
    pathTo(){
      wx.navigateTo({
        url: '/pages/account/login/login',
      })
    }
  }
})