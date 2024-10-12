import { reqCategoryList, reqGetBannerList, reqGameList } from '@/api/index.js'

const state = {
  // 初始值为数组或对象
  categoryList: [],
  bannerList: [],
  gamesList: [],
  error: null, // 新增错误处理
  loading: false, // 新增加载状态
}

const mutations = {
  getCategoryList(state, categoryList) {
    state.categoryList = categoryList
  },

  setBannerList(state, bannerList = []) { // 加入默认参数空数组
    state.bannerList = bannerList
  },
  setGameList(state, newGamesList = []) {
    state.gamesList = [...state.gamesList, ...newGamesList];  // 合并现有数据和新数据
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setError(state, error) {
    state.error = error;
  }
}

const actions = {
  async fetchCategoryList({ commit }) {
    try {
      const result = await reqCategoryList();
      if (result.code === 200) {
        // 确保这里的数据被正确存储到 Vuex 的 state 中
        commit('getCategoryList', result.data);
      } else {
        console.error('分类数据请求失败:', result.message || '未知错误');
        commit('setError', result.message || '请求失败');

      }
    } catch (error) {
      console.error('Error fetching categoryList:', error.message);
      commit('setError', error.message);  // 将错误存储到Vuex以便调试
    }
  }
  ,

  async fetchBannerList({ commit, state }) {
    if (state.bannerList.length) return;  // 如果数据已存在，则不重复请求
    try {
      const result = await reqGetBannerList();
      if (result.code === 200) {
        commit('setBannerList', result.data);
      }
    } catch (error) {
      console.error('轮播图数据请求失败:', error);
    }
  },
  async fetchGameList({ commit }, consoleName,params={}) {
    commit('setLoading', true);
    try {
      const result = await reqGameList(consoleName, params);
      console.log(`获取到 ${consoleName} 平台的数据:`, result);  // 检查返回数据
      if (result.code === 200) {
        commit('setGameList', result.data);

      } else{
        commit('setError',`Error fetching gameList for ${consoleName}`);
      }
    } catch (error) {
      console.error(`获取${consoleName}平台游戏列表时出错:`, error);
      commit('setError', error.message);
    }finally{
      commit('setLoading', false);
    }
  }
}

const getters = {
  categoryList(state) {
    return state.categoryList
  },
  bannerList(state) {
    return state.bannerList
  },
  gamesList(state) {
    return state.gamesList
  },
  ps4ps5Games(state){
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
  getters
}
