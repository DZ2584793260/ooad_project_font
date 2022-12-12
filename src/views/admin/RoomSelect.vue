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
          <el-table-column fixed prop="iD" label="房间号码"></el-table-column>
          <el-table-column prop="floor" label="所在楼层"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="roomType" label="房间类型"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="100">
  
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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
      handleClick(row) {
        console.log(row);
        // 去某个酒店,每个酒店地址不同
        // this.$router.push({ path: "/" });！！！！！！！！！！！！！！！1
      },
      handleSizeChange(val) {
        // 更改每页多少条数据
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(1);//默认更改每页多少条后重新加载第一页
      },
  
      handleCurrentChange() {
        if (this.queryOrNot === false) {
          this.getAllAPI(this.pageSize, this.currentPage)
        } else {
          if (this.queryForm.maxCost == "" && this.queryForm.startTime == "" && this.queryForm.endTime != "") {
            this.conditionQueryAPI(this.currentPage, "%", "%", this.queryForm.endTime)
          } else if (this.queryForm.maxCost == "" && this.queryForm.startTime != "" && this.queryForm.endTime == "") {
            this.conditionQueryAPI(this.currentPage, "%", this.queryForm.startTime, "%")
          } else if (this.queryForm.maxCost == "" && this.queryForm.startTime != "" && this.queryForm.endTime != "") {
            this.conditionQueryAPI(this.currentPage, "%", this.queryForm.startTime, this.queryForm.endTime)
          } else if (this.queryForm.maxCost != "" && this.queryForm.startTime == "" && this.queryForm.endTime == "") {
            this.conditionQueryAPI(this.currentPage, this.queryForm.maxCost, "%", "%")
          } else if (this.queryForm.maxCost != "" && this.queryForm.startTime == "" && this.queryForm.endTime != "") {
            this.conditionQueryAPI(this.currentPage, this.queryForm.maxCost, "%", this.queryForm.endTime)
          } else if (this.queryForm.maxCost != "" && this.queryForm.startTime != "" && this.queryForm.endTime == "") {
            this.conditionQueryAPI(this.currentPage, this.queryForm.maxCost, this.queryForm.startTime, "%")
          } else {
            this.conditionQueryAPI(this.currentPage, this.queryForm.maxCost, this.queryForm.startTime, this.queryForm.endTime)
          }
        }
      },
      conditionQuery() {
        this.queryOrNot = true;
        if (this.queryForm.maxCost == "" && this.queryForm.startTime == "" && this.queryForm.endTime == "") {
          // this.getAllAPI(2, 1) //相当于重新刷新了
          this.getAllAPI(this.pageSize, 1)
          this.queryOrNot = false
        } else if (this.queryForm.maxCost == "" && this.queryForm.startTime == "" && this.queryForm.endTime != "") {
          this.conditionQueryAPI(1, "%", "%", this.queryForm.endTime)
        } else if (this.queryForm.maxCost == "" && this.queryForm.startTime != "" && this.queryForm.endTime == "") {
          this.conditionQueryAPI(1, "%", this.queryForm.startTime, "%")
        } else if (this.queryForm.maxCost == "" && this.queryForm.startTime != "" && this.queryForm.endTime != "") {
          this.conditionQueryAPI(1, "%", this.queryForm.startTime, this.queryForm.endTime)
        } else if (this.queryForm.maxCost != "" && this.queryForm.startTime == "" && this.queryForm.endTime == "") {
          this.conditionQueryAPI(1, this.queryForm.maxCost, "%", "%")
        } else if (this.queryForm.maxCost != "" && this.queryForm.startTime == "" && this.queryForm.endTime != "") {
          this.conditionQueryAPI(1, this.queryForm.maxCost, "%", this.queryForm.endTime)
        } else if (this.queryForm.maxCost != "" && this.queryForm.startTime != "" && this.queryForm.endTime == "") {
          this.conditionQueryAPI(1, this.queryForm.maxCost, this.queryForm.startTime, "%")
        } else {
          this.conditionQueryAPI(1, this.queryForm.maxCost, this.queryForm.startTime, this.queryForm.endTime)
        }
        this.currentPage = 1
      },
      conditionQueryAPI(current, cost, start, end) {
        const _this = this
        //YUKI: shall change the api's name, and other factors won't have many differences
        this.$api.userApi.getHotelConditionCount(cost, start, end)
          .then(res => {
            _this.total = res.data
  
          }).catch(err => {
            console.log(err);
          });
        //YUKI: shall change the api's name, and other factors won't have many differences
        this.$api.userApi.getHotelConditional(this.pageSize, current, cost, start, end)
          .then(res => {
            _this.tableData = res.data
          }).catch(err => {
            console.log(err);
          });
      },
      //YUKI: shall change the api's name, and other factors won't have many differences
      getAllAPI(size, current) {
        const _this = this
        this.$api.userApi.getHotelAllCount()
          .then(res => {
            _this.total = res.data
          }).catch(err => {
            console.log(err);
          });
        this.$api.userApi.getHotelAll(size, current)
          .then(res => {
            _this.tableData = res.data
          }).catch(err => {
            console.log(err);
          });
      }
    },
    data() {
      return {
        queryForm: {
          maxCost: "",
          startTime: "",
          endTime: "",
        },
        currentPage: 1,
        queryCurrentPage: 1,
        total: 10,//数据一共多少
        pageSize: 2,//每页显示的行数,默认为2
        tableData: [],
        queryOrNot: false,
        // sortBy: "hotelName",暂时没用上
      }
    },
    created() {
      // 初始时表格展示的数据
      this.getAllAPI(2, 1)
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