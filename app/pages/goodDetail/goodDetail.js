const utilService = require('../../services/utilService');
const bookService = require('../../services/bookService');
Page({
    data: {
        book: {}
    },
    onLoad: function (options) {
        bookService.getBookDetailById.call(this, options.id).then(data => {
            this.setData({
                book: data.book
            })
        }).catch(err => {
            utilService.showToast(err);
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '我在“上海旧书摊”发现了《' + this.data.book.name + '》',
            path: '/pages/goodDetail/goodDetail?id=' + this.data.book.id,
            imageUrl: this.data.book.imageUrl
        }
    }
})