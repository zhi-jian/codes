<template>
    <div id="outfitDetail">
        <div id='images'><img :src="baseUrl + outfitDetails.outfi_img" alt="" width="100%"></div>
        <div id='infos'>
            <div class='infos_outName'>{{outfitDetails.outfit_name}}</div>
            <div class='infos_art'>艺术家IP: {{outfitDetails.outfit_artist}} / {{outfitDetails.outfit_time}}</div>
            <div class='infos_parts boxStart'>
                <div class='infos_type0' v-if="outfitDetails.outfit_type=='0'">室内软装</div>
                <div class='infos_type1' v-if="outfitDetails.outfit_type=='1'">室外软装</div>
                <div class='infos_part' v-if="outfitDetails.parts" v-for="(item_part,idx) in outfitDetails.parts" :key="idx">{{item_part.ip_parts_name}}</div>
            </div>
            <div class='infos_IP'>
                <div class='IP_title'>软装使用的IP版权</div>
                
            </div>
            <div class='infos_desc'>{{outfitDetails.outfit_introduce}}</div>
        </div>
        <div id='btn' class="boxC">
            <button id='customzied' @click="showCustomzied">我要定制</button>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl: this.HOST,
      outfitId: ""
    };
  },
  mounted() {
    this.outfitId = this.$route.params.id;
    var url =
      this.baseUrl +
      "index.php?r=outfit/detail&source=miniProgram&id=" +
      this.outfitId;
    this.$store.dispatch("getOutfitDetail", url);
  },
  methods: {
    showCustomzied() {
      this.$store.commit("changecustomziedModal", true);
    }
  },
  computed: mapState({
    outfitDetails: state => state.outfitDetail.outfitDetails
  })
};
</script>
<style>
#outfitDetail {
  margin-top: 56px;
  height: 100%;
  margin-bottom: 130px;
  background: #f6f6f6;
}
#infos {
  background: #fff;
  padding: 0 28px;
  padding-top: 36px;
  padding-bottom: 36px;
}

.infos_outName {
  font-size: 32px;
  color: #333;
  line-height: 32px;
  font-weight: bold;
  text-align: left;
}

.infos_art {
  margin-top: 24px;
  font-size: 24px;
  color: #999;
  line-height: 24px;
  text-align: left;
}

.infos_parts {
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 6px;
  padding-bottom: 32px;
  border-top: 2px dashed #ededed;
  border-bottom: 2px dashed #ededed;
}

.infos_parts div {
  padding: 9px 16px;
  margin-top: 24px;
  margin-right: 16px;
  border: 2px solid #ededed;
  font-size: 24px;
  color: #999;
  line-height: 24px;
}

.infos_parts .infos_type0 {
  border-color: #19c0a3;
  color: #19c0a3;
}

.infos_parts .infos_type1 {
  border-color: #6984cf;
  color: #6984cf;
}

.infos_IP {
  margin-top: 30px;
  padding-bottom: 32px;
  border-bottom: 2px dashed #ededed;
}

.artImgsImgInfo {
  width: 100%;
  height: 56px;
  position: absolute;
  bottom: 0;
  padding-left: 20px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #fff;
  line-height: 24px;
  z-index: 100;
}

.IP_title {
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 28px;
  color: #333;
  line-height: 28px;
  text-align: left;
}

.infos_desc {
  margin-top: 22px;
  font-size: 28px;
  color: #666;
  line-height: 48px;
  text-align: left;
}

#btn {
  width: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 0 rgba(237, 237, 237, 0.5);
  border-top: 2px solid #ededed;
}

#outfitDetail #customzied {
  width: 100%;
  height: 88px;
  background: #19c0a3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
  border-radius: 0;
}
</style>
