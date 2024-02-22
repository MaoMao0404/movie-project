Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
      value: "",
    },
    to: {
      type: String,
    },
    scrollX: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    pathTo() {
      if (this.data.to) {
        if (this.data.replace) {
          wx.redirectTo({
            url: this.data.to
          })
        } else {
          wx.navigateTo({
            url: this.data.to
          })
        }
      }
    },
  }
})
