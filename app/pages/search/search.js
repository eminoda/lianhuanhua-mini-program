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
        pageSize: 10
    },
    // 监听输入
    inputTyping: function(e) {
        this.setData({
            inputVal: e.detail.value,
            books: []
        });
    },
    // 清空输入
    clearInput: function() {
        this.setData({
            inputVal: ""
        });
    },
    search: function() {
        bookService.queryBookListByName.call(this, {
            name: this.data.inputVal,
            page: this.data.page,
            pageSize: this.data.pageSize
        }).then(data => {
            this.data.page = this.data.page + 1;
            this.data.books = this.data.books.concat(data.books);
            this.setData({
                books: this.data.books
            })
            // 无数据
            if (data.books.length == 0) {
                this.setData({
                    loadmore: false
                })
            }
            logger.info(data);
        }).catch(err => {
            logger.info(err);
        })
    },
    showInput: function() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    // 上拉
    onReachBottom: function() {
        if (!this.data.loadmore) return;
        this.search();
    },
});