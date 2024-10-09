import { reqCategoryList, reqGetBannerList, reqgoodsList } from '@/api/index.js'

const state = {
  // 初始值为数组或对象
  categoryList: [],
  bannerList: [],
  goodsList: [],
  error: null // 新增错误处理
}

const mutations = {
  getCategoryList(state, categoryList) {
    state.categoryList = categoryList
  },

  setBannerList(state, bannerList = []) { // 加入默认参数空数组
    state.bannerList = bannerList
  },
  setgoodsList(state, goodsList = []) {
    state.goodsList = goodsList;
    console.log('Stored goods list', state.goodsList); // 查看存储到 Vuex 的数据
  },
  setError(state, error) { // 新增错误处理
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
  }
  ,

  async fetchgoodsList({ commit }, params = {}) {
    try {
      const result = await reqgoodsList(params);
      console.log('Fetched game list result:', result.data); // 输出完整的响应
      // 确认 result.data 结构，调整下面代码
      if (result.code === 200 && result.data && Array.isArray(result.data.goodsList)) {
        commit('setgoodsList', result.data.goodsList);  // 如果 goodsList 是直接在 data 中
        console.log('Game list items:', result.data.goodsList);  // 打印获取到的游戏列表
      } else {
        commit('setError', '获取游戏列表失败或数据格式无效');
        console.log('无效的游戏列表格式或响应代码:', result.data);  // 打印无效的响应
      }
    } catch (error) {
      commit('setError', error.message);
      console.error('获取游戏列表时出错:', error);
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
  ps4ps5Games(state){
    return state.goodsList.filter(item => item.console.consoleName === 'PS4'|| item.console.consoleName === 'PS5');
  },
  xboxGames(state){
    return state.goodsList.filter(item => item.console.consoleName === 'Xbox Series X');
  },
  SwitchGames(state){
    return state.goodsList.filter(item => item.console.consoleName === 'Nintendo Switch');
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
