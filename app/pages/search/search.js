const logger = require('../../services/loggerService');
const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        books: [],
        loadmore: true,
        page: 1,
        pageSize: 20
    },
    // 监听输入
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            books: []
        });
    },
    // 清空输入
    clearInput: function () {
        this.setData({
            inputVal: "",
            loadmore: true
        });
    },
    search: function () {
        this.setData({
            books: [],
            page: 1,
            loadmore: true
        });
        this.onReachBottom();
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    // 上拉
    onReachBottom: function () {
        if (!this.data.loadmore) return;
        bookService.queryBookListByName.call(this, {
            name: this.data.inputVal,
            page: this.data.page,
            pageSize: this.data.pageSize,
            isSelled: 0
        }).then(data => {
            if (data.books && data.books.length == 0) {
                utilService.showToast('无查询数据，请更换查询关键词');
            } else {
                this.data.page = this.data.page + 1;
                this.data.books = this.data.books.concat(data.books);
                this.setData({
                    books: this.data.books
                })
                // 无数据
                if (data.books.length == 0 || this.data.books.length < this.data.page * this.data.pageSize) {
                    this.setData({
                        loadmore: false
                    })
                }
            }
        }).catch(err => {
            utilService.showToast(err);
        })
    },
});