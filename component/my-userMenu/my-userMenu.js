// component/my-userMenu/my-userMenu.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isLogin:{
      type:Boolean,
      value:false
    },
    count:{
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
    pathTo(e){
      console.log(e);
      const to = e.currentTarget.dataset.to
      wx.navigateTo({
        url: `/pages/my/${to}/${to}`,
      })
    }
  }
})