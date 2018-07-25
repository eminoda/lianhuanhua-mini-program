const logger = require('../../../services/loggerService');
const utilService = require('../../../services/utilService');
const collectorService = require('../../../services/collectorService');
Page({
    data: {
        id: '',
        telephone: ''
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },
    inputTyping: function (e) {
        this.setData({
            telephone: e.detail.value
        });
    },
    bind: function () {
        if (!this.data.telephone) {
            utilService.showToast('请输入手机号');
        } else {
            collectorService.bindTelephone.call(this, this.data.id, this.data.telephone).then(data => {
                utilService.toPage({
                    url: '/pages/index/index'
                }, true);
            }).catch(err => {
                utilService.showToast(err);
            })
        }
    }
})