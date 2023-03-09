<template>
	<view class="my-container">
		<block>
			<image class="avatar avatar-img" src="/static/icon/logo.png" mode="aspectFill" />
			<view class="login-desc">登录后可同步数据</view>
			<button class="login-btn" @click="getUserInfo">微信用户一键登录</button>
		</block>
	</view>
</template>
  
<script>
import { getOpenid } from '@/api/user';
import { mapActions } from 'vuex';

export default {
	name: 'my-login',
	data() {
		return {
			code: '123'
		};
	},
	methods: {
		...mapActions('user', ['login']),
		getUserInfo: function () {
			const that = this;
			// 展示加载框
			uni.showLoading({
				title: "加载中"
			});

			//获取用户信息
			uni.getUserProfile({
				desc: "登陆后可同步数据",
				success: function (obj) {
					// 获取code
					uni.login({
						provider: uni.getProvider(), //使用微信登录
						onlyAuthorize: true,
						success: async function ({ code }) {
							const { data: res } = await getOpenid({ code: code });
							// 调用login方法进行登录
							that.login({ userProfile: obj, openid: res.openid });
							uni.navigateBack();
						}
					});
				},
				fail: function () {
					uni.showToast({
						title: '授权已取消',
						icon: 'error',
						mask: true
					});
				}
			});

			// 关闭加载框
			uni.hideLoading();
			uni.hideToast();
		}
	}
};
</script>
  
<style lang="scss" scoped>
.my-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20%;

	.avatar-img {
		width: 240px;
		height: 240px;
	}

	.login-desc {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-col-big;
	}

	.login-btn {
		background-color: #5AC725;
		color: #fff;
		margin-top: $uni-spacing-col-big;
		width: 85%;
	}
}
</style>
  
  