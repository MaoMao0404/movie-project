// pages/movie/knowledge/knowledge.js
import { getMovieKnowledges } from "../../../api/index/movie";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    list:[],
     // 页码
     page:1,
     // 电影列表总数
     movieNumber:0,
 
     // 是否显示正在加载中
     isLoading:false,
     // 是否显示返回顶部图标
     isTop:false,
     // 是否显示没有更多数据了
     isMore:false
  },
  async getMovieKnowledges(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const {code,data,total} = await getMovieKnowledges(this.data.id,{page:this.data.page})
    if (code==200) {
      this.setData({
        list:[...this.data.list,...data],
        page:this.data.page+1,
        movieNumber:this.data.list.length+data.length
      })
      if (this.data.movieNumber==total) {
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
    this.setData({
      id:options.id
    })
    this.getMovieKnowledges()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isMore) {
      // 没有更多数据停止加载
      wx.stopPullDownRefresh();
    }else{
      this.getMovieKnowledges()
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