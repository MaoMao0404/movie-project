// component/actor-list/actor-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    actorList:{
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
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/actor/actor?id=${id}`,
      })
    }
  }
})