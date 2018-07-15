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
    }
}