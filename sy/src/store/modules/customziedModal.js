import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    customziedShow:false
};

const mutations = {
    changecustomziedModal(state,data){
        state.customziedShow = data;
    }
};

const actions = {
};

export default {
    state,
    mutations,
    actions
}