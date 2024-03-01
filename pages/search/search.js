// pages/search/search.js
import { getSearch } from "../../api/index/home";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索关键字
    keyword:"",
    // 历史记录
    historyList:[],
    // tabbar栏
    typeList:[
      {type:'movie',title:'影视'},
      {type:'actor',title:'演员'}
    ],
    // 选择的种类
    type:'movie',
    // 每次请求的数量
    per_page:20,
    // 影视
    movieList:[],
    moviePage: 1,
    movieTotal:0,
    movieNumber:0,
    // 影人
    actorList:[],
    actorPage: 1,
    actorTotal:0,
    actorNumber:0,

    // 是否显示正在加载中
    isLoading:true,
    // 是否显示返回顶部图标
    isTop:false,
    // 是否显示没有更多数据了
    isMore:false
  },
  // 重置数据
  clearData(){
    this.setData({
      // 选择的种类
      type:'movie',
      // 影视
      movieList:[],
      moviePage: 1,
      movieTotal:0,
      movieNumber:0,
      // 影人
      actorList:[],
      actorPage: 1,
      actorTotal:0,
      actorNumber:0
    })
  },

  // 获取搜索页信息
  async getSearch(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    let page = 1
    if (this.data.type=='movie') {
      page = this.data.moviePage
    }else if(this.data.type=='actor'){
      page = this.data.actorPage
    }
    let params = {
      page,
      per_page:this.data.per_page,
      keyword:this.data.keyword,
      type:this.data.type
    }
    // 获取搜索结果
    const {code,data,total} = await getSearch(params)
    if (code==200) {
      if (this.data.type=='movie') {
        this.setData({
          moviePage:this.data.moviePage+1,
          movieList:[...this.data.movieList,...data],
          movieTotal:total,
          movieNumber:this.data.movieNumber+data.length
        })
        if (this.data.movieNumber==this.data.movieTotal) {
          this.setData({
            isMore:true
          })
        }
      }else if (this.data.type=='actor') {
        this.setData({
          actorPage:this.data.actorPage+1,
          actorList:[...this.data.actorList,...data],
          actorTotal:total,
          actorNumber:this.data.actorNumber+data.length
        })
        if (this.data.actorNumber==this.data.actorTotal) {
          this.setData({
            isMore:true
          })
        }
      }
    } 
    // 获取完毕结束显示loading
    this.setData({
      isLoading:false
    })

  },

  // 获取输入的关键字
  keywordChange(e){
    this.setData({
      keyword:e.detail.value
    })
    this.clearData()
    this.getSearch()
  },

  // 清除输入的关键字
  clearkey(){
    this.setData({
      keyword:""
    })
  },

  // 获取点击历史记录词条，将词条填入keyword
  checkhistoryWord(e){
    this.setData({
      keyword:e.detail
    })
    this.clearData()
    this.getSearch()
  },

  // 清除历史记录
  clearhistory(){
    this.setData({
      historyList:[]
    })
  },

  // 用户选择的种类
  checkType(e){
    this.clearData()
    this.setData({
      type:e.detail
    })
    this.getSearch()
  },
  // 添加历史记录
  addHistory(e){
    const keyword = e.detail
    if (!keyword) return;
    this.getHistoryList();
    let historyList = this.data.historyList

    if (!historyList.includes(keyword)) {

      // 历史记录大于20则
      if (historyList.length > 20) {
        historyList.pop();
        this.setData({
          historyList
        })
      }
      historyList.unshift(keyword);
      this.setData({
        historyList
      })
      try {
        wx.setStorageSync('historyList', JSON.stringify(historyList))
      } catch (e) { }
    }
  }, 
  // 获取历史记录
  getHistoryList() {
    const historyList = wx.getStorageSync('historyList');
    if (historyList) {
      try {
        this.setData({
          historyList: JSON.parse(historyList)
        })
      } catch (e) {

      }
    } else {
      this.setData({
        historyList: []
      })
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSearch()
    this.getHistoryList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isMore) {
      // 没有更多数据停止加载
      wx.stopPullDownRefresh();
    }else{
       this.getSearch()
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