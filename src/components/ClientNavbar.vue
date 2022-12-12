<template>
	<div class="clientNavbar">
		<el-menu :default-active="this.$route.path" router mode="horizontal" class="navbar" @open="handleOpen"
			@close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<div class="navbar-container">
				<!-- <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
					<template slot="title">
						<span> {{ item.navItem }}</span>
					</template>
				</el-menu-item> -->
				<el-menu-item index="/userLogin">酒店预定</el-menu-item>
				<el-menu-item index="/userLogin">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span>登录/注册</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/client/personalOrder">
					<template slot="title">
						<i class="el-icon-phone-outline"></i>
						<span>在线客服</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/client/personalOrder">全部订单</el-menu-item>
			</div>
		</el-menu>
		<router-view></router-view>
	</div>
</template>
  


<script>
export default {
	// data() {
	// 	return {
	// 		navList: [
	// 			//YUKI:write as path
	// 			{ name: '/userLogin', navItem: '酒店预定' },
	// 			{ name: '/userLogin', navItem: '登录/注册' },
	// 			{ name: '/client/personalOrder', navItem: '在线客服' },
	// 			{ name: '/client/personalOrder', navItem: '全部订单' },
	// 		]
	// 	}
	// },
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

<style scoped>
.navbar {
	position: relative;
	z-index: 100;
}

.el-menu.el-menu--horizontal {
	border-bottom: 0;
	text-align: right;
}


.navbar-container {
	display: flex;
	justify-content: flex-end;
}
</style>

