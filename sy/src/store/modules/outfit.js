import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    outfits:[],
    outfitLists: [],
    skip: 2,
    curPage: '',
    totalPage: '',
    isBottom: false,
    busy: false,
    outfitShow:1,
    isEmpty:true
};

const mutations = {
    getOutfitList(state, data) {
        state.outfits = data.outfit;
        state.outfitLists = data.outfit.data;
        state.curPage = data.outfit.pages.curPage;
        state.totalPage = data.outfit.pages.totalPage;
    },
    loadOutfitMore(state, data) {
        state.skip += 1
        state.outfitLists = state.outfitLists.concat(data.outfit.data)
        state.curPage = data.outfit.pages.curPage;
        state.totalPage = data.outfit.pages.totalPage;
    }
};

const actions = {
    getOutfitList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url+'&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            if(!data.data.outfit.data||data.data.outfit.data.length<=0){
                state.isEmpty = false;
                state.isBottom = false;
            }else{
                state.isEmpty = true;
                state.isBottom = true;
            }
            if(data.data.outfit.data){
                state.outfitShow=2
            }
            context.commit('getOutfitList', data.data)
        })
    },
    loadOutfitMore(context, url) {
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
                context.commit('loadOutfitMore', data.data)
                // console.log(data.data)
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