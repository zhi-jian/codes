<template>
    <div id="ficitiousDetail">
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
                            <img :src="baseUrl+ficitiousDetail.info.products_img_url" width="100%">
                        </mu-carousel-item>
                        <mu-carousel-item v-for="(item,idx) in listImg" :key="idx">
                            <img :src="baseUrl+item" width="100%">
                        </mu-carousel-item>
                    </mu-carousel>
                </div>
                <div id='proInfo'>
                    <div >
                        <div class='proInfo-name'>{{ficitiousDetail.info.products_name}}</div>
                        <div class='proInfo-ac'>
                        <div class='boxStart'>
                            <div class='ac-zy'>自营</div>
                            <div class='ac-from'>由上兿芭莎进行开发设计</div>
                        </div>
                        </div>
                        <div class='proInfo-type'>{{ficitiousDetail.user_info.user_nick_name}}(原作作者) / {{ficitiousDetail.theme_info.theme_name}}</div>
                        <!-- <div class='proInfo-price boxC'>价格：
                            <div>￥{{ficitiousDetail.info.products_price}}</div>
                        </div> -->
                    </div>
                </div>
                <div class='buyhr'></div>
            </div>
            <div id='designer'>
                <div class='designer_title boxS' style='margin-bottom:20px;'>
                    <div style='font-weight:bold;'>设计师信息</div>
                    <img src='../../static/arrowRight.png' style="width:3px;height:6px;"></img>
                </div>
                <div class='designer_info boxStart'>
                    <div class='designer_info_avatar'>
                        <img :src='baseUrl+ficitiousDetail.designer_info.designer_avatar' style='width:42px;height:42px;border-radius:50%;'></img>
                    </div>
                    <div class='designer_info_text'>
                        <div class='designer_info_name'>{{ficitiousDetail.designer_info.designer_name}}</div>
                        <div class='designer_info_introduce'>{{ficitiousDetail.designer_info.designer_resume}}</div>
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
                <div class='tjpro-title boxC'>／／ {{ficitiousDetail.designer_info.designer_name}}的其他衍生品设计／／</div>
                <div class='tjpro-content'>
                    <div v-for="(item,idx) in ficitiousDetail.other_design" :key="idx" class="tjpro-content-item" v-if="idx<4">
                        <router-link  :to="{path:'ficitiousDetail',name:'ficitiousDetail',params:{id:item.products_id}}" @click.native="thisPage(item.products_id)" v-if="item.products_id!=ficitiousDetail.info.products_id">
                                <div class='tjpro-item-img' style='width:184px;height:184px;overflow:hidden;'>
                                    <img :src="baseUrl+item.products_img_url" style='width:184px;height:184px'></img>
                                    <div class='tjpro-item-canSell boxC' v-if="false">可出售版权</div>
                                </div>
                                <div class='tjpro-item-info-detail'>
                                    <div class='item-info-name'>{{item.products_name}}</div>
                                    <div class='item-info-type_detail'>{{item.artist_name}} / {{item.products_extend_name}}</div>
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
                    <button id='buyNow'> 立即购买</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl: this.HOST,
      active: 0
      //   headerText:'xx'
    };
  },
  mounted() {
    //   sessionStorage.setItem('headerText','衍生品详情')
    window.scroll(0,0)
    var baseUrl = this.HOST;
    // console.log(this);
    var ficitiousId = this.$route.params.id;
    if (ficitiousId.length > 6) {
      ficitiousId = this.$route.params.id.split("product_id=")[1];
    } else {
      ficitiousId = this.$route.params.id;
    }
    var ficitiousDetailParams = { baseUrl: baseUrl, proId: ficitiousId };
    this.$store.dispatch("ficitiousDetail", ficitiousDetailParams);
    // this.$data.headerText = this.ficitiousDetail.info.product_name
  },
  methods: {
    changeActive(index) {
      this.active = index;
    },
    thisPage(id) {
      window.scroll(0,0)
      var baseUrl = this.HOST;
      var ficitiousId = id;
      var ficitiousDetailParams = { baseUrl: baseUrl, proId: ficitiousId };
      this.$store.dispatch("ficitiousDetail", ficitiousDetailParams);
    },
    showCustomzied(){
      this.$store.commit('changecustomziedModal',true)
    }
  },
  computed: mapState({
    ficitiousDetail: state => state.ficitiousDetail.ficitiousDetail,
    listImg: state => state.ficitiousDetail.listImg,
    detailImg: state => state.ficitiousDetail.detailImg,
    extendInfo: state => state.ficitiousDetail.extendList,
    isExtend: state => state.ficitiousDetail.isExtend
  })
};
</script>
<style>
#ficitiousDetail {
  margin-top: 56px;
}
#proImg {
  width: 100%;
  position: relative;
  border-top: 1px solid rgba(237, 237, 237, 0.5);
  border-bottom: 1px solid rgba(237, 237, 237, 0.5);
}
#ficitiousDetail .mu-carousel-indicators {
  justify-content: flex-end;
  margin-right: 24px;
}

#ficitiousDetail .mu-carousel-indicators .mu-icon-button {
  width: 12px;
  height: 12px;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
#ficitiousDetail .mu-carousel-indicator-button__active .mu-ripple-wrapper {
  width: 12px;
  height: 12px;
  border-radius: 0;
  background: #000;
}
#ficitiousDetail .mu-carousel {
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

#ficitiousDetail .detailsImg {
  width: 100%;
}

#ficitiousDetail .detailsImg img {
  width: 100%;
}

#ficitiousDetail .proInfo-ac {
  display: flex;
  justify-content: flex-start;
}

#ficitiousDetail .proInfo-ac {
  margin: 40px 0;
}
#ficitiousDetail .ac-zy {
  width: 60px;
  height: 24px;
  border: 2px solid #19c0a3;
  color: #19c0a3;
  font-size: 24px;
  line-height: 24px;
  margin-right: 18px;
}

#ficitiousDetail .ac-from {
  color: #999;
}

#ficitiousDetail .proInfo-name {
  font-size: 40px;
  color: #333;
  line-height: 40px;
  font-weight: bold;
}

#ficitiousDetail .proInfo-bq {
  font-size: 28px;
  color: #999;
  line-height: 28px;
}

#ficitiousDetail .proInfo-type {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  text-align: left;
}

#ficitiousDetail .proInfo-price {
  font-size: 28px;
  color: #333;
  line-height: 40px;
  margin: 40px 0;
  justify-content: flex-start;
}

#ficitiousDetail .proInfo-price div {
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
  margin-top: 40px;
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

#ficitiousDetail .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 0;
  background: #f6f6f6;
}

#ficitiousDetail .tjpro-content-item {
  margin-bottom: 14px;
}

#ficitiousDetail .tjpro-item-info-detail {
  width: 368px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}

#ficitiousDetail .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
}

#ficitiousDetail .tjpro-item-img img {
  width: 368px;
  height: 368px;
}

#ficitiousDetail .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}

#ficitiousDetail .item-info-name {
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

#ficitiousDetail .item-info-type_detail {
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

#ficitiousDetail .item-info-price {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}

#ficitiousDetail #bottomBtn {
  width: 100%;
  height: 98px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

#ficitiousDetail .btn button {
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

#ficitiousDetail .btn button::after {
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

#ficitiousDetail #customzied {
  width: 462px;
  background: #6984cf;
}

#ficitiousDetail #buyNow {
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
/* 设计师信息 */

#designer {
  margin-top: 16px;
  padding: 32px 24px 40px 24px;
  font-size: 28px;
  line-height: 28px;
  background: #fff;
}

.designer_info_avatar {
  width: 84px;
  height: 84px;
  margin-right: 34px;
  border-radius: 50%;
  overflow: hidden;
}

.designer_info_name {
  margin-bottom: 16px;
  color: #666;
  text-align: left;
}

.designer_info_introduce {
  font-size: 24px;
  line-height: 24px;
  color: #999;
  display: inline-block;
  white-space: nowrap;
  width: 572px;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
