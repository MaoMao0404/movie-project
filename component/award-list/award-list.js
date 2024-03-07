// component/award-list/award-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    awardsList:{
      type:Array,
      value:[]
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
    pathTo(e){
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: `/pages/award/award?name=${name}`
      })
    }
  }
})