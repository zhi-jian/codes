import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    outfitDetails:[]
};

const mutations = {
    outfitDetails(state, data) {
        state.outfitDetails = data;
    }
};

const actions = {
    getOutfitDetail(context, url) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(url).then(res => {
                    resolve(res)
                }) 
            })
        }
        getData().then(data => {
            // console.log(data)
            context.commit('outfitDetails', data.data.outfit)
        })
    }
};

export default {
    state,
    mutations,
    actions
}