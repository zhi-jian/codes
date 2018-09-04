import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    loginInfo:[]
};

const mutations = {
    loginInfo(state,data){
        state.loginInfo  = data;
    }
};

const actions = {
    getLoginInfo(context, params) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.post(params.baseUrl+'index.php?r=user/login',{
                    "user_name": params.name,
                    "user_pwd": params.pwd,
                    "tel_cod":''
                }).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            // context.commit('loginInfo', data.data)
        })
    }
};

export default {
    state,
    mutations,
    actions
}