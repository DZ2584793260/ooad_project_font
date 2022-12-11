import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/login/UserLogin.vue'
import AdministratorLogin from '../views/login/AdministratorLogin.vue'
import Home from '../views/Home.vue'
import UserSignIn from '../views/login/UserSignIn.vue'
import UserSignUp from '../views/login/UserSignUp.vue'
import ResetPassword from '../views/login/ResetPassword.vue'
//YUKI: has add a few new components
import clientHotelInfo from '../views/client/HotelInfo.vue'
import clientMapSelect from '../views/client/MapSelect.vue'
import clientRoomReserve from '../views/client/RoomReserve.vue'
import clientTableSelect from '../views/client/TableSelect.vue'
import clientPersonalOrder from '../views/client/PersonalOrder.vue'
import clientNav from '../components/ClientNavbar.vue'
//YUKI: admin routes
import adminHotelInfo from '../views/admin/HotelInfo.vue'///////////
import adminGraph from '../views/admin/Graph.vue'
import adminNav from '../components/AdminNavbar.vue'
import adminCheckReserve from '../views/admin/CheckReserve.vue'
import adminRoomEdit from '../views/admin/RoomEdit.vue'
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

  //YUKI: check client side's main page
  {
    //client side's home
    path: '/client',
    name: 'clientNav',
    component: clientNav,
    children: [
      {
        path: '/client/hotelInfo',
        name: 'clientHotelInfo',
        // meta: {
        //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // },
        component: clientHotelInfo
      },
      {
        //client side's home
        path: '/client/mapselect',
        name: 'clientMapSelect',
        component: clientMapSelect
      },
      {
        //client side's selection page
        path: '/client/tableSelect',
        name: 'clientTableSelect',
        component: clientTableSelect
      },
      {
        //client side's reserve page merely for one room(information about the room)
        path: '/client/roomReserve',
        name: 'clientRoomReserve',
        component: clientRoomReserve
      },
      {
        //
        path: '/client/personalOrder',
        name: 'clientPersonalOrder',
        component: clientPersonalOrder
      }
    ]
  },

  //YUKI: check admin side's main page
  {
    path: '/admin',
    name: 'adminNav',
    component: adminNav,
    children: [
      {
        //
        path: '/admin/graph',
        name: 'adminGraph',
        component: adminGraph
      },
      {
        //
        path: '/admin/checkReserve',
        name: 'adminCheckReserve',
        component: adminCheckReserve
      },
      {
        //
        path: '/admin/roomEdit',
        name: 'adminRoomEdit',
        component: adminRoomEdit
      },
    ]
  },
  {
    path: '/admin/hotelInfo',
    name: 'adminHotelInfo',
    component: adminHotelInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
