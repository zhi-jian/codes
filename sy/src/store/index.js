import Vue from 'vue';
import Vuex from 'vuex';
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(Vuex);
Vue.use(VueInfiniteScroll);
import navList from './modules/navList'
import product from './modules/product'
import IP from './modules/IP'
import detail from './modules/detail'
import home from './modules/home'
import productDetail from './modules/productDetail'
import ficitious from './modules/ficitious'
import ficitiousDetail from './modules/ficitiousDetail'
import artist from './modules/artist'
import artistDetail from './modules/artistDetail'
import outfit from './modules/outfit'
import outfitDetail from './modules/outfitDetail'
import VI from './modules/VI'
import VIDetail from './modules/VIDetail'
import merchant from './modules/merchant'
import customziedModal from './modules/customziedModal'
import video from './modules/video'
import login from './modules/login'
import orderList from './modules/orderList'
import orderDetail from './modules/orderDetail'
import addressList from './modules/addressList'
import cart from './modules/cart'
import fillInOrder from './modules/fillInOrder'
export default new Vuex.Store({
  modules: {
    home,
    product,
    navList,
    IP,
    detail,
    productDetail,
    ficitious,
    ficitiousDetail,
    artist,
    artistDetail,
    outfit,
    outfitDetail,
    VI,
    VIDetail,
    merchant,
    customziedModal,
    video,
    login,
    orderList,
    orderDetail,
    addressList,
    cart,
    fillInOrder
  }
}) 