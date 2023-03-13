<template>
	<view class="list-container">
		<view class="list-item" @click="onItemClick(item.id)" v-for="(item, index) in list" :key="index">
			<view class="item-top"> {{ item.name }}</view>
			<view class="item-bottom">
				<text class="item-bottom-tab" v-if="item.is_985">985</text>
				<text class="item-bottom-tab" v-if="item.is_211">211</text>
				<text class="item-bottom-tab" v-if="item.is_zhongdian">重点院校</text>
				<text class="item-bottom-tab" v-if="!item.is_sili">公办</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "hot-collage",
	props: {
		list: {
			type: Array,
			required: true
		}
	},
	data() {
		return {

		};
	},
	methods: {
		onItemClick: function (id) {
			uni.navigateTo({
				url: `/gaokao/pages/collage-info/collage-info?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.list-container {
	margin-left: 50rpx;
	margin-top: 30rpx;
	border: 1px solid #888A8D;
	border-radius: 20px;

	.list-item {
		margin: 20px;
		margin-left: 30px;

		.item-top {
			text-align: left;
			font-size: 18px;
			line-height: 40px;
			height: 40px;
			font-weight: bold;
			color: #393a3c;
		}

		.item-bottom {
			.item-bottom-tab {
				margin-right: 10px;
				height: 20px;
				line-height: 20px;
				font-size: 15px;
				background-color: rgba($color: #f0ccb4, $alpha: .3);
				padding: 5px;
				padding-top: 3px;
				padding-bottom: 5px;
				border-radius: 3px;
				color: #FF6500;
			}
		}
	}
}
</style>