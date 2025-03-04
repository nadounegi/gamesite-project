import Vue from 'vue'
import { reqGameListPage, reqAllGamesList, reqGenreList, reqPlatformList, reqBrandList } from '@/api'

const state = {
  gameList: [],
  genreList: [],
  platformList: [],
  allGamesList: [],
  brandList: [],
  total: 0, // ゲームの総数
  currentPage: 1, // 現在のページ
  pageSize: 10, // 1ページあたりのゲーム数
  error: null,
  loading: false
}

const mutations = {
  setBrandList (state, brandList = []) {
    state.brandList = brandList
  },
  setPlatformList (state, platformList = []) {
    state.platformList = platformList
  },
  setGenreList (state, genreList = []) {
    state.genreList = genreList
  },
  setGameList (state, { data = [], total = 0 }) {
    console.log('更新 gameList:', data)
    Vue.set(state, 'gameList', Array.isArray(data) ? data : [])
    Vue.set(state, 'total', total)
  },
  setAllGamesList (state, allGamesList) {
    console.log('allGamesList:', allGamesList)
    state.allGamesList = Array.isArray(allGamesList) ? allGamesList : []
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
  async fetchBrandList ({ commit }) {
    try {
      const result = await reqBrandList()
      if (result.code === 200) {
        commit('setBrandList', result.data)
      }
      return result
    } catch (error) {
      console.error('ブランドリストの取得に失敗しました:', error)
      return Promise.reject(error)
    }
  },
  async fetchGenreList ({ commit }) {
    try {
      const result = await reqGenreList()
      if (result.code === 200) {
        commit('setGenreList', result.data)
      }
      return result
    } catch (error) {
      console.error('ジャンルリストの取得に失敗しました:', error)
      return Promise.reject(error)
    }
  },
  async fetchPlatform ({ commit }) {
    try {
      const result = await reqPlatformList()
      if (result.code === 200) {
        commit('setPlatformList', result.data)
        return result
      }
    } catch (error) {
      console.error('プラットフォーム 请求失败:', error)
      return Promise.reject(error)
    }
  },
  // ページネーション対応 ゲームリスト取得
  async fetchGameList ({ commit }) {
    commit('setLoading', true)
    commit('setError', null)
    try {
      const result = await reqGameListPage()
      console.log('API 获取游戏列表数据:', result)

      if (result.code === 200 && Array.isArray(result.data)) {
        const formattedData = result.data.map(game => ({
          id: game.id || 0,
          gameName: game.gameName || '不明',
          url: game.url || '',
          platformType: game.platformType || '不明',
          genreName: game.genreName || '不明',
          description: game.description || '',
          price: game.price || 0,
          stock: game.stock || 0
        }))
        commit('setGameList', { data: formattedData, total: result.total || 0 })
      } else {
        commit('setGameList', { data: [], total: 0 })
        commit('setError', result.message || 'データ取得失敗')
      }
    } catch (error) {
      console.error('API請求失敗:', error)
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
      const result = await reqAllGamesList()
      console.log('API 响应:', result)
      if (result.code === 200) {
        console.log('処理前的数据：', result.data)
        // 直接使用 result.data，因为游戏列表在 data 数组中
        const games = result.data || []
        const mappedGames = games.map(game => ({
          id: game.gameId,
          gameName: game.gameName,
          url: game.url,
          platformType: game.platformType,
          brandName: game.brandName,
          genreName: game.brandName,
          description: game.description,
          price: game.price,
          stock: game.stock
        }))
        commit('setAllGamesList', mappedGames)
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
