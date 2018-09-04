<template>
    <div id="orderList">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab value="0">全部</mu-tab>
                    <mu-tab value="1">待支付</mu-tab>
                    <mu-tab value="2">配送中</mu-tab>
                    <mu-tab value="3">已完成</mu-tab>
                </mu-tabs>
            </mu-container>
        </div>
        <div id="listTest" v-if="orderListShow=='1'&&isEmpty"></div>
        <div id="list" v-if="orderListShow=='2'&&isEmpty" v-infinite-scroll="loadOrderListMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
            <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div class='item' v-for="(item,idx) in orderList" :key="idx" v-if="allOrder=='1'">
                                <div class='item-title boxS'>
                                    <div class='title-left boxStart'>
                                        <div class='left-name'>订单号：</div>
                                        <div class='left-number'>{{item.order_no}}</div>
                                    </div>
                                    <div class='item-right'  v-if="item.order_status=='2'" style='color:#999'>已完成</div>
                                    <div class='item-right'  v-if="item.order_status=='4'" style='color:#19C0A3'>配送中</div>
                                    <div class='item-right'  v-if="item.order_status=='1'" style='color:#19C0A3'>待发货</div>
                                    <div class='item-right'  v-if="item.order_status=='0'">
                                        <button class='boxC' @click="orderListGoPay(item.order_no)">去支付</button>
                                    </div>
                                </div>
                                <div class='hr'></div>
                                <div  v-for="(proItems,idx) in productList"  :key="idx">
                                  <div v-for="(proItem,idxx) in proItems" v-if="item.order_id==idxx" :key="idxx">
                                    <router-link :to="{path:'orderDetail',name:'orderDetail',params:{id:item.order_id}}" class="boxStart" style="flex-wrap:wrap;">
                                        <div class='item-content boxStart' v-for="(productInfo,idx) in proItem" :key="idx">
                                            <div class='content-img'>
                                                <img :src='baseUrl + productInfo.product_image' width="94px;"></img>
                                            </div>
                                            <div class='content-info boxStart' v-if="item.proCount<=1">
                                                <div class='info-name'>{{productInfo.product_name}}</div>
                                                <div class='info-type'>{{productInfo.products_length}}</div>
                                            </div>
                                        </div>
                                    </router-link>
                                  </div>
                                </div>
                                <div class='hr'></div>
                                <div class='item-footer boxS'>
                                    <div class='footer-time'>{{item.create_time}}</div>
                                    <div class='footer-right boxStart'>
                                        <div class='footer-right-proCount'>共{{item.proCount}}件商品</div>
                                        <div class='footer-price' v-if="item.order_status!=0">实付款：￥{{item.product_total_price}}</div>
                                        <div class='footer-price price-red' v-if="item.order_status==0">待付款：￥{{item.product_total_price}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class='item' v-for="(item,idx) in orderList" :key="idx" v-if="allOrder=='2'&&item.order_status==orderStatus">  
                                <div class='item-title boxS'>
                                    <div class='title-left boxStart'>
                                        <div class='left-name'>订单号：</div>
                                        <div class='left-number'>{{item.order_no}}</div>
                                    </div>
                                    <div class='item-right'  v-if="item.order_status=='2'" style='color:#999'>已完成</div>
                                    <div class='item-right'  v-if="item.order_status=='4'" style='color:#19C0A3'>配送中</div>
                                    <div class='item-right'  v-if="item.order_status=='1'" style='color:#19C0A3'>待发货</div>
                                    <div class='item-right'  v-if="item.order_status=='0'">
                                        <button class='boxC'>去支付</button>
                                    </div>
                                </div>
                                <div class='hr'></div>
                                <div  v-for="(proItems,idx) in productList"  :key="idx">
                                  <div v-for="(proItem,idxx) in proItems" v-if="item.order_id==idxx" :key="idxx">
                                    <router-link :to="{path:'orderDetail',name:'orderDetail',params:{id:item.order_id}}" class="boxStart" style="flex-wrap:wrap;">
                                        <div class='item-content boxStart' v-for="(productInfo,idx) in proItem" :key="idx">
                                            <div class='content-img'>
                                                <img :src='baseUrl + productInfo.product_image' width="94px;"></img>
                                            </div>
                                            <div class='content-info boxStart' v-if="item.proCount<=1">
                                                <div class='info-name'>{{productInfo.product_name}}</div>
                                                <div class='info-type'>{{productInfo.products_length}}</div>
                                            </div>
                                        </div>
                                    </router-link>
                                  </div>
                                </div>
                                <div class='hr'></div>
                                <div class='item-footer boxS'>
                                    <div class='footer-time'>{{item.create_time}}</div>
                                    <div class='footer-right boxStart'>
                                        <div class='footer-right-proCount'>共{{item.proCount}}件商品</div>
                                        <div class='footer-price' v-if="item.order_status!=0">实付款：￥{{item.product_total_price}}</div>
                                        <div class='footer-price price-red' v-if="item.order_status==0">待付款：￥{{item.product_total_price}}</div>
                                    </div>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            <div v-if="isBottom" id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
        </div>
        <div v-if="!isEmpty" style='width:100%;padding-top:145px;text-align:center;'>
          <img src='https://www.shangyibazaar.com/upload/common/allEmpty.png' style='width:113px;height:91px;margin-bottom:62px;'></img>
          <div style='font-size:14px;color:#999;'>暂无相关信息</div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  data() {
    return {
      baseUrl: this.HOST,
      urlPargram: "index.php?r=user/weChatOrder&id=" + this.$cookies.get("userId"),
      refreshing: false,
      loading: false,
      orderStatus: 0,
      allOrder: 1
    };
  },
  mounted() {
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getOrderList", url);
    // console.log(this);
  },
  methods: {
    nav(e) {
      // console.log(e)
      var baseUrl = this.baseUrl;
      if (e == "0") {
        this.allOrder = 1;
      } else if (e == "1") {
        this.allOrder = 2;
        this.orderStatus = 0;
      } else if (e == "2") {
        this.allOrder = 2;
        this.orderStatus = 2;
      } else if (e == "3") {
        this.allOrder = 2;
        this.orderStatus = 4;
      }
    },
    refresh() {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls;
      this.$store.dispatch("getOrderList", url);
      if (this.orderList) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadOrderListMore() {
      // console.log("loadIP");
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadOrderListMore", url);
    },
    orderListGoPay(orderNo) {
      // console.log(orderNo);
      // this.axios({
      //   url: this.HOST + "index.php?r=checkout/done&source=miniProgram",
      //   method: "post",
      //   data: { order_no: orderNo },
      //   transformRequest: [
      //     function(data) {
      //       let ret = "";
      //       for (let it in data) {
      //         ret +=
      //           encodeURIComponent(it) +
      //           "=" +
      //           encodeURIComponent(data[it]) +
      //           "&";
      //       }
      //       ret = ret.slice(0, -1); // 去掉最后的空行
      //       return ret;
      //     }
      //   ],
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
    }
  },
  computed: mapState({
    busy: state => state.orderList.busy,
    isBottom: state => state.orderList.isBottom,
    orderListShow: state => state.orderList.OrderListShow,
    orderList: state => state.orderList.orderList,
    productList: state => state.orderList.proList,
    isEmpty: state => state.orderList.isEmpty
  })
};
</script>
<style>
#orderList #navbar {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#orderList #navbar .navBar_list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
#orderList .customziedBox {
  width: 50%;
  height: 100%;
  padding-right: 24px;
  justify-content: flex-end;
  background: #fff;
}
#customzied {
  width: 232px;
  height: 56px;
  background: #19c0a3;
  font-size: 28px;
  line-height: 28px;
  color: #fff;
  border: none;
  border-radius: 0;
}
#orderList .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#orderList .mu-appbar {
  width: 100%;
}
#orderList #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#orderList .tabChange {
  height: 100%;
  background: #fff;
  padding-right: 24px;
}
#orderList .mu-list,
#orderList .mu-list > li {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#orderList .mu-list {
  flex-wrap: wrap;
}
#orderList .mu-tabs {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  color: #333;
  position: relative;
  z-index: 100;
  overflow: hidden;
}
#orderList .mu-tab {
  font-size: 0.186667rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-decoration: none;
  border: none;
  outline: none;
  color: inherit;
  position: relative;
  line-height: normal;
  -webkit-transition: all 0.45s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 0.45s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  cursor: pointer;
  font-size: 28px;
  line-height: 28px;
}
#orderList .mu-tab-active {
  color: #19c0a3;
}
#orderList .mu-tab-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
/* 列表 */
#orderList {
  margin-top: 144px;
}
#orderList .item {
  width: 100%;
  background: #fff;
  margin-top: 16px;
  overflow: hidden;
}
#orderList .hr {
  width: 100%;
  height: 2px;
  background: #ededed;
  margin: 36px 0;
}
#orderList .item-title {
  padding: 36px 24px 0 24px;
  box-sizing: border-box;
}
#orderList .title-left {
  color: #999;
}
#orderList .item-right button {
  width: 152px;
  height: 48px;
  border: 2px solid #ed5b5b;
  color: #ed5b5b;
  padding: 0;
  font-size: 28px;
  border-radius: 0;
  background: #fff;
}
#orderList .price-red {
  color: #ed5b5b;
}
#orderList .item-content,
.item-footer {
  padding: 0 24px;
  box-sizing: border-box;
}
#orderList .item-footer {
  padding-bottom: 24px;
}
#orderList .content-info {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 28px;
}
#orderList .content-img {
  /* margin-right: 24px; */
  width: 188px;
  height: 188px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
#orderList .info-name {
  font-size: 32px;
  margin-bottom: 28px;
}
#orderList .info-type {
  width: 100%;
  text-align: left;
  color: #666;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
#orderList .footer-right-proCount {
  margin-right: 40px;
}
</style>
