<template>
    <div id="product_list">
        <div id="navbar" class="boxS"> 
            <mu-container class="navBar_list">
                <mu-tabs value="0" color="#fff" indicator-color="transparent" full-width @change="nav">
                    <mu-tab value="0">热门</mu-tab>
                    <mu-tab class="price" value="1" @click="priceSort">
                        <div style="margin-right:6px;">价格</div>
                        <div class='priceIcon boxC'>
                            <div style='margin-bottom:-22px;'>
                                <img :src="priceUp===1?'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/下三角-未.png':'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/下三角-中.png'"></img>
                            </div>
                            <div>
                                <img :src="priceUp===2?'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/上三角-未.png':'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/上三角-中.png'"></img>
                            </div>
                        </div>
                    </mu-tab>
                    <mu-tab value="2" @click="screenModal">
                        <div style="margin-right:6px;">筛选</div>
                        <img src='http://www.shangyibazaar.com/upload/common/screen-yes.png' style='width:10px;height:11px;'></img>
                    </mu-tab>
                    <mu-tab>
                        <img src='http://www.shangyibazaar.com/upload/common/search.png' style='width:15px;height:15px;vertical-align:middle;'></img>
                    </mu-tab>
                </mu-tabs>
            </mu-container>
        </div>
        <div id="list" v-infinite-scroll="loadMore" infinite-scroll-distance="" infinite-scroll-disabled="busy">
            <div class='tjpro-content'>
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" :loaded-all="busy">
                        <mu-list>
                            <div v-for="item in lists" :key="item.product_id">
                                <div class="" style='margin-bottom:10px;margin-left:11px;'>
                                    <router-link  :to="{path:'productDetail',name:'productDetail',params:{id:item.product_id}}">
                                    <div class='tjpro-item-img boxC' style='width:170px;height:170px;overflow:hidden;background:#fff;'>
                                        <img :src="baseUrl+item.products_img_url" style='width:170px;'></img>
                                    </div>
                                    <div class='tjpro-item-info'>
                                        <div class='item-info-name'>{{item.products_name}}</div>
                                        <div class='boxS'>
                                        <div class='item-info-type boxS'>
                                            <div>{{item.user_name}}</div>/
                                            <div>{{item.category_name}}</div>
                                        </div>
                                        <div class='item-info-price'>￥{{item.product_price}}</div>
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
        <div id="screenModal">
            <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" width="290" style="padding-top:44px;padding-right:20px;">
              <mu-list>
                <div class="screen_modal_title boxStart">
                  <div class="boxC"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/biaoqian@3x.png" alt="" width="12px;" height="12px;"></div>
                  <div class="title_text boxC">类别</div>
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
                  <div class="title_text boxC">主题</div>
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
      priceUp: 1,
      urlPargram: "index.php?r=product/list&type=1&source=miniProgram&order=3",
      baseUrl: this.HOST,
      refreshing: false,
      loading: false,
      docked: false,
      open: false,
      position: "right",
      cId: "",
      tId:''
    };
  },
  mounted() {
    //   console.log(222)
    var baseUrl = this.HOST,
      urls = this.$data.urlPargram;
    var url = baseUrl + urls;
    this.$store.dispatch("getList", url);
  },
  methods: {
    backs: function() {
      this.$route.go(-1);
    },
    refresh() {
      // console.log(111)
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      var url = baseUrl + urls;
      this.$store.dispatch("getList", url);
      if (this.lists) {
        this.$data.refreshing = false;
      } else {
        this.$data.refreshing = true;
      }
    },
    nav(e) {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      //   var url = baseUrl + urls;
      if (e == "0") {
        this.$data.urlPargram =
          "index.php?r=product/list&type=1&source=miniProgram&order=3";
        var url =
          baseUrl +
          "index.php?r=product/list&type=1&source=miniProgram&order=3";
        this.$store.dispatch("getList", url);
      } else if (e == "1") {
        this.$data.urlPargram =
          "index.php?r=product/list&type=1&source=miniProgram&order=2";
        var url =
          baseUrl +
          "index.php?r=product/list&type=1&source=miniProgram&order=2";
        this.$store.dispatch("getList", url);
      }
    },
    priceSort(e) {
      var baseUrl = this.HOST,
        urls = this.$data.urlPargram;
      //   var url = baseUrl + urls;
      if (this.$data.priceUp == 1) {
        this.$data.urlPargram =
          "index.php?r=product/list&type=1&source=miniProgram&order=2";
        var url =
          baseUrl +
          "index.php?r=product/list&type=1&source=miniProgram&order=2";
        this.$store.dispatch("getList", url);
        this.$data.priceUp = 2;
      } else if (this.$data.priceUp == 2) {
        this.$data.urlPargram =
          "index.php?r=product/list&type=1&source=miniProgram&order=1";
        var url =
          baseUrl +
          "index.php?r=product/list&type=1&source=miniProgram&order=1";
        this.$store.dispatch("getList", url);
        this.$data.priceUp = 1;
      }
    },
    loadMore() {
      // console.log(333)
      var baseUrl = this.HOST;
      var url = baseUrl + this.$data.urlPargram;
      this.$store.dispatch("loadMore", url);
      if (this.lists) {
        this.$data.loading = false;
      } else {
        this.$data.loading = true;
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
      this.$data.urlPargram= "index.php?r=product/list&type=1&source=miniProgram&cid=" + cid + '&theme=' + tid+ '&type=1'
      var url = this.HOST +'index.php?r=product/list&type=1&source=miniProgram&cid=' + cid + '&theme=' + tid + '&type=1';
      this.$store.dispatch("getList", url);
      this.open = false;
    },
  },
  computed: mapState({
    lists: state => state.product.lists,
    busy: state => state.product.busy,
    isBottom: state => state.product.isBottom,
    categoryList: state => state.product.categoryList,
    themeList: state => state.product.themeList,
    isEmpty: state => state.product.isEmpty,
  })
};
</script>
<style>
#product_list #navbar {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000000;
  border-bottom: 2px solid #ededed;
}
#product_list #navbar .navBar_list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
#product_list .demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
#product_list .mu-appbar {
  width: 100%;
}
#product_list #list .demo-loadmore-content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
}
#product_list .mu-list,
#product_list .mu-list > li {
  display: flex;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}
#product_list .mu-list {
  flex-wrap: wrap;
}
#product_list .mu-tabs {
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
#product_list .mu-tab {
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
#product_list .mu-tab-active {
  color: #19c0a3;
}
#product_list .mu-tab-wrapper {
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
#product_list .priceIcon {
  margin-top: -2px;
  flex-direction: column;
}
/* 衍生品列表 */
#product_list #list {
  margin-top: 88px;
  margin-bottom: 50px;
}
#product_list .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 24px;
  padding-left: 0;
  box-sizing: border-box;
}
#product_list .tjpro-item-info {
  width: 340px;
  text-align: left;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}
#product_list .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
}
#product_list #product .tjpro-item-img img {
  width: 368px;
}
#product_list .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}
#product_list .item-info-name {
  font-size: 28px;
  color: #333333;
  line-height: 32px;
  display: inline-block; 
	white-space: nowrap;
	width: 290px; 
	overflow: hidden; 
	text-overflow:ellipsis;

}
#product_list .item-info-type {
  font-size: 24px;
  color: #999999;
  line-height: 24px;
  margin: 16px 0;
}
#product_list .item-info-price {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}

/* 筛选框 */
#product_list .screen_modal_title{
  margin-top: 60px;
  margin-bottom: 40px;
  padding-left: 40px;
}
#product_list .screem_modal_list{
  padding-left: -40px;
  flex-wrap: wrap;
}
#product_list .modal_list_item {
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
#product_list .modal_list_itemActive {
  border: 2px solid #0BACA4;
  background: #fff;
  color: #0BACA4;
}
#product_list #screenModal .title_text{
  margin-left: 20px;
}
#product_list #screenModal .screenBtns{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  border: 2px solid #ededed;
}
#product_list #screenModal #clearScreenModal{
  width: 40%;
  height: 100%;
  font-size:28px;
  color: #333333;
  line-height:28px;
}
#product_list #screenModal #screenModalSbumit{
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
