// pages/my/actor/actor.js
import { getUserCollections } from "../../../api/index/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 演员列表
    actorList:[],
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
  // 获取那年今日电影列表
  async getUserCollections(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const {code,data,total} = await getUserCollections('actors',{page:this.data.page})
    if (code==200) {
      this.setData({
        actorList:[...this.data.actorList,...data],
        page:this.data.page+1,
        number:this.data.actorList.length+data.length
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
    this.getUserCollections()
  },

  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isMore) {
      // 没有更多数据停止加载
      wx.stopPullDownRefresh();
   }else{
     this.getUserCollections()
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