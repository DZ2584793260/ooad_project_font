<!-- YUKI: edit12/17 -->
<template>
  <div class="roomSelect">
    <div class="selectBox">
      <el-form :model="Form" :inline="true">
        <el-form-item label="价格上限" >
            <el-input placeholder="请选择可接受的最高价格"
                      v-model="Form.maxCost"
                      >
                    </el-input>
        </el-form-item>
        <el-form-item label="入住时间" >
          <el-date-picker v-model="Form.startTime" type="datetime" placeholder="请选择您的入住时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退房时间" v >
          <el-date-picker v-model="Form.endTime" type="datetime" placeholder="请选择您的退房时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery()">查询</el-button>
      </el-form>
    </div>


    <div class="roomTable">
    <el-table :data="tableData" border style="width: 100%"
      :header-cell-style="{ background: '#00abbe', color: '#fff', 'text-align': 'center' }" highlight-current-row>
      <el-table-column fixed prop="id" label="房间号码"></el-table-column>
      <el-table-column prop="floor" label="所在楼层"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="roomType" label="房间类型"></el-table-column>
      <el-table-column prop="price" label="价格" >
        
      </el-table-column>
 <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
           
            <el-button @click="routeToNewPage(scope.row)"  type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[2, 4, 6, 8]"
      layout="prev, pager, next, sizes, total, jumper" :total="total" />
     
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    routeToNewPage(row){
        const roomID = row.id
        this.$router.push({ name: "clientRoomReserve", params: {roomID:roomID, 
          companyGroupId:this.companyGroupId, hotelName:this.hotelName
        ,price:row.price, startTime: this.Form.startTime.toString(), endTime:this.Form.endTime.toString(),
      hotelAddres: this.hotelAddress} });
    },
    // handleClick(row) {
    //   //YUKI: Add new room
    // },
    handleSizeChange(val) {
      // 更改每页多少条数据
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange();//默认更改每页多少条后重新加载第一页
    },
    handleCurrentChange() {
      const _this = this
      if(_this.Form.startTime == "" & _this.Form.endTime == "") {
        this.getHotelRoom(this.pageSize, this.currentPage)
      } else{
        this.conditionQuery()
      }
    },
    conditionQuery() {
      const _this = this
      console.log(_this.Form)
      var Form = _this.Form
      Form.maxCost = parseInt(Form.maxCost)
      this.$api.clientApi.queryRoomConditionalCount(_this.companyGroupId, _this.hotelName,
      Form.maxCost, Form.startTime, Form.endTime)
          .then(res =>{
            console.log(res)
            _this.total = res.data
          }).catch(err => {
            console.log(err)
          })

      
      this.$api.clientApi.queryRoomConditional(_this.companyGroupId, _this.hotelName,
      Form.maxCost, Form.startTime, Form.endTime, _this.pageSize, _this.currentPage)
          .then(res =>{
            console.log(res)
            _this.tableData = res.data
            for (let i = 0; i < _this.tableData.length; i++) {
            _this.tableData[i].roomStatus= this.roomStatus[_this.tableData[i].roomStatus]
            _this.tableData[i].roomType= this.roomType[_this.tableData[i].roomType]
          }
            _this.pageSize = 2
            _this.currentPage = 1
        }).catch(err => {
            console.log(err)
          })
    },
    getDateTime(day) {
      var _this = this;
      let yy = new Date().getFullYear() + day;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
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
    getHotelRoom(size, current){
        const _this = this
        this.$api.adminApi.adminGetCountConditional(this.companyGroupId, this.hotelName)
          .then(res =>{
            // console.log(res)
            _this.total = res.data
          }).catch(err => {
            console.log(err)
          })
          this.$api.adminApi.adminGetRoomsByCondition(size, current, this.companyGroupId, this.hotelName)
          .then(res =>{
            _this.tableData = res.data
            for (let i = 0; i < _this.tableData.length; i++) {
            _this.tableData[i].roomStatus= this.roomStatus[_this.tableData[i].roomStatus]
            _this.tableData[i].roomType= this.roomType[_this.tableData[i].roomType]
          }
          }).catch(err => {
            console.log(err)
          })
    }
  },
  data() {
    return {
      companyGroupId:this.$route.params.hotelId,
      hotelName:this.$route.params.hotelName,
      hotelAddress:this.$route.params.hotelAddress,
      Form:{
        maxCost:1000000,
        startTime:"",
        endTime:"",
      },
      options: [
        {
          value: 0,
          label: 'Free'
        },
        {
          value: 1,
          label: 'Reserved'
        },
        {
          value: 2,
          label: 'CheckIn'
        },
        {
          value: 3,
          label: 'LeftNeedClean'
        },{
          value: 4,
          label: 'NotOpen'
        }
      ,{
          value: 5,
          label: 'OnCleaning'
        },
        {
          value: 6,
          label: 'WaitChecking'
        }]
        ,
        
      // YUKI:取出url的参数
      queryForm: {
      citySelected: "",
      keyword: ""
    },
      roomStatus:["Free","Reserved","CheckIn","LeftNeedClean","NotOpen","OnCleaning","WaitChecking"],
      roomType:["GuestRoom","LaundryRoom","GymRoom","StaffRoom","MeetingRoom"],
      currentPage: 1,
      queryCurrentPage: 1,
      total: 10,//数据一共多少
      pageSize: 2,//每页显示的行数,默认为2
      tableData: [],

    }
  },
  created() {
    // 初始时表格展示的数据
    this.getHotelRoom(2, 1)
    // console.log(this.queryForm)
  },
  
}
</script>

<style scoped>
.selectBox {
  text-align: right;
  margin: 10px 25px;
}

.roomTable {
  margin: auto;
  margin-top: 30px;
  width: 70%;
}
</style>