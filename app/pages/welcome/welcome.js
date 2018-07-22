const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
Page({
    data: {
        isAuth: false,
        userInfo: {
            avatarUrl: '../../assets/images/icons/webcat-logo.png',
            city: '',
            country: '',
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
        } else {}
        this.toIndex();
    },
    toIndex: function () {
        utilService.toPage({
            url: '/pages/index/index'
        }, true);
    }
})