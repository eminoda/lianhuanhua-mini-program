const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
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
            province: "Shanghai"
        }
    },
    // 每次加载用户信息
    onLoad: function () {
        // 查看是否授权
        utilService.getSetting.call(this).then(data => {
            // 已授权
            if (data && data.authSetting && data.authSetting['scope.userInfo']) {
                this.setData({
                    isAuth: true,
                    userInfo: utilService.getStorage('userInfo')
                });
                this.toIndex();
            }
        }).catch(err => {
            utilService.showToast(err);
        })
    },
    //获取用户信息，并存入本地缓存
    bindGetUserInfo: function (e) {
        let userInfo = e.detail.userInfo;
        // 用户授权
        if (userInfo) {
            this.setData({
                isAuth: true,
                userInfo: userInfo
            });
            utilService.saveStorage('userInfo', userInfo);
            // 查询是否有该微信用户
            collectorService.getCollectorByNickName.call(this, userInfo.nickName).then(data => {
                let collector = data.data.collector;
                utilService.saveStorage('userInfo', collector);
                if (!collector) {
                    collectorService.addWebcatUser.call(this, userInfo).then(data => {
                        let collector = data.data.collector;
                        utilService.saveStorage('userInfo', collector);
                        // 手机未绑定
                        utilService.toPage({
                            url: '/pages/user/bindPhone/bindPhone?id=' + collector.id
                        });
                    }).catch(err => {
                        this.toIndex();
                    })
                } else if (collector && !collector.telephone) {
                    utilService.toPage({
                        url: '/pages/user/bindPhone/bindPhone?id=' + collector.id
                    });
                } else {
                    this.toIndex();
                }
            }).catch(err => {
                this.toIndex();
            })
        } else {
            this.toIndex();
        }
    },
    toIndex: function () {
        utilService.toPage({
            url: '/pages/index/index'
        }, true);
    }
})