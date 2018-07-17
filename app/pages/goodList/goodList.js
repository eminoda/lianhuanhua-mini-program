const utilService = require('../../services/utilService');
const httpService = require('../../services/httpService');
Page({
    data: {
        books: []
    },
    onLoad: function (options) {
        let self = this;
        httpService.request({
            url: '/book/list?age=' + options.age,
            success: function (data) {
                console.log(data);
                self.setData({
                    books: data.data.data
                })
            },
            fail: function (data) {
                console.log(data);
            }
        })
    },
    onShow: function () {
        console.log(getCurrentPages())
    }
})