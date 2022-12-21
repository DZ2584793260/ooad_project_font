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

            <el-form-item label="平台编号">
              <el-input v-model="formTable.Platform" :disabled="true">
              </el-input>
            </el-form-item>

            <el-form-item label="平台运单编号">
              <el-input v-model="formTable.PlatOrderNumber">
              </el-input>
            </el-form-item>

            <el-form-item label="预订房间数量">
              <el-input v-model="formTable.roomAmount" :disabled="true">
              </el-input>
            </el-form-item>

            <el-form-item label="价格">
              <el-input v-model="formTable.price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="总共需要支付金额">
              <el-input v-model="formTable.sum" autocomplete="off"></el-input>
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
      // console.log(_this.formTable)
      this.$api.orderApi.addNewOrder(_this.formTable.account, parseInt(_this.formTable.roomId),
        parseInt(_this.formTable.Platform), _this.formTable.PlatOrderNumber,
        _this.formTable.ReserveCheckInTime, _this.formTable.ReserveCheckOutTime,
        _this.formTable.roomAmount)
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
      formTable: {
        account: this.$store.getters.getUser.id,
        roomId: this.$route.params.roomID,
        ReserveCheckInTime: "",
        ReserveCheckOutTime: "",
        roomAmount: 1,
        price: this.$route.params.price,
        sum: this.$route.params.price,
        Platform: 5,
        PlatOrderNumber: "",
      },
      RoomID: this.$route.params.roomID,
      companyGroupId: this.$route.params.companyGroupId,
      hotelName: this.$route.params.hotelName,
      hotelAddress: this.$route.params.hotelAddress
    }
  },
  created() {
    // console.log(this.$route.params.startTime)
    // console.log(this.$route.params.endTime)
    this.formTable.ReserveCheckInTime = this.getBeforeDate(0, this.$route.params.startTime)
    this.formTable.ReserveCheckOutTime = this.getBeforeDate(-1, this.$route.params.endTime)
    console.log(this.formTable)
  },
}
</script>

<style>
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
</style>