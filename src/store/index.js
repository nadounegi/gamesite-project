// 倉庫
import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import search from '@/store/modules/search.js'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    home,
    search
  }
})
