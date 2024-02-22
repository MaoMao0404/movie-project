// pages/video/video.js
import { getVideos } from "../../api/index/video";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 请求第几页数据
    page:1,
    // 请求每页的条数
    per_page:20,
    // 电影视频列表
    videoList:[],
    // 每次获取视频的数量
    videoNumber:0,
    // 当前点击的视频的id
    videoId:0,
    // 是否正在加载
    isLoading:false,
    // 是否回到顶部
    isTop:false,
    // 是否还有更多数据
    isMore:false
  },
  // 获取视频列表
  async getVideos(params){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const{code,data} = await getVideos(params)
    if(code==200){
      this.setData({
        videoNumber:data.length,
        videoList:[...this.data.videoList,...data],
        page:this.data.page+1
      })
    }
    // 获取完毕结束显示loading
    this.setData({
      isLoading:false
    })
    // 如果获取的数据比应该每页获取的数据少，说明没有更多数据了，因此显示没有更多数据的提示框
    if (this.data.videoNumber<this.data.per_page){
      this.setData({
        isMore:true
      })
    }
  },
  // 获取当前点击的电影的id
  videoPlay(e){
    this.setData({
      videoId:e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideos({page:this.data.page,per_page:this.data.per_page})
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isLoading==false && this.data.videoNumber==this.data.per_page) {
      this.getVideos({page:this.data.page,per_page:this.data.per_page})
    }else{
       // 如果获取的数据比应该每页获取的数据少，说明没有更多数据了，因此显示没有更多数据的提示框并且停止下拉触底
      wx.stopPullDownRefresh();
    }
  },
  // 当用户下拉电影到隐藏分类栏，则显示提示框及返回顶部按钮
  onPageScroll(e){
    // 显示是否返回顶部
    if (e.scrollTop>235) {
      this.setData({
        isTop:true
      })
    }else{
      this.setData({
        isTop:false
      })
    }

    // 停止播放视频
    if (this.data.videoId) {
      const safeHeight = app.globalData.windowHeight - 60;
      // 滚动超出可视范围(向上滚动与向下滚动)时关闭当前播放
      const query = wx.createSelectorQuery()
      query.select('#video_' + this.data.videoId).boundingClientRect()
      query.exec((res) => {
        if (res[0].top < -60 || res[0].top > safeHeight) {
          this.setData({
            videoId: 0
          })
        }
      })
    }
  }

})