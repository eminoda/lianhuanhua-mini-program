const logger = require('../../../services/loggerService');
const utilService = require('../../../services/utilService');
const collectorService = require('../../../services/collectorService');
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        collectors: [],
        loadmore: true,
        page: 1,
        pageSize: 20
    },
    onShow: function () {
        this.onPullDownRefresh();
    },
    queryCollects: function () {
        return collectorService.getCollectorList.call(this, {
            page: this.data.page,
            pageSize: this.data.pageSize
        })
    },
    updateAdmin: (e) => {
        let collector = e.currentTarget.dataset.collector;
        collector.isAdmin = collector.isAdmin ? 0 : 1;
        collectorService.updateAdminById.call(this, collector.id, collector.isAdmin).then(data => {
            utilService.showToast('更新成功，请刷新');
        }).catch(err => {
            utilService.showToast(err);
        })
    },
    onPullDownRefresh: function () {
        this.queryCollects().then(data => {
            wx.stopPullDownRefresh();
            let collectors = data.data.list;
            this.setData({
                collectors: collectors
            })
            if (collectors && collectors.length == 0) {
                utilService.showToast('无查询数据，请更换查询关键词');
            } else {
                this.data.page = this.data.page + 1;
                this.collectors = collectors
                this.setData({
                    books: this.collectors
                })
                // 无数据
                if (collectors.length == 0 || this.collectors.length < this.data.page * this.data.pageSize) {
                    this.setData({
                        loadmore: false
                    })
                }
            }
        }).catch(err => {
            logger.info(err);
        })
    }
})