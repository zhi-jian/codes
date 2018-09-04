const Mock = require("mockjs")
Mock.mock('http://locahost:8080/api/navList', 'get', {
    'code': '1',
    data: {
        navLists: [
            {
                id: 1,
                name: '首页',
                url: "javascript:"
            },
            {
                id: 2,
                name: 'CCC认证',
                url: "javascript:"
            },
            {
                id: 3,
                name: '体系认证',
                url: "javascript:"
            },
            {
                id: 4,
                name: '节能认证',
                url: "javascript:"
            },
            {
                id: 5,
                name: '环保认证',
                url: "javascript:"
            },
            {
                id: 6,
                name: '自愿认证',
                url: "javascript:"
            },
            {
                id: 7,
                name: '国外认证',
                url: "javascript:"
            },
            {
                id: 8,
                name: '联系我们',
                url: "javascript:"
            },
        ]
    },
    'msg': 'success'
})