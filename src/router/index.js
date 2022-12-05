import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/login/UserLogin.vue'
import AdministratorLogin from '../views/login/AdministratorLogin.vue'
import Home from '../views/Home.vue'
import UserSignIn from '../views/login/UserSignIn.vue'
import UserSignUp from '../views/login/UserSignUp.vue'
import UserHome from '../views/UserHome.vue'
import AdministratorHome from '../views/AdministratorHome.vue'
import ResetPassword from '../views/login/ResetPassword.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // home页面展示导航栏加home展示的信息
    component: Home
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: UserLogin
  },
  {
    path: '/administratorLogin',
    name: 'administratorLogin',
    component: AdministratorLogin
  },
  {
    // 登录
    path: '/userLogin/userSignIn',
    name: 'userSignIn',
    component: UserSignIn
  },
  {
    // 注册
    path: '/userLogin/userSignUp',
    name: 'userSignUp',
    component: UserSignUp
  },
  {
    // 忘记密码
    path: '/userLogin/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/userHome',
    name: 'userHome',
    // meta: {
    //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    // },
    component: UserHome
  },
  {
    path: '/administratorHome',
    name: 'administratorHome',
    component: AdministratorHome
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((from, to, next) => {
//   // next 没有参数，正常跳转
//   // next 传入false，无法跳转
//   // next 传入新地址，跳转到新地址
//   // if to.name!=='Login'
//   const token = localStorage.getItem('token')
//   if (to.meta.requireAuth && !token) { // 判断跳转的路由是否需要登录
//     next({ name: 'userLogin' })
//   } else { next() }
// })

export default router
