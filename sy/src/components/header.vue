<template>
    <div id="header">
        <mu-appbar style="width: 100%;" color="#fff">
          <mu-button icon slot="left"  style="color:#333;" @click="backs">
            <mu-icon value="arrow_back"></mu-icon>
          </mu-button>
          <mu-list-item-title class="headerTitle">{{headerText}}</mu-list-item-title>
          <!-- <mu-menu slot="right">
            <mu-button flat  style="color:#333;"><mu-icon value="menu"></mu-icon></mu-button>
            <mu-list slot="content">
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>Menu Item 1</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>Menu Item 2</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
          </mu-menu> -->
        </mu-appbar>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      headerText:'',
      routeName:''
    };
  },
  methods:{
    backs:function(){
      if(this.routeName=='fillInOrder'){
        this.$store.commit('changeFillOrderBackModalShow',true)
      }else{
        this.$router.go(-1)
        this.$destroy();
      }
      
    } 
  },
  mounted: function() {
    // console.log(this)
    var routeName = this.$route.name;
    if(routeName=='productDetail'){
      this.$data.headerText = '衍生品详情'
    }else if(routeName=='detail'){
      this.$data.headerText = '作品详情'
    }else if(routeName=='IP'){
      this.$data.headerText = '艺术IP库'
    }else if(routeName=='ficitious'){
      this.$data.headerText = '独家设计'
    }else if(routeName=='artist'){
      this.$data.headerText = '艺术家列表'
    }else if(routeName=='artistDetail'){
      this.$data.headerText = '艺术家详情'
    }else if(routeName=='outfit'){
      this.$data.headerText = '软装+版权'
    }else if(routeName=='outfitDetail'){
      this.$data.headerText = '软装+版权详情'
    }else if(routeName=='VI'){
      this.$data.headerText = '企业VI'
    }else if(routeName=='VIDetail'){
      this.$data.headerText = '企业VI详情'
    }else if(routeName=='merchant'){
      this.$data.headerText = '合作商'
    }else if(routeName=='video'){
      this.$data.headerText = '视频'
    }else if(routeName=='orderList'){
      this.$data.headerText = '订单列表'
    }else if(routeName=='orderDetail'){
      this.$data.headerText = '订单详情'
    }else if(routeName=='addressList'){
      this.$data.headerText = '地址管理'
    }else if(routeName=='addAddress'){
      this.$data.headerText = '新增收货地址'
    }else if(routeName=='writeAddress'){
      this.$data.headerText = '编辑收货地址'
    }else if(routeName=='fillInOrder'){
      this.$data.headerText = '填写订单'
      this.routeName = routeName
    }else{}
    
  },
};
</script>
<style>
#header{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000000;
}
#header .mu-appbar-title{
  margin-left: -56px;
}
#header .headerTitle{
  font-size: 28px;
  line-height: 28px;
  color: #333;
  text-align: center;
}

</style>
