<template>
    <div id="merchant">
        <div id='list' class='boxStart'>
            <div class='item' v-for="(item,idx) in merchantList" :key="idx">
                <div class='item_img'>
                    <img :src='baseUrl + item.merchant_logo'></img>
                </div>
                <div class='item_info boxC'>{{item.seller_name}}</div>
            </div>
        </div>
        <div id='btn'>
            <button id='submit'   @click="showCustomzied">成为上兿芭莎的合作伙伴</button>
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
    var url = this.baseUrl + "index.php?r=user/cooperator&source=miniProgram";
    this.$store.dispatch("getMerchantList", url);
  },
  methods: {
    showCustomzied() {
      this.$store.commit("changecustomziedModal", true);
    }
  },
  computed: mapState({
    merchantList: state => state.merchant.merchantList
  })
};
</script>
<style>
#merchant {
  margin-top: 56px;
}
#merchant #list {
  padding-top: 8px;
  padding-right: 20px;
  flex-wrap: wrap;
  margin-bottom: 130px;
}

#merchant .item {
  margin-top: 20px;
  margin-left: 20px;
  position: relative;
  overflow: hidden;
}

#merchant .item img {
  width: 222px;
  height: 168px;
  vertical-align: top;
}

#merchant .item_info {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: -168px;
  background: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  color: #fff;
  letter-spacing: 0;
  line-height: 40px;
}

#merchant #btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 0 24px;
  margin-bottom: 28px;
  box-sizing: border-box;
}

#merchant #submit {
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #fff;
  line-height: 28px;
  background-image: linear-gradient(90deg, #19c0a3 0%, #7ac220 100%);
  border-radius: 0;
  border: none;
}
</style>
