import { reqCategoryList, reqGetBannerList, reqGameList } from '@/api/index.js';

const state = {
  // 初始值为数组或对象
  categoryList: [],
  bannerList: [],
  // goodsList: [],
  // brandmarkList: [],
  // attrsList: [],
  gameList: [],
};

let mutations = {
  getCategoryList(state, categoryList) {
    state.categoryList = categoryList 
  },

  setBannerList(state, bannerList) { // 加入默认参数空数组
    state.bannerList = bannerList
  },
  setGameList(state, gameList) {
    state.gameList = gameList
  }
};

let actions = {
  async fetchCategoryList({ commit }) {
    try{
      let result = await reqCategoryList();
      if (result.code == 200) {
        commit('getCategoryList', result.data);
      }else{
        console.error('分类数据请求失败:', result.message);     
      }
    }catch(error){
      console.error('Error fetching category list:', error);
    }
  },

  async fetchBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('setBannerList', result.data);
    } else {
      console.error('轮播图数据请求失败:', result.message);
    }
  },
  

  async fetchGameList({ commit }, params = {}) {
    try {
      let result = await reqGameList(params);
      if (result.code === 200) {
        commit('setGameList', result.data);
      } else {
        console.error('Failed to fetch game list:', result.message);
      }
    } catch (error) {
      console.error('Error fetching game list:', error);
    }
  }
};

let getters = {
  categoryList(state) {
    return state.categoryList;
  },
  bannerList(state) {
    return state.bannerList;
  },
  goodsList(state) {
    return state.gameList.goodsList;
  },
  brandmarkList(state) {
    return state.gameList.brandmarkList;
  },
  attrsList(state) {
    return state.gameList.attrsList;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
