const logger = require('../../../services/loggerService');
const utilService = require('../../../services/utilService');
const bookService = require('../../../services/bookService');
Page({
    data: {
        name: '',
        desc: '',
    },
    inputName: function (e) {
        this.setData({
            name: e.detail.value
        });
    },
    inputDesc: function (e) {
        this.setData({
            desc: e.detail.value
        });
    },
    addBook: function (e) {
        if (!this.data.name) {
            utilService.showToast('请输入标题');
        } else if (!this.data.desc) {
            utilService.showToast('请输入内容');
        } else {
            bookService.addBook.call(this, {
                name: this.data.name,
                desc: this.data.desc
            }).then(data => {
                let book = data.data;
                utilService.toPage({
                    url: '/pages/management/upload/upload?id=' + book.id
                });
            }).catch(err => {
                utilService.showToast(err);
            })
        }

    }
})