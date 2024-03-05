// pages/review/components/halfPage-review/halfPage-review.js
import { createReviewComment } from "../../../../api/index/review";
import { deleteComment,createReport } from "../../../../api/index/movie";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    ID:{
      type:Number,
      value:0
    },
    isCommentShow:{
      type:Boolean,
      value:false
    },
    commentList:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 评论
    comment:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭评论半屏窗口
    closeComment(){
      this.triggerEvent('closeComment')
    },
    // 获取输入的评论
    commentChange(e){
      this.setData({
        comment:e.detail.value
      })
    },
    // 获取评论列表
    getComment(){
      this.triggerEvent('getComment')
    },
    // 用户发布评论
    async createReviewComment(){
      const {code} = await createReviewComment(this.properties.ID,{content:this.data.comment})
      if (code==200) {
        // 发布成功后清空评论框
        this.setData({
          comment:''
        })
        // 发布评论后弹窗提示
        wx.showToast({
          title: '评论发布成功',
          icon: 'none',
          duration: 2000//持续的时间
        })
        // 发布成功后更新评论列表
        this.triggerEvent('updateCommentList')
      }
    },
    // 用户删除评论
    async deleteComment(e){
      let commentId = e.detail;
      const {code} = await deleteComment(commentId)
      if (code==200) {
        // 删除成功后更新评论列表
        this.triggerEvent('updateCommentList')
      }
    },
    // 用户举报评论
    async createReport(e){
      let commentId = e.detail;
      const {code} = await createReport({type: "comments", union_id: commentId, reason: 2})
      if (code==200) {
        // 举报成功后弹出消息提示
        wx.showToast({
          title: '举报成功',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }
  }
})