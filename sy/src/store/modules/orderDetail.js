import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    orderList:[],
    productList:[],
    commonList:[],
    oid:''
};

const mutations = {
    getOrderDetail(state, data) {
        // state.orderList = data.order_info.list;
        state.productList = data.product_info;
        state.commonList = data.common_info;
    }
};

const actions = {
    getOrderDetail(context, params) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(params.url+'&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var orderInfo = data.data.order_info.list;
            var proInfo = data.data.product_info;
            var commonInfo = data.data.common_info;
            var commonDetail=[];
            var orderList=[],proList=[];
            for(var i=0;i<orderInfo.length;i++){
                for(var j=0;j<proInfo[orderInfo[i].order_id].length;j++){
                    orderInfo[i].proCount = proInfo[orderInfo[i].order_id].length
                }
            }
            state.orderList = orderInfo
            // console.log(orderInfo)
            context.commit('getOrderDetail', data.data)
        })
    }
};

export default {
    state,
    mutations,
    actions
}