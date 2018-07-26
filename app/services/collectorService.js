const httpService = require('./httpService');
module.exports = {
    addWebcatUser: function (data) {
        return httpService.request({
            url: '/collector/add',
            method: 'POST',
            data: {
                telephone: data.telephone || '',
                nickName: data.nickName || '',
                avatarUrl: data.avatarUrl || '',
                city: data.city || '',
                country: data.country || '',
                gender: data.gender || '',
                province: data.province
            }
        })
    },
    bindTelephone: function (id, telephone) {
        return httpService.request({
            url: '/collector/bind/' + id,
            method: 'POST',
            data: {
                telephone: telephone
            }
        })
    },
    getCollectorById: function (id) {
        return httpService.request({
            url: '/collector/' + id,
            method: 'GET'
        })
    },
    getCollectorByNickName: function (nickName) {
        return httpService.request({
            url: '/collector/webcat/' + nickName,
            method: 'GET'
        })
    },
    getCollectorList: function (data) {
        return httpService.request({
            url: '/collector/list',
            data: {
                page: data.page,
                pageSize: data.pageSize
            }
        })
    },
    updateAdminById: function (id, isAdmin) {
        return httpService.request({
            method: 'POST',
            url: '/collector/auth/' + id,
            data: {
                isAdmin: isAdmin
            }
        })
    },
}