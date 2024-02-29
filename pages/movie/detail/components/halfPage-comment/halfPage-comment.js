// pages/movie/detail/components/halfPage-comment/halfPage-comment.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isCommentShow:{
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
    closeComment(){
      this.triggerEvent('closeComment')
    }
  }
})