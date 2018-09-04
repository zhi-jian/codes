<template>
    <div id="VI">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab value="0">全部</mu-tab>
                    <mu-tab value="1">企业定制</mu-tab>
                    <mu-tab value="2">传统品牌</mu-tab>
                </mu-tabs>
            </mu-container>
            <div class="boxC customziedBox">
                <button id="customzied" @click="showCustomzied">我要定制</button>    
            </div>
        </div>
        <div id="listTest" v-if="VIShow=='1'"></div>
        <div id="list" v-if="VIShow=='2'" v-infinite-scroll="loadVIMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
            <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div class='itemAll'>
                                <div class='item' v-for="(item,idx) in VILists">
                                    <router-link :to="{path:'VIDetail',name:'VIDetail',params:{id:item.vi_id}}">
                                        <div class='item_img'>
                                            <img :src="baseUrl + item.vi_img" alt="">
                                        </div>
                                        <div class='item_info'>
                                            <div class='info_name'>{{item.vi_name}}</div>
                                            <div class='info_type' v-if="item.vi_type=='1'">传统品牌VI  /  {{item.vi_time}}</div>
                                            <div class='info_type' v-if="item.vi_type=='0'">艺术定制VI  /  {{item.vi_time}}</div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            <div v-if="isBottom" id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
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
      urlPargram:'/index.php?r=vi/index&source=miniProgram',
      refreshing: false,
      loading: false
    };
  },
  mounted() {
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getVIList", url);
    // console.log(this);
  },
  methods: {
    nav(e) {
      // console.log(e)
      var baseUrl = this.baseUrl;
      if(e=='1'){
        this.urlPargram= '/index.php?r=vi/index&source=miniProgram&type=0'
        var url = baseUrl + '/index.php?r=vi/index&source=miniProgram&type=0'
        this.$store.dispatch("getVIList", url);
      }else if(e=='2'){
        this.urlPargram= '/index.php?r=vi/index&source=miniProgram&type=1'
        var url = baseUrl + '/index.php?r=vi/index&source=miniProgram&type=1'
        this.$store.dispatch("getVIList", url);
      }else if(e=='0'){
        this.urlPargram= '/index.php?r=vi/index&source=miniProgram'
        var url = baseUrl + '/index.php?r=vi/index&source=miniProgram'
        this.$store.dispatch("getVIList", url);
      }
    },
    refresh() {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls;
    //   this.$store.dispatch("getOutfitList", url);
      if (this.VILists) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadVIMore(){
    //   console.log("loadIP");
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadVIMore", url);
    },
    showCustomzied(){
      this.$store.commit('changecustomziedModal',true)
    }
  },
  computed: mapState({
    VILists: state => state.VI.VILists,
    busy: state => state.VI.busy,
    isBottom: state => state.VI.isBottom,
    VIShow: state => state.VI.VIShow,
  })
};
</script>
<style>
#VI{
    margin-top: 180px;
}
#VI #navbar {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1000;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
  background: #fff;
}
#VI #navbar .navBar_list {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #666;
  margin: 0;
  padding: 0;
}
#VI .customziedBox {
  height: 100%;
  padding-right: 24px;
  justify-content: flex-end;
  background: #fff;
}
#customzied{
  width: 176px;
  height: 56px;
  background: #6984CF;
  font-size: 28px;
  line-height: 28px;
  color: #fff;
  border: none;
  border-radius: 0;
}

#VI .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#VI .mu-appbar {
  width: 100%;
}
#VI #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#VI .tabChange {
  height: 100%;
  background: #fff;
  padding-right: 24px;
}
#VI .mu-list,
#VI .mu-list > li {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#VI .mu-list {
  flex-wrap: wrap;
}
#VI .mu-tabs {
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
#VI .mu-tab {
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
#VI .mu-tab-active {
  color: #19c0a3;
}
#VI .mu-tab-wrapper {
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
/* 列表 */
#VI #list{
    padding: 0 24px;
}
#VI .itemAll{
    width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#VI .item{
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom:20px;
  padding-bottom: 20px;
  flex-wrap: wrap;
  background: #fff;
}


#VI .item_img img{
  width: 340px;
  height: 252px;
  margin-right: 24px;
  vertical-align: top;
}

#VI .item_info{
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 16px;
}

#VI .info_name{
  margin-top: 20px;
  margin-bottom: 16px;
  font-size: 28px;
  color: #333333;
  letter-spacing: 0;
  line-height: 28px; 
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:1;
  text-align: left;
}

#VI .info_type{
  font-size: 24px;
  color: #999999;
  letter-spacing: 0;
  line-height: 24px;
  text-align: left;
}
</style>
