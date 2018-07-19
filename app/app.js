const logger = require('./services/loggerService');
App({
  // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    console.log('onLaunch');
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        logger.info(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        logger.info(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function () {
    console.log('onLaunch');
  },
  // 当小程序从前台进入后台，会触发 onHide
  onHide: function () {
    console.log('onHide');
  },
  // onError
  onError: function () {
    console.log('onError');
  },
  // onPageNotFound
  onPageNotFound: function () {
    console.log('onPageNotFound');
  },
  globalData: {
    userInfo: null
  }
})