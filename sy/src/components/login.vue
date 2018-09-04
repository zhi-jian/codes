<template>
    <div id="login">
        <div class="middle-box loginscreen bg-white container">
            <div class="login-top"></div>
            <div class="login-title text-center boxC">
                <h1>用户登录</h1>
            </div>
            <div id="errormsg"><div id="errormsg_item" v-if="isLogins">{{errormsg}}</div></div>
            <el-form inline-message :model="loginForm"  ref="loginForm">
                <el-form-item prop="username">
                    <el-input status-icon prefix-icon="fa fa-user" v-model="loginForm.username" placeholder="请输入用户名" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="fa fa-lock" :type="passwordType" v-model="loginForm.password" placeholder="请输入密码" auto-complete="on"></el-input>
                    <span class="show-pwd"><i class="icon iconfont icon-eye boxC"></i></span>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" :loading="loading" @click="loginSubmit">登录</el-button>
                </el-form-item>
            </el-form>
      </div>
        <!-- <div class="login_name">
            用户名：<input type="text" v-model="login_name">
        </div>
        <div class="login_pwd">
            密码：<input type="text" v-model="login_pwd">
        </div>
        <div class="login_btn"><button @click="loginSubmit">登录</button></div> -->
    </div>
</template>
<script>
import Vue from "vue";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  data() {
    return {
      login_name: "",
      login_pwd: "",
      baseUrl: this.HOST,
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      passwordType: "password",
      errormsg:'',
      isLogins:false,
    };
  },
  mounted() {
  },
  methods: {
    loginSubmit() {
      var name = this.loginForm.username,
        pwd = this.loginForm.password;
        this.loading = true;
        // console.log(this.loginForm.username,this.loginForm.password)
      this.axios({
        method: "post",
        url: this.HOST + "index.php?r=user/login",
        dataType: "json",
        data: {
          user_name: name,
          user_pwd: pwd
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            ret = ret.slice(0, -1); // 去掉最后的空行
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res);
        if (res.data.data.error_message == "验证通过") {
            var userInfo = res.data.data.user_info;
            // console.log(userInfo)
            Vue.prototype.userInfo = {
                  user_id: userInfo.user_id,
                  user_nick_name: userInfo.user_nick_name,
                  user_avatar: userInfo.user_avatar
                };
            this.$cookies.set('isLogin',true)
            this.$cookies.set('userNickName',userInfo.user_nick_name)
            this.$cookies.set('userAvatar',userInfo.user_avatar)
            this.$cookies.set('userId',userInfo.user_id)
          // Vue.prototype.isLogin = true
          // Vue.prototype.userInfo = userInfo
          this.loading = false;
          this.isLogins = false;
          this.$router.go(-1);
        }else{
            this.$cookies.set('isLogin',false)
            this.$cookies.set('userNickName','')
            this.$cookies.set('userAvatar','')
            this.$cookies.set('userId',userInfo.user_id)
            this.errormsg = res.data.data.error_message;
            this.isLogins = true;
            this.loading = false;
        }
      });
    },
  }
};
</script>
<style>
body {
  /* background: url("~@/assets/images/login-bg.jpg") no-repeat center fixed; */
  background-size: cover;
}
#login .bg-white {
  background-color: #ffffff;
  opacity: 0.8;
}
#login #errormsg{
    height: 30px;
    margin-bottom: 20px;
}
#login #errormsg_item{
    text-align: left;
    color: #f00;
}
#login .middle-box {
  z-index: 100;
  margin: 0 auto;
  padding-bottom: 10px;
}
#login .loginscreen .middle-box {
  width: 300px;
}
#login .login-top {
  background-color: #3b3127;
  height: 6px;
}
#login .login-title {
  height: 80px;
  margin-bottom: 20px;
  font-weight: bold;
}
#login .login-header {
  height: 265px;
}
#login .login-logo {
  margin-top: 40px;
}
#login .login-logo-zh,
#login .login-logo-en {
  font-weight: bold;
  color: #3b3127;
}
#login .login-logo-zh {
  font-size: 45px;
  font-family: "宋体";
}
#login .login-logo-en {
  font-size: 21px;
  font-family: "Helvetica";
}
#login .middle-box {
}
#login .show-pwd {
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 16px;

  cursor: pointer;
  user-select: none;
}
#login .el-input__inner {
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .el-input--prefix {
  height: 80px;
}
</style>
