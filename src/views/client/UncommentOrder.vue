<!-- 去评价 -->
<template>
  <div class="uncommentOrder">
    <div class="orderQuery">
      <el-form :model="queryForm" ref="queryForm" :inline="true">

        <el-form-item prop="uuid">
          <el-input prefix-icon="el-icon-search" placeholder="订单号/门店/地址" v-model="queryForm.keyword" clearable>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>
    </div>

    <div class="orderTable">
      <el-table :data="tableData" border style="width: 100%"
        :header-cell-style="{ background: '#00abbe', color: '#fff', 'text-align': 'center' }" highlight-current-row>
        <el-table-column fixed prop="uuid" label="订单号"></el-table-column>
        <el-table-column prop="hotel" label="门店"></el-table-column>
        <el-table-column prop="hotelAddress" label="门店地址"></el-table-column>
        <el-table-column prop="bookTime" label="下单时间"></el-table-column>
        <el-table-column prop="checkInTime" label="入住时间"></el-table-column>
        <el-table-column prop="checkOutTime" label="退房时间"></el-table-column>
        <el-table-column prop="roomType" label="房型"></el-table-column>
        <el-table-column prop="roomID" label="房间号"></el-table-column>
        <el-table-column prop="price" label="实际付款"></el-table-column>
        <el-table-column prop="price" label="订单状态"></el-table-column>
        <el-table-column align="center" prop="operation" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.$index)">去评价</el-button>
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
        <h3>请进行评价</h3>
        <el-timeline :model="dialogForm" ref="dialogForm">
          <el-timeline-item timestamp="评分" placement="top">
            <el-card>
              <el-rate v-model="dialogForm.grade" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="请输入评价" placement="top">
            <el-card>
              <el-input v-model="dialogForm.wordComment" prefix-icon="el-icon-search" placeholder="请多多描述入住体验~"
                type="textarea" :rows="2" clearable>
              </el-input>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="请添加图片" placement="top">
            <el-upload class="upload-picture" action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-timeline-item>

        </el-timeline>

        <div style="text-align:right">
          <el-button type="primary" v-on:click="dialogSave()">确定</el-button>
          <el-button @click="dialogCancel()">退出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
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
      dialogForm: [{
        uuid: "1",
        price: "333",
      },
      ],//对话框中的form 新增和编辑
      dialogTitle: "",
      editFormRules: {
        checkInTime: [{ required: true, message: '请选择入住时间', trigger: 'change' }],
        checkOutTime: [{ required: true, message: '请选择退房时间', trigger: 'change' }],
      },
      //数据
      tableData: [
        {
          uuid: "1",
          price: "3",
        },
      ],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    dialogCancel() {
      this.dialogVisible = false;//对话框不显示
    },
    dialogSave() {
      //保存编辑！！！！！！！
    },
    handleClick(row_index) {
      this.dialogTitle = "订单：" + this.tableData[row_index].uuid;
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
      this.$api.clientApi.getOrderByUserAccount(size, current, $store.getters.getUser.id)
        .then(res => {
          console.log(res)
          _this.tableData = res.data
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

h3 {
  margin-left: 30px;
}
</style>