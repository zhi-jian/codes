<template>
    <div id="productDetail">
        <div >
            <div id='main' style='background:#fff;text-align:center;width:100%;'>
                <div id='proImg'>
                    <mu-carousel :active="active">
                        <mu-icon value="arrow_back" slot="left"></mu-icon>
                        <mu-icon value="arrow_forward" slot="right"></mu-icon>
                        <template slot="indicator" slot-scope="{ index, active }">
                            <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
                                <span class="rect-indicator"></span>
                            </mu-button>
                        </template>
                        <mu-carousel-item>
                            <img :src="baseUrl+productDetail.info.products_img_url" width="100%" height="100%">
                        </mu-carousel-item>
                        <mu-carousel-item v-for="(item,idx) in listImg" :key="idx">
                            <img :src="baseUrl+item" width="100%" height="100%">
                        </mu-carousel-item>
                    </mu-carousel>
                </div>
                <div id='proInfo'>
                    <div >
                        <div class='proInfo-name'>{{productDetail.info.products_name}}</div>
                        <div class='proInfo-ac'>
                        <div class='boxStart'>
                            <div class='ac-zy'>自营</div>
                            <div class='ac-from'>由上兿芭莎进行开发设计</div>
                        </div>
                        </div>
                        <div class='proInfo-type'>{{productDetail.user_info.user_nick_name}}(原作作者) / {{productDetail.theme_info.theme_name}}</div>
                        <div class='proInfo-price boxC'>价格：
                            <div>￥{{productDetail.info.products_price}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='yspyz' class='boxS' v-if="isExtend">
                <div class='yspyz-title'>衍生品原作</div>
                <div >
                    <router-link :to="{path:'detail',name:'detail',params:{id:extendInfo.products_id}}">
                        <div class='boxStart'>
                        <div style='color:#666;margin-right:20px;'>{{extendInfo.products_name}}</div>
                        <div>
                            <img src='../../static/arrowRight.png' style="width:6px;height:11px;"></img>
                        </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div id='tjpro' style='margin-bottom:50px;padding-bottom:0;'>
                <div class='tjpro-title boxC'>／／ 推荐作品 ／／</div>
                <div class='tjpro-content'>
                    <div v-for="(item,idx) in productDetail.recommend" :key="idx" class="tjpro-content-item">
                        <router-link  :to="{path:'productDetail',name:'productDetail',params:{id:item.products_id}}" @click.native="thisPage(item.products_id)">
                                <div class='tjpro-item-img' style='width:184px;height:184px;overflow:hidden;'>
                                    <img :src="baseUrl+item.products_img_url" style='width:184px;height:184px'></img>
                                    <div class='tjpro-item-canSell boxC' v-if="false">可出售版权</div>
                                </div>
                                <div class='tjpro-item-info-detail'>
                                    <div class='item-info-name'>{{item.products_name}}</div>
                                    <div class='item-info-type_detail'>{{item.products_length}} / {{item.products_creation_time}}</div>
                                </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div id='bottomBtn' class='boxS'>
                <div class='btn boxC' style='width:100%;'>
                <div class='btn-customzied'>
                    <button id='customzied' @click="showCustomzied">我要定制</button>
                </div>
                <div class='btn-buyNow'>
                    <button id='buyNow' @click="showBuyNowModal"> 立即购买</button>
                </div>
                </div>
            </div>
        </div>
        <div id="buyNowModal">
          <el-dialog
            title="选择购买数量"
            :visible.sync="isBuyNowModal"
            width="90%"
            top="60%"
            center>
            <div id="changeProductCount">
              <div class="changeProductCount boxC">
                <div id="productCountMinus" class="boxC" @click="countMinus">
                  <img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/detail/minus@3x.png" alt="" width="22px" height="6px" style="vertical-align:middle">
                </div>
                <div id="productCountBox">
                  <input type="text" id="productCountBoxInput" v-model="productDetail.info.products_stock_number>0?buyCount:'卖光了'">
                  <!-- <input type="text" v-model="productDetail.info.products_stock_number"> -->
                </div>
                <div id="productCountAdd" class="boxC" @click="countAdd">
                  <img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/detail/add@3x.png" alt="" width="22px" height="23px" style="vertical-align:middle">
                </div>
              </div>
            </div>
            <div style="font-size:12px;color:#999;line-height:12px;text-align:center;margin-top:30px;" v-if="">剩余数量   {{productDetail.info.products_stock_number>0?productDetail.info.products_stock_number-buyCount:productDetail.info.products_stock_number}}</div>
            <span slot="footer" class="dialog-footer boxS">
              <el-button @click="addBuyCart(productDetail.info.products_id)" id="addCart">加入购物车</el-button>
              <el-button type="primary" @click="goOnFillInOrder(productDetail.info.products_id)" id="goOnFillOrder">继续填写订单</el-button>
            </span>
          </el-dialog>
        </div>
        <div id="addCartSuc">
          <el-dialog
            :visible.sync="isAddCart"
            width="90%"
            top="60%"
            center>
            <div id="addCartModal">
              <div class="addCartModal boxC">
               购物车添加成功
              </div>
            </div>
            <span slot="footer" class="dialog-footer boxS">
              <el-button @click="isAddCart = false">取 消</el-button>
              <el-button type="primary" @click="isAddCart = false">确 定</el-button>
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
export default {
  data() {
    return {
      baseUrl: this.HOST,
      active: 0,
      isBuyNowModal: false,
      buyCount: 1,
      stockNumbers: 0,
      isAddCart: false,
      user_id:''
      //   headerText:'xx'
    };
  },
  route: {
    canReuse: false
  },
  created() {
    this.stockNumbers = this.stockNumber;
  },
  mounted() {
    var baseUrl = this.HOST;
    this.user_id = this.$cookies.get("userId")
    var productId = this.$route.params.id;
    if (productId.length > 6) {
      productId = this.$route.params.id.split("product_id=")[1];
    } else {
      productId = this.$route.params.id;
    }
    window.scroll(0,0)
    var proDetailParams = { baseUrl: baseUrl, proId: productId };
    this.$store.dispatch("getProductDetail", proDetailParams); //这儿是详情页加载去发请求  把商品详情的数据拿回来了
  },
  methods: {
    changeActive(index) {
      this.active = index;
    },
    thisPage(id) {
      //这儿是点击下面推荐的其他商品发请求取数据
      window.scroll(0,0)
      this.buyCount = 1;
      var baseUrl = this.HOST;
      var productId = id;
      var proDetailParams = { baseUrl: baseUrl, proId: productId };
      this.$store.dispatch("getProductDetail", proDetailParams);
    },
    showCustomzied() {
      this.$store.commit("changecustomziedModal", true);
    },
    showBuyNowModal() {
      this.isBuyNowModal = true;
    },
    goOnFillInOrder(pid) {
      if (this.stockNumber > 0) {
        if (this.isLogin) {
          this.isBuyNowModal = false;
          this.axios
            .get(
              this.HOST +
                "index.php?r=cart/add&source=miniProgram&product_id=" +
                pid +
                "&user_id=" +
                this.user_id +
                "&num=" +
                this.buyCount
            )
            .then(res => {
              // console.log(res);
              if (res.data.success) {
                this.$router.push({
                  path: "fillInOrder",
                  name: "fillInOrder",
                  params: { cartId: res.data.params.data.cart_id }
                });
              }
            });
        } else {
          this.$router.push({ path: "my", name: "my" });
        }
      }
    },
    addBuyCart(pid) {
      if (this.stockNumber > 0) {
        if (this.isLogin) {
          this.isBuyNowModal = false;
          this.axios
            .get(
              this.HOST +
                "index.php?r=cart/add&source=miniProgram&product_id=" +
                pid +
                "&user_id=" +
                this.user_id +
                "&num=" +
                this.buyCount
            )
            .then(res => {
              // console.log(res);
              if (res.data.success) {
                this.isAddCart = true;
              }
            });
        } else {
          this.$router.push({ path: "my", name: "my" });
        }
      }
    },
    countMinus() {
      var buyCount = this.buyCount;
      if (buyCount > 1) {
        buyCount--;
      }
      this.buyCount = buyCount;
    },
    countAdd() {
      var buyCount = this.buyCount;
      if (buyCount < this.stockNumber) {
        buyCount++;
      }
      this.buyCount = buyCount;
    }
  },
  computed: mapState({
    //这些是拿到的数据
    productDetail: state => state.productDetail.productDetail,
    listImg: state => state.productDetail.listImg,
    detailImg: state => state.productDetail.detailImg,
    extendInfo: state => state.productDetail.extendList,
    isExtend: state => state.productDetail.isExtend,
    stockNumber: state => state.productDetail.stockNumber
  })
};
</script>
<style>
#productDetail {
  margin-top: 56px;
}
#proImg {
  width: 100%;
  position: relative;
  border-top: 1px solid rgba(237, 237, 237, 0.5);
  border-bottom: 1px solid rgba(237, 237, 237, 0.5);
}
#productDetail .mu-carousel-indicators {
  justify-content: flex-end;
  margin-right: 24px;
}

#productDetail .mu-carousel-indicators .mu-icon-button {
  width: 12px;
  height: 12px;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
#productDetail .mu-carousel-indicator-button__active .mu-ripple-wrapper {
  width: 12px;
  height: 12px;
  border-radius: 0;
  background: #000;
}
#productDetail .mu-carousel {
  width: 100%;
  height: 750px;
}
#proInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-left: 24px;
  justify-content: flex-start;
  align-items: flex-start;
  background: #fff;
  box-sizing: border-box;
}

#productDetail .detailsImg {
  width: 100%;
}

#productDetail .detailsImg img {
  width: 100%;
}

#productDetail .proInfo-ac {
  display: flex;
  justify-content: flex-start;
}

#productDetail .proInfo-ac {
  margin: 40px 0;
}
#productDetail .ac-zy {
  width: 60px;
  height: 24px;
  border: 2px solid #19c0a3;
  color: #19c0a3;
  font-size: 24px;
  line-height: 24px;
  margin-right: 18px;
}

#productDetail .ac-from {
  color: #999;
}

#productDetail .proInfo-name {
  font-size: 40px;
  color: #333;
  line-height: 40px;
  font-weight: bold;
}

#productDetail .proInfo-bq {
  font-size: 28px;
  color: #999;
  line-height: 28px;
}

#productDetail .proInfo-type {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  text-align: left;
}

#productDetail .proInfo-price {
  font-size: 28px;
  color: #333;
  line-height: 40px;
  margin: 40px 0;
  justify-content: flex-start;
}

#productDetail .proInfo-price div {
  color: #f00;
  font-size: 40px;
}

#buyer {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  background: #fff;
  box-sizing: border-box;
}

.buyer-info {
  display: flex;
  justify-content: flex-start;
  background: #f9f9f9;
  padding: 24px;
  align-items: center;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-logo {
  margin-right: 32px;
  background: #fff;
  padding: 18px;
}

.info-logo img {
  width: 100px;
  height: 100px;
}

.buyerTitle {
  font-size: 28px;
  color: #999;
  line-height: 28px;
  padding-bottom: 20px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
}

.active {
  margin-right: 14px;
}

.info-name {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  margin-bottom: 20px;
}

.info-interduce {
  font-size: 24px;
  color: #999;
  line-height: 36px;
}

.buyhr {
  width: 702px;
  height: 2px;
  background: #ededed;
  margin-bottom: 40px;
  margin-left: 24px;
}

/* 商品属性 */

#proAttribute {
  padding-left: 4px;
  padding-bottom: 40px;
}

.attr_item {
  width: 124px;
  height: 124px;
  margin-left: 20px;
  border: 1px solid #333;
  box-sizing: border-box;
}

#yspyz {
  position: relative;
  margin-top: 16px;
  padding: 32px 24px;
  background: #fff;
  font-size: 28px;
  line-height: 28px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
}

.yspyz-title {
  color: #333;
  font-weight: bold;
}

#ysPro {
  width: 100%;
  margin-top: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-sizing: border-box;
}

.title-hr {
  width: 6px;
  height: 28px;
  background: #ed5b5b;
}

.title-type {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  margin: 0 20px;
}

.pro-count {
  width: 56px;
  height: 32px;
  border: 2px solid #ed5b5b;
  font-size: 24px;
  color: #ed5b5b;
  line-height: 24px;
}

/* 滑动图 */

.swiper-tab {
  text-align: center;
}

.swiper-tabT {
  text-align: center;
  position: absolute;
  bottom: 20px;
  right: 24px;
}

.swiper-tab-list {
  font-size: 30px;
  display: inline-block;
  width: 40px;
  height: 4px;
  background: #e2e2e2;
  margin-right: 24px;
}

.swiper-tab-listT {
  font-size: 30px;
  display: inline-block;
  width: 12px;
  height: 12px;
  background: rgba(0, 0, 0, 0.2);
  margin-right: 24px;
  opacity: 0.2;
}

.on {
  background: #25b5d6;
}

.onT {
  background: #000;
  opacity: 1;
}

.swiper-box {
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* margin-top: 34px; */
}

.swiper-box div {
  text-align: center;
  height: 100%;
}

.tuwen {
  width: 100px;
  height: 100px;
  border: 1px solid #e1e1e1;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  color: #333;
  font-size: 24px;
  padding: 18px 24px;
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
  left: 40px;
}

.item-img {
  height: 100%;
}

.item-img img {
  width: 100%;
  height: 100%;
}

.pro-item {
  position: relative;
}

.pro-item .item-info {
  width: 100%;
  height: 68px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  position: absolute;
  bottom: 0;
  align-items: center;
  font-size: 28px;
  line-height: 28px;
  padding: 0 28px;
  box-sizing: border-box;
}

.tjpro-title {
  margin-top: 32px;
  margin-bottom: 28px;
  font-size: 28px;
  color: #666;
  line-height: 28px;
}

#productDetail .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 0;
  background: #f6f6f6;
}

#productDetail .tjpro-content-item {
  margin-bottom: 14px;
}

.tjpro-item-info-detail {
  width: 368px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}

.tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
}

.tjpro-item-img img {
  width: 368px;
  height: 368px;
}

.tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}

.item-info-name {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  display: inline-block;
  white-space: nowrap;
  width: 320px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
}

.item-info-type_detail {
  font-size: 24px;
  color: #999;
  line-height: 26px;
  margin: 16px 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.item-info-price {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}

#productDetail #bottomBtn {
  width: 100%;
  height: 98px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

#productDetail .btn button {
  height: 98px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: none;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}

#productDetail .btn button::after {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98px;
  border-radius: 0;
  border: none;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}

#productDetail #customzied {
  width: 462px;
  background: #6984cf;
}

#productDetail #buyNow {
  width: 290px;
  background: #19c0a3;
}

#bqDetail {
  width: 100%;
  height: 88px;
  opacity: 0.8;
  background-img: linear-gradient(270deg, #74c01d 0%, #19c0a3 100%);
  padding: 0 24px;
  box-sizing: border-box;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
  position: fixed;
  bottom: 98px;
}

.show-btn {
  margin-top: 100px;
  color: #2c2;
}

/* 立即购买弹窗 */
#productDetail .el-dialog__header {
  padding-top: 30px;
}
#productDetail .el-dialog__title {
  font-size: 32px;
  color: #030303;
  text-align: center;
}

#productDetail #productCountBoxInput {
  width: 160px;
  height: 80px;
  background: #f3f3f3;
  font-size: 40px;
  line-height: 40px;
  box-sizing: border-box;
  color: #333;
  margin: 0 30px;
  text-align: center;
  border: 2px solid #e1e1e1;
}
#productDetail #productCountMinus,
#productDetail #productCountAdd {
  width: 80px;
  height: 80px;
}

#productDetail .el-dialog--center .el-dialog__footer {
  width: 100%;
  height: 86px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#productDetail .el-dialog--center .el-dialog__footer .dialog-footer {
  width: 100%;
  height: 100%;
}
#productDetail .el-dialog--center .el-dialog__footer button {
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  line-height: 32px;
}
#productDetail #addCart {
  color: #333;
  background: #e1e1e1;
}
#productDetail #goOnFillOrder {
  background: #19c0a3;
  color: #fff;
}
#productDetail .addCartModal {
  font-size: 32px;
  color: #333;
  line-height: 32px;
  font-weight: bold;
}
</style>
