import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    addressList:[],
    skip: 2,
    curPage: '',
    totalPage: '',
    isBottom: false,
    busy: false,
    addressListShow: 1,
    isEmpty:true
};

const mutations = {
    getAddressList(state, data) {
        state.addressList = data.delivery_info;
        // state.curPage = data.pages.curPage;
        // state.totalPage = data.pages.totalPage;
    },
    loadAddressListMore(state, data) {
        // state.skip += 1
        // state.curPage = data.order_info.pages.curPage;
        // state.totalPage = data.order_info.pages.totalPage;
    }
};

const actions = {
    getAddressList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url + '&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            if (data.data.delivery_info) {
                state.addressListShow = 2
            }
            if (data.data.delivery_info.length<=0){
                state.isEmpty = false
            }else{
                state.isEmpty = true
            }
            context.commit('getAddressList', data.data)
        })
    },
    // loadAddressListMore(context, url) {
    //     // console.log(state.curPage,state.totalPage)
    //     function getData() {
    //         return new Promise(function (resolve, rejects) {
    //             if (state.curPage < state.totalPage) {
    //                 state.busy = true
    //                 axios.get(url + '&page=' + state.skip).then(res => {
    //                     resolve(res)
    //                 })
    //             } else if (state.curPage >= state.totalPage) {
    //                 state.busy = true;
    //                 state.isBottom = true;
    //             }
    //         })
    //     }
    //     if (state.curPage >= state.totalPage) {
    //         state.busy = true;
    //         state.isBottom = true
    //         state.skip = state.skip
    //     } else if (state.curPage < state.totalPage) {
    //         getData().then(data => {
    //             context.commit('loadAddressListMore', data.data)
    //             state.busy = false
    //         })
    //     }
    // }
};

export default {
    state,
    mutations,
    actions
}