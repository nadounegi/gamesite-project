import { reqCategoryList, reqGetBannerList, reqGameList } from '@/api/index.js'

const state = {
  categoryList: [],
  bannerList: [],
  gamesList: [],
  error: null,
  loading: false,
}

const mutations = {
  getCategoryList(state, categoryList) {
    state.categoryList = categoryList;
  },

  setBannerList(state, bannerList = []) {
    state.bannerList = bannerList;
  },

  setGameList(state, newGamesList = []) {
    state.gamesList = [...state.gamesList, ...newGamesList];  // 合并新旧数据
  },
  
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  
  setError(state, error) {
    state.error = error;
  },
}

const actions = {
  async fetchCategoryList({ commit }) {
    try {
      const result = await reqCategoryList();
      if (result.code === 200) {
        commit('getCategoryList', result.data);
      } else {
        commit('setError', result.message || '请求失败');
      }
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async fetchBannerList({ commit, state }) {
    if (state.bannerList.length) return;
    try {
      const result = await reqGetBannerList();
      if (result.code === 200) {
        commit('setBannerList', result.data);
      }
    } catch (error) {
      console.error('轮播图数据请求失败:', error);
    }
  },
  
  async fetchGameList({ commit }, consoleName) {
    commit('setLoading', true);
    try {
      const result = await reqGameList(consoleName);
      console.log(`获取到 ${consoleName} 平台的数据:`, result);
      if (result.code === 200) {
        commit('setGameList', result.data);
      } else {
        commit('setError', `Error fetching gameList for ${consoleName}`);
      }
    } catch (error) {
      commit('setError', error.message);
    } finally {
      commit('setLoading', false);
    }
  }
}

const getters = {
  categoryList(state) {
    return state.categoryList;
  },
  
  bannerList(state) {
    return state.bannerList;
  },
  
  gamesList(state) {
    return state.gamesList;
  },
  
  ps4ps5Games(state) {
    return state.gamesList.filter(game => game.console?.consoleName === 'PS4' || game.console?.consoleName === 'PS5');
  },
  
  xboxGames(state) {
    return state.gamesList.filter(game => game.console?.consoleName === 'Xbox Series X');
  },
  
  SwitchGames(state) {
    return state.gamesList.filter(game => game.console?.consoleName === 'Switch');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}


