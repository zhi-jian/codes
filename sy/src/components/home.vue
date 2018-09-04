<template>
  <div id="home_main" v-infinite-scroll="" infinite-scroll-disables="true" infinite-scroll-distance="1">
    <div class="swiperList">
      <mu-carousel>
          <mu-carousel-item v-for="item in imgLists" :key="item.ad_id">
              <img :src="url+item.ad_image">
          </mu-carousel-item>
      </mu-carousel>
    </div>
    <div id="top_main">
    <!-- 四个分类图标 -->
    <div id="classfication" class="boxS">
      <div class="fication_item" v-for="item in ficationList" :key="item.id">
        <router-link :to="{path:item.routerTo,name:item.routerTo}">
          <img :src="item.url" alt="">
            <div class="fication_item_text">{{item.title}}</div>
        </router-link>
      </div>
    </div>
    <div id="top_main_middle">
    <!-- 独家设计 艺术家 IP库 -->
        <router-link :to="{path:'ficitious',name:'ficitious'}" class="boxC">
          <div id="fictitious" class="box">
              <div class="introduce_title" style="margin-bottom:0;">独家设计</div>
              <div class="introduce_content">精挑细选  随心定制</div> 
          </div>
        </router-link>
        <div class='boxStart'>
          <router-link :to="{path:'artist',name:'artist'}" class="boxC">
            <div id='top_artist'  style=''>
              <div class='introduce'>
                <div class='introduce_title'>艺术家</div>
                <div class='introduce_content'>大师荟萃 精彩纷呈</div>
              </div>
            </div>
          </router-link>
          <div id='top_IPpro'  style="">
            <router-link :to="{path:'IP',name:'IP'}">
              <div class='introduce'>
                <div class='introduce_title'>艺术IP库</div>
                <div class='introduce_content'>寻找您最钟意的IP，定制衍生～</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
            <!-- 上兿自营 -->
        <div id='zypro'>
          <div class='zypro-all zypro-allcolor'>
            <router-link :to="{path:'product',name:'product'}" class='zy-alltext'>
              <div class='zy-allname'>兿自营</div>
              <div class='zy-allhr'></div>
              <div class='zy-alllook'>查看全部</div>
            </router-link>
          </div>
          <div class="zypro_itme" v-for="(item,idx) in selfSupportLists" :key="idx">
            <router-link :to="{path:'productDetail',name:'productDetail',params:{id:item.product_url}}">
              <div class='zypro-all'>
                <img :src="url+item.product_image"></img>
                <div class='zy-model'>￥{{item.product_price}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
        <!-- 合作艺术家的衍生品 -->
      <div id='hzatr-pro'>
        <router-link :to="{path:'product',name:'product'}">
          <div class='hzatr-protitle'>
            <div>合作艺术家的衍生品</div>
            <img src='../../static/arrowRight.png' style='width:6px;height:11px;'></img>
          </div>
        </router-link>
        <div class='hzatr-pro'>
          <div class="hzart_pro_item" v-for="(item,idx) in cooperationArtListProducts" :key="idx">
            <router-link :to="{path:'productDetail',name:'productDetail',params:{id:item.product_url}}">
              <div class='hzatr-proall'>
                <!-- <div class='hzatr-proall-top'>￥{{item.price}}</div> -->
                <img :src="url+item.product_image" class='proall-topimg' ></img>
                <div class='hzatr-proall-bottom'>
                  <div class='hzatr-proall-bottomname'>{{item.artist_name}}</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 上兿视频 -->
      <div id='syVideo'>
        <router-link :to="{path:'video',name:'video'}">
          <div class='hzatr-protitle'>
            <div>上艺视频</div>
            <img src='../../static/arrowRight.png' style='width:6px;height:11px;'></img>
          </div>
        </router-link>
        <div class='hzatr-pro'>
          <div v-for="(item,idx) in videoLists">
            <router-link :to="{path:'video',name:'video'}">
              <div class='videoItem'>
                <div class='videoItem_img'>
                  <img :src="url+item.video_image" class='video-topimg'  style='width:150px;height:84px;'></img>
                </div>
                <div class='video-bottom'>
                  <div class='video-bottom'>{{item.video_name}}</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 作者介绍 -->
      <div id='artist'>
        <div :key="artistInfoLists.artist_id">
          <router-link  :to="{path:'artistDetail',name:'artistDetail',params:{id:artistInfoLists.artist_id}}">
            <div class='artist-info'>
              <div class='info-pimg'>
                <img :src="url+artistInfoLists.artist_image"></img>
              </div>
              <div class='info-interduce'>
                <div class='interduce-top'>
                  <div class='boxStart'>
                    <div class='top-name'></div>
                    <div class='top-tuijian boxC'>推荐</div>
                    <div class='top-procoutent boxC'>{{artistProCont}}件作品</div>
                  </div>
                </div>
                <div class='interduce-bottom'>{{artistInfoLists.artist_resume}}</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class='artist-pro'>
          <div v-for="item in artistProductLists" :key="item.product_id">
            <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
              <div class='pro-img boxC'>
                <img :src="url+item.products_img_url"></img>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 热门推荐 -->
      <div id='rmtuijian' style='height:100%'>
        <div class='tuijian-brand'>
          <div class='brand-hr'></div>
          <div class='brand-text'>热门推荐</div>
        </div>
        <div v-for="item in hotRecommendLists" :key="item.product_url">
          <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_url}}"  style='height:100%;'>
            <div class='tuijianItem' style='height:100%'>
              <div class='tuijian-bigimg' style='height:100%'>
                <img :src="url+item.product_image"/>
                <div class='bigimg-text boxS'>
                  <div class='text-name'>{{item.product_name}}</div>
                  <div class='text-info'>
                    <div class='info-info'>{{item.category_name}}</div>
                  </div>
                </div>
              </div>
              <div class='tuijian-art'>
                <div class='art-left'>
                  <img :src="url+item.artist_avatar" class='artleft-img' />
                  <div class='artleft-name'>{{item.artist_name}}</div>
                </div>
                <div class='art-right'></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
// import func from "./vue-temp/vue-editor-bridge";
export default {
  data() {
    return {
      url: "",
      artistInfo: "",
      aaa: "",
      ficationList: [
        {
          id: "1",
          routerTo: "product",
          url: "https://www.shangyibazaar.com/upload/productIcon.png",
          title: "衍生品"
        },
        {
          id: "2",
          routerTo: "outfit",
          url: "https://www.shangyibazaar.com/upload/outfitIcon.png",
          title: "软装+版权"
        },
        {
          id: "3",
          routerTo: "VI",
          url: "https://www.shangyibazaar.com/upload/VIIcon.png",
          title: "企业VI"
        },
        {
          id: "4",
          routerTo: "merchant",
          url: "https://www.shangyibazaar.com/upload/merchantIcon.png",
          title: "合作商"
        }
      ]
    };
  },
  mounted() {
    // console.log(this);
    this.$data.url = this.HOST;
    var baseUrl = this.HOST;
    this.$store.dispatch("getHome", baseUrl);
    // console.log(this.eee)
    // console.log(this.isLogin)
    // console.log(this)
  },
  methods: {},
  computed: mapState({
    imgLists: state => state.home.swiperList, //轮播
    selfSupportLists: state => state.home.selfSupportList, //自营
    cooperationArtListProducts: state => state.home.cooperationArtListProduct, //
    videoLists: state => state.home.videoList, //视频
    artistInfoLists: state => state.home.artistInfoList, //艺术家信息
    artistProductLists: state => state.home.artistProList, //艺术家作品列表
    artistProCont: state => state.home.artistProCont, //艺术家作品数量
    hotRecommendLists: state => state.home.hotRecommendList //热门推荐
    //这儿是拿数据
  })
};
</script>
<style>
#home_main {
  /* height: 100%; */
  margin-bottom: 50px;
}

#top_main {
  background: #fff;
}
/* 轮播 */
#home_main .swiperList img {
  width: 100%;
  height: 100%;
}
/* 分类图标 */
#classfication {
  width: 100%;
  padding: 0 40px;
  padding-top: 32px;
  background: #fff;
}
#home_main .fication_item img {
  width: 108px;
  height: 108px;
}
#home_main .fication_item_text {
  margin-top: 14px;
  font-size: 28px;
  color: #333333;
  line-height: 28px;
}
/* 独家设计 艺术家 IP库 */
#top_main_middle {
  margin: 30px 24px;
  padding: 30px 0;
  flex-direction: column;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#fictitious {
  width: 100%;
  height: 124px;
  margin-bottom: 16px;
  align-items: center;
  padding-left: 36px;
  padding-top: 48px;
  padding-bottom: 48px;
  box-sizing: border-box;
  background-color: gray;
  background-image: url("https://www.shangyibazaar.com/upload/fictitious.png");
  background-size: 100% 124px;
}
#top_artist {
  width: 240px;
  height: 148px;
  margin-right: 20px;
  padding: 16px;
  box-sizing: border-box;
  background: gray;
  background-image: url("https://www.shangyibazaar.com/upload/artist.png");
  background-size: 240px 148px;
}
#top_IPpro {
  width: 444px;
  height: 148px;
  padding: 16px;
  box-sizing: border-box;
  background: gray;
  background-image: url("https://www.shangyibazaar.com/upload/IP.png");
  background-size: 444px 148px;
}
#home_main .introduce {
  height: 100%;
  padding-top: 26px;
  padding-left: 8px;
  box-sizing: border-box;
  text-align: left;
}

#home_main .introduce_title {
  margin-bottom: 16px;
  margin-right: 24px;
  font-size: 28px;
  color: #ffffff;
  line-height: 28px;
  font-weight: bold;
}
#home_main .introduce_content {
  font-size: 20px;
  color: #ffffff;
  line-height: 20px;
}
/* 上兿自营 */
#zypro {
  width: 100%;
  padding: 0 0 32px 0px;
  display: flex;
  justify-content: space-between;
  overflow: auto;
}
#home_main .zypro-all {
  width: 172px;
  height: 172px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 20px;
  overflow: hidden;
}
#home_main .zypro-allcolor {
  background: #f0f0f0;
  min-width: 172px;
}
#home_main .zy-alltext {
  background: #fff;
  width: 136px;
  height: 136px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
}
#home_main .zy-allname {
  font-size: 28px;
  color: #333333;
}
#home_main .zy-allhr {
  width: 48px;
  height: 4px;
  background: #f46262;
}
#home_main .zy-alllook {
  font-size: 20px;
  color: #999999;
}
#home_main .zypro-all img {
  height: 172px;
}
#home_main .zy-model {
  width: 172px;
  height: 52px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #ffffff;
  line-height: 28px;
}
#home_main .zypro-all img {
  width: 172px;
  height: 172px;
}
/* 合作艺术家衍生品 */
#hzatr-pro {
  width: 100%;
  background: #fff;
  margin-top: 16px;
  padding: 32px 24px;
  padding-right: 0;
  box-sizing: border-box;
}
#home_main .hzatr-protitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 24px;
}
#home_main .hzatr-protitle div {
  font-size: 14px;
  color: #333333;
  line-height: 14px;
}
#home_main .hzatr-pro {
  display: flex;
  justify-content: space-between;
  overflow: auto;
  margin-top: 32px;
}
#home_main .hzatr-proall {
  min-width: 252px;
  height: 252px;
  overflow: hidden;
  margin-right: 28px;
  position: relative;
}
#home_main .proall-topimg {
  width: 252px;
  height: 252px;
}
#home_main .hzatr-proall-top {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 28px;
  color: #ffffff;
  line-height: 28px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  padding-top: 24px;
}
#home_main .hzatr-proall-bottom {
  width: 100%;
  height: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
}
#home_main .hzatr-proall-bottomimg {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
#home_main .hzatr-proall-bottomname {
  font-size: 28px;
  color: #ffffff;
  line-height: 28px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  margin-left: 24px;
}
/* 上兿视频 */
#syVideo {
  width: 100%;
  background: #fff;
  margin-top: 16px;
  padding: 30px 24px;
  padding-right: 0;
  box-sizing: border-box;
}

#home_main .videoItem {
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#home_main .videoItem_img {
  width: 300px;
  height: 168px;
  margin-bottom: 24px;
  overflow: hidden;
}

#home_main .video-bottom {
  display: inline-block;
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
/* 艺术家 */
#artist {
  width: 100%;
  background: #fff;
  margin-top: 16px;
}
#home_main .artist-info {
  display: flex;
  box-sizing: border-box;
  padding: 30px 24px 30px 24px;
  justify-content: space-between;
}
#artist .info-pimg img {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  margin-right: 28px;
}
#home_main .interduce-top {
  display: flex;
  justify-content: space-between;
}
#home_main .interduce-top .top-name {
  font-size: 32px;
  color: #333333;
  margin-right: 24px;
}
#home_main .interduce-top .top-procoutent {
  width: 128px;
  height: 51px;
  background: #f6f6f6;
  font-size: 12px;
  color: #cccccc;
}
#home_main .interduce-top .top-tuijian {
  width: 64px;
  height: 36px;
  padding: 6px 8px;
  margin-right: 16px;
  font-size: 24px;
  background: #19c0a3;
  color: #fff;
  text-align: center;
}
#home_main .interduce-bottom {
  margin-top: 22px;
  font-size: 24px;
  color: #999999;
  line-height: 36px;
  display: inline-block; 
	white-space: nowrap;
	width: 566px; 
	overflow: hidden; 
	text-overflow:ellipsis;
}
#home_main .artist-pro {
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
}
#home_main .artist-pro .pro-img {
  margin-left: 20px;
  width: 240px;
  height: 144px;
  overflow: hidden;
}
#home_main .artist-pro .pro-img img {
  width: 240px;
  /* height: 144px; */
}
/* 热门推荐 */
#rmtuijian {
  width: 100%;
}
#home_main .tuijian-brand {
  padding: 28px 0 28px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#home_main .tuijian-brand .brand-hr {
  width: 6px;
  height: 28px;
  background: #19c0a3;
  margin-right: 16px;
}
#home_main .tuijian-brand .brand-text {
  font-size: 28px;
  color: #666666;
}
#home_main .tuijian-bigimg {
  position: relative;
}
#home_main .tuijian-bigimg img {
  width: 750px;
  /* height: 100%;  */
  vertical-align: top;
}
#home_main .tuijian-bigimg .bigimg-text {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 32px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
#home_main .bigimg-text .text-name {
  font-size: 40px;
  line-height: 36px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
#home_main .bigimg-text .text-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin-top: 32px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
#home_main .text-info .info-info {
  font-size: 24px;
  line-height: 24px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 4px;
}
#home_main .text-info .info-price {
  font-size: 40px;
  line-height: 40px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
#home_main .tuijian-art {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#home_main .art-left,
#home_main .art-right {
  display: flex;
  align-items: center;
}
#home_main .art-left {
  padding-left: 24px;
}
#home_main .art-right {
  font-size: 14px;
  color: #999999;
  line-height: 14px;
  padding-right: 24px;
}
#home_main .art-left .artleft-img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: 24px;
}
#home_main .art-left .artleft-name {
  font-size: 14px;
  color: #333333;
  line-height: 14px;
}
#home_main .artright-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
}
#home_main .tuijianItem {
  margin-bottom: 36px;
}
</style>