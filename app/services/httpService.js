module.exports = {
    request: function (options) {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: 'http://127.0.0.1:3000' + options.url,
                data: options.data,
                header: options.header,
                method: options.method || 'GET',
                dataType: options.dataType || 'json',
                responseType: options.responseType,
                success: function (resp) {
                    let data = resp.data;
                    if (data.success) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                fail: function (resp) {
                    reject(resp.data);
                },
                complete: options.complete
            })
        })
    }
}