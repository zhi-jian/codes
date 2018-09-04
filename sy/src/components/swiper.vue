<template>
    <div class="swiperList">
        <mu-carousel>
            <mu-carousel-item v-for="item in imgLists" :key="item.ad_id">
                <img :src="url+item.ad_image">
            </mu-carousel-item>
        </mu-carousel>
    </div>
</template>
<script>

import Vue from 'vue'

import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return {
            url:''
        }
    },
    mounted:function(){
        var url=this.HOST+'api.php?r=home/index&test=1&source=miniProgram'
        this.$data.url=this.HOST
        this.$store.dispatch('getSwiperLists',url)
        // console.log(this)
    },
    computed:mapState({
        imgLists:state=>state.swiper.swiperList
    })
};
</script>
<style>
.swiperList img{
    width: 100%;
    height: 100%;
}
</style>
