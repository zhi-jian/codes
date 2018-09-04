<template>
    <div id="IP">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab value="0">最新</mu-tab>
                    <mu-tab class="hot" value="1">热门</mu-tab>
                    <mu-tab value="2" @click="screenModal">
                        <div style="margin-right:6px;">筛选</div>
                        <img src='http://www.shangyibazaar.com/upload/common/screen-yes.png' style='width:10px;height:11px;'></img>
                    </mu-tab>
                    <mu-tab>
                        <img src='http://www.shangyibazaar.com/upload/common/search.png' style='width:15px;height:15px;vertical-align:middle;'></img>
                    </mu-tab>
                </mu-tabs>
            </mu-container>
            <div @click="bigOrlist" class="tabChange boxC">
                <img :src="bigList==1?'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/列表icon@3x.png':'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/方片列表icon@3x.png'" style='width:15px;height:15px;vertical-align:middle;'></img>
            </div>
        </div>
        <div id="bigList" v-if="bigList==1&&isEmpty" >
            <div class='tjpro-content' style="padding:0;">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div v-for="(item,idx) in lists" :key="idx">
                                <div class='item' style=''>
                                    <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
                                        <div class='tuijian-bigimg' style=''>
                                            <img :src="baseUrl+item.products_img_url"/>
                                            <div class='bigimg-text boxS'>
                                                <div class='text-name'>{{item.products_name}}</div>
                                                <div class='text-info'>{{item.category_name}}</div>
                                            </div>  
                                        </div>
                                        <div class='tuijian-art'>
                                            <div class='art-left'>
                                                <img :src="baseUrl+item.user_avatar" class='artleft-img' />
                                                <div class='artleft-name'>{{item.user_name}}</div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </mu-list>
                    </mu-load-more>
                </mu-container>
            </div>
            <div id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
        </div>
        <div id="list" v-else-if="bigList==2&&isEmpty" v-infinite-scroll="loadIPMore" infinite-scroll-disabled="busy" infinite-scroll-distance="">
            <div class='tjpro-content' style="">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading">
                        <mu-list>
                            <div v-for="(item,idx) in lists" :key="idx">
                                <div class="" style='margin-bottom:10px;margin-left:11px;'>
                                    <router-link  :to="{path:'detail',name:'detail',params:{id:item.product_id}}">
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
            <div v-if="isBottom" id="onBottom" style="margin-bottom:0;">---------------     到底啦     ---------------</div>
        </div>
        <div id="screenModal">
            <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" width="290" style="padding-top:44px;padding-right:20px;">
              <mu-list>
                <div class="screen_modal_title boxStart">
                  <div class="boxC"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/biaoqian@3x.png" alt="" width="12px;" height="12px;"></div>
                  <div class="title_text boxC">艺术类别</div>
                </div>
                <div class="screem_modal_list boxStart">
                  <div v-for="(item,idx) in categoryList" 
                  :key="item.category_id" 
                  @click="chooseCategory(item.category_id)"  
                  :class="item.category_id==cId?'modal_list_item modal_list_itemActive boxC':'modal_list_item boxC'">
                    {{item.category_name}}
                  </div>
                </div>
              </mu-list>
              <mu-list>
                <div class="screen_modal_title boxStart">
                  <div class="boxC"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/biaoqian@3x.png" alt="" width="12px;" height="12px;"></div>
                  <div class="title_text boxC">艺术主题</div>
                </div>
                <div class="screem_modal_list boxStart">
                  <div v-for="(item,idx) in themeList" 
                  :key="item.theme_id" 
                  @click="chooseTheme(item.theme_id)"  
                  :class="item.theme_id==tId?'modal_list_item modal_list_itemActive boxC':'modal_list_item boxC'">
                    {{item.theme_name}}
                  </div>
                </div>
              </mu-list>
              <div class="screenBtns boxS">
                <div id="clearScreenModal" class="boxC" @click="clearScreenModal">清除选项</div>
                <div id="screenModalSbumit" class="boxC" @click="screenModalSbumit">确定</div>
              </div>
            </mu-drawer>
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
      urlPargram: "index.php?r=product/list&source=miniProgram&order=0",
      baseUrl: this.HOST,
      refreshing: false,
      loading: false,
      bigList: 1,
      docked: false,
      open: false,
      position: "right",
      cId: "",
      tId:''
    };
  },
  beforeCreate(){
      Vue.prototype.headerText = '艺术IP库'
  },
  mounted() {
      sessionStorage.setItem('headerText','艺术IP库')
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getIPList", url);
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
      this.$store.dispatch("getIPList", url);
      if (this.lists) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    loadIPMore() {
      // console.log("loadIP");
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadIPMore", url);
    },
    nav(e) {
    //   console.log(e);
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      //   var url = baseUrl + urls;
      if (e == "0") {
        this.$data.urlPargram =
          "index.php?r=product/list&source=miniProgram&order=0";
        var url =
          baseUrl + "index.php?r=product/list&source=miniProgram&order=0";
        this.$store.dispatch("getIPList", url);
      } else if (e == "1") {
        this.$data.urlPargram =
          "index.php?r=product/list&source=miniProgram&order=3";
        var url =
          baseUrl + "index.php?r=product/list&source=miniProgram&order=3";
        this.$store.dispatch("getIPList", url);
      }
    },
    bigOrlist() {
    //   console.log(123);
      if (this.$data.bigList == 1) {
        this.$data.bigList = 2;
      } else if (this.$data.bigList == 2) {
        this.$data.bigList = 1;
      }
    },
    screenModal() {
      // this.docked = !this.docked
      this.open = !this.open;
    },
    chooseCategory(cId) {
      // console.log(cId);
      this.cId = cId;
    },
    chooseTheme(tId) {
      // console.log(tId);
      this.tId = tId;
    },
    clearScreenModal(){
      this.cId = 0;
      this.tId = 0;
    },
    screenModalSbumit(){
      var cid = this.cId,tid = this.tId;
      this.$data.urlPargram= "index.php?r=product/list&source=miniProgram&order=0&cid=" + cid + '&theme=' + tid
      var url = this.HOST +'index.php?r=product/list&type=1&source=miniProgram&cid=' + cid + '&theme=' + tid + '&type=0';
      this.$store.dispatch("getIPList", url);
      this.open = false;
    },
  },
  computed: mapState({
    lists: state => state.IP.lists,
    busy: state => state.IP.busy,
    isBottom: state => state.IP.isBottom,
    categoryList: state => state.IP.categoryList,
    themeList: state => state.IP.themeList,
    isEmpty: state => state.IP.isEmpty,
  })
};
</script>
<style>
#IP #navbar {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 100000000;
  border-top: 2px solid #ededed;
}
#IP #navbar .navBar_list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
#IP .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#IP .mu-appbar {
  width: 100%;
}
#IP #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}
#IP .tabChange{
    height: 100%;
    background: #fff;
    padding-right: 24px;
}
#IP .mu-list,
#IP .mu-list > li {
  display: flex;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}
#IP .mu-list {
  flex-wrap: wrap;
}
#IP .mu-tabs {
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
#IP .mu-tab {
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
#IP .mu-tab-active {
  color: #19c0a3;
}
#IP .mu-tab-wrapper {
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
#bigList .mu-load-more{
    margin-bottom: 60px;
}
#IP .item {
  margin-bottom: 38px;
}
#bigList .mu-list>div{
    width: 100%;
}
#IP .tuijian-bigimg {
  position: relative;
  width: 100%;
}

#bigList .tuijian-bigimg img {
  width: 100%;
  vertical-align: top;
}

#IP .tuijian-bigimg .bigimg-text {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 32px;
  padding: 0 24px;
  box-sizing: border-box;
  color: #fff;
}

#IP .bigimg-text .text-name {
  font-size: 40px;
  line-height: 36px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.20);
  text-align: left;
  padding-left: 20px;
}

#IP .bigimg-text .text-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
#IP .tuijian-art {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#IP .art-left, .art-right {
  display: flex;
  align-items: center;
}

#IP .art-left {
  padding-left: 24px;
}

#IP .art-right {
  font-size: 14px;
  color: #999;
  line-height: 14px;
  padding-right: 24px;
}

#IP .art-left .artleft-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 24px;
}

#IP .art-left .artleft-name {
  font-size: 14px;
  color: #333;
  line-height: 14px;
}
/* 衍生品左右列表 */
#IP #list,
#IP #bigList {
  margin-top: 144px;
  margin-bottom: 50px;
}
/* 衍生品列表 */
#list {
  margin-top: 88px;
  margin-bottom: 50px;
}
#IP .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 24px;
  padding-left: 0;
  box-sizing: border-box;
}
#IP .tjpro-item-info {
  width: 340px;
  text-align: left;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}
#IP .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
  overflow: hidden;
  background: #fff;
}
#IP .tjpro-item-img img {
  width: 100%;
  min-height: 340px;
  /* height: 368px; */
}
#IP .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}
#IP .item-info-name {
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
#IP .item-info-type {
  font-size: 24px;
  color: #999999;
  line-height: 24px;
  margin: 16px 0;
}
/* 筛选框 */
#IP .screen_modal_title{
  margin-top: 60px;
  margin-bottom: 40px;
  padding-left: 40px;
}
#IP .screem_modal_list{
  padding-left: -40px;
  flex-wrap: wrap;
}
#IP .modal_list_item {
  width: 140px;
  height: 60px;
  margin-left: 40px;
  margin-bottom: 28px;
  background: #f3f3f3;
  border: 2px solid transparent;
  font-size: 28px;
  color: #666666;
  border-radius: 10px;
  line-height: 28px;
}
#IP .modal_list_itemActive {
  border: 2px solid #0BACA4;
  background: #fff;
  color: #0BACA4;
}
#screenModal .title_text{
  margin-left: 20px;
}
#screenModal .screenBtns{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  border: 2px solid #ededed;
}
#screenModal #clearScreenModal{
  width: 40%;
  height: 100%;
  font-size:28px;
  color: #333333;
  line-height:28px;
}
#screenModal #screenModalSbumit{
  width: 60%;
  height: 100%;
  background-image: linear-gradient(90deg, #19C0A2 0%, #7AC220 100%);
  font-size: 28px;
  color: #FFFFFF;
  line-height: 28px;
}
#onBottom {
  color: #ddd;
  margin-bottom: 100px;
}
</style>
