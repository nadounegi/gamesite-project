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
import  * as http from '@/api';

import process from 'process';
window.process = process;

new Vue({
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    Vue.prototype.$http = http;
  },
  router,
  // 注册倉庫：所有组件都可以通过$store属性访问倉庫对象
  store,
  render: h => h(App)
}).$mount('#app')
