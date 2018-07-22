const logger = require('./services/loggerService');
const utilService = require('./services/utilService');
App({
    // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch: function () {
        console.log('app onLaunch');
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

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
    }
})