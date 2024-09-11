import { reqGetSearchInfo } from "@/api";
const state = {

    searchResults: {}, //検索結果

};
const mutations = {
    setSearchResult(state, searchResults) {
        state.searchResults = searchResults;
    }
};

const actions = {
    async getSearchResult({ commit }, searchParams) {
        try {
            const response = await reqGetSearchInfo({
                minPrice: searchParams.minPrice,
                maxPrice: searchParams.maxPrice,
                pageNo: searchParams.pageNo,
                pageSize: searchParams.pageSize,
            });
            commit("setSearchResult", response.data);
        } catch (error) {
            console.error(error);
        }
    }
};

//計算属性　プロジェクトにおいて、リストを簡潔に表示するために使用される
const getters = {
    goodsList(state) {
        return state.searchResults.goodsList || [];
    },
    brandmarkList(state) {
        return state.searchResults.brandmarkList || [];
    },
    attrsList(state) {
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
