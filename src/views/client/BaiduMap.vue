<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="selection">
      <el-form :model="queryForm" ref="queryForm" :inline="true">
        <el-form-item label="城市" prop="citySelected">
          <el-select class="selectCity" placeholder="请选择城市(不选择默认深圳)" v-model="queryForm.citySelected"
            value="queryForm.citySelected" clearable>
            <el-option label="北京" value="北京" />
            <el-option label="上海" value="上海" />
            <el-option label="广州" value="广州" />
            <el-option label="深圳" value="深圳" />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>
    </div>
    <div id="container"></div>
    <div ref="infoData" class="custom-info input-card content-window-card">
      <div class="info-top">
        <div><span>{{ devInfo.title }}</span>
          <span style="font-size:11px; margin-left:20px;color:#F00;">状态：{{ devInfo.state }}</span>
        </div><img @click="closeInfoWindow" src="https://webapi.amap.com/images/close2.gif">
      </div>
      <div class="info-middle" style="background-color: white;">
        <img class="image" :src="img_list[devInfo.icon]" alt />
        <br>地址：{{ devInfo.address }}<br>
        <div class="info-div">集团：{{ devInfo.group }} </div>
        <span class="info-span"> 前台电话：{{ devInfo.phone }}<br>
          <el-button type="primary"
            @click="route(devInfo.hotelName, devInfo.hotelId, devInfo.hotelAddress)">查看门店房间</el-button>
        </span>
      </div>
      <div class="info-bottom" style="position: relative; top: 0px; margin: 0px auto;"><img
          src="https://webapi.amap.com/images/sharp.png"></div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    var img1 = require("../../assets/dorm.jpg");
    return {
      img_list: [img1],
      queryForm: {
        citySelected: ""
      },
      devInfo: {
        title: '',
        icon: '',
        state: '',
        address: '',
        group: '',
        phone: '',
      },
      map: null,
      markerData: [
        {
          title: '专家公寓',
          icon: 0,
          state: '正常使用',
          address: '中国广东省深圳市南山区学苑大道1088号南方科技大学专家公寓',
          group: '南方科技大学',
          phone: '123456789',
          position: [114.002656, 22.598692],
          offset: new AMap.Pixel(-8, -30),
          hotelName: "专家公寓",
          hotelId: 1,
          hotelAddress: "专家公寓",
        },
      ],
    }
  },
  mounted() {
    this.map = this.createMap()
    this.map.clearMap()
    this.addMarker()
  },
  created() { },
  methods: {
    route(hotelName, hotelId, hotelAddress) {
      this.$router.push({ name: "clientTableSelect", params: { hotelName: hotelName, hotelId: hotelId, hotelAddress: hotelAddress } });
    },
    //可以通过城市定位来找到
    conditionQuery() {
      console.log(this.queryForm.citySelected)
      if (this.queryForm.citySelected == "深圳" || this.queryForm.citySelected == "") {
        this.map.setZoomAndCenter(17, [113.999963, 22.5981]) //南科大接近山上的部分
      } else if (this.queryForm.citySelected == "广州") {
        this.map.setZoomAndCenter(17, [113.303382, 23.386376])//白云机场
      } else if (this.queryForm.citySelected == "北京") {
        this.map.setZoomAndCenter(17, [116.393136, 39.934217])//北海公园
      } else if (this.queryForm.citySelected == "上海") {
        this.map.setZoomAndCenter(17, [121.319671, 31.194213])//上海虹桥站
      }
    },
    //1.创建map对象
    createMap() {
      //1.地图初始化时，在地图上添加marker标记,鼠标点击marker可弹出自定义的信息窗体
      var mapData = new AMap.Map('container', {
        resizeEnable: true,
        center: [113.999963, 22.5981], //地图中心点位置
        zoom: 16,
      })
      return mapData
    },
    //2.添加点标记
    addMarker() {
      const self = this

      let arr = []
      this.markerData.forEach((item) => {
        let marker = new AMap.Marker({
          icon: this.img_list[item.icon], //点标记图片路径
          position: item.position, //位置
          offset: item.offset, //偏移
        })
        arr.push(
          Object.assign(item, {
            mapId: marker._amap_id,
          })
        )
        marker.setMap(self.map)
        AMap.event.addListener(marker, 'click', (e) => {
          self.markerClick(arr, marker)
        })
      })
    },
    //3.点击标记 获取所点击标记的信息以及窗体要展示的数据，创建信息窗体
    markerClick(arr, marker) {
      let arrNew = arr.filter((x) => x.mapId == marker._amap_id)
      this.devInfo = arrNew && arrNew[0]
      let infoWindow = this.createInfoWindow()
      this.openInfoWindow(infoWindow, marker)
    },
    //4.构建自定义窗体
    createInfoWindow() {
      let infoWindowData = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: this.$refs.infoData,
        // content: this.getContent(),
        offset: new AMap.Pixel(16, -45),
      })
      return infoWindowData
    },

    //5.打开窗体
    openInfoWindow(infoWindow, marker) {
      infoWindow.open(this.map, marker.getPosition())
    },
    //6.关闭窗体
    closeInfoWindow() {
      this.map.clearInfoWindow()
    },
  },
}
</script>
  
<style>
html,
body,
#container {
  height: 100%;
  width: 100%;
}

.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  /* width: auto; */
  width: 28rem;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

/* span {
    margin-left: 5px;
    font-size: 11px;
  } */

.info-middle img {
  float: left;
  margin-right: 6px;
}

.info-span {
  /* margin-left: 35px; */
  font-size: 11px;
}

.info-div {
  width: 140px;
  display: inline-block;
  margin-left: 10px;
}

.info-img {
  width: 40px;
  height: 40px;
}

.info-a-title {
  /* color: #000000; */
  font-size: 16px;
}

#container {

  height: 820px;
}

#container .amap-icon img,
.amap-marker-content img {
  width: 64px;
  height: 64px;
}

.breadcrumb {
  float: left;
  margin-left: 25px;
}

.selection {
  text-align: right;
  margin-right: 25px;
  margin-top: 10px;

}
</style>