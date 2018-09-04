import Vue from 'vue'
import Router from 'vue-router'
import pagesView from '@/views/pagesView.vue'
import Indexs from '@/views/index.vue'
import Product from '@/views/product.vue'
import Cart from '@/views/cart.vue'
import My from '@/views/my.vue'
import IP from '@/views/IP.vue'
import ProductDetail from '@/views/productDetail.vue'
import Detail from '@/views/detail.vue'
import Ficitious from '@/views/ficitious.vue'
import FicitiousDetail from '@/views/ficitiousDetail.vue'
import artist from '@/views/artist.vue'
import artistDetail from '@/views/artistDetail.vue'
import outfit from '@/views/outfit.vue'
import outfitDetail from '@/views/outfitDetail.vue'
import VI from '@/views/VI.vue'
import VIDetail from '@/views/VIDetail.vue'
import Merchant from '@/views/merchant.vue'
import Video from '@/views/video.vue'
import OrderList from '@/views/orderList.vue'
import OrderDetail from '@/views/orderDetail.vue'
import AddressList from '@/views/AddressList.vue'
import AddAddress from '@/views/addAddress.vue'
import WriteAddress from '@/views/writeAddress.vue'
import FillInOrder from '@/views/fillInOrder.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/pages/index'
    },
    {
      path: '/pages',
      name: 'pages',
      component: pagesView,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Indexs
        },
        {
          path: 'product',
          name: 'product',
          component: Product
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'my',
          name: 'my',
          component: My
        },
        {
          path: 'IP',
          name: 'IP',
          component: IP
        },
        {
          path:'productDetail',
          name:'productDetail',
          component:ProductDetail
        },
        {
          path:'detail',
          name:'detail',
          component:Detail
        },
        {
          path:'ficitious',
          name:'ficitious',
          component:Ficitious
        },
        {
          path:'ficitiousDetail',
          name:'ficitiousDetail',
          component:FicitiousDetail
        },
        {
          path:'artist',
          name:'artist',
          component:artist
        },
        {
          path:'artistDetail',
          name:'artistDetail',
          component:artistDetail
        },
        {
          path:'outfit',
          name:'outfit',
          component:outfit
        },
        {
          path:'outfitDetail',
          name:'outfitDetail',
          component:outfitDetail
        },
        {
          path:'VI',
          name:'VI',
          component:VI
        },
        {
          path:'VIDetail',
          name:'VIDetail',
          component:VIDetail
        },
        {
          path:'merchant',
          name:'merchant',
          component:Merchant
        },
        {
          path:'video',
          name:'video',
          component:Video
        },
        {
          path:'orderList',
          name:'orderList',
          component:OrderList
        },
        {
          path:'orderDetail',
          name:'orderDetail',
          component:OrderDetail
        },
        {
          path:'addressList',
          name:'addressList',
          component:AddressList
        },
        {
          path:'addAddress',
          name:'addAddress',
          component:AddAddress
        },
        {
          path:'writeAddress',
          name:'writeAddress',
          component:WriteAddress
        },
        {
          path:'fillInOrder',
          name:'fillInOrder',
          component:FillInOrder
        }
      ]
    }
  ]
})
