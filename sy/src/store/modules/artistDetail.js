import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    artistDetail: [],
    artistResume: '',
    artistExhibition: [],
    allProducts:[],
    skip:2,
    isBottom: false,
    busy: false,
    isHasProduct:false
};

const mutations = {
    artistDetails(state, data) {
        state.artistDetail = data;
        state.allIP  = data.product_list;
        state.curPage = data.pages.curPage;
        state.totalPage = data.pages.totalPage;
    },
    loadAllIPMore(state, data) {
        state.skip += 1
        state.allProducts = state.allProducts.concat(data.product_list)
        state.curPage = data.pages.curPage;
        state.totalPage = data.pages.totalPage;
    }
};

const actions = {
    getArtistDetail(context, url) {
        // state.allProducts = []
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var aaa = data.data.artist_detail.artist_resume;
            // var groupExhibition = data.data.artist_info.artist_group_exhibition;
            // var soloExhibition = data.data.artist_info.artist_solo_exhibition;
            // var exhibitionTexts = [];
            // // 艺术家介绍
            if (aaa) {
                var resume = aaa.split("\n");
            } else {
                var resume = ''
            }
            if(data.data.product_list.length!=0){
                state.allProducts = data.data.product_list;
                state.isHasProduct = true;
            }else{
                state.isHasProduct = false;
            }
            
            state.artistResume = resume
            context.commit('artistDetails', data.data)
            // if (soloExhibition) {
            //     var soloEx = soloExhibition.split("\n");
            // } else {
            //     var soloEx = ''
            // }

            // for (var i = 0; i < groupEx.length; i++) {
            //     exhibitionTexts.push(groupEx[i]);
            // }
            // for (var i = 0; i < soloEx.length; i++) {
            //     exhibitionTexts.push(soloEx[i]);
            // }
            // state.artistResume = resume
            // state.artistExhibition = exhibitionTexts
            
        })
    },
    loadAllIPMore(context, url) {
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
            // console.log(state.busy)
        } else if (state.curPage < state.totalPage) {
            getData().then(data => {
                context.commit('loadAllIPMore', data.data)
                // console.log(data)
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