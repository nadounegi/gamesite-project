import { registerUser } from '@/api/index.js'

const state = {
  user: null,
  loading: false,
  error: null
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_ERROR (state, error) {
    state.error = error
  }
}

const actions = {
  async register ({ commit }, userInfo) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const user = await registerUser(userInfo)
      commit('SET_USER', response.data)
    } catch (error) {
      const errorMessage = error.response?.data || '登録に失敗しました。'
      commit('SET_ERROR', errorMessage)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
