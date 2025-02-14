import { reqGetSearchInfo } from '@/api'
const state = {

  searchResults: {} // 検索結果

}
const mutations = {
  setSearchResult (state, searchResults) {
    state.searchResults = searchResults
  }
}

const actions = {
  async getSearchResult ({ commit }, searchParams = {}) {
    try {
      const result = await reqGetSearchInfo(searchParams)
      console.log('Search API response: ', result) // 调试用
      if (result.code === 200) {
        commit('setSearchResult', result.data)
      } else {
        console.error('Error fetching search results:', result)
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
}

// 計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
  // 返回搜索商品列表
  goodsList (state) {
    return state.searchResults.goodsList || []
  },
  // 返回品牌列表
  brandmarkList (state) {
    return state.searchResults.brandmarkList || []
  },
  // 返回属性列表
  attrsList (state) {
    return state.searchResults.attrsList || []
  },
  // 返回商品列表总数
  total (state) {
    return state.searchResults.total || 0
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
