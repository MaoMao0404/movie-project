// pages/search/component/search-history/search-history.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    historyList:{
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
    // 点击垃圾箱清除历史记录
    clearHistory(){
      this.triggerEvent('clearhistory')
    },
    // 点击历史记录词条，将词条填入keyword
    checkHistoryWord(e){
      this.triggerEvent('checkhistoryWord',e.target.dataset.historyword)
    }
  }
})