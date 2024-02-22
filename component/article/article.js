
Component({
  options: {
    virtualHost: true,
    styleIsolation: 'isolated'
  },

  properties: {
    article: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathTo() {
      wx.navigateTo({
        // url: `/pages/article/detail/index?id=${this.data.article.id}`
      })
    }
  }
})