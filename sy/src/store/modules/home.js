import Vue from 'vue';
// import VueResource from 'vue-resource'
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);
// Vue.use(VueResource);
const state = {
    swiperList: [],
    selfSupportList: [],
    cooperationArtListProduct: [],
    videoList: [],
    artistInfoList: '',
    artistProList: [],
    artistProCont: '',
    hotRecommendList: []
    //这些是数据  这些ok吧 传进去了吗 
};

const mutations = {
    getHomeList(state, data) {
        state.swiperList = data.data.banner_ads;
        state.selfSupportList = data.data.recommend_list.微信小程序兿自营;
        state.cooperationArtListProduct = data.data.recommend_list.微信小程序合作艺术家的衍生品;
        state.videoList = data.data.video;
        state.artistInfoList = data.data.artist[0];
        state.hotRecommendList = data.data.recommend_list.微信小程序热门推荐;
        //上面这些是获取到的信息 
    },
    getArtistProductList(state, data) {
        state.artistProList = data.data.product_list;
        state.artistProCont = data.data.artist_detail.product_count;
    }
};

const actions = {
    getHome(context, baseUrl) {
        function getData() {
            return new Promise(function (resolve, reject) {
                axios({
                    method:'GET',
                    url:baseUrl+'api.php?r=home/index&test=1&source=miniProgram',
                    dataType:'jsonp',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
                }).then(res => {
                    resolve(res)
                })
            })
        }
        getData().then(function(data){
            // console.log(data)
            context.commit('getHomeList',data)
            var artistId=data.data.artist[0].artist_id;
            axios.get(baseUrl+'index.php?r=artist/detail&source=miniProgram&id='+artistId).then(res => {
                // console.log(res)
                context.commit('getArtistProductList', res)
            })
        })
    },
    // getArtistProduct(context, url) {
    //     console.log(url)
    //     axios.get(url).then(res => {
    //         console.log(res)
    //         context.commit('getArtistProductList', res)
    //         console.log(res, 222)
    //     })
    // }
};

export default {
    state,
    mutations,
    actions
};