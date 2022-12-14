import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueParticles from 'vue-particles'
import './plugins/dialogDrag.js'; //dialog可拖拽
import api from './apis'

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.prototype.$api = api
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
