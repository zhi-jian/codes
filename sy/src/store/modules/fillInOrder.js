import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    cartLists: [],
    totalPrice: 0,
    defaultAddress: {},
    allAdderss: [],
    fillOrderBackModalShow:false,
    defaultDeliveryId:''
};

const mutations = {
    addressList(state, data) {
        state.allAdderss = data.address
    },
    changeFillOrderBackModalShow(state,data){
        state.fillOrderBackModalShow = data
    }
};

const actions = {
    getFillInOrderList(context, param) {
        function getData() {
            return new Promise(function (resolve, rejects) {
                axios.get(param.url).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var cartLists = data.data.cart; 
            var addressLists = data.data.address;
            state.totalPrice = 0;
            cartLists.forEach((item, i) => {
                // console.log(item)
                axios.get(param.baseUrl+'/index.php?r=product/detail&source=miniProgram&product_id=' + item.product_id).then(res => {
                    // console.log(res)
                    item.artName = res.data.user_info.user_nick_name;
                    item.product_type = res.data.theme_info.theme_name + '  /  ' + res.data.category_info.category_name
                    state.totalPrice += Number(item.product_price*item.product_num)
                })
            });
            addressLists.forEach((item, i) => {
                // console.log(item)
                if (item.delivery_default == '1') {
                    state.defaultAddress = item
                    state.defaultDeliveryId = item.delivery_id
                    sessionStorage.setItem('deliveryId',item.delivery_id)
                }
            })


            // console.log(cartLists)
            state.cartLists = cartLists
            context.commit('addressList', data.data)
        })
    },

};

export default {
    state,
    mutations,
    actions
}