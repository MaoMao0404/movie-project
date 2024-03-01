// pages/movie/detail/components/halfPage-brief/halfPage-brief.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isBriefShow:{
      type:Boolean,
      value:false
    },
    movie:{
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
    closeBrief(){
      this.triggerEvent('closeBrief')
    }
  }
})