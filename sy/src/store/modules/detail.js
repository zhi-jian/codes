import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);

const state = {
    headerText:'作品详情',
    detail: [],
    IPCount: [],
    proCount: [],
    artistResume: '',
    artistExhibition: [],
    detailImgShow: false,
    detailsImg: [],
    isArtistEventShow:false,
    artistEvent:'',
    detailOtherProduct:[]
};

const mutations = {
    details(state, data) {
        state.detail = data;
    }
};

const actions = {
    getDetail(context, params) {
        function getData() {
            return new Promise((resolve, rejects) => {
                axios.get(params.baseUrl + 'index.php?r=product/detail&source=miniProgram&product_id=' + params.IPId).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(data => {
            // console.log(data)
            state.detail=[]
            var IPCount = [], proCount = [], otherProducts = data.data.other_products;
            for (var i = 0; i < otherProducts.length; i++) {
                if (otherProducts[i].products_type == '0') {
                    IPCount.push(otherProducts[i])
                } else if (otherProducts[i].products_type == '1') {
                    proCount.push(otherProducts[i])
                }
            }
            state.IPCount = IPCount;
            state.proCount = proCount;
            var resume = data.data.artist_info.artist_resume;
            var groupExhibition = data.data.artist_info.artist_group_exhibition;
            var soloExhibition = data.data.artist_info.artist_solo_exhibition;
            var exhibitionTexts = [];
            // 艺术家介绍
            if (groupExhibition) {
                var groupEx = groupExhibition.split("\n");
            } else {
                var groupEx = ''
            }

            if (soloExhibition) {
                var soloEx = soloExhibition.split("\n");
            } else {
                var soloEx = ''
            }

            for (var i = 0; i < groupEx.length; i++) {
                exhibitionTexts.push(groupEx[i]);
            }
            for (var i = 0; i < soloEx.length; i++) {
                exhibitionTexts.push(soloEx[i]);
            }
            state.artistResume = resume
            state.artistExhibition = exhibitionTexts
            // IP细节图
            // 细节图
            var image = data.data.image;
            state.detailsImg=[]
            if (image.length > 0) {
                state.detailImgShow = true
                for (var i = 0; i < image.length; i++) {
                    state.detailsImg.push(image[i].products_img_value)
                };
            } else {
                state.detailImgShow = false
            }
            // 艺术家大事件
                var artEvent= data.data.artist_info.artist_event;
                state.artistEvent=[]
                if(artEvent){
                    state.isArtistEventShow = true
                    state.artistEvent = artEvent
                }else{
                    state.isArtistEventShow = false
                }
            //推荐作品
            var detailOtherProduct = data.data.recommend;
            state.detailOtherProduct =[]
            for(var i=0;i<4;i++){
                state.detailOtherProduct.push(detailOtherProduct[i])
            }
            // console.log(IPCount,proCount)
            context.commit('details', data.data)
        })
    }
};

export default {
    state,
    mutations,
    actions
}