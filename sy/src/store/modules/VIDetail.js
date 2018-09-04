import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    VIDetails:[]
};

const mutations = {
    VIDetails(state, data) {
        state.VIDetails = data;
    }
};

const actions = {
    getVIDetail(context, url) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            context.commit('VIDetails', data.data.vi)
        })
    }
};

export default {
    state,
    mutations,
    actions
}