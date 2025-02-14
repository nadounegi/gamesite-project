import { reqCategoryList, reqGetBannerList } from '@/api/index.js'

const state = {
  categoryList: [],
  bannerList: [],
  error: null,
  loading: false
}

const mutations = {
  getCategoryList (state, categoryList) {
    state.categoryList = categoryList
  },

  setBannerList (state, bannerList = []) {
    state.bannerList = bannerList
  },
  SET_LOADING (state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

const actions = {
  async fetchCategoryList ({ commit }) {
    try {
      const result = await reqCategoryList()
      if (result.code === 200) {
        commit('getCategoryList', result.data)
      } else {
        commit('setError', result.message || '请求失败')
      }
    } catch (error) {
      commit('setError', error.message)
    }
  },

  async fetchBannerList ({ commit, state }) {
    if (state.bannerList.length) return
    try {
      const result = await reqGetBannerList()
      if (result.code === 200) {
        commit('setBannerList', result.data)
      }
    } catch (error) {
      console.error('轮播图数据请求失败:', error)
    }
  }
}

const getters = {
  categoryList (state) {
    return state.categoryList
  },

  bannerList (state) {
    return state.bannerList
  },
  isLoading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
