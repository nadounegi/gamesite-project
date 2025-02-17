import { reqGameListPage, reqGameList, reqGenreList } from '@/api'

const state = {
  gameList: [],
  genreList: [],
  allGamesList: [],
  total: 0, // ゲームの総数
  currentPage: 1, // 現在のページ
  pageSize: 10, // 1ページあたりのゲーム数
  error: null,
  loading: false
}

const mutations = {
  setGameList (state, { data = [], total = 0 }) {
    console.log('更新 Vuex gameList:', data) // 确保数据存入 Vuex
    state.gameList = Array.isArray(data) ? data : []
    state.total = total
  },
  setAllGamesList (state, gameList) {
    state.allGamesList = gameList.map(game => ({
      ...game,
      genreName: game.genreName || '不明', // genreName 直接是字符串
      platformType: game.platformType || '不明', // platformType 直接是字符串
      brandName: game.brandName || '不明' // brandName 直接是字符串
    }))
  },
  setGenreList (state, genreList) {
    state.genreList = genreList || []
  },
  setCurrentPage (state, page) {
    state.currentPage = page
  },
  setPageSize (state, size) {
    state.pageSize = size
    state.currentPage = 1 // ページサイズ変更時は 1 ページ目にリセット
  },
  setLoading (state, isLoading) {
    state.loading = isLoading
  },
  setError (state, error) {
    state.error = error
  }
}

const actions = {
// ページネーション対応 ゲームリスト取得
  async fetchGameList ({ commit, state }) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const page = state.currentPage
      const size = state.pageSize
      const result = await reqGameListPage({ page, size })
      if (result.code === 200 && Array.isArray(result.data)) {
        commit('setGameList', { data: result.data, total: result.total || 0 })
      } else {
        commit('setGameList', { data: [], total: 0 })
      }
    } catch (error) {
      commit('setGameList', { data: [], total: 0 })
      commit('setError', error.message || 'サーバーエラー')
    } finally {
      commit('setLoading', false)
    }
  },
  // ゲームリスト取得
  async fetchAllGames ({ commit }) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const result = await reqGameList()
      console.log('API 响应:', result)
      if (result.code === 200) {
        console.log('処理前的数据：', result.data)
        commit('setAllGamesList', result.data || [])
      } else {
        commit('setAllGamesList', []) // エラー時にリストをクリア
        commit('setError', result.message || 'ゲームリスト取得失敗')
      }
    } catch (error) {
      commit('setAllGamesList', []) // エラー時にリストをクリア
      commit('setError', error.message || 'サーバーエラー')
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchGenreList ({ commit }) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const result = await reqGenreList()
      if (result.code === 200) {
        commit('setGenreList', result.data || [])
      } else {
        commit('setGenreList', []) // エラー時にリストをクリア
        commit('setError', result.message || 'ゲーム類型取得失敗')
      }
    } catch (error) {
      commit('setGenreList', []) // エラー時にリストをクリア
      commit('setError', error.message || 'サーバーエラー')
    } finally {
      commit('setLoading', false)
    }
  }
}

const getters = {
  gameList: state => state.gameList,
  allGamesList: state => state.allGamesList,
  genreList: state => state.genreList,
  total: state => state.total,
  currentPage: state => state.currentPage,
  pageSize: state => state.pageSize,
  loading: state => state.loading,
  error: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
