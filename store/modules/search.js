const STORAGE_KEY = 'search-list'
const HISTORY_MAX = 10;

export default {
    // 独立命名空间
    namespaced: true,
    // state 声明数据
    state: function () {
        return {
            searchData: uni.getStorageSync(STORAGE_KEY) || []
        };
    },
    mutations: { // 数据修改只能通过mutations
        saveToStorage: function (state) {
            // 保存到本地存储
            uni.setStorage({
                key:STORAGE_KEY,
                value:state.searchData
            });
        },
        /**
         * 添加数据
         * @param {Object} state mutation 中必然存在的参数，表示当前模块的 state
         * @param {*} val 要添加的值
         */
        addSearchData: function (state, val) {
            if (val) {
                const index = state.searchData.findIndex(item => item === val);
                if (index !== -1) {
                    state.searchData.splice(index, 1);
                }
                state.searchData.unshift(val);

                if (state.searchData.length > HISTORY_MAX) {
                    state.searchData.splice(HISTORY_MAX,state.searchData.length - HISTORY_MAX);
                }
                // 持久化存储
                // 接受一个字符串为当前的 mutation 的路径 【‘模块名/mutation名’】
                this.commit('search/saveToStorage');
            }
        },
        removeSearchData: function (state, index) {
            state.searchData.splice(index, 1);
            this.commit('search/saveToStorage');
        },
        removeAllSearchData(state) {
            state.searchData = [];
            this.commit('search/saveToStorage');
        }
    }
}