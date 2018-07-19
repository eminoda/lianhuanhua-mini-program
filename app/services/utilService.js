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
    }
}