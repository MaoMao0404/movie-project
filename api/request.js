
const baseUrl = 'https://h5-api.ixook.com'

export default {
  get(url, data) {
    return request(url, data)
  },

  post(url, data) {
    return request(url, data, 'POST')
  },

  put(url, data) {
    return request(url, data, 'PUT')
  },

  delete(url, data) {
    return request(url, data, 'DELETE')
  },

}


function request(url, data = {}, method = 'GET') {
  let header = {}

  try {
    let token = wx.getStorageSync('token')

    if (token) {
      header = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  } catch (e) {

  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data,
      method,
      header,
      success: res => {

        if (res.statusCode === 401) {
          wx.showToast({
            title: res.message,
            icon:'none',
            duration:2000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/account/login/login"
            })
          }, 2000)
        }

        if (res.statusCode === 200) {

          if (res.data.code >= 400&&res.data.code!==404) {
            wx.showToast({
              title: '目前无法操作，请耐心等待',
              icon: 'none',
              duration: 2000
            })
          }

          resolve(res.data)
        }

        resolve({
          code: res.statusCode,
          message: res.data.message,
          data: {}
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}