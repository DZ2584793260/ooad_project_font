<template>
	<div class="clientNavbar">
		<el-menu :default-active="this.$route.path" router mode="horizontal" class="navbar" @open="handleOpen"
			@close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<div class="navbar-container">
				<el-menu-item index="/userLogin">酒店预定</el-menu-item>

				<el-menu-item index="/userLogin" :disabled="disable">
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
	data() {
		return {
			disable: true,
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
		//此处要判断token是否存在，存在则不展示 登录/注册 选项
		localStorage.setItem("token","22222")
		console.log(localStorage.getItem("token"))
		if (localStorage.getItem("token")) {
			this.disable = false
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

