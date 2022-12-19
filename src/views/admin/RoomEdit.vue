<template>
  <div class="roomEdit">
    <!-- YUKI: add new room, expect to fill a form which will check simple grammar -->

    <div class="roomTable">
      <el-table :data="tableData" border style="width: 100%"
        :header-cell-style="{ background: '#00abbe', color: '#fff', 'text-align': 'center' }" highlight-current-row>
        <el-table-column fixed prop="id" label="房间号码"></el-table-column>
        <el-table-column prop="floor" label="所在楼层"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="roomType" label="房间类型"></el-table-column>
        <el-table-column prop="price" label="价格" v-if="!editOrNot">

        </el-table-column>


        <el-table-column label="房间状态" v-if="editOrNot">
          <template v-slot="scope">
            <el-select size="mini" v-model="scope.row.roomStatus" placeholder="请选择房间状态" v-if="editOrNot">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!-- <span v-if="editOrNot">{{ scope.row.roomStatus }}</span> -->
          </template>
        </el-table-column>

        <el-table-column prop="roomStatus" label="房间状态" v-if="!editOrNot">

        </el-table-column>

        <el-table-column prop="ichnography" label="房间图片链接" v-if="!editOrNot">

        </el-table-column>

        <el-table-column label="房间图片链接" v-if="editOrNot">
          <template v-slot="scope">
            <el-input placeholder="请输入房间图片链接" size="mini" v-model="scope.row.ichnography"></el-input>
            <!-- <span v-if="editOrNot">{{scope.row.ichnography }}</span> -->
          </template>
        </el-table-column>







        <el-table-column label="价格" v-if="editOrNot">
          <template v-slot="scope">
            <el-input placeholder="请输入价格" size="mini" v-model="scope.row.price" v-if="editOrNot"></el-input>
            <!-- <span v-if="editOrNot">{{scope.row.price }}</span> -->
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit()" v-show="!editOrNot" type="success" size="small">编辑</el-button>
            <el-button @click="warn(scope.$index, tableData)" v-show="!editOrNot" type="primary"
              size="small">删除</el-button>
            <el-button @click="handleSave(scope.$index, tableData)" v-show="editOrNot" type="success"
              size="small">保存</el-button>
            <el-button @click="handleCancel()" v-show="editOrNot" type="primary" size="small">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[2, 4, 6, 8]"
        layout="prev, pager, next, sizes, total, jumper" :total="total" />
      <el-button @click="openForm()">增加新房间</el-button>
    </div>


    <div class="form">
      <el-dialog title="添加新房间" :visible.sync="addOrNot">
        <el-form :model="form">
          <el-form-item label="房间所在楼层" :label-width="formLabelWidth">
            <el-input v-model="form.Floor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" :label-width="formLabelWidth">
            <el-input v-model="form.Address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" :label-width="formLabelWidth">
            <el-input v-model="form.RoomType" :disabled="true">
            </el-input>

          </el-form-item>

          <el-form-item label="房间状态" :label-width="formLabelWidth">
            <el-select v-model="form.RoomStatus" placeholder="请选择房间状态">
              <el-option label="Free" value="0"></el-option>
              <el-option label="Reserved" value="1"></el-option>
              <el-option label="CheckIn" value="2"></el-option>
              <el-option label="LeftNeedClean" value="3"></el-option>
              <el-option label="NotOpen" value="4"></el-option>
              <el-option label="OnCleaning" value="5"></el-option>
              <el-option label="WaitChecking" value="6"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="门店ID" :label-width="formLabelWidth">
            <el-input v-model="form.HotelInstanceID" :disabled="true">
            </el-input>

          </el-form-item>



          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.Price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间标题" :label-width="formLabelWidth">
            <el-input v-model="form.Title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片链接" :label-width="formLabelWidth">
            <el-input v-model="form.Ichnography" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间面积" :label-width="formLabelWidth">
            <el-input v-model="form.Area" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="床数" :label-width="formLabelWidth">
            <el-input v-model="form.BedCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="窗户数" :label-width="formLabelWidth">
            <el-input v-model="form.WindowCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预备矿泉水数量" :label-width="formLabelWidth">
            <el-input v-model="form.MineralWaterCount" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeForm()">取 消</el-button>
          <el-button type="primary" @click="addRoom()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    handleEdit() {
      this.editOrNot = true
      this.tableCopyData = JSON.parse(JSON.stringify(this.tableData))
      //YUKI：进入edit状态，可修改三项
    },
    warn(idx, tableData) {
      this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(idx, tableData)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    closeForm() {
      this.addOrNot = false
    },
    addRoom() {
      const _this = this
      console.log(this.form)
      var form = this.form
      form.Floor = parseInt(form.Floor)
      form.RoomStatus = parseInt(form.RoomStatus)
      form.HotelInstanceID = parseInt(form.HotelInstanceID)
      form.Price = parseInt(form.Price)
      form.Area = parseInt(form.Area)
      form.BedCount = parseInt(form.BedCount)
      form.WindowCount = parseInt(form.WindowCount)
      form.MineralWaterCount = parseInt(form.MineralWaterCount)
      console.log(form)
      this.$api.adminApi.adminAddRoom(form.Floor, form.Address, form.RoomStatus, 0, form.HotelInstanceID, form.Price, form.Title, form.Ichnography,
        form.Area, form.BedCount, form.WindowCount, form.MineralWaterCount, form.CandomCount)
        .then(res => {
          _this.form = _this.copy
          _this.addOrNot = false
          _this.currentPage = 1
          _this.pageSize = 2
          _this.getHotelRoom(2, 1)
        }).catch(err => {
          console.log(err)
          alert("mistakes happen!")
        })
    },
    handleDelete(idx, table) {
      const _this = this
      //YUKI: Delete
      var row = table[idx]
      var id = row.id
      // console.log(id)
      this.$api.adminApi.adminDeleteRoom(id)
        .then(res => {
          console.log(res)
          // _this.total = res.data
          this.$message({
            type: 'success',
            message: '删除成功!'

          });
          this.currentPage = 1
          this.pageSize = 2
          this.getHotelRoom(2, 1)
        }

        ).catch(err => {
          console.log(err)
        })


    },
    handleSave(idx, table) {
      const _this = this
      var row = table[idx]
      var status = row.roomStatus
      if (status == 0) {
        status = "Free"
      } else if (status == 1) {
        status = "Reserved"
      } else if (status == 2) {
        status = "CheckIn"
      } else if (status == 3) {
        status = "LeftNeedClean"
      } else if (status == 4) {
        status = "NotOpen"
      } else if (status == 5) {
        status = "OnCleaning"
      } else if (status == 6) {
        status = "WaitChecking"
      }
      table[idx].roomStatus = status
      _this.tableData = table
      const price = parseInt(row.price)
      var status = row.roomStatus
      if (status == "Free") {
        status = 0
      } else if (status == "Reserved") {
        status = 1
      } else if (status == "CheckIn") {
        status = 2
      } else if (status == "LeftNeedClean") {
        status = 3
      } else if (status == "NotOpen") {
        status = 4
      } else if (status == "OnCleaning") {
        status = 5
      } else if (status == "WaitChecking") {
        status = 6
      }
      this.$api.adminApi.adminModifyRoom(row.id, status, price, row.ichnography)
        .then(res => {
          console.log(res)
          // _this.total = res.data
        }).catch(err => {
          console.log(err)
        })
      console.log(row.id, status, price, row.ichnography)
      // console.log(row)

      // this.handleCurrentChange();
      _this.editOrNot = false;
    },
    handleCancel() {
      //刷新
      this.tableData = JSON.parse(JSON.stringify(this.tableCopyData))
      // this.handleCurrentChange();
      this.editOrNot = false;
    },
    openForm() {
      //YUKI: Add new room
      this.addOrNot = true
    },
    handleSizeChange(val) {
      // 更改每页多少条数据
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange();//默认更改每页多少条后重新加载第一页
    },
    handleCurrentChange() {
      this.getHotelRoom(this.pageSize, this.currentPage)
    },

    getHotelRoom(size, current) {
      const _this = this
      this.$api.adminApi.adminGetCountConditional(this.companyGroupId, this.hotelName)
        .then(res => {
          // console.log(res)
          _this.total = res.data
        }).catch(err => {
          console.log(err)
        })
      this.$api.adminApi.adminGetRoomsByCondition(size, current, this.companyGroupId, this.hotelName)
        .then(res => {
          _this.tableData = res.data
          for (let i = 0; i < _this.tableData.length; i++) {
            _this.tableData[i].roomStatus = this.roomStatus[_this.tableData[i].roomStatus]
            _this.tableData[i].roomType = this.roomType[_this.tableData[i].roomType]
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      copy: {
        Floor: 0,
        Address: '',
        RoomStatus: 0,//需要转换成int传过去
        RoomType: 'GuestRoom',//不允许其他
        HotelInstanceID: this.$route.query.hotelId,
        Price: 100,
        Title: '',
        Ichnography: '',
        Area: 10,
        BedCount: 2,
        WindowCount: 2,
        MineralWaterCount: 2,
        CandomCount: 3
      },
      form: {
        Floor: 0,
        Address: '',
        RoomStatus: 0,//需要转换成int传过去
        RoomType: 'GuestRoom',//不允许其他
        HotelInstanceID: this.$route.query.hotelId,
        Price: 100,
        Title: '',
        Ichnography: '',
        Area: 10,
        BedCount: 2,
        WindowCount: 2,
        MineralWaterCount: 2,
        CandomCount: 3
      },
      addOrNot: false,
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
      }, {
        value: 4,
        label: 'NotOpen'
      }
        , {
        value: 5,
        label: 'OnCleaning'
      },
      {
        value: 6,
        label: 'WaitChecking'
      }]
      ,
      editOrNot: false,
      roomStatus: ["Free", "Reserved", "CheckIn", "LeftNeedClean", "NotOpen", "OnCleaning", "WaitChecking"],
      roomType: ["GuestRoom", "LaundryRoom", "GymRoom", "StaffRoom", "MeetingRoom"],
      currentPage: 1,
      queryCurrentPage: 1,
      total: 10,//数据一共多少
      pageSize: 2,//每页显示的行数,默认为2
      tableData: [],
      tableCopyData: [],
      queryOrNot: false,
      // YUKI:取出url的参数
      companyGroupId: this.$route.query.hotelId,//暂时是hotel Id
      hotelName: this.$route.query.hotelName
    }
  },
  created() {
    // 初始时表格展示的数据
    this.getHotelRoom(2, 1)
  },
  //对于前端来说，钩子函数就是指再所有函数执行前，我先执行了的函数，即 钩住 我感兴趣的函数，只要它执行，我就先执行。
  mounted() {
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