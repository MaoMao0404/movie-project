// component/comment-list/comment-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isLike:{
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
    // 喜欢此条评论
    likeComment(){
      this.setData({
        isLike:!this.properties.isLike
      })
    }
  }
})