const httpService = require('./httpService');
module.exports = {
    // 查询书籍列表
    getBookList: function (data) {
        return httpService.request({
            url: '/book/list',
            data: {
                page: data.page,
                pageSize: data.pageSize,
                age: data.age
            }
        })
    }
}