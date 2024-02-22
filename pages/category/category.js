import { getMovieCategories,getMovies } from "../../api/index/category";

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 全部分类
    categories:[],
    // 国家分类
    countries:[],
    // 年份分类
    years:[],
    // 传参
    params:{
      category:'全部',
      genre:'全部',
      country:'全部',
      year:'全部'
    },
    // 页码
    page:1,
    // 每页条数
    per_page:30,
    // 每次发送请求获得的电影条数 以此判断还有没有更多数据
    movieNumber:0,
    // 电影列表
    moviesList:[],
    // 是否显示顶部提示条
    isShow:false,
    // 是否显示正在加载中
    isLoading:true,
    // 是否显示返回顶部图标
    isTop:false,
    // 是否显示没有更多数据了
    isMore:false
  },

  // 获取影片分类菜单数据
  async getMovieCategories(){
    const {code,data}=await getMovieCategories()
    if(code==200){
      const {categories,countries,years}=data
      this.setData({
        categories,
        countries:[{name: "全部"}, ...countries],
        years:[{name: "全部"}, ...years]
      })
      
    }
  },
  // 获取影片列表
  async getMovies(params){
    // 开始获取数据显示loadin框 此时无法判断是否有更多数据 因此隐藏没有更多数据的提示框
    this.setData({
      isLoading:true,
      isMore:false
    })
    const {code,data}=await getMovies(params)
    if (code==200) {
      this.setData({
        movieNumber:data.length,
        moviesList:[...this.data.moviesList,...data],
        page:this.data.page+1
      })
    }
    // 获取完毕结束显示loading
    this.setData({
      isLoading:false
    })
    // 如果获取的数据比应该每页获取的数据少，说明没有更多数据了，因此显示没有更多数据的提示框
    if (this.data.movieNumber<this.data.per_page){
      this.setData({
        isMore:true
      })
    }
  },
  // 获取子组件category-nav传递过来的参数
  // 当给参数重新赋值时，重新获取数据，
  // 由于首次加载页面已经有值存在,所以page设置为1，清空movieList
  change(e){
    if (e) {
      this.setData({
        params:e.detail,
        page:1,
        moviesList:[]
     })
    }
    this.getMovies({...this.data.params,page:this.data.page,per_page:this.data.per_page})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMovieCategories()
    this.getMovies({...this.data.params,page:this.data.page,per_page:this.data.per_page})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isLoading==false && this.data.movieNumber==this.data.per_page) {
      this.getMovies({...this.data.params,page:this.data.page,per_page:this.data.per_page})
    }else{
       // 如果获取的数据比应该每页获取的数据少，说明没有更多数据了，因此显示没有更多数据的提示框并且停止下拉触底
      wx.stopPullDownRefresh();
    }
  },

  // 当用户下拉电影到隐藏分类栏，则显示提示框及返回顶部按钮
  onPageScroll(e){
    if (e.scrollTop>235) {
      this.setData({
        isShow:true,
        isTop:true
      })
    }else{
      this.setData({
        isShow:false,
        isTop:false
      })
    }
  }
})