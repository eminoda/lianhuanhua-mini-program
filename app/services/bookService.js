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
    addBook: function (book) {
        return httpService.request({
            url: '/book/add',
            method: 'POST',
            data: {
                name: book.name,
                desc: book.desc
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
    },
    uploadFile: function (id, filePath) {
        return httpService.upload({
            method: 'POST',
            filePath: filePath,
            url: '/book/upload',
            formData: {
                id: id
            },
            name: 'pic'
        })
    },
    uploadFiles: function (id, filePaths) {
        let uploadArr = [];
        for (let i = 0; i < filePaths.length; i++) {
            uploadArr.push(this.uploadFile(id, filePaths[i]));
        }
        return Promise.all(uploadArr);
    }
}