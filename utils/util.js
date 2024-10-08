// 时间戳转换标准时间
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 将秒转换为 时：分：秒
export const timeFormat = second =>{
    let secondTime = parseInt(second);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60)
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    let result = secondTime > 9 ? secondTime : ('0' + secondTime);
    if (minuteTime > 0) {
      result = (minuteTime > 9 ? minuteTime : ('0' + minuteTime)) + ":" + result;
    } else {
      result = "00" + ":" + result;
    }
    if (hourTime > 0) {
      result = (hourTime > 9 ? hourTime : ('0' + hourTime)) + ":" + result;
    }
    return result;
}

