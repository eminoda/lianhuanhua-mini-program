// const logger = require('./loggerService');
const qs = require('../libs/qs');
module.exports = {
    // 非 tabBar
    toPage: function (page, force) {
        if (force) {
            wx.redirectTo(page);
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
            title: typeof (options) == 'string' ? options : options.title || options.data || options.message,
            icon: options.icon || 'none',
            image: options.image,
            duration: options.duration || 1500,
            mask: options.mask,
            success: options.success,
            fail: options.fail,
            complete: options.complete
        })
    }
}