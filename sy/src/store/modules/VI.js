import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    VILists: [],
    skip: 2,
    curPage: '',
    totalPage: '',
    isBottom: false,
    busy: false,
    VIShow:1
};

const mutations = {
    getVIList(state, data) {
        state.VILists = data.vi.data;
        state.curPage = data.vi.pages.curPage;
        state.totalPage = data.vi.pages.totalPage;
    },
    loadVIMore(state, data) {
        state.skip += 1
        state.VILists = state.VILists.concat(data.vi.data)
        state.curPage = data.vi.pages.curPage;
        state.totalPage = data.vi.pages.totalPage;
    }
};

const actions = {
    getVIList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url+'&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            if(data.data.vi.data){
                state.VIShow=2
            }
            context.commit('getVIList', data.data)
        })
    },
    loadVIMore(context, url) {
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
                context.commit('loadVIMore', data.data)
                // console.log(data.data)
                state.busy = false
            })
        }
    },
};

export default {
    state,
    mutations,
    actions
}