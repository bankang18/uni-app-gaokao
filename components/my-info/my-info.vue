<template>
	<view>
		<!-- 未登录 -->
		<view class="my-info-box" :style="{ backgroundImage: bg_image }" @click="onItemClickOne" v-if="!token">
			<!-- 头像 -->
			<view class="my-info">
				<view class="my-info-right">
					<image src="@/static/image/default-avatar.png" mode="scaleToFill" class="avatar" />
				</view>
				<view class="my-info-left">
					<text class="my-nickname">点击一键登录</text>
					<text class="my-more"> > </text>
				</view>
			</view>
		</view>

		<!-- 已登陆 -->
		<view class="my-info-box" :style="{ backgroundImage: bg_image }" @click="onItemClickTow" v-else>
			<!-- 头像 -->
			<view class="my-info">
				<view class="my-info-right">
					<image :src="userInfo.avatarUrl" mode="scaleToFill" class="avatar" />
				</view>
				<view class="my-info-left">
					<text class="my-nickname">{{ userInfo.nickName }}</text>
					<text class="my-more"> > </text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: "my-info",
	data() {
		return {
			bg_image: 'url(../../static/image/my-info-bg.png)',
		};
	},
	computed: {
		...mapState('user', ['token', 'userInfo'])
	},
	methods: {
		onItemClickOne: function () {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		onItemClickTow: function () {
			uni.navigateTo({
				url: '/my/pages/my-desc/my-desc'
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.my-info-box {
	position: sticky;
	top: 0;
	background-size: contain;

	.my-info {
		height: 215rpx;
		width: 700rpx;
		padding-left: 50rpx;
		padding-top: 85rpx;

		.my-info-right {
			float: left;

			.avatar {
				height: 130rpx;
				width: 130rpx;
				border-radius: 50%;
				border: 5px solid #FFF;
			}
		}

		.my-info-left {
			float: left;
			height: 130rpx;
			padding-top: 45rpx;

			.my-nickname {
				margin-left: 30rpx;
				font-size: 20px;
				font-weight: bold;
			}

			.my-more {
				margin-left: 20px;
				font-size: 20px;
				font-weight: bold;
				line-height: 20px;
				color: rgba(0, 0, 0, 0.4);
			}
		}
	}
}
</style>