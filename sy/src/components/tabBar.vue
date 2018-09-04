<template>
    <div id="footer">
      <mu-container>
        <mu-bottom-nav>
          <ul class="navList boxS">
            <li v-for="item in items" @click="selectNav(item.title)">
              <router-link :to="item.routerTo">
                <img :src="isSelecter===item.title?item.url_active:item.url" alt="" style="vertical-align:top;width:20px;height:20px;">
                <div class="boxC" :class="{'navList_text_active':isSelecter===item.title,'navList_text':isSelecter!=item.title}">{{item.title}}</div>
              </router-link>
            </li>
          </ul>
        </mu-bottom-nav>
      </mu-container>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data(){
    return {
      homeSel:true,
      isShow:true,
      isSelecter:'首页',
      items:[
        {
          title:'首页',
          url:'../../static/home-no.png',
          url_active:'../../static/home-yes.png',
          routerTo:'/pages/index'
        },
        {
          title:'衍生品',
          url:'../../static/ysp-no.png',
          url_active:'../../static/ysp-yes.png',
          routerTo:'/pages/product'
        },
        {
          title:'购物车',
          url:'../../static/cart-no.png',
          url_active:'../../static/cart-yes.png',
          routerTo:'/pages/cart'
        },
        {
          title:'我的',
          url:'../../static/my-no.png',
          url_active:'../../static/my-yes.png',
          routerTo:'/pages/my'
        },
      ]
    }
  },
  mounted:function(){
    // sessionStorage.setItem('isSelect', this.isSelecter)
    // this.isSelecter = sessionStorage.getItem('isSelect') 
    var isSelectText = this.$route.name;
    // this.$data.isSelecter  = this.$route.name
    if(isSelectText=='home'){
      this.$data.isSelecter = '首页'
    }else if(isSelectText=='product'){
      this.$data.isSelecter = '衍生品'
    }else if(isSelectText=='cart'){
      this.$data.isSelecter = '购物车'
    }else if(isSelectText=='my'){
      this.$data.isSelecter = '我的'
    }else {}
    // console.log(this)
  },
  methods:{
    selectNav (title) { 
      this.isSelecter = title 
      switch (title) { 
      case '首页': this.$router.push('/pages/index') 
      break
      case '衍生品': this.$router.push('/pages/product') 
      break
      case '购物车': this.$router.push('/pages/cart') 
      break
      case '我的': this.$router.push('/pages/my') 
      break
      } 
      sessionStorage.setItem('isSelect', this.isSelecter) 
      } 
  }
};
</script>
<style>
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 82px;
  border-top: 2px solid #ededed;
}
#footer .container{
  padding: 0;
  margin: 0;
}
.navList{
  width: 100%;
  padding: 0 24px;
}
.navList li{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.navList_text{
  margin-top: 6px;
  color: #999;
}
.navList_text_active{
  margin-top: 6px;
  color: #333;
}
.navList img{
  width: 40px;
  vertical-align: text-top;
}
.container{
  width: 100%;
  height: 82px;
  padding: 0;
  margin: 0;
}
#footer .mu-bottom-nav{
  height: 100%;
}
</style>
