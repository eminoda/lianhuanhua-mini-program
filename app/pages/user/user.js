const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
const collectorService = require('../../services/collectorService');
Page({
    data: {
        isAuth: false,
        userInfo: {
            id: '',
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
        // 查看授权状态
        utilService.getSetting.call(this).then(data => {
            // 已授权
            if (data.authSetting['scope.userInfo']) {
                this.setData({
                    isAuth: true
                });
                let userInfo = utilService.getStorage('userInfo');
                // 是 收藏家
                if (userInfo.id) {
                    // 获取最新收藏家信息，是否绑定手机？
                    collectorService.getCollectorById.call(this, userInfo.id).then(data => {
                        this.setData({
                            userInfo: data.data.collector
                        });
                    }).catch(err => {})
                }

            }
        })
    },
    //获取用户信息，并存入本地缓存
    bindGetUserInfo: function (e) {
        let userInfo = e.detail.userInfo;
        if (userInfo) {
            this.setData({
                isAuth: true,
                userInfo: userInfo
            });
            utilService.saveStorage('userInfo', userInfo);
            collectorService.getCollectorByNickName.call(this, userInfo.nickName).then(data => {
                let collector = data.data.collector;
                if (!collector) {
                    collectorService.addWebcatUser.call(this, userInfo).then(data => {
                        let userInfo = data.data.collector;
                        this.setData({
                            userInfo: userInfo
                        })
                        utilService.saveStorage('userInfo', userInfo);
                    }).catch(err => {})
                } else {
                    this.setData({
                        userInfo: collector
                    })
                    utilService.saveStorage('userInfo', collector);
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