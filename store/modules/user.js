import { login } from "@/api/user";
const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user-info'
export default {
    namespaced: true,
    state: () => ({
        // 用户 token
        token: uni.getStorageSync(TOKEN_KEY) || '',
        // 用户信息
        userInfo: uni.getStorageSync(USER_INFO_KEY) || {},
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            this.commit('user/saveToToken');
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            this.commit('user/saveToUserInfo');
        },
        saveToToken(state) {
            uni.setStorage({
                key: TOKEN_KEY,
                data: state.token
            });
        },
        saveToUserInfo(state) {
            uni.setStorage({
                key: USER_INFO_KEY,
                data: state.userInfo
            });
        },
        /**
        * 删除 token
        */
        removeToken(state) {
            state.token = '';
            this.commit('user/saveToToken');
        },
        /**
         * 删除用户信息
         */
        removeUserInfo(state) {
            state.userInfo = {};
            this.commit('user/saveToUserInfo');
        }
    },
    // 异步操作
    actions: {
        /**
         * 登录
         * @param {*} context vuex实例 
         * @param {*} userProfile 
         */
        login: async function (context, user) {
            const rawData = user.userProfile.userInfo;
            // 调用登录接口
            const { data: res } = await login({
                nickName: rawData.nickName,
                gender: rawData.gender,
                avatarUrl: rawData.avatarUrl,
                openid: user.openid
            });
            this.commit('user/setToken', res.token);
            this.commit('user/setUserInfo', res.userInfo);
        },
        /**
        * 退出登录
        */
        logout(context) {
            this.commit('user/removeToken');
            this.commit('user/removeUserInfo');
        },
        /**
        * 进行登录判定
        */
        isLogin(context) {
            if (context.state.token) return true;
            // TODO: 如果用户未登录，则引导用户进入登录页面
            return false;
        },
    }
};