// component/return-top/return-top.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:true
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
    returnTop(e){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})