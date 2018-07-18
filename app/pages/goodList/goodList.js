const utilService = require('../../services/utilService');
const httpService = require('../../services/httpService');
Page({
    data: {
        books: [],
        page: 1,
        age: ''
    },
    toDetail: function (e) {
        utilService.toPage({
            url: '../goodDetail/goodDetail?id=' + e.currentTarget.dataset.id
        });
    },
    onLoad: function (options) {
        this.setData({
            age: options.age
        })
        let self = this;
        httpService.request({
            url: '/book/list?age=' + options.age
        }).then(data => {
            self.setData({
                books: data.books
            })
        }).catch(err => {

        })
    },
    onShow: function () {},
    onReachBottom: function () {
        this.data.page = this.data.page + 1;
        let self = this;
        httpService.request({
            url: '/book/list?age=' + self.data.age + '&page=' + self.data.page
        }).then(data => {
            self.data.books = self.data.books.concat(data.books);
            self.setData({
                books: self.data.books
            })
        }).catch(err => {

        })
    }
})