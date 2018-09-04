// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'ratchet-npm/dist/css/ratchet.css' // get ratchet
import 'font-awesome/css/font-awesome.css' // get font-awesome
import 'animate.css/animate.css'// get animate.css
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mock from './mock'
import FastClick from 'fastclick'
import VueInfiniteScroll from 'vue-infinite-scroll'
import 'lib-flexible'
import Mint from 'mint-ui';
import Element from 'element-ui'
import axios from 'axios'
import MuseUI from 'muse-ui';
import 'mint-ui/lib/style.css';
import 'muse-ui/dist/muse-ui.css';
if(process.env.NODE_ENV==='development'){
  Vue.prototype.HOST='/api'
}else if(process.env.NODE_ENV==='production'){
  Vue.prototype.HOST='https://www.shangyibazaar.com/'
}
// Vue.prototype.HOST='/api'
Vue.prototype.axios=axios
Vue.prototype.eee=process.env
// console.log(process.env)
Vue.prototype.customziedShow = false
Vue.use(MuseUI);
Vue.use(Mint);
Vue.use(Element)
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(VueInfiniteScroll)
import 'es6-promise/auto'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mock,
  components: { App },
  template: '<App/>'
})
