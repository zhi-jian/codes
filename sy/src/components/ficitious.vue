<template>
    <div id="ficitious">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <div id="navBar_list_modal"></div>
                <mu-tabs  color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab v-for="(item,idx) in ficitiousLists.category_list" :key="idx" :value="item.category_id">{{item.category_name}}</mu-tab>
                </mu-tabs>
            </mu-container>
            <div id="fictiousSearch" class="boxC">
                <img src='http://www.shangyibazaar.com/upload/common/search.png' style='width:15px;height:15px;vertical-align:middle;'></img>
            </div>
        </div>
        <div id="testList" v-if="ficitiousListShow==1"></div>
        <div id="list" v-else-if="ficitiousListShow==2" v-infinite-scroll="loadFicitiousMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
            <div class='tjpro-content' style="">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div v-for="(item,idx) in ficitiousList" :key="idx">
                                <div class="" style='margin-bottom:10px;margin-left:11px;'>
                                    <router-link  :to="{path:'ficitiousDetail',name:'ficitiousDetail',params:{id:item.product_id}}">
                                    <div class='tjpro-item-img boxC' style='width:170px;height:170px;overflow:hidden;'>
                                        <img :src="baseUrl+item.products_img_url" style='width:170px;'></img>
                                    </div>
                                    <div class='tjpro-item-info'>
                                        <div class='item-info-name'>{{item.products_name}}</div>
                                        <div class='boxS'>
                                        <div class='item-info-type boxS'>
                                            <div>{{item.user_name}}</div>/
                                            <div>{{item.category_name}}</div>
                                        </div>
                                        <!-- <div class='item-info-price'>￥{{item.product_price}}</div> -->
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            </div>
            <div v-if="isBottom" id="onBottom">---------------     到底啦     ---------------</div>
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
export default {
  data() {
    return {
      urlPargram: "index.php?r=product/list&type=2&source=miniProgram",
      baseUrl: this.HOST,
      refreshing: false,
      loading: false
    };
  },
  mounted() {
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getFicitiousList", url);
    // console.log(this);
  },
  methods: {
    backs: function() {
      this.$route.go(-1);
    },
    refresh() {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls;
      this.$store.dispatch("getFicitiousList", url);
      if (this.ficitiousLists) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadFicitiousMore() {
      // console.log("loadFicitious");
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadFicitiousMore", url);
    },
    nav(e) {
      //   console.log(e);
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      //   var url = baseUrl + urls;
      this.$data.urlPargram =
        "index.php?r=product/list&type=2&source=miniProgram&cid=" + e;
      var url =
        baseUrl + "index.php?r=product/list&type=2&source=miniProgram&cid=" + e;
      this.$store.dispatch("getFicitiousList", url);
    }
  },
  computed: mapState({
    ficitiousLists: state => state.ficitious.ficitiousLists,
    ficitiousList: state => state.ficitious.ficitiousList,
    busy: state => state.ficitious.busy,
    isBottom: state => state.ficitious.isBottom,
    ficitiousListShow: state => state.ficitious.ficitiousListShow,
    isEmpty: state => state.ficitious.isEmpty,
  })
};
</script>
<style>
#ficitious #navbar {
  width: 84.5%;
  height: 88px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#navbar .navBar_list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
#ficitious .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#ficitious .mu-appbar {
  width: 100%;
}
#ficitious #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#ficitious .tabChange {
  height: 100%;
  background: #fff;
  padding-right: 24px;
}
#ficitious .mu-list,
#ficitious .mu-list > li {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#ficitious .mu-list {
  flex-wrap: wrap;
}
#ficitious .mu-tabs {
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
  overflow: auto;
}
#ficitious .mu-tab {
  font-size: 0.186667rem;
  min-width: 100px;
  width: 100%;
  height: 100%;
  margin-left: 56px;
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
#ficitious .mu-tab:first-child {
  margin-left: 0;
}
#ficitious .mu-tab:last-child {
  z-index: 1200;
}
#fictiousSearch {
  position: fixed;
  right: 0px;
  z-index: 1000;
  width: 118px;
  height: 88px;
  background: #fff;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#navBar_list_modal {
  width: 64px;
  height: 88px;
  position: fixed;
  right: 110px;
  background-image: linear-gradient(
    270deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#ficitious .mu-tab-active {
  color: #19c0a3;
}
#ficitious .mu-tab-wrapper {
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
/* 衍生品列表 */
/* 衍生品大图 */

#ficitious .item {
  margin-bottom: 38px;
}

#ficitious .tuijian-bigimg {
  position: relative;
  width: 100%;
}

#ficitious .tuijian-bigimg .bigimg-text {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 32px;
  padding: 0 24px;
  box-sizing: border-box;
  color: #fff;
}

#ficitious .bigimg-text .text-name {
  font-size: 40px;
  line-height: 36px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  padding-left: 20px;
}

#ficitious .bigimg-text .text-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
#ficitious .tuijian-art {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#ficitious .art-left,
#ficitious .art-right {
  display: flex;
  align-items: center;
}

#ficitious .art-left {
  padding-left: 24px;
}

#ficitious .art-right {
  font-size: 14px;
  color: #999;
  line-height: 14px;
  padding-right: 24px;
}

#ficitious .art-left .artleft-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 24px;
}

#ficitious .art-left .artleft-name {
  font-size: 14px;
  color: #333;
  line-height: 14px;
}
/* 衍生品列表 */
#ficitious #list {
  width: 100%;
  height: 100%;
  margin-top: 144px;
  margin-bottom: 50px;
  padding: 0;
}
#ficitious .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* padding: 20px 24px; */
  padding-left: 0;
  box-sizing: border-box;
}
#ficitious .tjpro-item-info {
  width: 340px;
  text-align: left;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}
#ficitious .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
  overflow: hidden;
  background: #fff;
}
#ficitious .tjpro-item-img img {
  width: 100%;
  min-height: 340px;
  /* height: 368px; */
}
#ficitious .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}
#ficitious .item-info-name {
  font-size: 28px;
  color: #333333;
  line-height: 32px;
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
#ficitious .item-info-type {
  font-size: 24px;
  color: #999999;
  line-height: 24px;
  margin: 16px 0;
}
#ficitious #onBottom {
  color: #ddd;
  margin-bottom: 0;
}
</style>
