<template>
	<div class="clientNavbar">
		<el-menu :default-active="this.$route.path" router mode="horizontal" class="navbar" @open="handleOpen"
			@close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<div class="navbar-container">
				<el-menu-item index="/client/hotelInfo">酒店预定</el-menu-item>

				<el-submenu index="2">
					<template slot="title">订单</template>
					<el-menu-item index="/client/personalOrder">全部</el-menu-item>
					<el-menu-item index="/client/reserveOrder">未出行</el-menu-item>
					<el-menu-item index="/client/uncommentOrder">待评价</el-menu-item>
					<el-menu-item index="/client/finishOrder">已评价</el-menu-item>
				</el-submenu>

				<!-- 更改index即可更改跳转路由 -->
				<el-menu-item index="1-1">
					<template slot="title">
						<i class="el-icon-phone-outline"></i>
						<span>在线客服</span>
					</template>
				</el-menu-item>

				<el-menu-item index="/userLogin" :disabled="isLogin">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span v-if="isLogin">
							{{ $store.getters.getUser.nickname }}
						</span>
						<span v-else>登录/注册</span>
					</template>
				</el-menu-item>
			</div>
		</el-menu>
		<router-view></router-view>
	</div>
</template>
  


<script>
export default {
	data() {
		return {
			path: "/client/tableSelect",
			isLogin: false,
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	},
	mounted() {
		//此处要判断token是否存在
		console.log(localStorage.getItem("token"))
		if (localStorage.getItem("token")) {
			this.isLogin = true
		}
	},
	computed: {

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

