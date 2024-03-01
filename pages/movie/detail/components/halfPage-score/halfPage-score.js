// pages/movie/detail/components/halfPage-score/halfPage-score.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 是否展示半屏插件
    isScoreShow:{
      type:Boolean,
      value:false
    },
    // 评论
    score:{
      type:Number,
      value:0
    },
    // 影评
    comment:{
      type:String,
      value:""
    },
    // 是否评分
    isScore:{
      type:Boolean,
      value:false
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
    // 关闭评分界面
    closeScore(){
      this.triggerEvent('closeScore')
    },
    // 获取评分的分数
    onChange(e) {
      this.setData({
        score: e.detail,
      });
    },
    // 获取输入的评论
    commentChange(e){
      this.setData({
        comment:e.detail.value
      })
    },
    // 发布评分评论
    createMovieRating(){
      this.triggerEvent('createMovieRating',{rating:this.properties.score,content:this.properties.comment})
    }
  }
})