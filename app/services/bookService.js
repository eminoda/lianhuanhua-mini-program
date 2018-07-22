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
    },
    queryBookListByName: function (data) {
        return httpService.request({
            url: '/book/vagueList',
            data: {
                page: data.page,
                pageSize: data.pageSize,
                name: data.name,
                isSelled: data.isSelled
            }
        })
    },
    queryAllBookListByName: function (data) {
        return httpService.request({
            url: '/book/allListByName',
            data: {
                page: data.page,
                pageSize: data.pageSize,
                name: data.name
            }
        })
    },
    getBookDetailById: function (id) {
        return httpService.request({
            url: '/book/detail/' + id
        })
    },
    deleteBookById: function (id) {
        return httpService.request({
            method: 'POST',
            url: '/book/delete',
            data: {
                id: id
            }
        })
    },
    recoverBookById: function (id) {
        return httpService.request({
            method: 'POST',
            url: '/book/recover',
            data: {
                id: id
            }
        })
    }
}