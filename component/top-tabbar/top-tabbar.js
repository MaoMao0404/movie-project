// component/top-tabber/top-tabber.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    typeList:{
      type:Array,
      value:[]
    },
    type:{
      type:String,
      value:""
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
    checkType(e){
      this.triggerEvent('checkType',e.currentTarget.dataset.type)
    }

  }
})