// pages/movie/detail/components/picture-list/picture-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    picture:{
      type:Object,
      required: true
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
    priview(e){
      let url = e.currentTarget.dataset.url
      wx.previewImage({
        urls: [url],
      })
    }
  }
})