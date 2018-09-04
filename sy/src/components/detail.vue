<template>
    <div id="detail">
        <div id='main' style='background:#fff;text-align:center;height:100%'>
            <div id='proImg' style=''>
                <div class='mainImg' style='height:100%'>
                    <img :src='baseUrl+detail.info.products_img_url' style='width:100%;height:100%;'></img>
                </div>
            </div> 
            <div id='proInfo'>
                <div class='proInfo-name'>{{detail.info.products_name}}</div>
                <div class='proInfo-ac'>
                    <div class='proInfo-art'>作者：{{detail.user_info.user_nick_name}}</div>
                    <!-- <div class='proInfo-bq' >已售出IP版权</div> -->
                </div>
                <div class='proInfo-type'>{{detail.category_info.category_name}} / {{detail.info.products_length}} / {{detail.info.products_creation_time}}</div>
            </div>
            <!-- <div id='buyer' >
                <div w>
                    <div class='buyerTitle'>购买此作品IP版权的合作商</div>
                    <div class='buyer-info'>
                        <div class='info-logo boxC'>
                            <img src=''></img>
                        </div>
                        <div class='info-content'>
                            <div class='info-name'></div>
                            <div class='info-interduce'></div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class='buyhr'></div>
            <div id='art'>
                <div class='art_content'>
                    <div class='art_info boxS'>
                        <router-link  :to="{path:'detail',name:'detail',params:{id:''}}" class='boxS'>
                            <img :src='baseUrl+detail.user_info.user_avatar' class='tx'></img>
                            <div class='name'>{{detail.user_info.user_nick_name}}</div>
                            <div class='procount boxC'>{{IPCount.length}}件作品</div>
                            <div class='yspcount boxC' v-if="proCount.length>0">{{proCount.length}}个衍生品</div>
                        </router-link>
                    </div>
                    <div class='art_introduce'>
                        <div class='art_introduce_resume'>{{artistResume}}</div>
                        <div class='art_introduce_exhibition'>
                            <div v-for="(item,idx) in artistExhibition" :key="idx" v-if="artistExhibition">
                                <div>{{item}}</div>
                            </div>
                            <div v-else-if=""  class='art_introduce_exhibition' style="color:#bbb;">艺术家展览未知</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='detailImg' v-if="detailImgShow">
                <div class='d_title'>
                    <div class='d_title_icon'></div>
                    <div class='d_title_text'>IP细节展示</div>
                </div>
                <div class='detailImg_content'>
                    <div v-for="(item,idx) in detailsImg">
                        <div><img :src='baseUrl + item' style='width:351px;'></img></div>
                    </div>
                </div>
            </div>
            <div id='artEvent' v-if="isArtistEventShow">
                <div class='d_title'>
                    <div class='d_title_icon'></div>
                        <div class='d_title_text boxS'>
                            艺术家大事件
                        <div class='d_title_text_dot'></div>
                        <div class='d_title_text_artName'>{{detail.user_info.user_nick_name}}</div>
                    </div>
                </div>
                <div class='artEvent_content'>{{artistEvent}}</div>
            </div>
            <!-- <div id='ysPro' style='' >
                <div class='pro-title boxS'>
                    <div class='title-left boxS'>
                    <div class='title-hr'></div>
                    <div class='title-type'>作品衍生品</div>
                    <div class='pro-count boxC'></div>
                    </div>
                    <div class='title-arrow'></div>
                </div>
            </div> -->

            <div id='tjpro'>
                <div class='tjpro-title boxC'>／／ 推荐作品 ／／</div>
                <div class='tjpro-content'>
                    <div v-for="(item,idx) in detailOtherProduct" :key="idx">
                        <router-link  :to="{path:'detail',name:'detail',params:{id:item.products_id}}" @click.native="detailThisPage(item.products_id)">
                            <div style='margin-bottom:7px;'>
                            <div class='tjpro-item-img' style='width:184px;height:184px;overflow:hidden;'>
                                <img :src='baseUrl + item.products_img_url' style='width:184px;height:184px'></img>
                                <!-- <div class='tjpro-item-canSell boxC'>可出售版权</div> -->
                            </div>
                            <div class='tjpro-item-info'>
                                <div class='item-info-name'>{{item.products_name}}</div>
                                <div class='item-info-type'>{{item.products_description}} / {{item.products_creation_time}}</div>
                            </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- <div class='detailsImg' style='width:100%;height:100%;'>
                <div wx:for="">
                    <img src='' style='width:90%;height:100%;margin-bottom:50px;'></img>
                </div>
            </div> -->
        </div>
        <div id='bottomBtn' class='boxS'>
            <button  @click="showCustomzied"> IP衍生定制</button>
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
    // sessionStorage.setItem('headerText','作品详情')
    window.scroll(0,0)
    var baseUrl = this.HOST;
    // console.log(this);
    var IPId = this.$route.params.id;
    var detailParams = { baseUrl: baseUrl, IPId: IPId };
    this.$store.dispatch("getDetail", detailParams);
  },
  methods: {
    detailThisPage(id){
      window.scroll(0,0)
      var baseUrl = this.HOST;
      var IPId = id;
      var detailParams = { baseUrl: baseUrl, IPId: IPId };
      this.$store.dispatch("getDetail", detailParams);
    },
    showCustomzied(){
      this.$store.commit('changecustomziedModal',true)
    }
  },
  computed: mapState({
    detail: state => state.detail.detail,
    IPCount:state=>state.detail.IPCount,
    proCount:state=>state.detail.proCount,
    artistResume:state=>state.detail.artistResume,
    artistExhibition:state=>state.detail.artistExhibition,
    detailImgShow:state=>state.detail.detailImgShow,
    detailsImg:state=>state.detail.detailsImg,
    isArtistEventShow:state=>state.detail.isArtistEventShow,
    artistEvent:state=>state.detail.artistEvent,
    detailOtherProduct:state=>state.detail.detailOtherProduct,
  })
};
</script>
<style>
#detail{
    margin-top: 56px;
}
#detail #proImg {
  width: 100%;
}

#detail #proInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-left: 24px;
  padding-bottom: 20px;
  justify-content: flex-start; 
  align-items: flex-start;
  background: #fff;
  box-sizing: border-box;
}

#detail .detailsImg {
  width: 100%;
}

#detail .detailsImg img {
  width: 100%;
}

#detail .proInfo-ac {
  display: flex;
  justify-content: flex-start;
}

#detail .proInfo-ac {
  margin: 40px 0;
}

#detail .proInfo-name {
  font-size: 40px;
  color: #333;
  line-height: 42px;
  font-weight: bold;
}

#detail .proInfo-art, .proInfo-bq {
  font-size: 28px;
  color: #999;
  line-height: 28px;
}

#detail .proInfo-art {
  margin-right: 60px;
}

#detail .proInfo-type {
  font-size: 28px;
  color: #333;
  line-height: 28px;
}

#detail .proInfo-price {
  font-size: 28px;
  color: #333;
  line-height: 40px;
  margin: 40px 0;
  margin-bottom: 0;
}

#detail .proInfo-price div {
  color: #f00;
}

#buyer {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  background: #fff;
  box-sizing: border-box;
}

#detail .buyer-info {
  display: flex;
  justify-content: flex-start;
  background: #f9f9f9;
  padding: 24px;
  align-items: center;
}

#detail .info-content {
  display: flex;
  flex-direction: column;
}

#detail .info-logo {
  margin-right: 32px;
  background: #fff;
  padding: 18px;
}

#detail .info-logo img {
  width: 100px;
  height: 100px;
}

#detail .buyerTitle {
  font-size: 28px;
  color: #999;
  line-height: 28px;
  padding-bottom: 20px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
}

#detail .active {
  margin-right: 14px;
}

#detail .info-name {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  margin-bottom: 20px;
}

#detail .info-interduce {
  font-size: 24px;
  color: #999;
  line-height: 36px;
}

#detail .buyhr {
  width: 702px;
  height: 2px;
  background: #ededed;
  margin: 40px 0;
  margin-left: 24px;
}

#detail #art {
  width: 100%;
  padding: 0 24px;
  margin-bottom: 56px;
  box-sizing: border-box;
}

#detail .art_content {
  padding: 36px 26px 32px 28px;
  box-sizing: border-box;
  background: #fafafa;
}

#detail .art_info {
  justify-content: flex-start;
  margin-bottom: 24px;
}

#detail .art_introduce {
  height: 200px;
  overflow: hidden;
  text-align: left;
  font-size: 24px;
  line-height: 29px;
  color: #333;
}

#detail .art_introduce_resume {
  overflow: hidden;
  display: inline-block; 
	white-space: nowrap;
	width: 650px; 
	overflow: hidden; 
	text-overflow:ellipsis;
}

#detail .art_introduce_exhibition{
  margin-top: 10px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;*/
} 

#detail .art_introduce_exhibition div{
  display: inline-block; 
	white-space: nowrap;
	width: 650px; 
	overflow: hidden; 
	text-overflow:ellipsis;
}

#detail .tx {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}

#detail .name {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  margin-left: 24px;
}

#detail .procount {
  width: 116px;
  height: 44px;
  background: #e8e8e8;
  font-size: 24px;
  color: #999;
  margin-left: 24px;
}

#detail .yspcount {
  width: 116px;
  height: 44px;
  background: #e8e8e8;
  font-size: 24px;
  color: #999;
  margin-left: 16px;
}

#detail .pro {
  overflow: auto;
  justify-content: flex-start;
  padding-left: 24px;
}

#detail .pro>view {
  margin-right: 12px;
}

#detail .pro img {
  width: 148px;
  height: 148px;
}

#detail .pro .more {
  width: 60px;
  height: 148px;
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

#detail .title-hr {
  width: 6px;
  height: 28px;
  background: #ed5b5b;
}

#detail .title-type {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  margin: 0 20px;
}

#detail .pro-count {
  width: 56px;
  height: 32px;
  border: 2px solid #ed5b5b;
  font-size: 24px;
  color: #ed5b5b;
  line-height: 24px;
}

/* 滑动图 */

#detail .swiper-tab {
  text-align: center;
}

#detail .swiper-tab-list {
  font-size: 30px;
  display: inline-block;
  width: 40px;
  height: 4px;
  background: #e2e2e2;
  margin-right: 24px;
}

#detail .on {
  background: #25b5d6;
}

#detail .swiper-box {
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin-top: 34px;
}

#detail .swiper-box view {
  text-align: center;
  height: 100%;
}

#detail .item-img {
  height: 100%;
}

#detail .item-img img {
  width: 100%;
  height: 100%;
}

#detail .pro-item {
  position: relative;
}

#detail .pro-item .item-info {
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

/* ip细节展示 */
#detailImg,#artEvent{
  margin-top: 56px;
  padding: 0 24px;
  box-sizing: border-box;
}

#detail #artEvent{
  margin-top: 0;
}

#detail .d_title{
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 28px;
  margin-bottom: 11px;
}

#detail .d_title_icon{
  width: 8px;
  height: 28px;
  margin-right: 16px;
  background: #333;
}

#detail .d_title_text{
  font-size: 32px;
  line-height: 32px;
  color: #333;
  font-weight: bold;
}

#detail .detailImg_content view,.artEvent_content view{
  margin-top: 16px;
  text-align: left;
  overflow: hidden;
}

#detail .d_title_text_dot{
  width: 12px;
  height: 12px;
  background: #333;
  border-radius: 50%;
  margin: 0 20px;
}

#detail .artEvent_content view{
  margin-top: 24px;
}

#detail .artEvent_content img{
  width: 100%;
}

#detail #tjpro {
  background: #f6f6f6;
  padding-top: 24px;
  padding-bottom: 56px;
}

#detail .tjpro-title {
  margin: 24px 0;
  margin-top: 20px;
  font-size: 28px;
  color: #666;
  line-height: 28px;
}

#detail .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 80px;
  padding: 0;
  background: #f6f6f6;
}

#detail .tjpro-item-info {
  width: 368px;
  height: 140px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
  text-align: left;
}

#detail .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
}

#detail .tjpro-item-img img {
  width: 368px;
  height: 368px;
}

#detail .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}

#detail .item-info-name {
  font-size: 28px;
  color: #333;
  line-height: 28px;
  display: inline-block;
  white-space: nowrap;
  width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#detail .item-info-type {
  font-size: 24px;
  color: #999;
  line-height: 24px;
  margin: 16px 0;
}

#detail .item-info-price {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}

#bottomBtn {
  width: 100%;
  height: 128px;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  padding: 20px 24px;
  z-index: 999;
}

#bottomBtn button {
  width: 100%;
  height: 100%;
  background: #19c0a3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #fff;
  border: none;
  border-radius: 0;
}

#detail .btn-share img {
  width: 36px;
  height: 36px;
}

#detail .btn button {
  display: flex;
  align-items: center;
  height: 98px;
  border-radius: 0;
  border: none;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}

#detail .btn button::after {
  display: flex;
  align-items: center;
  height: 98px;
  border-radius: 0;
  border: none;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}

#detail .btn-addCart button {
  background: #525252;
}

#detail .btn-buyNow button {
  background: #ed5b5b;
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

#detail .show-btn {
  margin-top: 100px;
  color: #2c2;
}

#detail .modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9998;
  color: #fff;
}

#detail .modal-dialog {
  width: 622px;
  overflow: hidden;
  position: fixed;
  top: 40%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -180px 60px;
}

#detail .modal-dialog button {
  border: none;
  background: none;
  border-radius: 0;
}

#detail .modal-dialog button::after {
  border: none;
  background: none;
  border-radius: 0;
}

#detail .modal-title {
  padding-top: 40px;
  font-size: 32px;
  color: #030303;
  text-align: center;
  font-weight: bold;
}

#detail .modal-content {
  width: 100%;
  margin-top: 28px;
  padding: 0 30px;
  box-sizing: border-box;
  flex-direction: column;
}

#detail .modal-minus img {
  width: 44px;
  height: 6px;
  vertical-align: middle;
}

#detail .modal-add img {
  width: 44px;
  height: 46px;
  vertical-align: middle;
}

#detail .input {
  width: 100%;
  height: 68px;
  margin-bottom: 28px;
  padding-left: 16px;
  background: #fff;
  font-size: 28px;
  color: #333;
  line-height: 28px;
  box-sizing: border-box;
  text-align: left;
  border: 2px solid #e1e1e1;
}

#detail .input_textarea {
  height: 200px;
  padding-right: 38px;
  flex-wrap: wrap;
}

#detail .modal-help {
  font-size: 24px;
  color: #999;
  line-height: 24px;
}

#detail .modal-footer {
  height: 80px;
  padding: 0 30px;
  margin-bottom: 36px;
}

#detail .modal-footer button {
  width: 100%;
  height: 100%;
  background: #19c0a3;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}

#detail .modal-close {
  width: 60px;
  position: fixed;
  right: 0;
  top: 17%;
  z-index: 40000;
  margin-right: 60px;
  opacity: 0.6;
  flex-direction: column;
}

#detail .modal-close img {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
}

#detail .close-hr {
  width: 4px;
  height: 48px;
  background: #fff;
}

#detail .ac-zy {
  width: 48px;
  height: 24px;
  border: 2px solid #19c0a3;
  color: #19c0a3;
  font-size: 24px;
  line-height: 24px;
  margin-right: 18px;
}

#detail .ac-from {
  color: #999;
}

#detail .cart_holder {
  font-size: 28px;
  color: #cfcfcf;
  line-height: 44px;
}

/* 回顶部 */

#gotop {
  width: 64px;
  height: 64px;
  position: fixed;
  bottom: 100px;
  right: 24px;
}

#gotop img {
  width: 64px;
  height: 64px;
}

</style>
