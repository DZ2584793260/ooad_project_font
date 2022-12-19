<!-- YUKI: edit12/17 -->
<template>
  <div class="roomSelect">
    <div class="selectBox">
      <el-form :model="queryForm" ref="queryForm" :inline="true">
        <el-form-item label="价格上限" prop="maxCost">
          <el-select placeholder="请选择可接受的最高价格" v-model="queryForm.maxCost" value="queryForm.maxCost" clearable>
            <el-option label="300" value="300" />
            <el-option label="500" value="500" />
            <el-option label="1000" value="1000" />
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间" prop="startTime">
          <el-date-picker v-model="queryForm.date" type="datetime" placeholder="请选择您的入住时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退房时间" prop="endTime">
          <el-date-picker v-model="queryForm.date" type="datetime" placeholder="请选择您的退房时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>

        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>
    </div>


    <div class="roomTable">
    <el-table :data="tableData" border style="width: 100%"
      :header-cell-style="{ background: '#00abbe', color: '#fff', 'text-align': 'center' }" highlight-current-row>
      <el-table-column fixed prop="id" label="房间号码"></el-table-column>
      <el-table-column prop="floor" label="所在楼层"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="roomType" label="房间类型"></el-table-column>
      <el-table-column prop="price" label="价格" v-if="!editOrNot">
        
      </el-table-column>
 <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
           
            <el-button @click="routeToNewPage(scope.row)" v-show="!editOrNot" type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[2, 4, 6, 8]"
      layout="prev, pager, next, sizes, total, jumper" :total="total" />
      <el-button @click="handleClick(scope.row)" >增加新房间</el-button>
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    routeToNewPage(row){
        const roomID = row.id
        this.$router.push({ path: "/client/roomReserve", query: {roomID:roomID} });
    },
    handleClick(row) {
      //YUKI: Add new room
    },
    handleSizeChange(val) {
      // 更改每页多少条数据
      // console.log(`每页 ${val} 条`);
      // this.pageSize = val;
      this.handleCurrentChange();//默认更改每页多少条后重新加载第一页
    },
    handleCurrentChange() {
      this.getHotelRoom(this.pageSize, this.currentPage)
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
      options: [{
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
        
      editOrNot: false,
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
      tableCopyData:[],
      queryOrNot: false,
      // YUKI:取出url的参数
      companyGroupId:this.$route.query.hotelId,//暂时是hotel Id
      hotelName: this.$route.query.hotelName
    }
  },
  created() {
    // 初始时表格展示的数据
    this.getHotelRoom(2, 1)
  },
  //对于前端来说，钩子函数就是指再所有函数执行前，我先执行了的函数，即 钩住 我感兴趣的函数，只要它执行，我就先执行。
  mounted(){
  }
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