<template>
	<view>
		<u-cell-group>
			<u-cell title="志愿表" :clickable="true" :isLink="true" size="large">
				<image src="/static/image/zhiyuanbiao.png" class="zhiyuanbiao-icon" slot="icon" @click=""/>
			</u-cell>
			<u-cell title="退出登录" :clickable="true" :isLink="true" size="large" @click="onLogoutClick">
				<image src="/static/image/logot.png" class="zhiyuanbiao-icon" slot="icon" />
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: "my-tab",
	data() {
		return {

		};
	},
	computed: {
		...mapState('user', ['token'])
	},
	methods: {
		...mapActions('user', ['logout']),
		onLogoutClick: function () {
			const that = this;
			if (that.token) {
				uni.showModal({
					title: '提示',
					content: '退出后无法同步数据',
					success: function (res) {
						if (res.confirm) {
							that.logout();
							uni.showToast({
								title: '用户已退出'
							});
						}
					},
					complete: function () {
						uni.hideToast();
					}
				});
			} else {
				uni.showToast({
					title:'当前用户未登录',
					icon: 'error'
				});
				uni.hideToast();
			}

		}
	}
}
</script>

<style lang="scss" scoped>
.zhiyuanbiao-icon {
	height: 50rpx;
	width: 50rpx;
	margin-right: 20rpx;
}
</style>