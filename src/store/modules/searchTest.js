import { reqGetSearchInfo,reqCategoryList } from "@/api";
const state = {
    selectedCategories: [], //選択されたカテゴリ
    brandmarkList: [], //ブランドリスト
    categoryList: [], //カテゴリリスト
    attrsList: [], //属性リスト
    goodsList: [], //商品リスト
    searchResults: [], //検索結果
    total: 0, //商品の総数
    pageSize: 10, //ページごとに表示する商品数
    pageNo: 1, //現在のページ番号
    totalPages: 0 //総ページ数
};
const mutations = {
    setCategoryList(state,categories){
        state.categoryList = categories;
    },
    setSearchList(state, payload) {
        state.brandmarkList = payload.brandmarkList;
        state.attrsList = payload.attrsList;
        state.goodsList = payload.goodsList || [];
        state.total = payload.total;
        state.pageSize = payload.pageSize;
        state.pageNo = payload.pageNo;
        state.totalPages = payload.totalPages;
    },
    setPageNo(state, pageNo) {
        state.pageNo = pageNo;
    },
    setSelectedCategory(state, payload) {
        console.log("Before Mutation:", state.selectedCategories);
        state.selectedCategories.push(payload);
        console.log("After Mutation:", state.selectedCategories);
    }
    ,
    removeSelectedCategory(state, categoryId) {
        state.selectedCategories = state.selectedCategories.filter(
            category => category.id !== categoryId
        );
    },
    clearSelectedCategories(state) {//選択されたカテゴリをクリアする
        state.selectedCategories = [];
    },
    clearSearchResults(state) {
        state.brandmarkList = [];
        state.attrsList = [];
        state.goodsList = [];
    }
};
const actions = {
    async fetchCategoryList({ commit}) {
        try {
            const response = await reqCategoryList();
            commit('setCategoryList', response.data);
        }catch(error){
            console.error('Error fetching category list:', error);
        }
    },
    addCategory({ commit, dispatch }, category) {
        console.log("Adding Category:", category);  // 检查这里
        commit('setSelectedCategory', category);
        dispatch('getSearchResult', { keyword: category.name });
    },
    
    removeCategory({ commit, dispatch, state }, categoryId) {
        commit('removeSelectedCategory', categoryId);
        if (state.selectedCategories.length === 0) {
            commit('clearSearchResults');
        } else {//最後に選択されたカテゴリの商品を表示する
            const lastCategory = state.selectedCategories[state.selectedCategories.length - 1];
            dispatch('getSearchResult', { keyword: lastCategory.name });
        }
    },
    clearCategories({ commit }) {
        commit('clearSelectedCategories');
        commit('clearSearchResults');
    },
    async getSearchResult({ commit, state }, params = {}) {
        try {
            const searchParams = {
                ...params,
                categories: state.selectedCategories.map(category => category.name).join(','),
            };
            const result = await reqGetSearchInfo(searchParams);
            if (result.code === 200) {
                commit('setSearchList', result.data);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Request failed", error);
        }
    },
    setPageNo({ commit, dispatch }, pageNo) {
        commit('setPageNo', pageNo);
        dispatch('fetchSearchResults');
    }
};
//計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
    categoryList: state => state.categoryList,
    selectedCategories: (state) => state.selectedCategories,
    brandmarkList: state => state.brandmarkList,
    attrsList: state => state.attrsList,
    goodsList: state => state.goodsList,
    total: (state) => state.total,
    pageSize: (state) => state.pageSize,
    pageNo: (state) => state.pageNo,
    totalPages: (state) => state.totalPages
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
