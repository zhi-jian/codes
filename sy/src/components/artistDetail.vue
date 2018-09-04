<template>
    <div id="artistDetail">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="#19c0a3" full-width @change="nav">
                    <mu-tab value="0">介绍</mu-tab>
                    <mu-tab value="1">全部作品</mu-tab>
                    <mu-tab value="2">衍生品</mu-tab>
                </mu-tabs>
            </mu-container>
        </div>
        <div id="artistDetailMain">
            <div id="artistIntroduce" v-if="active=='0'" style="background-image:url()">
                <div id="introductMain" class="boxStart">
                    <div class="main_avatar boxC"><img :src="baseUrl+artistDetail.artist_detail.user_avatar" alt=""></div>
                    <div class="main_name">{{artistDetail.artist_detail.artist_name}}</div>
                    <div class="main_resume boxC">
                        <div class="main_resume_title boxC">艺术背景</div>
                        <div class="main_resume_content">
                            <p v-for="(item,idx) in artistResume" :key="idx">{{item}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="allIP" v-else-if="active=='1'" v-infinite-scroll="loadAllIPMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div id="allIP_cell" class="boxS">
                                <div id="allIP_cell1">
                                    <div class="allIP_item" v-for="(item,idx) in allProducts" :key="idx" v-if="idx%2=='0'">
                                        <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
                                            <img :src="baseUrl + item.products_img_url" alt="">
                                        </router-link>
                                    </div>
                                </div>
                                <div id="allIP_cell2">
                                    <div class="allIP_item" v-for="(item,idx) in allProducts" :key="idx" v-if="idx%2!='0'">
                                        <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
                                            <img :src="baseUrl + item.products_img_url" alt="">
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            </div>
            <div id="allProduct" v-else-if="active=='2'&&isHasProduct" v-infinite-scroll="loadAllIPMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div id="allIP_cell" class="boxS">
                                <div id="allIP_cell1">
                                    <div class="allIP_item" v-for="(item,idx) in allProducts" :key="idx" v-if="idx%2=='0'">
                                        <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
                                            <img :src="baseUrl + item.products_img_url" alt="">
                                        </router-link>
                                    </div>
                                </div>
                                <div id="allIP_cell2">
                                    <div class="allIP_item" v-for="(item,idx) in allProducts" :key="idx" v-if="idx%2!='0'">
                                        <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
                                            <img :src="baseUrl + item.products_img_url" alt="">
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            </div>
            <div v-if="isBottom" id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
        </div>
        <div v-if="!isHasProduct" style='width:100%;padding-top:145px;text-align:center;'>
          <img src='https://www.shangyibazaar.com/upload/common/allEmpty.png' style='width:113px;height:91px;margin-bottom:62px;'></img>
          <div style='font-size:14px;color:#999;'>暂无相关信息</div>
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
      productId:'',
      active: 0,
      gramUrl: "index.php?r=artist/detail&source=miniProgram&id=",
      refreshing:false,
      loading:false
    };
  },
  mounted() {
    var id = this.$route.params.id;
    var url = this.baseUrl + this.gramUrl + id;
    this.$store.dispatch("getArtistDetail", url);
    // console.log(this);
  },
  methods: {
    nav(e) {
      this.active = e;
      if (e == "1") {
        this.gramUrl =
          "index.php?r=artist/detail&source=miniProgram&id=";
        var id = this.$route.params.id;
        var url = this.baseUrl + this.gramUrl + id;
        this.$store.dispatch("getArtistDetail", url);
      } else if (e == "2") {
        this.gramUrl =
          "index.php?r=artist/detail&type=1&source=miniProgram&id=";
        var id = this.$route.params.id;
        var url = this.baseUrl + this.gramUrl + id;
        this.$store.dispatch("getArtistDetail", url);
      }
    },
    refresh(){
        var gramUrl = this.gramUrl,id = this.$route.params.id;
        var url = this.baseUrl + gramUrl + id;
        this.$store.dispatch("getArtistDetail", url);
        if (this.allProducts) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadAllIPMore() {
    //   console.log("loadIP");
      var baseUrl = this.HOST,id = this.$route.params.id;
      var url = baseUrl + this.gramUrl + id;
      this.$store.dispatch("loadAllIPMore", url);
    },
  },
  computed: mapState({
    artistResume: state => state.artistDetail.artistResume,
    artistDetail: state => state.artistDetail.artistDetail,
    allProducts: state => state.artistDetail.allProducts,
    busy: state => state.artistDetail.busy,
    isBottom: state => state.artistDetail.isBottom,
    isHasProduct: state => state.artistDetail.isHasProduct,
  })
};
</script>
<style>
#artistDetail {
  width: 100%;
  margin-top: 56px;
}
#artistDetail #navbar {
  width: 100%;
  height: 92px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#artistDetail .container {
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#artistDetail .mu-tab-link-highlight {
  width: 80px;
  display: flex;
  justify-content: center;
}
#artistDetail .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#artistDetail .mu-appbar {
  width: 100%;
}
#artistDetail .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#artistDetail .tabChange {
  height: 100%;
  background: #fff;
  padding-right: 24px;
}

#artistDetail .mu-tabs {
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
#artistDetail .mu-tab {
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
#artistDetail .mu-tab-active {
  color: #19c0a3;
}
#artistDetail .mu-tab-wrapper {
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

/* 介绍 */
#artistDetailMain {
  margin-top: 148px;
}
#artistIntroduce{
    padding: 40px 30px;
}
#introductMain {
  min-height: 1100px;
  padding: 0 60px;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
}
#artistDetail .main_avatar {
  width: 172px;
  height: 172px;
  margin-top: 80px;
  margin-bottom: 40px;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;
}
#artistDetail .main_avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#artistDetail .main_name {
  margin-bottom: 60px;
  font-size: 40px;
  color: #ffffff;
  line-height: 40px;
  font-weight: bold;
}
#artistDetail .main_resume {
  flex-direction: column;
}
#artistDetail .main_resume_title {
  width: 240px;
  height: 56px;
  margin-bottom: 56px;
  border: 1px solid #fff;
  font-size: 28px;
  color: #ffffff;
  line-height: 28px;
}
#artistDetail .main_resume_content p {
  font-size: 28px;
  color: #ffffff;
  letter-spacing: 2px;
  line-height: 52px;
  text-align: left;
}
/* 全部作品 */
#allIP{
    width: 100%;
    padding: 0;
    margin: 0;
    align-items: flex-start;
}
#allIP_cell{
    width: 100%;
    padding: 0;
    margin: 0;
    align-items: flex-start;
}
#allIP_cell1,#allIP_cell2{
    width: 50%;
    /* border: 1px solid; */
}
#allIP .allIP_item{
    border: 1px solid #fff;
}
#allIP .allIP_item img{
    width: 100%;
}
/* 衍生品 */
#allProduct{
    width: 100%;
    padding: 0;
    margin: 0;
    align-items: flex-start;
}
#allIP_cell{
    width: 100%;
    padding: 0;
    margin: 0;
    align-items: flex-start;
}
#allIP_cell1,#allIP_cell2{
    width: 50%;
    /* border: 1px solid; */
}
#allProduct .allIP_item{
    border: 1px solid #fff;
}
#allProduct .allIP_item img{
    width: 100%;
}
#onBottom {
  color: #ddd;
  margin-bottom: 100px;
}
</style>
