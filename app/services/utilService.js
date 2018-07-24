// const logger = require('./loggerService');
const qs = require('../libs/qs');
module.exports = {
    // 非 tabBar
    toPage: function (page, isTab) {
        if (isTab) {
            wx.switchTab(page);
            return;
        }
        wx.navigateTo(page);
    },
    backPage: function () {
        wx.navigateBack();
    },
    qsStringify: function (data) {
        return qs.stringify(data)
    },
    qsParse: (data) => {
        return qs.parse(data, {
            ignoreQueryPrefix: true
        })
    },
    showToast: (options) => {
        wx.showToast({
            title: typeof (options) == 'string' ? options : options.title || options.data || options.message || options.err,
            icon: options.icon || 'none',
            image: options.image,
            duration: options.duration || 1500,
            mask: options.mask,
            success: options.success,
            fail: options.fail,
            complete: options.complete
        })
    },
    // async 同步
    saveStorage(key, data, async) {
        if (!async) {
            wx.setStorageSync(key, data);
        } else {
            wx.setStorage({
                key: key,
                data: data
            });
        }
    },
    // async 同步
    getStorage(key, async) {
        if (!async) {
            return wx.getStorageSync(key);
        } else {
            return wx.getStorage(key);
        }
    },
    getSetting() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(reject);
                }
            })
        });
    },
    chooseImage: function () {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // res.tempFiles.path/tempFiles.size
                    resolve(res.tempFilePaths);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        })
    },
    showModal: function (options) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: options.title || '标题',
                content: options.content || '',
                confirmText: options.confirmText || '确定',
                cancelText: options.cancelText || '取消',
                showCancel: options.showCancel,
                success: function (res) {
                    if (res.confirm) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }
            });
        })
    }
}