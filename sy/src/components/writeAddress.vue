<template>
    <div id="writeAddress">
        <div id='inputGroup'>
            <div class='inputBox boxC'>
                <div class='company inputNames'>联系人</div>
                <div class='inputs'>
                    <input id='names' :placeholder='namesError' :class='isNames?"placeholderStyle":"placeholderStyleError"' v-model="names"/>
                </div>
            </div>
            <div class='inputBox boxC'>
                <div class='company inputNames'>电话</div>
                <div class='inputs'>
                    <input id='phone' placeholder='手机号码或座机号（必填）'  :class='isNames?"placeholderStyle":"placeholderStyleError"' v-model="tellNumber"/>
                </div>
            </div>
            <div class='inputBox boxC tell'>
                <div style='position:relative'>
                    <div class='company inputNames'>所在省市</div> 
                    <div class="block boxS" style="width:70%;">
                        <el-select v-model="provinceValue" placeholder="请选择" @change="provinceChange">
                          <el-option
                            v-for="item in province"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id">
                            <span style="float: left">{{ item.region_name }}</span>
                          </el-option>
                        </el-select>
                        <el-select v-model="cityValue" :placeholder="cityDefault" @change="cityChange">
                          <el-option
                            v-for="item in cities"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id">
                            <span style="float: left">{{ item.region_name }}</span>
                          </el-option>
                        </el-select>
                        <el-select v-model="countryValue" :placeholder="countryDefault">
                          <el-option
                            v-for="item in countries"
                            :key="item.region_id"
                            :label="item.region_name"
                            :value="item.region_id">
                            <span style="float: left">{{ item.region_name }}</span>
                          </el-option>
                        </el-select>
                    </div>
                </div> 
                <div class='tell-hr'></div>
                <div>
                    <div class='company inputNames'>门牌号</div>
                    <div class='inputs'>
                        <input id='detail' placeholder='输入区域街道和门牌号'  :class='isNames?"placeholderStyle":"placeholderStyleError"' v-model="delivery_detail"/>
                    </div>
                </div>
            </div>
            <div id='btn' class='boxC'>
            <div  class='btn-submit boxC'><button class='boxC subActive' @click="submitInfo">确定</button></div>
            <div  class='btn-delete boxC'><button class='boxC delete' @click="deleteDelivery">删除该地址</button></div>
            </div>
                    <el-dialog
                        title="提示"
                        :visible.sync="isDeleteModalShow"
                        width="80%"
                        top="50%"
                        :before-close="closeAlertDialog">
                        <span>确认删除该地址？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="closeAlertDialog">取 消</el-button>
                            <el-button type="primary" @click="deleteDeliveryConfirm">确 定</el-button>
                        </span>
                    </el-dialog>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      names: "",
      isNames: true,
      namesError: "负责人的姓名（必填）",
      tellNumber: "",
      isTellNumber: true,
      tellNumberError: "",
      delivery_detail: "",
      isDeliveryDetail: true,
      deliveryDetailError: "",
      province: [],
      cities: [],
      countries: [],
      provinceValue: "",
      cityValue: "",
      countryValue: "",
      cityDefault: "请选择",
      countryDefault: "请选择",
      writeAddressDeliveryId: "",
      isDeleteModalShow:false
    };
  },
  mounted() {
    var baseUrl = this.HOST;
    var writeAddressName = this.$route.params.writeAddressName,
      writeAddressTellNumber = this.$route.params.writeAddressTellNumber,
      writeAddressDeliveryDetail = this.$route.params
        .writeAddressDeliveryDetail,
      writeAddressDeliveryId = this.$route.params.writeAddressDeliveryId;
    this.names = this.$route.params.writeAddressName;
    this.tellNumber = this.$route.params.writeAddressTellNumber;
    this.delivery_detail = this.$route.params.writeAddressDeliveryDetail;
    this.writeAddressDeliveryId = this.$route.params.writeAddressDeliveryId;
    // console.log(
    //   writeAddressDeliveryId,
    //   writeAddressName,
    //   writeAddressTellNumber,
    //   writeAddressDeliveryDetail
    // );
    this.axios.get(baseUrl + "index.php?r=user/region&p_id=" + 1).then(res => {
    //   console.log(res);
      this.province = res.data.region;
    });
  },
  methods: {
    provinceChange() {
      var baseUrl = this.HOST;
      this.cityDefault = "";
    //   console.log(123, this.provinceValue);
      this.axios
        .get(baseUrl + "index.php?r=user/region&p_id=" + this.provinceValue)
        .then(res => {
        //   console.log(res);
          if (res.data.region.length != 0) {
            this.cities = res.data.region;
            this.cityDefault = res.data.region[0].region_name;
          } else {
            this.cityDefault = "暂无";
          }
        });
    },
    cityChange() {
      var baseUrl = this.HOST;
    //   console.log(123, this.cityValue);
      this.axios
        .get(baseUrl + "index.php?r=user/region&p_id=" + this.cityValue)
        .then(res => {
        //   console.log(res);
          if (res.data.region.length != 0) {
            this.countries = res.data.region;
            this.countryDefault = res.data.region[0].region_name;
          } else {
            this.countryDefault = "暂无";
          }
        });
    },
    submitInfo() {
      var that = this;
      var names = this.names,
        isNames = this.isNames,
        namesError = this.namesError,
        tellNumber = this.tellNumber,
        isTellNumber = this.isTellNumber,
        tellNumberError = this.tellNumberError,
        delivery_detail = this.delivery_detail;
      if (this.provinceValue) {
        var province = this.provinceValue;
      } else {
        var province = 0;
      }
      if (this.cityValue) {
        var city = this.cityValue;
      } else {
        var city = 0;
      }
      if (this.countryValue) {
        var country = this.countryValue;
      } else {
        var country = 0;
      }

      var namesTest = function() {
        if (names) {
          return true;
          isNames = true;
          namesError = "负责人的姓名（必填）";
        } else {
          return false;
          isNames = false;
          namesError = "请输入联系人姓名";
        }
      };
      var phoneTest = function() {
        var reg = /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/;
        if (tellNumber && reg.test(tellNumber)) {
          return true;
          isTellNumber = true;
          tellNumberError = "";
        } else if (!tellNumber) {
          isTellNumber = false;
          tellNumberError = "请输入联系人手机号码";
          return false;
        } else if (!reg.test(tellNumber)) {
          isTellNumber = false;
          tellNumberError = "手机号格式错误";
          return false;
        }
      };
      //   console.log(
      //       names,
      //       tellNumber,
      //       province,
      //       city,
      //       country,
      //       delivery_detail
      //     );
      namesTest();
      phoneTest();
      if (
        namesTest() &&
        phoneTest() &&
        province &&
        city &&
        country &&
        delivery_detail
      ) {
        // console.log(
        //   names,
        //   tellNumber,
        //   province,
        //   city,
        //   country,
        //   delivery_detail
        // );
        this.axios({
          method: "post",
          url: this.HOST + "index.php?r=user/delivery_edit",
          dataType: "json",
          data: {
            detail: delivery_detail,
            phone: tellNumber,
            name: names,
            province: province,
            city: city,
            county: country,
            delivery_id: this.writeAddressDeliveryId
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
          //   console.log(res);
          if (res.data == "0") {
            this.$router.go(-1);
            this.$destroy();
          }
        });
      } else {
        // console.log("滚回去充填  ");
        tellNumber = "";
      }
    },
    deleteDelivery() {
        this.isDeleteModalShow = true;
    },
    closeAlertDialog(){
        this.isDeleteModalShow = false;
    },
    deleteDeliveryConfirm(){
          this.axios({
              method:'get',
              url:this.HOST + 'index.php?r=user/Delivery_delete&delivery_id=' + this.writeAddressDeliveryId,
              dataType:'json'
          }).then(res=>{
            //   console.log(res)
              if (res.data) {
                    this.$router.go(-1);
                    this.$destroy();
                }
          })
    }
  }
};
</script>
<style>
#writeAddress {
  margin-top: 56px;
}
#writeAddress #inputGroup {
  padding-top: 40px;
}
#writeAddress #alt {
  font-size: 28px;
  color: #19c0a3;
  line-height: 28px;
  margin-bottom: 40px;
}
#writeAddress #detail{
  margin: 0;
}
#writeAddress .mu-load-more {
  margin-bottom: 100px;
}
#writeAddress .inputBox {
  width: 100%;
  height: 96px;
  background: #fff;
  justify-content: flex-start;
  padding: 0 30px;
  box-sizing: border-box;
  margin-bottom: 40px;
  text-align: left;
}
#writeAddress .inputNames {
  width: 128px;
  font-size: 32px;
  color: #333333;
  line-height: 32px;
  margin-right: 54px;
}
#writeAddress .inputs input {
  width: 500px;
  font-size: 32px;
  color: #333333;
  line-height: 32px;
}
#writeAddress .el-select .el-input__inner {
  display: flex;
  align-items: center;
}
#writeAddress .placeholderStyle::-webkit-input-placeholder {
  font-size: 32px;
  color: #cccccc;
  line-height: 32px;
}
#writeAddress .placeholderStyleError::-webkit-input-placeholder {
  font-size: 32px;
  color: #f00;
  line-height: 32px;
}
#writeAddress .tell {
  height: 193px;
  flex-direction: column;
  margin-bottom: 0;
}
#writeAddress .tell > div {
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
}
#writeAddress .tell > .tell-hr {
  width: 700px;
  height: 1px;
  background: #ededed;
  padding-top: 1px;
  margin-left: 5px;
}
#writeAddress #btn {
  width: 100%;
  flex-direction: column;
  margin-top: 80px;
}
#writeAddress #btn button {
  width: 690px;
  height: 96px;
  border: none;
  border-radius: 0;
  font-size: 32px;
  color: #ffffff;
  line-height: 32px;
}
#writeAddress #btn button::after {
  width: 690px;
  height: 96px;
  border: none;
  border-radius: 0;
  font-size: 32px;
  color: #ffffff;
  line-height: 32px;
}
#writeAddress .btn-submit {
  margin-bottom: 40px;
}
#writeAddress .subActive {
  background: #19c0a3;
}
#writeAddress #btn .delete {
  border: 2px solid #19c0a3;
  color: #19c0a3;
}
#writeAddress #chooseAddress {
  position: absolute;
  top: 216px;
  left: 185px;
  z-index: 999;
}
#writeAddress .item_inputBox {
  width: 500px;
}
#writeAddress .item_choose {
  width: 750px;
  height: 600px;
  margin-left: -213px;
}

/* #writeAddress #addressModal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 1000%;
  background: rgba(0, 0, 0, 0.4);
} */
#writeAddress #btns {
  width: 750px;
  margin-left: -213px;
  padding: 30px 40px;
  box-sizing: border-box;
  font-size: 32px;
  background: #fff;
  color: #666;
}
</style>
