<template>
    <div id="orderDetail">
        <div v-for="(item,idx) in orderList" :key="idx" v-if="item.order_id==oId">
              <div class="weui-navbar boxC"  v-if="item.order_status=='4'">
                <div class='navbar-img'>
                  <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/finish.png' style='width:22px;height:22px;'></img>
                </div>
                  <div class='navbar-state'>已完成</div>
                  <div class='navbar-white'> 
                    <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/白色渐变@3x.png' style='width:100%; height:38px;'></img>
                  </div>
              </div>
              <div class="weui-navbar boxC"  v-if="item.order_status=='2'">
                <div class='navbar-img'>
                  <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/flyicon@3x.png' style='width:22px;height:22px;'></img>
                </div>
                  <div class='navbar-state'>配送中</div>
                  <div class='navbar-white'>
                    <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/白色渐变@3x.png' style='width:100%; height:38px;'></img>
                  </div>
              </div>
              <div class="weui-navbar boxC"  v-if="item.order_status=='0'" style='background-image: linear-gradient(90deg, #ED5B5B 0%, #F64765 98%);'>
                <div class='navbar-img'>
                  <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/time@3x.png' style='width:22px;height:22px;'></img>
                </div>
                  <div class='navbar-state'>待支付</div>
                  <div class='navbar-white'>
                    <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/白色渐变@3x.png' style='width:100%; height:38px;'></img>
                  </div>
              </div>
              <div id='address' class='boxStart' v-if="item.order_status!='0'">
                <div class='address-icon'>
                  <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/orderDetail/定位@3x.png' style='width:20px;height:20px;'></img>
                </div>
                <div class='address-info boxS' v-for="(item,idx) in commonList" :key="idx" v-if="idx==oId">
                  <div style='font-weight:bold;'>{{item.reciver_province_name}}{{item.reciver_city_name}}{{item.reciver_info}}</div>
                  <div class='boxStart'>
                    <div class='addinfo-name'>{{item.reciver_name}}</div>
                    <div class='addinfo-number'>{{item.reciver_phone}}</div>
                  </div>
                </div>
              </div>
        </div>
        <div class="orderDetail_content" v-for="(item,idx) in orderList" v-if="item.order_id==oId" :key="idx">
            <div class='item' v-for="(proItem,idx) in productList" :key="idx" v-if="idx==item.order_id">
                <div class='item-content boxStart' v-for="(proInfo,idx) in proItem" :key="idx">
                    <div class='content-img'>
                        <img :src='baseUrl+proInfo.product_image' width="94px"></img>
                    </div>
                    <div class='content-info boxStart'>
                        <div class='info-name'>{{proInfo.product_name}}</div>
                        <div class='info-type'></div>
                        <div class='info-cp boxS'>
                            <div class='info-count'>数量：{{proInfo.product_num_total}}</div>
                            <div class='info-price'>价格：￥{{proInfo.produproduct_final_pricect_name}}</div>
                        </div>
                    </div>
                </div>
                <div class='hr'></div>
            </div>
            <div class='item-footer boxS'>
                <div class='footer-right-proCount'>共{{item.proCount}}件商品</div>
                <div class='footer-price' v-if="item.orderStatus!=0">实付款：￥{{item.product_total_price}}</div>
                <div class='footer-price price-red' v-if="item.orderStatus==0">待付款：￥{{item.product_total_price}}</div>
            </div>
            <div id='peiSongInfo' class='boxStart' v-for="(commonInfo,idx) in commonList" v-if="idx==oId">
                <div class='orderNumber boxStart'>
                    <div class='peiSongInfo-title'>订单编号</div>
                    <div class='peiSongInfo-content'>{{item.order_no}}</div>
                </div>
                <div class='peiSongInfo-hr'></div>
                <div class='peiSong boxStart'>
                    <div class='peiSongInfo-title'>配送方式</div>
                    <div class='peiSongInfo-content'>"快递送达上门自取"</div>
                </div>
                <div class='peiSongInfo-hr'></div>
                <div class='piaoju boxStart'>
                    <div class='peiSongInfo-title'>票据凭证</div>
                    <div class='peiSongInfo-content'>{{commonInfo.is_invoice?"无":"有"}}</div>
                </div>
                <div class='peiSongInfo-hr'></div>
                <div class='creatTime boxStart'>
                    <div class='peiSongInfo-title'>下单时间</div>
                    <div class='peiSongInfo-content'>{{item.create_time}}</div>
                </div>
                <div class='peiSongInfo-hr'></div>
                <div class='liuYan boxStart'>
                    <div class='peiSongInfo-title'>留言</div>
                    <div class='peiSongInfo-content'>暂无</div>
                </div>
            </div>
            <div class='footer boxS' v-if="item.order_status!=0">
                <!-- <div class='footer-deleteOrder'><button>删除订单</button></div> -->
                <div class='footer-lookWuLiu boxC' v-if="item.order_status!=0"><button>查看物流</button></div>
            </div>
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
      baseUrl:this.HOST,
      urlPargram:'index.php?r=user/weChatOrder&id='+this.$cookies.get("userId"),
      orderStatus:0,
      allOrder:1,
      oId:''
    };
  },
  mounted() {
      // console.log(this)
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    var oId=this.$route.params.id;
    this.oId = oId;
    var params={url:url,id:oId}
    // console.log(params)
    this.$store.dispatch("getOrderDetail", params);
    // console.log(this);
  },
  methods: {
  },
  computed: mapState({
    orderList: state => state.orderDetail.orderList,
    productList: state => state.orderDetail.productList,
    commonList: state => state.orderDetail.commonList,
  })
};
</script>
<style>
#orderDetail{
    margin-top: 56px;
}
#orderDetail .weui-navbar{
  width: 100%;
  height: 120px;
  background-image: linear-gradient(90deg, #19C0A3 0%, #21C263 100%);
  position: relative;
  border-bottom: none;
  border-top: 1px solid #ededed;
}
#orderDetail .navbar-img img{
  vertical-align: middle;
}
#orderDetail .navbar-state{
  font-size: 32px;
  color: #fff;
  margin-left: 20px;
}
#orderDetail .navbar-white{
  width: 100%;
  position: absolute;
  bottom: -12px;
}
#orderDetail .weui-tab__content{
/* padding-top: 60px; */
text-align: center;
}
#orderDetail .weui-navbar__slider{
  width: 80px;
  background-color: #19C0A3;
}
#orderDetail .weui-navbar__item.weui-bar__item_on{
  color: #19C0A3;
}
#orderDetail #address{
  width: 100%;
  height: 210px;
  background: #fff;
  margin-top: 16px ;
  padding: 32px 30px;
  box-sizing: border-box;
}
#orderDetail .address-icon{
  margin-right: 20px;
}
#orderDetail .address-icon,.address-info{
  height: 100%;
}
#orderDetail .address-info{
  flex-direction: column;
  align-items: flex-start;
}
#orderDetail .addinfo-name,.addinfo-number{
  color: #666;
}
#orderDetail .addinfo-name{
  margin-right: 48px;
}
#orderDetail .weui-tab__panel{
  padding: 0;
}
#orderDetail .content-img img{
  width: 188px;
  vertical-align: middle;
}
#orderDetail .item{
  background: #fff;
  margin-top: 16px;
}
#orderDetail .hr{
  width: 690px;
  height: 2px;
  background: #ededed;
  margin-left: 24px;
}
#orderDetail .item-title{
  padding: 36px 24px 0 24px;
  box-sizing: border-box;
}
#orderDetail .title-left{
  color: #999;
}
#orderDetail .item-right button{
  width: 152px;
  height: 48px;
  border: 2px solid #ED5B5B;
  color: #ED5B5B;
  padding: 0;
  font-size: 28px;
  border-radius: 0;
  background: #fff;
}
#orderDetail .price-red{
  color: #ED5B5B;
}
#orderDetail .item-content,.item-footer{
  padding: 36px 24px;
  box-sizing: border-box;
}
#orderDetail .item-footer{
  font-size: 32px;
  padding-bottom: 24px;
  background: #fff;
}
#orderDetail .content-info{
  height: 200px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 28px;
}
#orderDetail .content-img{
  width: 188px;
  height: 188px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 24px;
}
#orderDetail .info-name{
  font-size: 32px;
  margin-bottom: 18px;
}
#orderDetail .info-type{
  text-align: left;
  color: #666;
}
#orderDetail .info-cp{
  width: 390px; 
  color: #333;
  margin-top: 20px;
}
#orderDetail .footer-right-proCount{
  margin-right: 40px;
}
#orderDetail #peiSongInfo{
  margin-top: 16px;
   flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start; 
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
}
#orderDetail #gotoPay{
  width: 192px;
  height: 52px;
  border: 2px solid #ED5B5B;
  color: #ED5B5B;
  margin-top: 40px;
}
#orderDetail .peiSongInfo-hr{
  width: 100%;
  height: 2px;
  background: #ededed;
  margin: 32px 0;
}
#orderDetail .peiSongInfo-title{
  width: 128px;
  font-size: 32px;
  color: #666666;
  line-height: 32px;
  margin-right: 80px;
  text-align: left;
}
#orderDetail .peiSongInfo-content{
  font-size: 32px;
  color: #333;
}
#orderDetail .footer{
  margin-top: 16px;
  background: #fff;
  padding: 34px 30px;
}
#orderDetail .footer button{
  border: none;
  border-radius: 0;
  background: #fff;
  padding: 0;
  font-size: 32px;
  height: auto;
  line-height: 32px;
}
#orderDetail .footer button::after{
  border: none;
}
#orderDetail .footer-lookWuLiu{
  width: 192px;
  height: 52px;
  border: 2px solid #19C0A3;
  color: #19C0A3;
}
#orderDetail .footer-lookWuLiu button{
  color: #19C0A3;
}
</style>
