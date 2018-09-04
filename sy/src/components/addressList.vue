<template>
    <div id="addressList">
        <div id='address' v-if="isEmpty">
            <div id="listTest" v-if="addressListShow=='1'&&isEmpty"></div>
            <div id="list" v-if="addressListShow=='2'&&isEmpty" v-infinite-scroll="" infinite-scroll-disabled="busy" infinite-scroll-distance="">
                <mu-container ref="container" class="demo-loadmore-content">
                        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                            <mu-list v-if="!isFromOrder">
                                <div class='item boxS' v-for="(item,idx) in addressList" :key="idx">
                                    <div class='item-left boxStart'>
                                        <div class='left-address'>{{item.delivery_province}}{{item.delivery_city}}{{item.delivery_county}}{{item.delivery_detail}}</div>
                                        <div class='left-info boxStart'>
                                            <div class='info-name'>{{item.delivery_user_name}}</div>
                                            <div class='info-number'>{{item.delivery_user_tell}}</div>
                                        </div>
                                    </div>
                                    <router-link  :to="{path:'writeAddress',name:'writeAddress',params:{writeAddressDeliveryId:item.delivery_id,writeAddressName:item.delivery_user_name,writeAddressTellNumber:item.delivery_user_tell,writeAddressDeliveryDetail:item.delivery_detail}}" class="boxC"> 
                                      <div class='item-right'>
                                          <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/address/write.png' style='width:24px;height:24px;'></img>
                                      </div>
                                    </router-link> 
                                </div>
                            </mu-list>
                            <mu-list v-if="isFromOrder">
                                <div class='item boxS' v-for="(item,idx) in addressList" :key="idx" @click="goFillInOrder(item.delivery_id)">
                                    <div class='item-left boxStart'>
                                        <div class='left-address'>{{item.delivery_province}}{{item.delivery_city}}{{item.delivery_county}}{{item.delivery_detail}}</div>
                                        <div class='left-info boxStart'>
                                            <div class='info-name'>{{item.delivery_user_name}}</div>
                                            <div class='info-number'>{{item.delivery_user_tell}}</div>
                                        </div>
                                    </div>
                                    <router-link  :to="{path:'writeAddress',name:'writeAddress',params:{writeAddressDeliveryId:item.delivery_id,writeAddressName:item.delivery_user_name,writeAddressTellNumber:item.delivery_user_tell,writeAddressDeliveryDetail:item.delivery_detail}}" class="boxC"> 
                                      <div class='item-right'>
                                          <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/address/write.png' style='width:24px;height:24px;'></img>
                                      </div>
                                    </router-link> 
                                </div>
                            </mu-list>
                        </mu-load-more>
                    </mu-container>
                <div v-if="isBottom" id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
            </div>
        </div>
        <div id='emptyImg' class='' style='margin-top:145px;text-align:center;' v-if="!isEmpty">
            <img src='http://www.shangyibazaar.com/upload/common/addressEmpty.png' style='width:113px;height:91px;margin-bottom:62px;'></img>
            <div style='font-size:14px;color:#999;'>还未添加地址</div>
        </div>
        <div id='add' class='boxC'>
            <router-link :to="{path:'addAddress',name:'addAddress'}" class="boxC">
                <div class='addImg'>
                    <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/address/add.png' style='width:16px;height:16px;'></img>
                </div>
                <div style="color:#333;">新增收货地址</div>
            </router-link>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl:this.HOST,
      urlPargram:'index.php?r=user/weChatDelivery&id=',
      refreshing: false,
      loading: false,
      userId:'',
      isFromOrder:false,
      cartId:''
    };
  },
  mounted() {
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var isLogin = this.$cookies.get("isLogin");
      if(isLogin=='true'){
      this.userId = this.$cookies.get("userId")
    }
    var url = baseUrl + urls+this.userId;
    this.$store.dispatch("getAddressList", url);
    this.isFromOrder = this.$route.params.goAddressList
    this.cartId = sessionStorage.getItem('cartId')
    // console.log(this);
  },
  methods: {
    refresh() {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls+this.userId;
      this.$store.dispatch("getAddressList", url);
      if (this.addressList ) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    goFillInOrder(did){
      sessionStorage.setItem('deliveryId',did)
      // console.log(this.cartId)
      sessionStorage.setItem('cartId',this.cartId)
      this.$router.go(-1);
      this.$destroy();
    }
    // loadAddressListMore(){
    //   // console.log("loadIP");
    //   var baseUrl = this.HOST;
    //   var url = baseUrl + this.$data.urlPargram;
    //   this.$store.dispatch("loadAddressListMore", url);
    // },
  },
  destroyed(){

  },
  computed: mapState({
    busy: state => state.addressList.busy,
    isBottom: state => state.addressList.isBottom,
    addressListShow: state => state.addressList.addressListShow,
    addressList: state => state.addressList.addressList,
    isEmpty: state => state.addressList.isEmpty,
  })
};
</script>
<style>
#addressList{
    margin-top: 56px;
}
#addressList .mu-list{
  margin-bottom: 100px;
}
#addressList .item{
  width: 100%;
  background: #fff;
  padding: 40px 30px 44px 40px;
  margin-top: 16px;
  box-sizing: border-box;
}
#addressList .item-left{
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
}
#addressList .left-address{
  font-size: 32px;
  line-height: 48px;
  margin-right: 88px;
  margin-bottom: 20px;
  text-align: left;
}
#addressList .left-info{
  color: #666;
}
#addressList .info-name{
  margin-right: 40px;
}
#addressList #add{
  width: 100%;
  height: 100px;
  background: #fff;
  position: fixed;
  bottom: 0;
}
#addressList .addImg img{
  vertical-align: middle;
  margin-right: 24px;
}

</style>
