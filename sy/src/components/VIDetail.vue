<template>
    <div id="VIDetail">
        <div id='main'>
            <div class='main_img'>
                <img :src='baseUrl + VIDetails.vi_info.vi_img'></img>
            </div>
            <div id='detail_info'> 
                <div class='vi_name'></div>
                <div class='vi_introduce'></div>
                <div class='vi_type boxStart'>
                    <div class='viType0' v-if="VIDetails.vi_info.vi_type=='0'">艺术定制VI</div>
                    <div class='viType1' v-if="VIDetails.vi_info.vi_type=='1'">传统品牌VI</div>
                    <div class='designer'>设计师：{{VIDetails.designer.designer_name}} / {{VIDetails.designer.create_time}}</div>
                </div>
                <div class='info'>
                    <div class='info_item'>
                        <div class='info_title boxStart'>
                            <div class='title_icon'>
                            <img src='https://www.shangyibazaar.com/WeChatMiniProgram/images/VIDetail/cName.png'></img>
                            </div>
                            <div class='title_text'>公司名称</div>
                        </div>
                        <div class='info_content'>{{VIDetails.vi_info.vi_company}}</div>
                    </div>
                    <div class='info_item'>
                        <div class='info_title boxStart'>
                            <div class='title_icon'>
                            <img src='https://www.shangyibazaar.com/WeChatMiniProgram/images/VIDetail/pIcon.png'></img>
                            </div>
                            <div class='title_text'>品牌</div>
                        </div>
                        <div class='info_content'>{{VIDetails.vi_info.vi_brand}}</div>
                    </div>
                    <div class='info_item'>
                        <div class='info_title boxStart'>
                            <div class='title_icon'>
                            <img src='https://www.shangyibazaar.com/WeChatMiniProgram/images/VIDetail/hIcon.png'></img>
                            </div>
                            <div class='title_text'>所属行业</div>
                        </div>
                        <div class='info_content'>{{VIDetails.vi_info.vi_industry}}</div>
                    </div>
                </div>
                <div class='design_introduce'>
                    <div class='design_title boxStart'>
                        <div class='design_title_icon'></div>
                        <div class='design_title_text'>设计介绍</div>
                    </div>
                    <div class='design_content'>
                        <div v-for="(item,idx) in VIDetails.imgs" :key="idx">
                            <img :src='baseUrl + item.vi_imgs_url'></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='btn'><button id='customzied'  @click="showCustomzied">我要定制</button></div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl: this.HOST,
      VIId: ""
    };
  },
  mounted() {
    this.VIId = this.$route.params.id;
    var url =
      this.baseUrl + "index.php?r=vi/detail&source=miniProgram&id=" + this.VIId;
    this.$store.dispatch("getVIDetail", url);
  },
  methods:{
    showCustomzied(){
      this.$store.commit('changecustomziedModal',true)
    }
  },
  computed: mapState({
    VIDetails: state => state.VIDetail.VIDetails
  })
};
</script>
<style>
#VIDetail #main {
  background: #fff;
  border-top: 1px solid rgba(237, 237, 237, 0.5);
}
#VIDetail .main_img img {
  width: 100%;
  background: #999;
}

#VIDetail #detail_info {
  padding: 0 24px;
}

#VIDetail .vi_name {
  margin-top: 32px;
  margin-bottom: 20px;
  font-size: 32px;
  color: #333333;
  line-height: 32px;
}

#VIDetail .vi_introduce {
  font-size: 28px;
  color: #999999;
  letter-spacing: 0;
  line-height: 44px;
}

#VIDetail .vi_type {
  margin-top: 20px;
}

#VIDetail .viType0 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  padding: 8px 12px;
  border: 1px solid #19c0a3;
  font-size: 24px;
  color: #19c0a3;
  letter-spacing: 0;
  line-height: 24px;
}

#VIDetail .viType1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  padding: 8px 12px;
  border: 1px solid #6984cf;
  font-size: 24px;
  color: #6984cf;
  letter-spacing: 0;
  line-height: 24px;
}

#VIDetail .designer {
  border: 1px solid #e1e1e1;
  padding: 8px 12px;
  font-size: 24px;
  color: #666666;
  letter-spacing: 0;
  line-height: 24px;
}

#VIDetail .design_content img {
  width: 100%;
}

#VIDetail .title_icon img {
  width: 30px;
  height: 26px;
  margin-right: 24px;
}

#VIDetail .info {
  margin-top: 32px;
  padding-left: 24px;
  padding-top: 32px;
  background: #fafafa;
  border: 2px solid #ededed;
}

#VIDetail .info_item {
  margin-bottom: 36px;
}

#VIDetail .info_content {
  margin-top: 20px;
  margin-left: 54px;
  text-align: left;
}

#VIDetail .design_title_icon {
  width: 6px;
  height: 24px;
  margin-right: 12px;
  background: #333;
}

#VIDetail .design_title {
  margin-top: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #ededed;
}

#VIDetail .design_introduce {
  margin-bottom: 130px;
}

#VIDetail #btn {
  width: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 0 rgba(237, 237, 237, 0.5);
}
#VIDetail #customzied {
  width: 100%;
  height: 88px;
  background: #6984cf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
}
</style>
