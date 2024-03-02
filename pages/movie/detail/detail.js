// pages/movie/detail/detail.js
import { getMovie,getMovieComments,getMovieReviews } from "../../../api/index/movie";
import { createOrDeleteMovieWish,updateUserFavoriteMovie,createMovieRating } from "../../../api/index/movie";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影id
    id:null,
    // 电影详细信息
    movie:{},
    // 我的电影评分和评论
    myrating:0,
    comment:"",
    // 经典影评列表
    movieReviewList:[],
    // 经典影评列表页数
    reviewPage:1,
    // 每次请求20条
    reviewper_page:20,
    // 经典影评累计数量
    reviewNumber:0,
    // 用户评论列表
    movieCommentList:[],
    // 用户评论列表页数
    commentPage:1,
    // 每次请求20条
    commentper_page:20,
    // 用户评论累计数量
    commentNumber:0,
    // 用户评论总量
    commentTotal:0,
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
    isCommentShow:false,
    // 是否想看
    isWatch:false,
    // 是否评分
    isScore:false,
    // 是否收藏
    isCollect:false,
    // 是否加载
    isLoading:false,
    // 是否回到顶部
    isTop:false,
    // 是否还有数据
    isMore:false
  },
  // 选择tabbar栏
  checkType(e){
    this.setData({
      type:e.detail
    })
    // 当切换到经典影评时 清空之前的数据 重新请求经典影评
    if (this.data.type=='comment') {
      this.setData({
        movieReviewList:[],
        reviewPage:1,
        reviewper_page:20,
        reviewNumber:0,
      })
      this.getMovieReviews()
    }
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
      isCommentShow:true,
      // 重新获取数据 清空原来的数据
      // 用户评论列表
      movieCommentList:[],
      // 用户评论列表页数
      commentPage:1,
      // 每次请求20条
      commentper_page:20,
      // 用户评论累计数量
      commentNumber:0,
    })
    // 获取用户评论
    this.getMovieComments()
  },
  // 关闭评论界面
  closeComment(){
    this.setData({
      isCommentShow:false
    })
  },
  // 打开评分界面
  openScore(){
    this.setData({
      isScoreShow:true
    })
  },
  // 关闭评分界面
  closeScore(){
    this.setData({
      isScoreShow:false
    })
  },
  // 滑动获取用户评论
  getComment(){
    if (this.data.commentNumber<this.data.commentTotal) {
      this.getMovieComments()
    }
  },
  // 获取电影详情页信息
  async getMovie(){
    const {code,data} = await getMovie(this.data.id)
    if (code==200) {
      this.setData({
        movie:data,
      })
      // 动态设置小程序标题栏
      wx.setNavigationBarTitle({
        title:data.category
      })
    }
    if (this.data.movie.is_wish!=undefined) {
      if (this.data.movie.is_wish==0) {
        this.setData({
          isWatch:false
        })
      }else{
        this.setData({
          isWatch:true
        })
      }
    }
    if (this.data.movie.is_rating!=undefined) {
      if (this.data.movie.is_rating==0) {
        this.setData({
          isScore:false
        })
      }else{
        this.setData({
          isScore:true
        })
      }
    }
    if (this.data.movie.is_collection!=undefined) {
      if (this.data.movie.is_collection==0) {
        this.setData({
          isCollect:false
        })
      }else{
        this.setData({
          isCollect:true
        })
      }
    }
    if(this.data.movie.my_rating){
      this.setData({
        myrating:this.data.movie.my_rating.rating-0,
        comment:this.data.movie.my_rating.content
      })
    }
  },
  // 获取用户想看或取消想看电影
  async userWish(){
    const {code,data} = await createOrDeleteMovieWish(this.data.id)
    if (code==200) {
      this.setData({
        isWatch:data.is_wish
      })
    }
  },
  // 用户收藏电影
  async userCollect(){
    const {code,data} = await updateUserFavoriteMovie(this.data.id,{favorite_ids:[app.globalData.userFavoriteId]})
    if (code==200) {
       this.setData({
         isCollect:data.is_collection
       })
    }
  },
  // 用户取消收藏电影
  async DeleteuserCollect(){
    const {code,data} = await updateUserFavoriteMovie(this.data.id,{favorite_ids:[]})
    if (code==200) {
      this.setData({
        isCollect:data.is_collection
      })
    }
  },
  // 发布评分评论
  async createMovieRating(e){
    const code = await createMovieRating(this.data.id,e.detail)
    if (code==200) {
      this.setData({
        isScore:true
      })
      wx.showToast({
        title: '发布成功',
        icon: 'none',
        duration: 2000
      })
    }
    // 关闭评分页并刷新
    this.closeScore()
    this.getMovie()
  },
  // 获取经典影评
  async getMovieReviews(){
    this.setData({
      isLoading:true,
      isMore:false
    })
    const{code,data,total}=await getMovieReviews(this.data.id,{page:this.data.reviewPage,per_page:this.data.reviewper_page,sortby:'created_at'})
    if (code==200) {
      this.setData({
        movieReviewList:[...this.data.movieReviewList,...data],
        reviewPage:this.data.reviewPage+1,
        reviewNumber:this.data.reviewNumber+data.length
      })
    }
    // 没有更多数据
    if (this.data.reviewNumber==total) {
      this.setData({
        isMore:true
      })
    }
    // 获取完毕结束显示loading
    this.setData({
      isLoading:false
    })
  },
  // 获取用户评论
  async getMovieComments(){
    const {code,data,total} = await getMovieComments(this.data.id,{page:this.data.commentPage,per_page:this.data.commentper_page,sortby:'created_at'})
    if (code==200) {
      this.setData({
        movieCommentList:[...this.data.movieCommentList,...data],
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
      // 获取电影详细信息
      this.getMovie()
      // 获取经典影评
      this.getMovieReviews()
    }
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
    if (this.data.isMore) {
      // 没有更多数据停止加载
      wx.stopPullDownRefresh();
    }else{
      if (this.data.type=='comment') {
        this.getMovieReviews()
      }
    }
  },

  // 当用户下拉显示返回顶部按钮
  onPageScroll(e){
    if (e.scrollTop>300) {
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