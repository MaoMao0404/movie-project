// pages/movie/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制tabbar栏
    type:'introduction',
    typeList:[
      {type:"introduction",title:"电影简介"},
      {type:"information",title:"电影资料"},
      {type:"comment",title:"经典影评"}
    ],
    // 是否显示基本剧情弹窗
    isBriefShow:false,
    // 是否显示评分弹窗
    isScoreShow:false,
    // 是否显示文件夹弹窗
    isCollectShow:false,
    // 是否打开评论界面
    isCommentShow:false
  },
  // 选择tabbar栏
  checkType(e){
    this.setData({
      type:e.detail
    })
  },
  // 关闭基本剧情信息的弹窗
  closeBrief(){
    this.setData({
      isBriefShow:false
    })
  },
  // 打开基本剧情信息的弹窗
  openBrief(){
    this.setData({
      isBriefShow:true
    })
  },
  // 打开评论界面
  openComment(){
    this.setData({
      isCommentShow:true
    })
  },
  // 关闭评论界面
  closeComment(){
    this.setData({
      isCommentShow:false
    })
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