const Mock = require("mockjs")
Mock.mock('http://locahost:8080/api/swiper', 'get', {
    'code': '1',
    data: {
        imgs: [
            {
                id: 1,
                imgUrl: "/static/s1.jpg"
            },
            {
                id: 2,
                imgUrl: "/static/s2.jpg"
            },
            {
                id: 3,
                imgUrl: "/static/s3.jpg"
            }
        ]
    },
    'msg': 'success'
})