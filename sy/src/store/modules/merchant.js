import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    merchantList:[]
};

const mutations = {
    merchantList(state, data) {
        state.merchantList = data;
    }
};

const actions = {
    getMerchantList(context, url) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            context.commit('merchantList', data.data)
        })
    }
};

export default {
    state,
    mutations,
    actions
}