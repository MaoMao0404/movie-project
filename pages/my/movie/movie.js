import { getUserFavoriteMovies } from "../../../api/index/user";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 演员列表
    movieList:[],
    // 页码
    page:1,
    // 演员列表总数
    number:0,
    // 是否显示正在加载中
    isLoading:false,
    // 是否显示返回顶部图标
    isTop:false,
    // 是否显示没有更多数据了
    isMore:false
  },
  // 获取电影列表
  async getUserFavoriteMovies(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const {code,data,total} = await getUserFavoriteMovies(app.globalData.userFavoriteId,{page:this.data.page})
    if (code==200) {
      this.setData({
        movieList:[...this.data.movieList,...data],
        page:this.data.page+1,
        number:this.data.movieList.length+data.length
      })
      if (this.data.number==total) {
        this.setData({
          isMore:true
        })
      }
    }
     // 获取完毕结束显示loading
     this.setData({
      isLoading:false
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserFavoriteMovies()
  },

  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isMore) {
      // 没有更多数据停止加载
      wx.stopPullDownRefresh();
   }else{
     this.getUserFavoriteMovies()
   }
  },

  // 当用户下拉显示返回顶部按钮
  onPageScroll(e){
    if (e.scrollTop>235) {
      this.setData({
        isTop:true
      })
    }else{
      this.setData({
        isTop:false
      })
    }
  }
})