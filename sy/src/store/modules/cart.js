import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    cartLists:[],
    recommendList:[]
};

const mutations = {
    getRecommendList(state, data) {
        state.recommendList = data
    }
};

const actions = {
    getCartList(context, param) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(param.url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var cartLists = data.data.cart_list;
            cartLists.forEach((item,i) => {
                // console.log(item)
                axios.get(param.baseUrl+'/index.php?r=product/detail&source=miniProgram&product_id='+item.product_id).then(res=>{
                    // console.log(res)
                    item.artName = res.data.user_info.user_nick_name;
                    item.product_type = res.data.theme_info.theme_name + '  /  ' + res.data.category_info.category_name
                })
            });
            // console.log(cartLists)
            state.cartLists = cartLists
        })
    },
    getRecommendList(context,url){
        function getData(){
            return new Promise(function(resolve,rejects){
                axios.get(url).then(res=>{
                    resolve(res)
                })
            })
        }
        getData().then(data=>{
            // console.log(data)
            context.commit('getRecommendList',data.data.recommend_list.微信小程序合作艺术家的衍生品)
        })
    }
};

export default {
    state,
    mutations,
    actions
}