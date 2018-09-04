import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    headerText:'艺术IP库',
    ficitiousLists: [],
    ficitiousList:[],
    skip: 2,
    curPage: '',
    totalPage: '',
    isBottom: false,
    busy: false,
    ficitiousListShow:1,
    isEmpty:true
};

const mutations = {
    getFicitiousList(state, data) {
        state.ficitiousLists = data;
        state.ficitiousList = data.product;
        state.curPage = data.pages.curPage;
        state.totalPage = data.pages.totalPage;
    },
    loadFicitiousMore(state, data) {
        state.skip += 1
        state.ficitiousList = state.ficitiousList.concat(data.product)
        state.curPage = data.pages.curPage;
        state.totalPage = data.pages.totalPage;
    }
};

const actions = {
    getFicitiousList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url + '&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            if(!data.data.product||data.data.product.length<=0){
                state.isEmpty = false;
                state.isBottom = false;
            }else{
                state.isEmpty = true;
                state.isBottom = true;
            }
            if(data){
                state.ficitiousListShow=2
            }
            context.commit('getFicitiousList', data.data)
            // console.log(state.curPage,state.totalPage)
        })
        
    },
    loadFicitiousMore(context, url) {
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
                if(data.data){
                    state.ficitiousListShow=2
                }
                context.commit('loadFicitiousMore', data.data)
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