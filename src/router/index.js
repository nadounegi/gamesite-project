import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

const originPush = Router.prototype.push
const originReplace = Router.prototype.replace

Router.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call和apply的区別在於call是一個一個傳參數用逗号隔开，apply是一個數組
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

Router.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: { show: true }
    },
    {
      path: '/search/:keyword?',
      component: Search,
      name: 'search',
      meta: { show: true }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
