<template>
    <div id="video">
        <div class="video_item" v-for="(item,idx) in videoList" :key="idx">
            <div class="item_video">
                <video :src="item.mini_medium" width="100%;" height="100%;" style="background:#666;" :poster="baseUrl+item.banner_image" controls></video>
            </div>
            <div class='item-info boxC'>
                 <div class='item_info_title'>{{item.video_name}}</div>
                <div class='item_info_content' style='font-size:12px'>{{item.video_short_desc}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl: this.HOST
    };
  },
  mounted() {
    var url = this.baseUrl + "index.php?r=video/list";
    this.$store.dispatch("getVideoList", url);
  },
  methods: {

  },
  computed: mapState({
    videoList: state => state.video.videoList
  })
};
</script>
<style>
#video{
    margin-top: 56px;
}
#video .item-info{
  width: 100%;
  height: 140px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding:32px 24px 32px 24px;
   box-sizing: border-box; 
}
#video .item-info .item_info_title{
  font-size: 32px;
  color: #333333;
  line-height: 32px;
}
#video .item-info .item_info_content{
  font-size: 24px;
  color: #999999;
  line-height: 24px;
}
</style>
