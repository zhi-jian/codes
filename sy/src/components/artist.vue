<template>
    <div id="artist">
        <div class="artist_item" v-for="(item,idx) in artistList" >
                <router-link :to="{path:'artistDetail',name:'artistDetail',params:{id:item.id}}">
                    <div class='info boxC'>
                        <img :src='baseUrl+item.user_avatar' class='tx'></img>
                        <div class='name'>{{item.artist_name}}</div>
                        <div class='procount boxC'>{{item.products.length}}件作品</div>
                        <!-- <div class='yspcount boxC'>{{productLength.length}}个衍生品</div> -->
                    </div>
                </router-link>
                <div class='pro boxC'>
                    <div v-for="(proItem,idx) in item.products" :key="idx" v-if="idx<4" class="boxC">
                        <router-link :to="{path:'detail',name:'detail',params:{id:proItem.products_id}}">
                            <img :src='baseUrl + proItem.products_img_url' class='proimg' style=''></img>
                        </router-link>
                    </div>
                    <router-link :to="{path:'artistDetail',name:'artistDetail',params:{id:item.id}}">
                        <div>
                            <img src='http://www.shangyibazaar.com/WeChatMiniProgram/images/artist/更多@3x.png' class='more'></img>
                        </div>
                    </router-link>
                </div>
                <div class='hr'></div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return {
            baseUrl:this.HOST,
            url:'index.php?r=artist&source=miniProgram'
        }
    },
    mounted(){
        var baseUrl = this.baseUrl,url=this.url;
        var urls = baseUrl + url;
        this.$store.dispatch('getArtistList',urls)
    },
    computed:mapState({
        artistList:state=>state.artist.artistLists,
        artistProduct:state=>state.artist.artistProducts,
        productLength:state=>state.artist.productLength,
        IPLength:state=>state.artist.IPLength,
    })
}
</script>
<style>
#artist{
    margin-top: 56px;
}
.title{
  height: 60px;
  font-size: 28px;
  color: #333333;
  padding-left: 24px;
  justify-content: space-between;
}
.content{
  background: #fff;
  flex-direction: column;
}
.info{
  justify-content: flex-start;
  padding: 32px 0 32px 24px;
}
.tx{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.name{
  font-size: 32px;
  color: #333333;
  line-height: 32px;
  margin-left: 28px;
}
.procount{
  width: 104px;
  height: 36px;
  background: #f6f6f6;
  font-size: 24px;
  color: #999999;
  margin-left: 24px;
}
.yspcount{
  width: 138px;
  height: 36px;
  background: #19C0A3;
  font-size: 24px;
  color: #FFFFFF;
  margin-left: 32px;
}
.pro{
  overflow: auto;
  justify-content: flex-start;
  padding-left: 24px;
}
.pro>div{
  width: 148px;
  height: 148px;
  overflow: hidden;
  margin-right: 12px;
}
.pro img{
  /* width: 148px; */
  height: 148px;
}
.pro .more{
  width: 60px;
  height: 148px;
}
.hr{
  width: 100%;
  height: 2px;
  background: #ededed;
  margin-top: 32px;
}
</style>
