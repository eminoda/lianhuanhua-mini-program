module.exports = {
    request: function (options) {
        return wx.request({
            url: 'http://127.0.0.1:3000' + options.url,
            data: options.data,
            header: options.header,
            method: options.method || 'GET',
            dataType: options.dataType || 'json',
            responseType: options.responseType,
            success: options.success,
            fail: options.fail,
            complete: options.complete
        })
    }
}