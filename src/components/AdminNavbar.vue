<template>
	<div>

	  <el-menu
		:default-active="this.$route.path" 
		router mode="horizontal"
		class="el-menu-demo"
		@open="handleOpen"
		@close="handleClose" 
		
		>
		<el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
		  <template slot="title">
			<!-- <i class="el-icon-s-platform"></i> -->
			<span> {{ item.navItem }}</span>
		  </template>
  
		</el-menu-item>
		 
		  
	  </el-menu>
	
	
	<router-view     class="menu-right"/>
  
	</div>
  </template>
  



<script>
  export default {
  	data() { 
  		return { 
  			navList:[
				//YUKI:write as path
  			{name:'/admin/graph',navItem:'数据报表'}, 
  			{name:'/admin/roomEdit',navItem:'修改房间信息'}, 
            {name:'/admin/checkReserve',navItem:'查询预订信息'}, 
  			// {name:'/client/personalOrder',navItem:'个人订单查询'}, 
  			] } 
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
	.menu-right{
		margin-left: 200px;
	}

	.el-menu-demo{
		position: relative;
		z-index: 100;
	}
	
</style>

