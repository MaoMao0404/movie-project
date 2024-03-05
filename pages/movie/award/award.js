import { getAwards } from "../../../api/index/home";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影列表
    awardsList:[],
    // 是否显示正在加载中
    isLoading:false,
    // 是否显示返回顶部图标
    isTop:false,
    // 是否显示没有更多数据了
    isMore:false
  },
  // 获取那年今日电影列表
  async getAwards(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const {code,data} = await getAwards()
    if (code==200) {
      this.setData({
        awardsList:data,
      })
    }
     // 获取完毕结束显示loading
     this.setData({
      isLoading:false,
      isMore:true
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAwards()
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