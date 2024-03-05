// component/home-menu/home-menu.js
Component({
  options: {
   styleIsolation:'isolated'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pathTo(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  }
})