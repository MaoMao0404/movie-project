// component/movie-list/movie-list.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    movieList:{
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
      const title = e.currentTarget.dataset.title
      this.triggerEvent('addHistory',title)
      wx.navigateTo({
        url: `/pages/movie/detail/detail?id=${id}`
      })
    }
  }
})