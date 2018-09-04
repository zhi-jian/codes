import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);
const state = {
    headerText:'详情',
    productDetail: [],
    productDetailImgList: [],
    listImg: [],
    detailImg: [],
    extendList:[],
    isExtend:'',
    stockNumber:0
};

const mutations = {
    productDetails(state, data) {
        state.productDetail = data;
        state.stockNumber = data.info.products_stock_number
    },
    listImg(state, data) {
        state.listImg = data;
    },
    detailImg(state, data) {
        state.detailImg = data;
    },
    extendList(state, data) {
        state.extendList = data;
    }
};

const actions = {
    getProductDetail(context, params) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(params.baseUrl + 'index.php?r=product/detail&source=miniProgram&product_id=' + params.proId).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            var im = data.data.image, listImg = [], detailImg = [];
            for (var j = 0; j < im.length; j++) {
                if (im[j].products_img_type == "0") {
                    listImg.push(im[j].products_img_value)
                } else if (im[j].products_img_type == "1") {
                    detailImg.push(im[j].products_img_value)
                }
            }
            context.commit('productDetails', data.data)
            context.commit('listImg', listImg)
            context.commit('detailImg', detailImg)
            if(data.data.extend_info){
                context.commit('extendList',data.data.extend_info)
                state.isExtend = true;
            }else{
                state.isExtend = false;
            }
        })
    }
};

export default {
    state,
    mutations,
    actions
}