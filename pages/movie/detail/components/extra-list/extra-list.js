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
    //   const type = e.currentTarget.dataset.type;
    //   const id = this.data.movie.id;

    //   wx.navigateTo({
    //     url: `/pages/movie/detail/${type}/index?id=${id}`
    //   })
    }
  }
})