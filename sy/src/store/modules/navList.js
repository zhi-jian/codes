import Vue from 'vue';
import VueResource from 'vue-resource'
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(VueResource);
const state = {
    navLists: []
};

const mutations = {
    getNavList(state, data) {
        state.navLists = data;
    }
};

const actions = {
    getNavLists(context) {

        
    }
};

export default {
    state,
    mutations,
    actions
};