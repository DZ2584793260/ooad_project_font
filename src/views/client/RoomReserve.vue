<template>
  <div class="roomReserve">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main>
        <div class="title">
          请填写订单信息
        </div>

        <div class="roomForm">
          <el-form :model="formTable">

            <el-form-item label="用户账号">
              <el-input v-model="formTable.account">
              </el-input>
            </el-form-item>
            <el-form-item label="房间Id">
              <el-input v-model="formTable.roomId" :disabled="true">
              </el-input>
            </el-form-item>

            <el-form-item label="入住时间">
              <el-date-picker v-model="formTable.ReserveCheckInTime" type="datetime" placeholder="请选择您的入住时间"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="退房时间" v>
              <el-date-picker v-model="formTable.ReserveCheckOutTime" type="datetime" placeholder="请选择您的退房时间"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="平台编号">
              <el-input v-model="formTable.Platform" :disabled="true">
              </el-input>
            </el-form-item>

            <el-form-item label="平台运单编号">
              <el-input v-model="formTable.PlatOrderNumber">
              </el-input>
            </el-form-item> -->

            <el-form-item label="预订房间数量">
              <el-input v-model="formTable.roomAmount" :disabled="true">
              </el-input>
            </el-form-item>

            <el-form-item label="价格">
              <el-input v-model="formTable.price" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="总共需要支付金额">
              <el-input v-model="formTable.sum" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="可用优惠券">
              <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                查看已有优惠券
              </el-button>

              <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
                <!-- <span>我来啦!</span> -->
                <div class="coupon" v-for="item in coupons" v-if="item != 0">
                  {{ item }}元抵用券
                </div>
              </el-drawer>
            </el-form-item>


          </el-form>
        </div>
      </el-main>
      <el-aside width="200px"></el-aside>

    </el-container>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button v-show="true" @click="backToTableSelect">取 消</el-button>
      <el-button v-show="true" type="primary" @click="addRoom()">确 定</el-button>
    </div>
  </div>

</template>

<script>


export default {

  methods: {
    backToTableSelect() {
      this.$router.push({ name: "clientTableSelect", params: { hotelName: this.hotelName, hotelId: this.companyGroupId, hotelAddress: this.hotelAddress } });
    },
    addRoom() {
      const _this = this
      const dayjs = require('dayjs')
      _this.formTable.ReserveCheckInTime = dayjs(_this.formTable.ReserveCheckInTime).format()
      // _this.formTable.ReserveCheckInTime = _this.formTable.ReserveCheckInTime.dayjs().millisecond(0).valueOf
      _this.formTable.ReserveCheckOutTime = dayjs(_this.formTable.ReserveCheckOutTime).format()
      // _this.formTable.ReserveCheckOutTime = _this.formTable.ReserveCheckOutTime.dayjs().millisecond(0).valueOf


      this.$api.orderApi.addNewOrder(_this.formTable.account, parseInt(_this.formTable.roomId),
        _this.formTable.ReserveCheckInTime, _this.formTable.ReserveCheckOutTime,
        parseInt(_this.formTable.roomAmount), (_this.formTable.price * 100))
        .then(res => {
          console.log(res)
          this.$message({
            showClose: true,
            message: '您已经成功订房！',
            type: 'success'
          });

          this.$router.push({ name: "clientTableSelect", params: { hotelName: this.hotelName, hotelId: this.companyGroupId, hotelAddress: this.hotelAddress } });
        }).catch(err => {
          console.log(err)
        })
      //支付API！！！！！！！！！！！！
      // this.$api.orderApi.orderpay("12345678", 100)
      //   .then(res => {
      //     console.log(res)
      //   }).catch(err => {
      //     console.log(err);
      //   });
    },
    getBeforeDate(num, time) {
      let n = num;
      let d = '';
      if (time != "") {
        return time;
      } else {
        d = new Date();
      }
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      let hh = d.getHours();
      let mf =
        d.getMinutes() < 10
          ? "0" + d.getMinutes()
          : d.getMinutes();
      let ss =
        d.getSeconds() < 10
          ? "0" + d.getSeconds()
          : d.getSeconds();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day) + " " + hh + ":" + mf + ":" + ss;
      return s;
    },
    getDateTime(time, day) {
      console.log(time)
      if (time != "") {
        return time
      }
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate() + day;
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      let gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      // console.log(gettime)
      return gettime;
    },
  },
  data() {
    return {
      drawer: false,
      formTable: {
        account: this.$store.getters.getUser.id,
        roomId: this.$route.params.roomID,
        ReserveCheckInTime: "",
        ReserveCheckOutTime: "",
        roomAmount: 1,
        price: this.$route.params.price,
        sum: this.$route.params.price,
      },
      coupons: null,
      RoomID: this.$route.params.roomID,
      companyGroupId: this.$route.params.companyGroupId,
      hotelName: this.$route.params.hotelName,
      hotelAddress: this.$route.params.hotelAddress
    }
  },
  created() {
    // console.log(this.$route.params.startTime)
    // console.log(this.$route.params.endTime)
    this.$api.orderApi.getCoupon(this.$store.getters.getUser.id)
      .then(res => {
        this.coupons = res.data
      }).catch(err => {
        console.log(err)
      })
    this.formTable.ReserveCheckInTime = this.getBeforeDate(0, this.$route.params.startTime)
    this.formTable.ReserveCheckOutTime = this.getBeforeDate(-1, this.$route.params.endTime)
    console.log(this.formTable)
  },
}
</script>

<style scoped>
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
  line-height: 160px;
  width: 500px;
}

.title {
  font-size: large;
  line-height: 1.5;
}

.coupon {
  position: relative;
  width: 400px;
  height: 160px;
  margin: 20px auto;
  color: #fff;
  font-size: 30px;
  text-indent: 40px;
  line-height: 160px;
  background-image: radial-gradient(circle at 1px 8px, transparent 6px, #f60 6px, #f60 0),
    radial-gradient(circle at 199px 8px, transparent 6px, #f60 6px, #f60 0);
  background-size: 200px 18px;
  background-position: 0 0, 200px 0;
  background-repeat-x: no-repeat;
}

.coupon::before {
  position: absolute;
  content: "";
  left: 240px;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 1px dashed #fff;
}

.coupon::after {
  content: "下单即享满减优惠";
  position: absolute;
  width: 70px;
  top: 50%;
  right: 2%;
  transform: translate(-50%, -50%);
  line-height: 40px;
  text-indent: 5px;
  font-size: 30px;
}
</style>