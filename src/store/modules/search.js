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
  async getSearchResult ({ state, dispatch, commit }, searchParams) {
    const result = await reqGetSearchInfo(searchParams)
    if (result.code === 200) {
      commit('setSearchResult', result.data)
    }
  }
}

// 計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
  // 返回搜索商品列表
  goodsList (state) {
    return state.searchResults.goodsList
  },
  // 返回品牌列表
  brandmarkList (state) {
    return state.searchResults.brandmarkList
  },
  // 返回属性列表
  attrsList (state) {
    return state.searchResults.attrsList
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
