import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    artistLists: [],
    artistProducts:[],
    productLength:[],
    IPLength:[]
};

const mutations = {
    getArtistList(state, data) {
        state.artistLists = data.artist_list;
        state.artistProducts = data.artist_list.products
    }
};

const actions = {
    getArtistList(context, url) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(url + '&page=1').then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var artistPro = data.data.artist_list;
            context.commit('getArtistList', data.data)
            // console.log(state.curPage,state.totalPage)
        })
        
    }
};

export default {
    state,
    mutations,
    actions
}