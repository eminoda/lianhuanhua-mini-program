const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
const collectorService = require('../../services/collectorService');
Page({
    data: {
        isAuth: false,
        userInfo: {
            avatarUrl: '../../assets/images/icons/webcat-logo.png',
            city: '',
            country: '',
            telephone: '',
            gender: 1,
            language: "zh_CN",
            nickName: "访客",
            province: "Shanghai",
            isAdmin: false
        }
    },
    onShow: function () {
        utilService.getSetting.call(this).then(data => {
            // 已授权
            if (data.authSetting['scope.userInfo']) {
                let userInfo = utilService.getStorage('userInfo');
                this.setData({
                    userInfo: userInfo,
                    isAuth: true
                })

            }
        })
    },
    //获取用户信息，并存入本地缓存
    bindGetUserInfo: function (e) {
        let self = this;
        let userInfo = e.detail.userInfo;
        if (userInfo) {
            this.setData({
                isAuth: true,
                userInfo: userInfo
            });
            utilService.saveStorage('userInfo', userInfo);
            collectorService.getCollectorByNickName.call(this, userInfo.nickName).then(data => {
                let userInfo = data.data;
                this.setData({
                    userInfo: userInfo
                })
                utilService.saveStorage('userInfo', userInfo);
                if (!userInfo) {
                    collectorService.addWebcatUser.call(this, userInfo).then(data => {
                        let userInfo = data.data;
                        this.setData({
                            userInfo: userInfo
                        })
                        utilService.saveStorage('userInfo', userInfo);
                    }).catch(err => {})
                }
            }).catch(err => {})
        }
    },
    about: () => {
        wx.showModal({
            title: '关于旧书摊',
            content: '诚信为本,广交天下连环画书友，传承历史文化。',
            confirmText: "确定",
            success: function (res) {
                console.log(res);
                if (res.confirm) {} else {}
            }
        });
    },
    conact: () => {
        wx.makePhoneCall({
            phoneNumber: '15201833035'
        })
    },
    share: () => {
        wx.showShareMenu({})
    },
    webcat: () => {
        utilService.toPage({
            url: '../user/webcat/webcat'
        });
    },
    develop: () => {
        utilService.toPage({
            url: '../user/develop/develop'
        });
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '关注上海旧书摊，感受连环画的魅力',
            path: '/pages/index/index'
        }
    }
})