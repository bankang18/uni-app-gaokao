<template>
	<view>
		<u-grid :border="true" col="4">
			<u-grid-item v-for="(listItem, listIndex) in list" :name="listItem.name" :key="listIndex"
				@click="itemClick(listItem.name)">
				<image :src="listItem.url" mode="aspectFit" class="grid-icon" />
				<text class="grid-text">{{ listItem.title }}</text>
			</u-grid-item>
		</u-grid>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					url: '/static/image/collage.png',
					title: '查大学',
					name: 'collage'
				},
				{
					url: '/static/image/specialize.png',
					title: '查专业',
					name: 'subject'
				},
				{
					url: '/static/image/decide.png',
					title: '招生计划',
					name: 'decide'
				}, 
				{
					url: '/static/image/shengkong.png',
					title: '省控线',
					name: 'batch'
				}, 
				{
					url: '/static/image/fenduan.png',
					title: '一分一段表',
					name: 'fenduan'
				}, 
				{
					url: '/static/image/zhiyuan.png',
					title: '志愿表',
					name: 'zhiyuan'
				}, 
				{
					url: '/static/image/zhineng.png',
					title: '智能选大学',
					name: 'zhineng'
				},
				{
					url: '/static/image/paihang.png',
					title: '大学排名',
					name: 'paihang'
				},
			],
		}
	},
	methods: {
		itemClick(name) {
			uni.navigateTo({
				url: `/gaokao/pages/${name}/${name}`
			})
		}
	}
}
</script>

<style lang="scss">
.grid-icon {
	margin-top: 20rpx;
	height: 100rpx;
	width: 100rpx;
}

.grid-text {
	font-size: 18px;
	padding: 10rpx 0 20rpx 0rpx;
}
</style>