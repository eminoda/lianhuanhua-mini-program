const httpService = require('./httpService');
module.exports = {
    // 查询书籍列表
    queryCollectorByNickName: function (data) {
        return httpService.request({
            url: '/collector/list',
            method: 'POST',
            data: {}
        })
    }
}