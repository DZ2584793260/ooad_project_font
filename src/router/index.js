import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/login/UserLogin.vue'
import AdministratorLogin from '../views/login/AdministratorLogin.vue'
import Home from '../views/Home.vue'
import UserSignIn from '../views/login/UserSignIn.vue'
import UserSignUp from '../views/login/UserSignUp.vue'
import ResetPassword from '../views/login/ResetPassword.vue'
//YUKI: has add a few new components
import baiduMap from '../views/client/BaiduMap.vue'
import clientHotelInfo from '../views/client/HotelInfo.vue'
import clientMapSelect from '../views/client/MapSelect.vue'
import clientRoomReserve from '../views/client/RoomReserve.vue'
import clientTableSelect from '../views/client/TableSelect.vue'
import clientPersonalOrder from '../views/client/PersonalOrder.vue'
import clientReserveOrder from '../views/client/ReserveOrder.vue'
import clientUncommentOrder from '../views/client/UncommentOrder.vue'
import clientFinishOrder from '../views/client/FinishOrder.vue'
import clientFavorites from '../views/client/Favorites.vue'
import clientStore from '../views/client/Store.vue'
import clientShippingAddress from '../views/client/ShippingAddress.vue'
import clientPointItemView from '../views/client/PointItemView.vue'
import clientNav from '../components/ClientNavbar.vue'
import clientMessageNotification from '../views/client/MessageNotification.vue'
//YUKI: admin routes
import adminHotelInfo from '../views/admin/HotelInfo.vue'///////////
import adminGraph from '../views/admin/Graph.vue'
import adminNav from '../components/AdminNavbar.vue'
import adminAllOrder from '../views/admin/AllOrder.vue'
import adminUncommentOrder from '../views/admin/UncommentOrder.vue'
import adminUnfinishOrder from '../views/admin/UnfinishOrder.vue'
import adminFinishOrder from '../views/admin/FinishOrder.vue'
import adminRoomEdit from '../views/admin/RoomEdit.vue'
import adminRoomSelect from '../views/admin/RoomSelect.vue'
import adminCreditsExchange from '../views/admin/CreditsExchange.vue'
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
        component: clientHotelInfo
      },
      {
        path: '/client/baiduMap',
        name: 'baiduMap',
        component: baiduMap
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
      },
      {
        //
        path: '/client/reserveOrder',
        name: 'clientReserveOrder',
        component: clientReserveOrder
      },
      {
        path: '/client/uncommentOrder',
        name: 'clientUncommentOrder',
        component: clientUncommentOrder
      },
      {
        path: '/client/finishOrder',
        name: 'clientFinishOrder',
        component: clientFinishOrder
      },
      {
        path: '/client/messageNotification',
        name: 'clientMessageNotification',
        component: clientMessageNotification
      }, {
        path: '/client/favorites',
        name: 'clientFavorites',
        component: clientFavorites
      }, {
        path: '/client/store',
        name: 'clientStore',
        component: clientStore
      }, {
        path: '/client/store/shippingAddress',
        name: 'clientShippingAddress',
        component: clientShippingAddress
      },{
        path: '/client/pointItemView',
        name: 'lientPointItemView',
        component: clientPointItemView
      }
    ]
  },

  //YUKI: check admin side's main page
  {
    path: '/admin',
    name: 'adminNav',
    //暂时设的是管理员端必须登录
    // meta: {
    //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    // },
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
        path: '/admin/allOrder',
        name: 'adminAllOrder',
        component: adminAllOrder
      },
      {
        path: '/admin/uncommentOrder',
        name: 'adminUncommentOrder',
        component: adminUncommentOrder

      },
      {
        path: '/admin/unfinishOrder',
        name: 'adminUnfinishOrder',
        component: adminUnfinishOrder

      },
      {
        path: '/admin/finishOrder',
        name: 'adminFinishOrder',
        component: adminFinishOrder

      },
      {
        //
        path: '/admin/roomEdit',
        name: 'adminRoomEdit',
        component: adminRoomEdit
      },
      {
        //
        path: '/admin/roomSelect',
        name: 'adminRoomSelect',
        component: adminRoomSelect
      },
      {
        path: '/admin/hotelInfo',
        name: 'adminHotelInfo',
        component: adminHotelInfo
      }, {
        path: '/admin/creditsExchange',
        name: 'adminCreditsExchange',
        component: adminCreditsExchange
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (to.name === 'clientRoomReserve' && !token) next({ name: 'userLogin' })
  else next()
})
export default router
