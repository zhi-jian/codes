<template>
    <div id="fillInOrder">
        <div style="height:1px;"></div>
        <router-link class="fillInOrder_address boxC" :to="{path:'addressList',name:'addressList',params:{goAddressList:true}}" v-if="!defaultAddress">
            <div class="fillInOrder_address_icon"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/order/dw@3x.png" alt="" width="20px" height="20px"></div>
            <div class="fillInOrder_address_text">请添加收货地址</div>
        </router-link>
        
        <router-link class="fillInOrder_hasAddress  boxS" v-for="(item,idx) in allAdderss" :key="idx" :to="{path:'addressList',name:'addressList',params:{goAddressList:true}}" v-if="defaultAddress&&deliveryId==item.delivery_id">
                <div class="boxStart" style="align-items:flex-start;">
                    <div class="fillInOrder_address_icon"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/order/dw@3x.png" alt="" width="20px" height="20px"></div>
                    <div class="fillInOrder_address_detail">
                        <div class="address_detail_deliveryInfo">{{item.delivery_province}}{{item.delivery_city}}{{item.delivery_detail}}</div>
                        <div class="adderss_detail_userInfo boxStart">
                            <div class="adderss_detail_userInfo_userName">{{item.delivery_user_name}}</div>
                            <div class="address_detail_userInfo_userTell">{{item.delivery_user_tell}}</div>
                        </div>
                    </div>
                </div>
                <div class="goAdderss_icon"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/order/rightArrow.png" alt="" width="24px;" height="24px;"></div>
        </router-link>
        <!-- <div>{{cartLists}}</div> -->
        <div class="fillInOrder_proInfo">
            <div class="item_productInfo boxStart"  v-for="(item,idx) in cartLists" :key="idx">
                <div class="productInfo_img boxC">
                    <img :src="baseUrl + item.product_image" alt="" width="94px;">
                </div>
                <div class="productInfo_types">
                    <div class="types_proName">{{item.product_name}}</div>
                    <div class="types_type">{{item.artName}}  /  {{item.product_type}}</div>
                    <div class="product_count boxS">
                        <div class="proCount">数量：{{item.product_num}}</div>
                        <div class="proPrice">￥{{item.product_price}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fillInOrder_orderInfo">
            <div class="orderInfo_invoice boxS">
                <div class="orderInfo_title">票据凭证</div>
                <mt-switch v-model="isInvoice" @change="chooseinVoice"></mt-switch>
            </div>
            <div class="orderInfo_tellUs"> 
                <textarea name="tellUsInfo" id="feedBack" cols="30" rows="10" placeholder="有什么想说的..."></textarea>
            </div>
        </div>
        <div class="footerInfo boxS">
            <div class="footerInfo_totalPrice boxC">待支付金额&nbsp;&nbsp;&nbsp;&nbsp; <span class="boxC">￥ {{totalPrice}}</span>  </div>
            <div id="goPay" class="boxC" @click="goPay"> <router-link class="goPay_item" :to="{path:'',name:''}"> 去支付</router-link></div>
        </div>
        <div id="fillOrderBack">
            <el-dialog width="80%" top="45%" :visible.sync="fillOrderBackModalShow" :before-close="handleClose" title="确定要放弃吗？">
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="fillOrderBack">确定</el-button>
                <el-button @click="handleClose">我再考虑一下</el-button>
            </span>
            </el-dialog>
        </div>
        <div id="isInvoiceModal">
            <el-dialog width="60%" top="45%" :visible.sync="isInvoice" title="票据信息">
                <div class="chooseType">
                    <div class="boxS" style="margin-bottom:20px;">
                        <div class="chooseInvoiceTitle">个人</div>
                        <mu-radio v-model="chooseInvoiceType" value='0'></mu-radio>
                    </div>
                    <div class="boxS">
                        <div class="chooseInvoiceTitle">公司</div>
                        <mu-radio v-model="chooseInvoiceType" value="1"></mu-radio>
                    </div>
                    <div class="componyInfo" v-if="chooseInvoiceType=='1'">
                       <input type="text" placeholder="抬头" v-model="invoiceTitle">
                       <input type="text" placeholder="税号" v-model="invoiceNum">
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="invoiceCancel">取消</el-button>
                    <el-button type="success" @click="invoiceSubmit">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
let wx = require('weixin-js-sdk');
export default {
  data() {
    return {
      baseUrl: this.HOST,
      urlParam: "index.php?r=checkout/process&source=miniProgram",
      isInvoice: false,
      oldUrl: "",
      deliveryId: "",
      cartId: "",
      chooseInvoiceType: "0",
      isInvoices: true, 
      invoiceTitle: "",
      invoiceNum: "",
      user_id:''
    };
  },
  mounted() {
    this. user_id = this.$cookies.get("userId");
    var cartIds = this.$route.params.cartId;
    if (cartIds) {
      sessionStorage.setItem("cartId", cartIds);
    }
    // console.log(this);
    this.cartId = sessionStorage.getItem("cartId");
    var url =
      this.baseUrl +
      this.urlParam +
      "&user_id=" +
      this.user_id +
      "&cart_id=" +
      this.cartId;
    // console.log(this.deliveryId);
    var deliveryId = sessionStorage.getItem("deliveryId");
    if(deliveryId){
      this.deliveryId = deliveryId;
    }
    
    var param = { url: url, deliveryId: deliveryId ,baseUrl:this.HOST};
    this.$store.dispatch("getFillInOrderList", param);
    // console.log(sessionStorage.getItem("deliveryId"));
  },
  methods: {
    chooseinVoice() {
      // console.log(this.isInvoice);
    },
    handleClose() {
      this.$store.commit("changeFillOrderBackModalShow", false);
    },
    fillOrderBack() {
      this.$router.go(-1);
      this.$store.commit("changeFillOrderBackModalShow", false);
    },
    invoiceCancel() {
      this.isInvoice = false;
      this.invoiceNum = "";
      this.invoiceTitle = "";
      this.chooseInvoiceType = "0";
    },
    invoiceSubmit() {
      this.isInvoice = false;
    },
    goPay() {
      var deliveryId = this.deliveryId,
        invoiceTitle = this.invoiceTitle,
        invoiceNum = this.invoiceNum,
        userId = this.user_id,
        cartIds = this.cartId;
      var data = {
        address_id: deliveryId,
        invoice_title: invoiceTitle,
        invoice_duty: invoiceNum,
        invoice_type: "纸质发票",
        invoice_content: 1,
        user_id: userId,
        carts_id: cartIds
      };
      // console.log(deliveryId, invoiceTitle, invoiceNum, userId, cartIds);
      if (deliveryId && userId && cartIds) {
        this.axios({
          url: this.HOST + "index.php?r=checkout/placeOrder&source=miniProgram",
          method: "post",
          data: data,
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              ret = ret.slice(0, -1); // 去掉最后的空行
              return ret;
            }
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.data.success && res.data.order_no) {
            this.axios({
              url: this.HOST + "index.php?r=checkout/done&source=miniProgram",
              method:'post',
              data: { order_no: res.data.order_no },
              transformRequest: [
                function(data) {
                  let ret = "";
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      "=" +
                      encodeURIComponent(data[it]) +
                      "&";
                  }
                  ret = ret.slice(0, -1); // 去掉最后的空行
                  return ret;
                }
              ],
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res=>{
                // console.log(res)
                //微信支付方法（点击按键调用）
                
                /*
                微信支付方法
                获取微信加签信息
                @param{data}:获取的微信加签
                @param{cb}:成功回调
                */
              //  let data = {timestamp : res.data.timeStamp,nonceStr : res.data.nonceStr,signature : res.data.signType,packages : res.data.package,paySign : res.data.paySign}
                // let wexinPay = (data,cb,errorCb) => {
                  let appId = 'wx486e3f0f0a534161';
                  let timestamp = res.data.timeStamp;
                  let nonceStr = res.data.nonceStr;
                  let signature = res.data.signType;
                  let packages = res.data.package;
                  let paySign = res.data.paySign;
                  wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature, // 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });
                  wx.ready(function(){
                    wx.chooseWXPay({
                      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                      package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: paySign, // 支付签名
                      success: function(res) {
                        // 支付成功后的回调函数
                        // console.log(res)
                        cb(res);
                      },
                      fail:function(res){
                        errorCb(res);
                      }
                    });
                  });
                  wx.error(function(res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    /*alert("config信息验证失败");*/
                    });
                // }
                // export default wexinPay;
            })
          }
          // console.log(res);
        });
      }
    }
  },
  computed: mapState({
    cartLists: state => state.fillInOrder.cartLists,
    totalPrice: state => state.fillInOrder.totalPrice,
    isDefaultAddress: state => state.fillInOrder.isDefaultAddress,
    defaultAddress: state => state.fillInOrder.defaultAddress,
    allAdderss: state => state.fillInOrder.allAdderss,
    fillOrderBackModalShow: state => state.fillInOrder.fillOrderBackModalShow,
  })
};
</script>
<style>
#fillInOrder {
  margin-top: 56px;
  margin-bottom: 112px;
  padding: 0 24px;
}
#fillInOrder .fillInOrder_address {
  width: 100%;
  height: 120px;
  margin: 40px 0;
  background-image: linear-gradient(90deg, #19c0a3 0%, #74c01d 100%);
}
#fillInOrder .fillInOrder_address_text {
  margin-left: 12px;
  font-size: 32px;
  color: #ffffff;
  line-height: 40px;
}
#fillInOrder .fillInOrder_hasAddress {
  width: 100%;
  margin: 40px 0;
  padding: 36px 24px;
  background-image: linear-gradient(90deg, #19c0a3 0%, #74c01d 100%);
}
#fillInOrder .fillInOrder_address_detail {
  margin-left: 20px;
}
#fillInOrder .address_detail_deliveryInfo {
  margin-bottom: 18px;
  font-size: 28px;
  color: #ffffff;
  line-height: 44px;
  text-align: left;
}
#fillInOrder .adderss_detail_userInfo_userName {
  margin-right: 48px;
  font-size: 28px;
  color: #ffffff;
  font-weight: 100;
}
#fillInOrder .address_detail_userInfo_userTell {
  font-size: 28px;
  color: #ffffff;
  font-weight: 100;
}
#fillInOrder .fillInOrder_proInfo {
  padding: 0 24px;
  background: #fff;
}
#fillInOrder .item_productInfo {
  width: 100%;
  padding: 36px 0;
  border-bottom: 2px solid #ededed;
}
#fillInOrder .item_productInfo:last-child {
  border-bottom: none;
}
#fillInOrder .productInfo_img {
  width: 188px;
  height: 188px;
  overflow: hidden;
}
#fillInOrder .productInfo_types {
  width: 100%;
  margin-left: 32px;
  text-align: left;
}
#fillInOrder .types_proName {
  font-size: 32px;
  color: #333333;
  line-height: 32px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
#fillInOrder .types_type {
  margin: 20px 0;
  font-size: 28px;
  color: #666666;
  line-height: 44px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
#fillInOrder .proCount {
  font-size: 28px;
}
#fillInOrder .proPrice {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}
#fillInOrder .fillInOrder_orderInfo {
  width: 100%;
  padding: 36px 24px;
  margin-top: 20px;
  background: #fff;
}
#fillInOrder .orderInfo_invoice {
  padding-bottom: 36px;
  border-bottom: 2px solid #ededed;
}
#fillInOrder .orderInfo_title {
  font-size: 32px;
  color: #333333;
  line-height: 32px;
}
#fillInOrder .orderInfo_tellUs {
  padding-top: 36px;
}
#fillInOrder #feedBack {
  width: 100%;
  height: 144px;
  padding: 28px 24px;
  background: #fafafa;
  font-size: 32px;
  color: #333;
  line-height: 48px;
}
#fillInOrder #feedBack::-webkit-input-placeholder {
  font-size: 32px;
  color: #cccccc;
  line-height: 48px;
}
#fillInOrder .mint-switch-input:checked + .mint-switch-core {
  background: #19c0a3;
}
#fillInOrder .mint-switch-input:checked + .mint-switch-core::after {
  transform: translateX(40px);
}
#fillInOrder .mint-switch-core {
  width: 100px;
  height: 60px;
  border-top-left-radius: 120px;
  border-bottom-left-radius: 120px;
  border-top-right-radius: 120px;
  border-bottom-right-radius: 120px;
}
#fillInOrder .mint-switch-core::before {
  width: 100px;
  height: 60px;
  border-top-left-radius: 120px;
  border-bottom-left-radius: 120px;
  border-top-right-radius: 120px;
  border-bottom-right-radius: 120px;
  background: #ddd;
}
#fillInOrder .mint-switch-core::after {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
#fillInOrder .footerInfo {
  width: 100%;
  height: 104px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #525252;
}
#fillInOrder .footerInfo_totalPrice {
  padding: 36px 0 36px 28px;
  font-size: 32px;
  color: #ffffff;
  line-height: 32px;
}
#fillInOrder .footerInfo_totalPrice span {
  font-size: 40px;
  line-height: 40px;
  color: #fff;
}
#fillInOrder #goPay {
  width: 200px;
  height: 104px;
  background: #ed5b5b;
}
#goPay .goPay_item {
  font-size: 32px;
  color: #ffffff;
  line-height: 32px;
}
/* 弹窗样式 */
#fillInOrder .el-dialog__title {
  margin-top: 20px;
  font-size: 32px;
  color: #333;
  line-height: 32px;
}
#fillInOrder .el-dialog__footer {
  width: 100%;
  height: 96px;
  padding: 0;
  text-align: left;
}
#fillInOrder .el-dialog__footer .dialog-footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#fillInOrder #fillOrderBack .el-dialog__footer .dialog-footer button {
  width: 50%;
  height: 100%;
}
#fillInOrder #fillOrderBack .el-button--success {
  background: #fff6f6;
  margin: 0;
  padding: 0;
  font-size: 32px;
  line-height: 32px;
  color: #333;
}
#fillInOrder #fillOrderBack .el-button--default {
  margin: 0;
  padding: 0;
  background: #ed5b5b;
  font-size: 32px;
  line-height: 32px;
  color: #fff;
}
/* 发票 */
#fillInOrder #isInvoiceModal .el-dialog {
  background: #f6f6f6;
}
#fillInOrder .chooseInvoiceTitle {
  font-size: 28px;
  color: #333;
  line-height: 28px;
}
#fillInOrder .componyInfo {
  margin-top: 60px;
}
#fillInOrder .componyInfo input {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  border: 2px solid #e1e1e1;
  padding-left: 16px;
  padding-top: 10px;
  box-sizing: border-box;
}
#fillInOrder #isInvoiceModal .el-dialog__footer .dialog-footer button {
  width: 50%;
  height: 100%;
  background: #fff;
  font-size: 32px;
  line-height: 32px;
  color: #333;
}
#fillInOrder #isInvoiceModal .el-button--success {
  margin: 0;
  padding: 0;
  border-left: 2px solid #ededed;
}
#fillInOrder #isInvoiceModal .el-button--default {
  margin: 0;
  padding: 0;
}
</style>
