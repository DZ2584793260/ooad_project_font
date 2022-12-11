<template>
  <!-- 订单 -->
  <div class="personalOrder">
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
}
</script>

<style>
.orderTable {
  margin: auto;
  margin-top: 30px;
  width: 70%;
}
</style>