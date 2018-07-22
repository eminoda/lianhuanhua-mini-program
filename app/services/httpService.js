module.exports = {
    request: function (options) {
        return new Promise(function (resolve, reject) {
            wx.request({
                // url: 'https://www.shidouhua.cn' + options.url,
                url: 'http://127.0.0.1:3000' + options.url,
                data: options.data,
                header: options.header || {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: options.method || 'GET',
                dataType: options.dataType || 'json',
                responseType: options.responseType,
                success: function (resp) {
                    if (resp.statusCode !== 200) {
                        if (resp.statusCode == 404) {
                            reject('访问资源不存在');
                        } else {
                            reject('服务器错误，请稍后再试');
                        }
                    } else {
                        if (resp.data.success) {
                            resolve(resp.data);
                        } else {
                            reject(resp.data);
                        }
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