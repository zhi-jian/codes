import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    videoList:[]
};

const mutations = {
    videoList(state, data) {
        state.videoList = data;
    }
};

const actions = {
    getVideoList(context, url) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            context.commit('videoList', data.data.video_list)
        })
    }
};

export default {
    state,
    mutations,
    actions
}