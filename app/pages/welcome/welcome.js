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
    onLoad: function () {
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    this.data.isAuth = true;
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    // wx.getUserInfo({
                    //     success: function (res) {
                    //         console.log(res.userInfo)
                    //     }
                    // })
                }
            }
        })
    },
    // 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致
    bindGetUserInfo: function (e) {

        console.log(e.detail.userInfo)
    }
})