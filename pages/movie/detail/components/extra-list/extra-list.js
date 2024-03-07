// pages/movie/detail/components/extra-list/extra-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
      required: true,
    },
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
    pathTo(e) {
      const type = e.currentTarget.dataset.type;
      const id = this.data.movie.id;
      const count = e.currentTarget.dataset.count
      if (count==0) {
        wx.showToast({
          title: '暂无更多数据',
          icon:'none',
          duration:2000
        })
        return
      }
      wx.navigateTo({
        url: `/pages/movie/${type}/${type}?id=${id}`
      })
    }
  }
})