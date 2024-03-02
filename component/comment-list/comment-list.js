// component/comment-list/comment-list.js
import { createLike,deleteLike } from "../../api/index/movie";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isLike:{
      type:Number,
      value:0
    },
    movieComment:{
      type:Object,
      value:{}
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
    // 喜欢或取消喜欢此条评论
    async likeComment(){
      // 用户点赞评论
      if (this.properties.isLike==0) {
        const {code} = await createLike(this.properties.movieComment.id)
        if (code==200) {
          this.setData({
            isLike:1
          })
        }
      }else{
        // 用户取消喜欢评论
        const {code} = await deleteLike(this.properties.movieComment.id)
        if (code==200) {
          this.setData({
            isLike:0
          })
        }
      }
      
    },
    // 用户删除评论
    deleteComment(e){
      this.triggerEvent('deleteComment',e.currentTarget.dataset.id)
    },
    // 用户举报评论
    createReport(e){
      this.triggerEvent('createReport',e.currentTarget.dataset.id)
    }
  }
})