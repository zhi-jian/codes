<template>
    <div>
        <div id="myCenter" v-if="aaa">
            <div id="userInfo" class="boxStart">
                <div class="userInfo_avatar boxC"><img :src="baseUrl + userInfos.user_avatar" alt="" width="56px;" height="56px;"></div>
                <div class="userInfo_name">{{userInfos.user_nick_name}}</div>
            </div>
            <div id="myCenterMiddle">
                <router-link :to="{path:'orderList',name:'orderList'}">
                    <div class="middle_info boxS">
                        <div class="info_left boxStart">
                            <div class="left_icon"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/myCenter/orderIcon@3x.png" alt="" width="24px;" height="24px;"></div>
                            <div class="left_title">订单</div>
                        </div>
                        <div class="right_arrow"><img src="http://www.shangyibazaar.com/upload/arrowRight.png" alt="" width="6px;" height="11px;"></div>
                    </div>
                </router-link>
                <router-link :to="{path:'addressList',name:'addressList'}">
                    <div class="middle_info boxS">
                        <div class="info_left boxStart">
                            <div class="left_icon"><img src="http://www.shangyibazaar.com/WeChatMiniProgram/images/myCenter/addressIcon@3x.png" alt="" width="24px;" height="24px;"></div>
                            <div class="left_title">地址管理</div>
                        </div>
                        <div class="right_arrow"><img src="http://www.shangyibazaar.com/upload/arrowRight.png" alt="" width="6px;" height="11px;"></div>
                    </div>
                </router-link>
            </div>
            <div id="loginOut" class="boxC" @click="logOut"> 
                <div class="loginOut_btn boxC"><a href="javascript:" style="color:#fff;"> 退出登录</a></div>
            </div>

        </div>
        <login v-if="!aaa"></login>
        <!-- <div id="dd" v-if="!aaa">
            <div id="box">
                <img id="d1"
                    src="../assets/d1.jpg"
                    alt="" >
                <img id="d2" src="../assets/d2.jpg" alt="">
                <img id="d3" src="../assets/d3.jpg" alt="">
                <img id="d4" src="../assets/d4.jpg" alt="">
                <img id="d5" src="../assets/d5.jpg" alt="">
                <img id="d6" src="../assets/d6.jpg" alt="">
                <img id="d7" src="../assets/d7.jpg" alt="">
                <img id="d8" src="../assets/d8.jpg" alt="">
                <img id="d9" src="../assets/d9.jpg" alt="">
                <img id="d10" src="../assets/d10.jpg" alt="">
            </div>
        </div> -->
    </div>
</template>
<script>
import Login from "@/components/login.vue";
import Vue from "vue";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  data() {
    return {
      aaa: false,
      baseUrl: this.HOST,
      userInfos: {
        user_avatar: "/upload/defaultAvatar.png",
        user_id: "",
        user_name: "",
        user_nick_name: "",
        user_type: ""
      }
    };
  },
  mounted() {
    // var isLogin = this.isLogin;
    var isLogin = this.$cookies.get("isLogin");
    var userNickName = this.$cookies.get("userNickName");
    var userAvatar = this.$cookies.get("userAvatar");
    var userId = this.$cookies.get("userId");
    Vue.prototype.userInfo = {
      user_id: userId,
      user_nick_name: userNickName,
      user_avatar: userAvatar
    };
    // console.log(isLogin);
    if (isLogin == "true") {
      // console.log(this.userInfo)
      this.aaa = true;
      this.userInfos = {
        user_nick_name: userNickName,
        user_avatar: userAvatar
      };
    } else {
      this.aaa = false;
      this.userInfos = {
        user_avatar: "/upload/defaultAvatar.png",
        user_id: "",
        user_name: "",
        user_nick_name: "",
        user_type: ""
      };
    }
  },
  methods: {
    logOut: function() {
      this.$cookies.remove("username");
      this.$cookies.remove("isLogin");
      this.$cookies.remove("userNickName");
      this.$cookies.remove("userAvatar");
      this.$cookies.remove("userId");
      this.$router.push({path:'/pages/index'})
    }
  },
  components: {
    login: Login
  }
};
</script>
<style>
#dd {
  perspective: 5000px;
  transform: rotateX(-20deg);
  transform-style: preserve-3d;
}

#box {
  position: relative;
  width: 200px;
  height: 300px;
  border: 1px solid #f00;
  margin: 500px auto;
  transform-style: preserve-3d;
  -webkit-animation: rotate1 15s linear infinite;
  -moz-animation: rotate1 15s linear infinite;
  animation: rotate1 15s linear infinite;
  background-image: url(../assets/d10.jpg);
  background-size: 200px 300px;
  background: no-repeat;
}
#box img {
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  -webkit-box-reflect: below 20px -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(
          250,
          250,
          250,
          0
        )
        30%, rgba(250, 250, 250, 0.5));
  box-shadow: 0 0 10px #ffffff;
  border-radius: 10px;
}
#d1 {
  transform: translateZ(350px);
}
#d2 {
  transform: rotateY(36deg) translateZ(350px);
}
#d3 {
  transform: rotateY(72deg) translateZ(350px);
}
#d4 {
  transform: rotateY(108deg) translateZ(350px);
}
#d5 {
  transform: rotateY(144deg) translateZ(350px);
}
#d6 {
  transform: rotateY(180deg) translateZ(350px);
}
#d7 {
  transform: rotateY(216deg) translateZ(350px);
}
#d8 {
  transform: rotateY(252deg) translateZ(350px);
}
#d9 {
  transform: rotateY(288deg) translateZ(350px);
}
#d10 {
  transform: rotateY(324deg) translateZ(350px);
}
@-moz-keyframes rotate1 {
  0% {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}
@-webkit-keyframes rotate1 {
  0% {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}
#myCenter {
  padding: 0 40px;
}
#myCenter #userInfo {
  padding: 80px 0;
  border-bottom: 2px solid #ededed;
}
#myCenter .userInfo_avatar {
  width: 112px;
  height: 112px;
  margin-right: 40px;
  border-radius: 50%;
  overflow: hidden;
}
#myCenter .userInfo_name {
  font-size: 32px;
  color: #333333;
  line-height: 32px;
}
#myCenter #myCenterMiddle {
  padding: 72px 0;
  padding-top: 0;
  border-bottom: 2px solid #ededed;
}
#myCenter .left_icon {
  margin-right: 40px;
}
#myCenter .middle_info {
  margin-top: 72px;
}
#myCenter .left_title {
  font-size: 32px;
  color: #333;
}
#myCenter #loginOut {
  margin-top: 100px;
}
#myCenter .loginOut_btn {
  width: 360px;
  height: 80px;
  background: rgba(255, 0, 0, 0.8);
}
#myCenter .loginOut_btn a {
  font-size: 30px;
}
</style>
