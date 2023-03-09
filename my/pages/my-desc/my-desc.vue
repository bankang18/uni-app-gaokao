<template>
	<view class="my-desc-container">
		<view class="account-info">
			<view class="account-desc">
				账号信息
			</view>
			<u-cell-group>
				<u-cell size="large" title="头像" >
					<image :src="userInfo.avatarUrl" mode="scaleToFill" slot="right-icon" class="avatar" />
				</u-cell>
				<u-cell size="large" title="昵称" :value="userInfo.nickName" :isLink="true" @click="onNickNameClick"></u-cell>
				<u-cell size="large" title="账号" :value="userInfo.mobile ? userInfo.mobile : '授权手机号'" :isLink="true"
					@click="onMobileClick"></u-cell>
			</u-cell-group>
		</view>

		<view class="student-info">
			<view class="top">
				<text class="left">学生信息</text>
				<text class="right" @click="onEditClick">编辑</text>
			</view>
			<u-cell-group>
				<u-cell size="large" title="考试年份" :value="userInfo.year ? userInfo.year : '-'"></u-cell>
				<u-cell size="large" title="分科" :value="userInfo.classify ? userInfo.classify : '-'"></u-cell>
				<u-cell size="large" title="成绩" :value="userInfo.grade ? userInfo.grade : '-'"></u-cell>
				<u-cell size="large" title="位次" :value="userInfo.order ? userInfo.order : '-'"></u-cell>
				<u-cell size="large" title="考生类型" :value="userInfo.normal ? userInfo.normal : '-'"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { editNickname, editMobile } from '@/api/user'

export default {
	data() {
		return {
			style: {
				'font-weight': "bold",
			}
		};
	},
	computed: {
		...mapState('user', ['token', 'userInfo'])
	},
	methods: {
		...mapMutations('user', ['setUserInfo']),
		onEditClick: function () {
			uni.navigateTo({
				url: '/my/pages/student-info/student-info'
			});
		},
		/**
		 * 修改昵称
		 */
		onNickNameClick: function () {
			const that = this;
			uni.showModal({
				title: '修改昵称',
				editable: true, // 显示输入框
				placeholderText: '请输入新昵称',
				success: async function (res) {
					if (res.confirm) {
						const { data } = await editNickname({
							nickname: res.content,
							token: that.token
						});
						// 更新vuex数据
						that.setUserInfo(data.userInfo);
						uni.showToast({
							title: '修改成功',
							icon: 'hand-up',
							mask: true
						});
					} else if (res.cancel) {
						uni.showToast({
							title: '取消修改',
							icon: 'error',
							mask: true
						});
					}
				},
				complete: function () {
					uni.hideToast();
				}
			});
		},
		/**
		 * 修改手机号
		 */
		onMobileClick: function () {
			const that = this;
			uni.showModal({
				title: '修改手机号',
				editable: true, // 显示输入框
				placeholderText: '请输入手机号',
				success: async function (res) {
					if (res.confirm) {
						const { data } = await editMobile({
							mobile: res.content,
							token: that.token
						});
						// 更新vuex数据
						that.setUserInfo(data.userInfo);
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							mask: true
						});
					} else if (res.cancel) {
						uni.showToast({
							title: '取消修改',
							icon: 'error',
							mask: true
						});
					}
				},
				complete: function () {
					uni.hideToast();
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.my-desc-container {
	.account-info {
		.account-desc {
			height: 30px;
			margin-top: 20rpx;
			margin-left: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30px;
			font-weight: bold;
		}

		.avatar {
			height: 200rpx;
			width: 200rpx;
		}
	}

	.student-info {
		.top {
			margin: 20rpx;
			margin-bottom: 40rpx;
			height: 30px;

			.left {
				float: left;
				font-size: 30px;
				font-weight: bold;
			}

			.right {
				font-size: 18px;
				margin-top: 25rpx;
				margin-right: 20rpx;
				float: right;
				color: #6A6B6F;
			}
		}
	}
}
</style>
