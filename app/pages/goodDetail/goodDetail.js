const utilService = require('../../services/utilService');
const httpService = require('../../services/httpService');
Page({
    data: {
        book: {}
    },
    onLoad: function (options) {
        let self = this;
        httpService.request({
            url: '/book/detail/' + options.id
        }).then(data => {
            self.setData({
                book: data.book
            })
        }).catch(err => {

        })
    }
})