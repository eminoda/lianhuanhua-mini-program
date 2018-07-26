const logger = require('../../../services/loggerService');
const utilService = require('../../../services/utilService');
const bookService = require('../../../services/bookService');
Page({
    data: {
        imagePaths: [],
        name: '',
        desc: '',
        id: ''
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },
    useCamera: function () {
        utilService.chooseImage.call(this).then(data => {
            this.setData({
                imagePaths: this.data.imagePaths.concat(data)
            })
        }).catch(err => {
            utilService.showToast(err);
        })
    },
    preViewImages: function (e) {
        let index = e.currentTarget.dataset.index;
        wx.previewImage({
            current: index, // 当前显示图片的http链接
            urls: this.data.imagePaths // 需要预览的图片http链接列表
        })
    },
    uploadFiles: function () {
        if (this.data.imagePaths.length == 0) {
            utilService.showToast('请上传图片');
        } else if (this.data.imagePaths.length > 9) {
            utilService.showToast('最多支持9张图片');
        } else {
            bookService.uploadFiles(this.data.id, this.data.imagePaths).then(data => {
                utilService.showModal({
                    content: '上传成功',
                    showCancel: false,
                    confirmText: '查看详情'
                }).then(data => {
                    wx.navigateTo({
                        url: '/pages/goodDetail/goodDetail?id=' + this.data.id
                    })
                })
            }).catch(err => {
                utilService.showToast(err);
            })
        }
    }
})