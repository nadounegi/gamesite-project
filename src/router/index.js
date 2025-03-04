import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import GameList from '@/views/Home/GameList'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Management from '@/views/Management'
import HomePage from '@/views/Management/homePage'
import stockManagement from '@/views/Management/stockManagement'
import addGame from '@/views/Management/stockManagement/addGame.vue'
import Admin from '@/views/Management/Admin'
import PlatformManagement from '@/views/Management/PlatformManagement'
import genreManagement from '@/views/Management/genreManagement'
Vue.use(Router)

const originPush = Router.prototype.push
const originReplace = Router.prototype.replace

Router.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call和apply的区別在於call是一個一個傳參數用逗号隔开，apply是一個數組
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

Router.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: { showHeader: true },
      children: [
        {
          path: 'games',
          component: GameList
        }
      ]
    },
    {
      path: '/search/:keyword?',
      component: Search,
      name: 'search',
      meta: { showHeader: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { showHeader: false }
    },
    {
      path: '/register',
      component: Register,
      meta: { showHeader: false }
    },
    {
      path: '/management',
      name: 'ManagementPage',
      component: Management,
      children: [
        {
          path: 'homePage',
          component: HomePage // 首页
        },
        {
          path: 'stock',
          component: stockManagement // 在庫管理
        },
        {
          path: '/stock/add',
          component: addGame // ゲーム追加
        },
        {
          path: 'platform',
          component: PlatformManagement // 開発元管理
        },
        {
          path: 'genre',
          component: genreManagement // ゲーム類型管理
        },
        {
          path: 'admin',
          component: Admin // 管理者権限
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
