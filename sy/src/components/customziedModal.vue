<template>
    <div id="customziedModal" v-if="customziedShow">
        <el-dialog width="80%" top="45%" :visible.sync="customziedShow" :before-close="handleClose" title="提交信息">
          <span>
            <input placeholder-class="cart_holder"  class="input boxC" placeholder='联系人姓名' v-model="inputName" ></input>
            <input placeholder-class="cart_holder"  class="input boxC" placeholder='电话' v-model="inputTel"></input>
            <input placeholder-class="cart_holder"  class="input input_textarea boxC" placeholder='输入您想定制的大概内容，我们会尽快联系您～' v-model="inputText"></input>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="success" @click="submitInfos">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      inputName:'',
      inputTel:'',
      inputText:'',
    };
  },
  mounted() {
    this.dialogVisible = this.$store.state.customziedModal.customziedShow;
  },
  methods: {
    handleClose(done) {
      this.$store.commit("changecustomziedModal", false);
    },
    submitInfos(){
      var inputName = this.inputName,inputTel = this.inputTel,inputText = this.inputText,baseUrl = this.HOST;
      this.axios.post(baseUrl+'index.php?r=user/cooperator',{
        name:inputName,
        phone:inputTel,
        goal:inputText
      }).then(res=>{
        this.handleClose();
        this.$message({
          message: '定制信息提交成功，我们会尽快致电联系您！',
          type: 'success'
        });
      })
    }
  },
  computed: mapState({
    customziedShow: state => state.customziedModal.customziedShow
  }),
};
</script>
<style>
#customziedModal .el-dialog__header {
  padding-top: 40px;
  text-align: center;
}
#customziedModal .el-dialog__header span {
  font-size: 32px;
  color: #030303;
  font-weight: bold;
}
.input {
  width: 100%;
  height: 68px;
  margin-bottom: 28px;
  padding-left: 16px;
  background: #fff;
  font-size: 28px;
  color: #333;
  line-height: 28px;
  box-sizing: border-box;
  text-align: left;
  border: 2px solid #e1e1e1;
}

.input_textarea {
  height: 200px;
  padding-right: 38px;
  flex-wrap: wrap;
}
.cart_holder {
  font-size: 28px;
  color: #cfcfcf;
  line-height: 44px;
}
</style>
