<!-- 继续处理分页（涉及后端接口），添加条件查询 -->
<!-- 表格上方展示共找到多少酒店 -->

<template>
  <div class="userHome">
    <div class="homeHeader">
      <router-link to="/userHome/mapBook">
        <el-button>地图预定</el-button>
      </router-link>
    </div>
    <div class="bookTable">
      <el-table :data="tableData" border style="width: 100%"
        :header-cell-style="{ background: '#00abbe', color: '#fff' }" highlight-current-row>
        <el-table-column fixed prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 可能有点问题！！！！！！！！！！！ -->
      <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="5"
        layout="prev, pager, next,  sizes, total, jumper" :total="total" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      // 可能有点问题！！！！！！！！！！！
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(currentPage) {
      const _this = this
      axios.get('http://localhost:8181/book/findAll/' + currentPage + '/' + this.pageSize).then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },

  data() {
    return {
      total: 50,//数据一共多少，待改！！！！！！！
      pageSize: 5,//每页显示的行数,默认为5
      tableData: null
    }
  },
  created() {
    const _this = this
    axios.get('接口网址').then(function (resp) {
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements
    })

  }
}
</script>
<style scoped>
.homeHeader {
  text-align: right;
  padding: 15px;
}

.bookTable {
  margin: auto;
  width: 70%;
}
</style>