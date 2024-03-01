import { updateUserFavoriteMovie } from "../../../../../api/index/movie"

// pages/movie/detail/components/score/score.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 是否想看
    isWatch:{
      type:Boolean,
      value:false
    },
    // 是否评分
    isScore:{
      type:Boolean,
      value:false
    },
    // 是否收藏
    isCollect:{
      type:Boolean,
      value:false
    },
    // 是否上映
    release_status:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开评分界面
    openScore(){
      this.triggerEvent('openScore')
    },
    // 用户想看此影片
    createOrDeleteMovieWish(){
      this.triggerEvent('userWish')
    },
    // 用户收藏此影片
    updateUserFavoriteMovie(){
      this.triggerEvent('userCollect')
    },
    // 用户取消收藏此影片
    deleteUserFavoriteMovie(){
      this.triggerEvent('DeleteuserCollect')
    }
  }
})