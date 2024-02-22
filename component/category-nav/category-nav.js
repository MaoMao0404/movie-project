// component/category-nav/category-nav.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false
    },
    // 全部分类
    categories:{
      type:Array,
      value:[]
    },
    // 国家分类
    countries:{
      type:Array,
      value:[]
    },
    // 年份分类
    years:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isActive:false,
    // 类型分类
    type:[{name:'全部'}],
    // 传参
    params:{
      category:'全部',
      genre:'全部',
      country:'全部',
      year:'全部'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checked(e){
      const type = e.target.dataset.type
      const change = e.target.dataset.change
      // 获取类型分类的值
      if(type=='category'){
        this.properties.categories.forEach(item=>{
          if (e.target.dataset.change==item.name) {
            this.setData({
              type:[{name:'全部'},...item.children]
            })
          }
        })
      }
      // 实现动态参数改变，用户点击后实现参数传值的更新
      this.setData({
        [`params.${type}`]:change
      })
      // 将该值传到页面中
      this.triggerEvent('change',this.data.params)
    }
  },
})