// pages/review/review.js
import { getReview } from "../../api/index/movie";
import { createReviewVoter,getReviewComments } from "../../api/index/review";
import { createUserCollection,deleteUserCollection } from "../../api/index/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影id
    id:null,
    // 影评信息
    review:{},
    // 影评中作者信息
    author:{},
    // 电影信息
    movie:[],
    // 支持 反对 取消类型
    up:"up",
    down:"down",
    vote_type:0,
    // 是否收藏
    is_collection:0,

    // 半屏评论框
    isCommentShow:false,
    // 评论列表
    commentList:[],
    // 用户评论列表页数
    commentPage:1,
    // 每次请求20条
    commentper_page:20,
    // 用户评论累计数量
    commentNumber:0,
    // 用户评论总量
    commentTotal:0,

  },
  // 获取影评详情
  async getReview(){
    const {code,data} = await getReview(this.data.id)
    if (code==200) {
      this.setData({
        review:data,
        author:data.author,
        movie:[data.movie],
        vote_type:data.vote_type,
        is_collection:data.is_collection
      })
    }
    if (data.vote_type==0) {
      this.setData({
        up:"up",
        down:"down"
      })
    }else if (data.vote_type==1) {
      this.setData({
        up:"cancel"
      })
    }else{
      this.setData({
        down:"cancel"
      })
    }
  },
  // 支持 取消支持影评
  async upReview(e){
    // 如果已经选择反对 则无法点击喜欢
    if (this.data.down=="cancel") {
      wx.showToast({
        title: '您已选择不喜欢',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return
    }
    let type = e.target.dataset.up
    const {code,data} = await createReviewVoter(this.data.review.id,{type})
    if (code==200) {
      // 获取支持 或 取消支持的结果
      this.setData({
        vote_type:data.vote_type
      })
      // 如果此次请求为支持请求，那么下次点击传值为取消支持
      if (type=="up") {
        this.setData({
          up:"cancel"
        })
        wx.showToast({
          title: '您已选择喜欢',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }else{
        // 如果此次请求为取消支持请求，那么下次点击传值为支持
        this.setData({
          up:"up"
        })
        wx.showToast({
          title: '您已取消喜欢',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }
  },
  // 反对 取消反对影评
  async downReview(e){
    // 如果已经选择喜欢 则无法点击反对
    if (this.data.up=="cancel") {
      wx.showToast({
        title: '您已选择喜欢',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return
    }
    let type = e.target.dataset.down
    const {code,data} = await createReviewVoter(this.data.review.id,{type})
    if (code==200) {
      this.setData({
        vote_type:data.vote_type
      })
      if (type=="down") {
        this.setData({
          down:"cancel"
        })
        wx.showToast({
          title: '您已选择不喜欢',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }else{
        this.setData({
          down:"down"
        })
        wx.showToast({
          title: '您已取消不喜欢',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }
  },
  // 收藏或取消影评
  async userCollection(){
    // 如果已经收藏 点击则取消收藏
    if (this.data.is_collection==1) {
      const {code,data}=await deleteUserCollection("reviews",this.data.review.id)
      if (code==200) {
        this.setData({
          is_collection:data.is_collection
        })
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }else{
      // 如果未收藏 点击则收藏
      const {code,data}=await createUserCollection("reviews",this.data.review.id)
      if (code==200) {
        this.setData({
          is_collection:data.is_collection
        })
        wx.showToast({
          title: '收藏成功！',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }
    
  },
  // 打开评论框
  openComment(){
    this.setData({
      isCommentShow:true,
      // 重新获取数据 清空原来的数据
      // 用户评论列表
      commentList:[],
      // 用户评论列表页数
      commentPage:1,
      // 每次请求20条
      commentper_page:20,
      // 用户评论累计数量
      commentNumber:0,
    })
    // 获取用户评论
    this.getReviewComments()
  },
  // 关闭评论框
  closeComment(){
    this.setData({
      isCommentShow:false
    })
  },
  // 滑动获取评论列表
  getComment(){
    if (this.data.commentNumber<this.data.commentTotal) {
      this.getReviewComments()
    }
  },
  // 获取用户评论
  async getReviewComments(){
    const {code,data,total} = await getReviewComments(this.data.review.id,{page:this.data.commentPage,per_page:this.data.commentper_page,sortby:'created_at'})
    if (code==200) {
      this.setData({
        commentList:[...this.data.commentList,...data],
        commentPage:this.data.commentPage+1,
        commentNumber:this.data.commentNumber+data.length,
        commentTotal:total
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    if (this.data.id) {
      this.getReview()
    }
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