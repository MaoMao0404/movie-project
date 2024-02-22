// component/video-item/video-item.js
import { timeFormat } from "../../utils/util";
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    video:{
      type:Object,
      value:{}
    },
    videoId:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 视频播放时间
    time:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doPlay(e){
      const videoId = e.currentTarget.dataset.id
      this.triggerEvent('videoPlay',videoId)
    }
  },
  lifetimes:{
    attached(){
      const time = timeFormat(this.properties.video.duration)
      this.setData({
        time:time
      })
    }
  }
})