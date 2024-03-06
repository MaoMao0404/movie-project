// app.js

App({
  
  onLaunch() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo=JSON.parse(userInfo)
    }
    let userFavoriteId = wx.getStorageSync('userFavoriteId')
    if (userFavoriteId) {
      this.globalData.userFavoriteId=userFavoriteId
    }
  },
  globalData: {
    // 用户信息
    userInfo: null,
    // token
    token:"",
    // 用户默认收藏夹id
    userFavoriteId:null
  }
})
