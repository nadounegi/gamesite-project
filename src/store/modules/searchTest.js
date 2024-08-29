import { reqGetSearchInfo } from "@/api";

const state = {
    selectedCategories: [], //選択されたカテゴリ
    brandmarkList: [],//ブランドリスト
    attrsList: [], //属性リスト
    goodsList: [], //商品リスト
    total: 0, //商品の総数
    pageSize: 10, //ページごとに表示する商品数
    pageNo: 1, //現在のページ番号
    totalPages: 0 //総ページ数
};
const mutations = {
    setSearchList(state,payload){
        state.brandmarkList = payload.brandmarkList;
        state.attrsList = payload.attrsList;
        state.goodsList = payload.goodsList || [];
        state.total = payload.total;
        state.pageSize = payload.pageSize;
        state.pageNo = payload.pageNo;
        state.totalPages = payload.totalPages;
    },
    setPageNo(state,pageNo){
        state.pageNo = pageNo;
    },
    setSelectedCategory(state,payload){
        state.selectedCategories.push(payload);
    },
    removeSelectedCategory(state,categoryId){
        state.selectedCategories = state.selectedCategories.filter(
            category => category.id !== categoryId
        );
    },
    clearSelectedCategories(state){
        state.selectedCategories = [];
    },
    clearSearchResults(state){
        state.brandmarkList= [];
        state.attrsList = [];
        state.goodsList = [];
    }
};
const actions = {
    addCategory({commit,dispatch},category){
        commit('setSelectedCategory',category);
        //検索結果を取得
        dispatch('getSearchResult',{keyword:category.name});
    },
    removeCategory({commit,dispatch,state},categoryId){
        commit('removeSelectedCategory',categoryId);
        if(state.selectedCategories.length === 0){//選択されたカテゴリがない場合、検索結果をクリアする
            commit('clearSearchResults');
        }else{
            const lastCategory = state.selectedCategories[state.selectedCategories.length - 1];//最後に選択されたカテゴリを取得
            dispatch('getSearchResult',{keyword:lastCategory.name});
        }
    },
    clearCategories({commit}){
        commit('clearSelectedCategories');
        commit('cleaerSearchResults');
    },
   async getSearchResult({commit,state},params={}){
    try{
        const searchParams = {
            ...params,
            categories: state.selectedCategories.map(category => category.name).join(','),
        };

        const result = await reqGetSearchInfo(searchParams);
        if(result.code === 200){
            commit('setSearchList',result.data);
        }else{
            console.error(result.message);
        }
    }catch(error){
        console.error('請求失敗:',error);
    }
   },
   setPageNo({commit},pageNo){
        commit('setPageNo',pageNo);
   }
};
//計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
    selectedCategories: state => state.selectedCategories,
    brandmarkList: state => state.brandmarkList,
    attrsList: state => state.attrsList,
    goodsList: state => state.goodsList,
    total: state => state.total,
    pageSize: state => state.pageSize,
    pageNo: state => state.pageNo,
    totalPages: state => state.totalPages
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
