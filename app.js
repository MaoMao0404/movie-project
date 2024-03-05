// app.js
import { createUserFavorite } from "./api/index/movie";
App({
  // 创建默认收藏夹
  async createUserFavorite(){
    let userFavoriteId = wx.getStorageSync('userFavoriteId')
    if (userFavoriteId) {
      this.globalData.userFavoriteId=userFavoriteId
    }else{
      const {code,data} = await createUserFavorite({name:'默认收藏夹'})
      if (code==200) {
        wx.setStorageSync('userFavoriteId', data.id)
        this.globalData.userFavoriteId=data.id
      }
    }
  },
  onLaunch() {
    this.createUserFavorite()
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
