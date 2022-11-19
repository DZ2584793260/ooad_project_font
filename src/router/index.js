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
import MapBook from '../views/MapBook.vue'
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
    path: '/userHome',
    name: 'userHome',
    component: UserHome
  },
  {
    path: '/administratorHome',
    name: 'administratorHome',
    component: AdministratorHome
  },
  {
    // 忘记密码
    path: '/userLogin/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    // 注册
    path: '/userHome/mapBook',
    name: 'mapBook',
    component: MapBook
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
