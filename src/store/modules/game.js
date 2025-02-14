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
    console.log('更新gameList:', data)
    console.log('更新total:', total)
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
  async fetchGameList ({ commit }) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const result = await reqGameListPage()
      console.log('API response', result)

      if (result.code === 200) {
        commit('setGameList', { data: result.data || [], total: result.total || 0 })
      } else {
        commit('setGameList', { data: [], total: 0 })
        commit('setError', result.message || 'データ取得失敗')
      }
    } catch (error) {
      commit('setGameList', { data: [], total: 0 })
      commit('setError', error.message || 'サーバーエラー')
    } finally {
      commit('setLoading', false)
    }
    // try {
    //   const offset = (state.currentPage > 1 ? (state.currentPage - 1) * state.pageSize : 0)
    //   console.log('API発送請求', `/gameList?size=${state.pageSize}&offset=${offset}`)

    //   const result = await reqGameListPage(state.pageSize, offset) // offset を API に送信
    //   console.log('API返信データ', result)

    //   if (result.code === 200) {
    //     commit('setGameList', { data: result.data, total: result.total })
    //   } else {
    //     commit('setGameList', { data: [], total: 0 }) // エラー時にリストをクリア
    //     commit('setError', result.message || 'ページ割失敗')
    //   }
    // } catch (error) {
    //   commit('setGameList', { data: [], total: 0 }) // エラー時にリストをクリア
    //   commit('setError', error.message || 'サーバーエラー')
    //   console.error('API請求失敗', error)
    // } finally {
    //   commit('setLoading', false)
    // }
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
