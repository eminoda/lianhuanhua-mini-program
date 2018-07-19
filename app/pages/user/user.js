const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
const httpService = require('../../services/httpService');
Page({
    data: {},
    onLoad: function () {},
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