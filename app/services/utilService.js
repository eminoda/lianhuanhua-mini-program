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
    }
}