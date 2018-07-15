//index.js
//获取应用实例
const app = getApp()
const utilService = require('../../services/utilService');

Page({
  data: {
    banner: {
      imgUrls: [
        '/assets/images/pages/138-1.jpg',
        '/assets/images/pages/139-1.jpg',
        '/assets/images/pages/141-1.jpg'
      ],
      indicatorColor: 'rgba(255,255,255,0.5)',
      indicatorActiveColor: '#fff',
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    category: {
      // 年代
      age: {
        grids: [{
          text: '民国',
          type: 1,
          image: '../../assets/images/pages/index/1949.png'
        }, {
          text: '50-59年',
          type: 2,
          image: '../../assets/images/pages/index/50.png'
        }, {
          text: '60-66年',
          type: 3,
          image: '../../assets/images/pages/index/60.png'
        }, {
          text: '文革(67-76)',
          type: 4,
          image: '../../assets/images/pages/index/1967.png'
        }, {
          text: '77-79年',
          type: 5,
          image: '../../assets/images/pages/index/70.png'
        }, {
          text: '80-89年',
          type: 6,
          image: '../../assets/images/pages/index/80.png'
        }, {
          text: '90-99年',
          type: 7,
          image: '../../assets/images/pages/index/90.png'
        }, {
          text: '现代',
          type: 8,
          image: '../../assets/images/pages/index/2000.png'
        }]
      },
      // 题材
      theme: {}

    }
  }
})
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     utilService.toPage({
//       url: '../logs/logs'
//     });
//     // wx.navigateTo({
//     //   url: '../logs/logs'
//     // })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function (e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })