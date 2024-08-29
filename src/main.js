import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from "@/api";

Vue.prototype.$api = api;
// 注册全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

import ListContainer from '@/views/Home/ListContainer'
Vue.component(ListContainer.name,ListContainer)

import GameList from '@/views/Home/GameList'
Vue.component(GameList.name,GameList)
//swiper 輪播図 をグローバルに登録する
import "swiper/css/swiper.css";

Vue.config.productionTip = false

new Vue({
  router,
  // 注册倉庫：所有组件都可以通过$store属性访问倉庫对象
  store,
  render: h => h(App)
}).$mount('#app')
