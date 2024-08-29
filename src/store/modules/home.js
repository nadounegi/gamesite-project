import { reqCategoryList, reqGetBannerList,reqGameList } from '@/api/index.js';
//モジュールhomeの小倉庫
const state = {
  /**stateの初期値は、空の配列、
   * サーバーに戻るデータはオブジェクトの場合は、初期値は空のオブジェクト 
   * 数値の場合は0、真偽値の場合はfalse
   * API接続口の戻り値により、初期値を設定する
   * */
  categoryList: [],
  //輪播図データ
  bannerList: [],
  goodsList:[],
  brandmarkList:[],
  attrsList:[]

};
const mutations = {
  getCategoryList(state, newList) {//ここは、stateを変更する唯一の函数
    state.categoryList = newList;
  },

  setBannerList(state, newList) {
    state.bannerList = newList.map(item => ({
      ...item,
      image_url: item.image_url.replace('/public', '')
    }));
  },
  setGameList(state,payload){
    state.brandmarkList = payload.brandmarkList;
    state.attrsList = payload.attrsList,
    state.goodsList = payload.goodsList || [];
  }
  
};
const actions = {
  //API中の接続口函数を使って、サーバーへデータを要求する
  async fetchCategoryList({ commit }) {
    let categoryList = await reqCategoryList();
    if(categoryList.code === 200){
      commit('getCategoryList',categoryList.data);
    }
  },
  //API接続口の函数を使って、輪播図データを要求する
  async fetchBannerList({ commit }) {
    try {
      let result = await reqGetBannerList();
      if (result.status === 200) {
        commit('setBannerList', result.data);
      }
    } catch (error) {
      // console.error('Error:', error.response ? error.response.data : error.message);
      console.error('Error fetching banner list:', error);
    }
  },
  //ゲーム商品リストデータ取得
  async fetchGameList({ commit},params={}){
    try{
      const gameParams = {
        ...params
      };
      const result = await reqGameList(gameParams);
      if(result.code === 200){
        commit('setGameList',result.data);
      }else{
        console.error(result.message);
      }
    }catch(error){
      console.error('請求失敗',error);
    }
  }
};
const getters = {
  bannerList: state => state.bannerList,
  isBannerLoading: state => state.bannerLoading,
  bannerError: state => state.bannerError,
  brandmarkList: state => state.brandmarkList,
  attrsList: state => state.attrsList,
  goodsList: state => state.goodsList,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
