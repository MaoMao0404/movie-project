
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
        url: `/pages/review/review?id=${this.properties.article.id}`
      })
    }
  }
})