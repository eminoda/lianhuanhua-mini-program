//index.js
//获取应用实例
const app = getApp()
const utilService = require('../../services/utilService');
const httpService = require('../../services/httpService');
Page({
    data: {
        banner: {
            imgUrls: [
                '/assets/images/pages/138-1.jpg',
                '/assets/images/pages/139-1.jpg',
                '/assets/images/pages/141-1.jpg'
            ],
            indicatorColor: 'rgba(255,255,255,0.5)',
            indicatorActiveColor: '#fff',
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
        },
        category: {
            // 年代
            age: {
                grids: [{
                    text: '民国',
                    type: 1,
                    image: '../../assets/images/pages/index/1949.png',
                    ageType: '民国'
                }, {
                    text: '50-59年',
                    type: 2,
                    image: '../../assets/images/pages/index/50.png',
                    ageType: '59'
                }, {
                    text: '60-66年',
                    type: 3,
                    image: '../../assets/images/pages/index/60.png',
                    ageType: '66'
                }, {
                    text: '文革(67-76)',
                    type: 4,
                    image: '../../assets/images/pages/index/1967.png',
                    ageType: '76'
                }, {
                    text: '77-79年',
                    type: 5,
                    image: '../../assets/images/pages/index/70.png',
                    ageType: '79'
                }, {
                    text: '80-89年',
                    type: 6,
                    image: '../../assets/images/pages/index/80.png',
                    ageType: '89'
                }, {
                    text: '90-99年',
                    type: 7,
                    image: '../../assets/images/pages/index/90.png',
                    ageType: '99'
                }, {
                    text: '现代',
                    type: 8,
                    image: '../../assets/images/pages/index/2000.png',
                    ageType: '20'
                }]
            },
            // 题材
            theme: {}
        }
    },
    onShow: function () {

    },
    test: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 3000
        });
    }
})