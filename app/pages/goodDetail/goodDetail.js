const utilService = require('../../services/utilService');
const httpService = require('../../services/httpService');
Page({
    data: {
        book: {}
    },
    onLoad: function (options) {
        let self = this;
        httpService.request({
            url: '/book/detail/' + 'bc071f70-8a6a-11e8-98e0-9f12f9f80638' || options.id
        }).then(data => {
            self.setData({
                book: data.book
            })
        }).catch(err => {

        })
    }
})