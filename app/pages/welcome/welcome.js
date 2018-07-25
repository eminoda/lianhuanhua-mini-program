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
        let self = this;
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
        let self = this;
        // 用户授权
        if (e.detail.userInfo) {
            this.setData({
                isAuth: true,
                userInfo: e.detail.userInfo
            });
            utilService.saveStorage('userInfo', this.data.userInfo);
            // 查询是否有该微信用户
            collectorService.getCollectorByNickName.call(this, this.data.userInfo.nickName).then(data => {
                let userInfo = data.data;
                utilService.saveStorage('userInfo', userInfo);
                if (!userInfo) {
                    collectorService.addWebcatUser.call(this, this.data.userInfo).then(data => {
                        let userInfo = data.data;
                        utilService.saveStorage('userInfo', userInfo);
                        // 手机未绑定
                        utilService.toPage({
                            url: '/pages/user/bindPhone/bindPhone?id=' + userInfo.id
                        });
                    }).catch(err => {
                        this.toIndex();
                    })
                } else if (userInfo && !userInfo.telephone) {
                    utilService.toPage({
                        url: '/pages/user/bindPhone/bindPhone?id=' + userInfo.id
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