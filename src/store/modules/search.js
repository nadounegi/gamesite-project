import { reqGetSearchInfo } from "@/api";
const state = {

    searchResults: [], //検索結果

};
const mutations = {
    setSearchResult(state, searchResults) {
        state.searchResults = searchResults;
    }
};

const actions = {
    async getSearchResult({ commit }, searchParams= {}) {
        try{
            let result = await reqGetSearchInfo(searchParams);
            console.log('searchResults:', result);
            if (result.code == 200) {
                commit("setSearchResult", result.data);
            } else {
                console.error('Failed to fetch search results:', result.message);
            }
        }catch(error){
            console.error('Error fetching search results:', error);
        }
    },

};
//計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
    goodsList(state){
        return state.searchResults.goodsList || [];
    },
    brandmarkList(state){
        return state.searchResults.brandmarkList || [];
    },
    attrsList(state){
        return state.searchResults.attrsList || [];
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
