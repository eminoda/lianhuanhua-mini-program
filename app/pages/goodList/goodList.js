const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
Page({
    data: {
        books: [],
        page: 1,
        pageSize: 10,
        loadmore: true,
        age: '民国',
    },
    onLoad: function (options) {
        this.setData({
            age: options.age || this.data.age
        })
        this.onReachBottom();
    },
    onShow: function () {},
    // 上拉
    onReachBottom: function () {
        if (!this.data.loadmore) return;
        bookService.getBookList.call(this, this.data).then(data => {
            this.data.page = this.data.page + 1;
            this.data.books = this.data.books.concat(data.books);
            // 无数据
            if (data.books.length == 0) {
                this.setData({
                    loadmore: false
                })
            }
            this.setData({
                books: this.data.books
            })
        }).catch(err => {})
    },
    // 查询书本详情
    toDetail: function (e) {
        utilService.toPage({
            url: '../goodDetail/goodDetail?id=' + e.currentTarget.dataset.id
        });
    },
})