<!-- 查看，查询，编辑，删除订单 -->
<!-- 表格中加个起止时间 -->
<!-- 弹出框显示表格中所有内容 -->
<!-- 弹出框中要显示订单状态，已完成，未完成 未完成订单可以取消或者可以修改修改时间（仅支持某门店同种房型）-->
<!-- 弹出框中显示预定人及预定账户 -->
<template>
  <div class="personalOrder">
    <div class="orderQuery">
      <el-form :model="queryForm" ref="queryForm" :inline="true">
        <el-form-item label="城市" prop="citySelected">
          <el-select class="selectCity" placeholder="请选择城市" v-model="queryForm.citySelected"
            value="queryForm.citySelected" clearable>
            <el-option label="北京" value="北京" />
            <el-option label="上海" value="上海" />
            <el-option label="广州" value="广州" />
            <el-option label="深圳" value="深圳" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
          <el-input class="inputBox" placeholder="酒店名/位置" v-model="queryForm.keyword" clearable>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>
    </div>

    <div class="orderTable">
      <el-table :data="tableData" border style="width: 100%"
        :header-cell-style="{ background: '#00abbe', color: '#fff', 'text-align': 'center' }" highlight-current-row>
        <el-table-column fixed prop="iD" label="订单号"></el-table-column>
        <el-table-column prop="floor" label="门店"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="roomType" label="房间类型"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">

          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[2, 4, 6, 8]"
        layout="prev, pager, next, sizes, total, jumper" :total="total" />
    </div>

    <div class="orderCheck">
      <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="35%" close-on-press-escape v-dialogDrag>
        <el-form :model="dialogForm" :rules="editFormRules" ref="dialogForm">
          <el-form-item label="Course Name" prop="iD" label-width="120px">
            <el-input v-model="dialogForm.course_name" placeholder="Please input the course name"></el-input>
          </el-form-item>
          <el-form-item label="Course Code" prop="floor" label-width="120px">
            <el-input v-model="dialogForm.course_code" placeholder="Please input the course code"></el-input>
          </el-form-item>
        </el-form>

        <div style="text-align:right">
          <el-button type="primary" v-on:click="dialogSave()">保存</el-button>
          <el-button @click="dialogCancel()">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分页
      currentPage: 1,
      queryCurrentPage: 1,
      total: 10,//数据一共多少
      pageSize: 2,//每页显示的行数,默认为2
      //查询
      queryForm: {
        citySelected: "",
        keyword: ""
      },
      queryCurrentPage: 1,
      queryOrNot: false,
      //对话框
      dialogVisible: false,//订单详细信息窗口
      dialogForm: [],//对话框中的form 新增和编辑
      dialogTitle: "",
      editFormRules: {
        // course_name: [{ required: true, message: 'Please input the course_name', trigger: 'change' }],
        // course_code: [{ required: true, message: 'Please input the course_code', trigger: 'change' }],
      },
      //数据
      tableData: [
        {
          iD: "1",
          floor: "3",
        },
      ],
    }
  },
  methods: {
    dialogCancel() {
      this.dialogVisible = false;//对话框不显示
    },
    dialogSave() {
      //保存编辑
    },
    handleClick(row_index) {
      this.dialogTitle = "订单：" + this.tableData[row_index].iD;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleCurrentChange(1);//默认更改每页多少条后重新加载第一页
    },

    handleCurrentChange() {
      if (this.queryOrNot === false) {
        this.getAllAPI(this.pageSize, this.currentPage)
      } else {
        if (this.queryForm.citySelected === "" && this.queryForm.keyword !== "") {
          this.conditionQueryAPI(this.currentPage, "%", this.queryForm.keyword)
        } else if (this.queryForm.citySelected !== "" && this.queryForm.keyword === "") {
          this.conditionQueryAPI(this.currentPage, this.queryForm.citySelected, "%")
        } else {
          this.conditionQueryAPI(this.currentPage, this.queryForm.citySelected, this.queryForm.keyword)
        }
      }
    },

    conditionQuery() {
      this.queryOrNot = true;
      if (this.queryForm.citySelected === "" && this.queryForm.keyword === "") {
        this.getAllAPI(this.pageSize, 1)
        this.queryOrNot = false
      } else if (this.queryForm.citySelected === "" && this.queryForm.keyword !== "") {
        this.conditionQueryAPI(1, "%", this.queryForm.keyword)
      } else if (this.queryForm.citySelected !== "" && this.queryForm.keyword === "") {
        this.conditionQueryAPI(1, this.queryForm.citySelected, "%")
      } else {
        this.conditionQueryAPI(1, this.queryForm.citySelected, this.queryForm.keyword)
      }
      this.currentPage = 1
    },

    conditionQueryAPI(current, city, key) {
      const _this = this
      this.$api.clientApi.getHotelConditionCount(city, key)
        .then(res => {
          _this.total = res.data
        }).catch(err => {
          console.log(err);
        });
      this.$api.clientApi.getHotelConditional(this.pageSize, current, city, key)
        .then(res => {
          _this.tableData = res.data
        }).catch(err => {
          console.log(err);
        });
    },
    getAllAPI(size, current) {
      const _this = this
      this.$api.clientApi.getHotelAllCount()
        .then(res => {
          _this.total = res.data
        }).catch(err => {
          console.log(err);
        });
      this.$api.clientApi.getHotelAll(size, current)
        .then(res => {
          console.log(res)
          _this.tableData = res.data
          for (let i = 0; i < _this.tableData.length; i++) {
            _this.tableData[i].contactList = _this.tableData[i].contactList.join()
          }
        }).catch(err => {
          console.log(err);
        });
    },

  },
  created() {
    // 初始时表格展示的数据
    // this.getAllAPI(2, 1)
  },
}
</script>

<style>
.orderTable {
  margin: auto;
  margin-top: 30px;
  width: 70%;
}

.orderQuery {
  text-align: right;
  margin: 10px 25px;

}
</style>