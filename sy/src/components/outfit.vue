<template>
    <div id="outfit">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab value="0">全部</mu-tab>
                    <mu-tab value="1">室内</mu-tab>
                    <mu-tab value="2">室外</mu-tab>
                </mu-tabs>
            </mu-container>
            <div class="boxC customziedBox">
                <button id="customzied" @click="showCustomzied">我要定制</button>    
            </div>
        </div>
        <div id="listTest" v-if="outfitShow=='1'"></div>
        <div id="list" v-if="outfitShow=='2'" v-infinite-scroll="loadOutfitMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
            <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div class='item boxS' v-for="(item,idx) in outfitLists" :key="idx">
                              <router-link class="boxS" :to="{path:'outfitDetail',name:'outfitDetail',params:{id:item.outfit_id}}">
                                <div class='item_img'>
                                  <img :src='baseUrl+item.outfi_img'></img>
                                </div>
                                <div class='item_info boxStart'>
                                  <div class='info_outName'>{{item.outfit_name}}</div>
                                  <div class='info_parts boxStart'>
                                    <div class='info_type0' v-if="item.outfit_type=='0'">室内软装</div>
                                    <div class='info_type1' v-if="item.outfit_type=='1'">室外软装</div>
                                    <div class='info_part' v-if="outfits.parts" v-for="(item_part,idx) in outfits.parts" :key="idx">{{item_part.ip_parts_name}}</div>
                                  </div>
                                  <div class='info_art boxStart'>IP：{{item.outfit_artist}} / {{item.outfit_time}}</div>
                                </div>
                              </router-link>
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
export default {
  data() {
    return {
      baseUrl:this.HOST,
      urlPargram:'/index.php?r=outfit/index&source=miniProgram',
      refreshing: false,
      loading: false
    };
  },
  mounted() {
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getOutfitList", url);
    // console.log(this);
  },
  methods: {
    nav(e) {
      // console.log(e)
      var baseUrl = this.baseUrl;
      if(e=='1'){
        this.urlPargram= '/index.php?r=outfit/index&source=miniProgram&type=0'
        var url = baseUrl + '/index.php?r=outfit/index&source=miniProgram&type=0'
        this.$store.dispatch("getOutfitList", url);
      }else if(e=='2'){
        this.urlPargram= '/index.php?r=outfit/index&source=miniProgram&type=1'
        var url = baseUrl + '/index.php?r=outfit/index&source=miniProgram&type=1'
        this.$store.dispatch("getOutfitList", url);
      }else if(e=='0'){
        this.urlPargram= '/index.php?r=outfit/index&source=miniProgram'
        var url = baseUrl + '/index.php?r=outfit/index&source=miniProgram'
        this.$store.dispatch("getOutfitList", url);
      }
    },
    refresh() {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls;
      this.$store.dispatch("getOutfitList", url);
      if (this.outfitLists) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadOutfitMore(){
      // console.log("loadIP");
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadOutfitMore", url);
    },
    showCustomzied(){
      this.$store.commit('changecustomziedModal',true)
    }
  },
  computed: mapState({
    outfits: state => state.outfit.outfits,
    outfitLists: state => state.outfit.outfitLists,
    busy: state => state.outfit.busy,
    isBottom: state => state.outfit.isBottom,
    outfitShow: state => state.outfit.outfitShow,
    isEmpty: state => state.outfit.isEmpty,
  })
};
</script>
<style>
#outfit #navbar {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
}
#outfit #navbar .navBar_list {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
#outfit .customziedBox {
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
#outfit .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#outfit .mu-appbar {
  width: 100%;
}
#outfit #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#outfit .tabChange {
  height: 100%;
  background: #fff;
  padding-right: 24px;
}
#outfit .mu-list,
#outfit .mu-list > li {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#outfit .mu-list {
  flex-wrap: wrap;
}
#outfit .mu-tabs {
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
#outfit .mu-tab {
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
#outfit .mu-tab-active {
  color: #19c0a3;
}
#outfit .mu-tab-wrapper {
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
/* 软装列表 */
#outfit #list{
  margin-top: 144px;
  padding: 0 24px;
  padding-top: 32px;
  background: #fff;
}
#outfit .item {
  align-items: flex-start;
  border-bottom: 2px solid #ededed;
  padding-bottom: 32px;
  margin-bottom: 32px;
}

#outfit .item:last-child {
  border-bottom: none;
  padding-bottom: 32px;
  margin-bottom: 0;
}

#outfit .item_img img {
  width: 330px;
  height: 248px;
  margin-right: 24px;
  vertical-align: top;
}

#outfit .item_info {
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#outfit .info_outName {
  /* min-height: 96px; */
  font-size: 32px;
  color: #333;
  line-height: 40px;
}

#outfit .info_parts {
  min-height: 104px;
  flex-wrap: wrap;
}

#outfit .info_parts div {
  padding: 9px 16px;
  margin-top: 16px;
  margin-right: 16px;
  border: 2px solid #ededed;
  font-size: 10px;
  color: #999;
  line-height: 10px;
}

#outfit .info_parts .info_type0 {
  border-color: #19c0a3;
  color: #19c0a3;
}

#outfit .info_parts .info_type1 {
  border-color: #6984cf;
  color: #6984cf;
}

#outfit .info_art {
  margin-top: 24px;
  font-size: 12px;
  color: #666;
  line-height: 12px;
}
</style>
