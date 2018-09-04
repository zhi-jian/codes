<template>
    <div id="cart">
        <!-- <div v-for="item in cartLists">{{item.artName}}/{{item.product_type}}</div> -->
        <div id="cartList" v-if="isLogins">
            <div class="cartList_item boxStart" v-for="(item,idx) in cartLists" :key="idx">
                <mu-checkbox v-model="checkboxModel" :value="item.cart_id"></mu-checkbox>
                <div class="item_productInfo boxStart">
                    <div class="productInfo_img boxC">
                        <img :src="baseUrl + item.product_image" alt="" width="94px;">
                    </div>
                    <div class="productInfo_types">
                        <div class="types_proName">{{item.product_name}}</div>
                        <div class="types_type">{{item.artName}}  /  {{item.product_type}}</div>
                        <div class="product_count boxS">
                            <div class="proCount">数量：{{item.product_num}}</div>
                            <div class="proPrice">￥{{item.product_price}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='recommendList' style='margin-bottom:50px;background:f6f6f6;'>
                <div class='tjpro-title boxC'>／／ 推荐衍生品 ／／</div>
                <div class='tjpro-content'>
                    <div v-for="(item,idx) in recommendList" :key="idx" class="tjpro-content-item">
                        <router-link  :to="{path:'productDetail',name:'productDetail',params:{id:item.product_url}}">
                                <div class='tjpro-item-img' style='width:184px;height:184px;overflow:hidden;'>
                                    <img :src="baseUrl+item.product_image" style='width:184px;height:184px'></img>
                                    <div class='tjpro-item-canSell boxC' v-if="false">可出售版权</div>
                                </div>
                                <div class='tjpro-item-info-detail'>
                                    <div class='item-info-name'>{{item.product_name}}</div>
                                    <div class='item-info-type_detail'>{{item.artist_name}} / {{item.category_name}}</div>
                                </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div id="cartFooter" class="boxS">
                <div class="footer_checkAll"><mu-checkbox v-model="checked"  @change='checkedAll'></mu-checkbox>全选</div>
                <div class="footer_handle boxS">
                    <div class="footer_totalPrice">￥  {{totalPrice}}</div>
                    <div class="footer_btn boxS">
                        <div id="footer_btn_edit" class="boxC">编辑</div>
                        <div id="footer_btn_goPay" class="boxC"> <router-link :to="{path:'fillInOrder',name:'fillInOrder',params:{cartId:cartIds}}">去结算</router-link></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="noLogin" v-if="!isLogins" class="boxC">
            <div class="noLog">还未登录哦</div>
            <router-link :to="{path:'my',name:'my'}" class="goLog boxC">去登录</router-link>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
const cartLists = this.cartLists;
export default {
  data() {
    return {
      baseUrl: this.HOST,
      urlParam: "index.php?r=cart&source=miniProgram&id=",
      checkedItem: [],
      isLogins: false,
      userId: "",
      checkboxModel: [],
      checked: false,
      totalPrice: 0,
      cartIds: ""
    }; 
  },
  mounted() {
      var isLogin = this.$cookies.get('isLogin')
    if (isLogin=='true') {
    this.isLogins = true;
      this.userId = this.$cookies.get("userId")
    //   console.log(this.userInfo);
      var url =
    this.baseUrl + "index.php?r=cart&source=miniProgram&id=" + this.userId;
    // var url = this.baseUrl + "index.php?r=cart&source=miniProgram&id=212";
    var param = {url:url,baseUrl:this.HOST}
    this.$store.dispatch("getCartList", param);
    this.$store.dispatch(
      "getRecommendList",
      this.HOST + "api.php?r=home/index&test=1&source=miniProgram"
    );
    }
  },
  methods: {
    checkedAll() {
      var _this = this;
      // console.log(this.checked);
      this.checked = !this.checked;
      if (this.checked) {
        //如果全选为true  此处为false  则走下面else  把所有子项压入boxModel 实现全选 ，这儿只能是反着来
        //实现反选
        _this.checkboxModel = [];
      } else {
        //实现全选
        _this.checkboxModel = [];
        _this.cartLists.forEach(function(item, i) {
          _this.checkboxModel.push(item.cart_id);
        });
      }
      // console.log(_this.checkboxModel);
    }
  },
  watch: {
    //深度 watcher
    checkboxModel: {
      handler: function(val, oldVal) {
        // console.log(val);
        var cartIds = [];
        for (var i = 0; i < val.length; i++) {
          cartIds.push(val[i]);
        }
        // console.log()
        this.cartIds = cartIds.join("|");
        var totalPrice = 0;
        var lists = this.cartLists;
        for (var i = 0; i < lists.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j] == lists[i].cart_id) {
              totalPrice += Number(lists[i].product_price);
            }
          }
        }
        this.totalPrice = totalPrice;
        if (this.checkboxModel.length === this.cartLists.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  computed: mapState({
    cartLists: state => state.cart.cartLists,
    recommendList: state => state.cart.recommendList
  })
};
</script>
<style>
#cart {
  margin-bottom: 178px;
  background: #fff;
}
#cart #noLogin{
  width: 100%;
  height: 100%;
  margin-top: 50%;
  flex-direction: column;
  background: #fafafa;
}
#noLogin .noLog{
  width: 100%;
  height: 50px;
  margin: 100px 0;
  font-size: 32px;
  line-height: 32px;
  color: #999;
  font-weight: bold;
}
#noLogin .goLog{
  width: 60%;
  height: 100px;
  background-image: linear-gradient(90deg, #19C0A2 0%, #7AC220 100%);
  color: #fff;
  font-size: 32px;
  line-height: 32px;
}
#cart .cartList_item {
  padding-top: 36px;
  padding-left: 20px;
  padding-right: 24px;
}
#cart .mu-checkbox {
  width: 36px;
  height: 36px;
}
#cart .item_productInfo {
  width: 100%;
  margin-left: 24px;
  padding-bottom: 36px;
  border-bottom: 2px solid #ededed;
}
#cart .item_productInfo:last-child {
  /* border-bottom: none; */
}
#cart .productInfo_img {
  width: 188px;
  height: 188px;
  overflow: hidden;
}
#cart .productInfo_types {
  width: 100%;
  margin-left: 32px;
  text-align: left;
}
#cart .types_proName {
  font-size: 32px;
  color: #333333;
  line-height: 32px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
#cart .types_type {
  margin: 20px 0;
  font-size: 28px;
  color: #666666;
  line-height: 44px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
#cart .proCount {
  font-size: 28px;
}
#cart .proPrice {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}

/* 底部编辑 */
#cartFooter {
  width: 100%;
  height: 96px;
  position: fixed;
  bottom: 82px;
  padding-left: 20px;
  padding-right: 24px;
  background: #fff;
  border-top: 2px solid #ededed;
  /* border-bottom: 2px solid #ededed; */
}
#cart .footer_checkAll {
  font-size: 28px;
  color: #333333;
  line-height: 28px;
}
#cart .footer_totalPrice {
  font-size: 32px;
  color: #ed5b5b;
  line-height: 32px;
}
#cart #footer_btn_edit {
  width: 120px;
  height: 64px;
  margin-left: 20px;
  background: #545454;
  font-size: 28px;
  line-height: 28px;
  color: #fff;
}
#cart #footer_btn_goPay {
  width: 160px;
  height: 64px;
  margin-left: 20px;
  background: #ed5b5b;
}
#cart #footer_btn_goPay a {
  font-size: 28px;
  line-height: 28px;
  color: #fff;
}

/* 推荐衍生品 */
#cart .tjpro-title {
  padding: 32px 0 28px 0;
  background: #f6f6f6;
  font-size: 28px;
  color: #666;
  line-height: 28px;
}

#cart .tjpro-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 0;
  background: #f6f6f6;
}

#cart .tjpro-content-item {
  margin-bottom: 14px;
}

#cart .tjpro-item-info-detail {
  width: 368px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}

#cart .tjpro-item-img {
  width: 368px;
  height: 368px;
  position: relative;
}

#cart .tjpro-item-img img {
  width: 368px;
  height: 368px;
}

#cart .tjpro-item-img .tjpro-item-canSell {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 20px;
}

#cart .item-info-name {
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

#cart .item-info-type_detail {
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

#cart .item-info-price {
  font-size: 28px;
  color: #ed5b5b;
  line-height: 28px;
}
</style>
