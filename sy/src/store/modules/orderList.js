import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    orderList: [],
    proList: [],
    skip: 2,
    curPage: '',
    totalPage: '',
    isBottom: false,
    busy: false,
    OrderListShow: 1,
    isEmpty:true
};

const mutations = {
    getOrderList(state, data) {
        state.curPage = data.order_info.pages.curPage;
        state.totalPage = data.order_info.pages.totalPage;
    },
    loadOrderListMore(state, data) {
        state.skip += 1
        state.orderList = state.orderList.concat(data.order_info.list)
        state.curPage = data.order_info.pages.curPage;
        state.totalPage = data.order_info.pages.totalPage;
    }
};

const actions = {
    getOrderList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url + '&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            if (data.data.order_info.list) {
                state.OrderListShow = 2
            }
            if(data.data.order_info.list.length<=0){
                state.isEmpty = false;
            }else{
                state.isEmpty = true;
            }
            var orderInfo = data.data.order_info.list;
            var proInfo = data.data.product_info;
            var proList = [];
            proList.push(proInfo)
            for (var i = 0; i < orderInfo.length; i++) {
                for (var j = 0; j < proInfo[orderInfo[i].order_id].length; j++) {
                    orderInfo[i].proCount = proInfo[orderInfo[i].order_id].length
                }
            }
            state.orderList = orderInfo
            state.proList = proList
            context.commit('getOrderList', data.data)
        })
    },
    loadOrderListMore(context, url) {
        // console.log(state.curPage,state.totalPage)
        function getData() {
            return new Promise(function (resolve, rejects) {
                if (state.curPage < state.totalPage) {
                    state.busy = true
                    axios.get(url + '&page=' + state.skip).then(res => {
                        resolve(res)
                    })
                } else if (state.curPage >= state.totalPage) {
                    state.busy = true;
                    state.isBottom = true;
                }
            })
        }
        if (state.curPage >= state.totalPage) {
            state.busy = true;
            state.isBottom = true
            state.skip = state.skip
        } else if (state.curPage < state.totalPage) {
            getData().then(data => {
                var orderInfo = data.data.order_info.list;
                var proInfo = data.data.product_info;
                var proList = state.proList;
                proList.push(proInfo)
                for (var i = 0; i < orderInfo.length; i++) {
                    for (var j = 0; j < proInfo[orderInfo[i].order_id].length; j++) {
                        orderInfo[i].proCount = proInfo[orderInfo[i].order_id].length
                    }
                }
                state.orderList = state.orderList.concat(orderInfo)
                state.proList = proList
                context.commit('loadOrderListMore', data.data)
                state.busy = false
            })
        }
    }
};

export default {
    state,
    mutations,
    actions
}