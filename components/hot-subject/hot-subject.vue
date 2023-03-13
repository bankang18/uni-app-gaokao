<template>
	<view class="list-container">
		<view class="list-item" v-for="(item, index) in list" :key="index">
			<view class="item-top"> {{ item.third_name }}</view>
			<view class="item-bottom">
				<text class="item-bottom-tab">{{ item.first_name }}</text>
				<text class="item-bottom-tab">{{ item.second_name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "hot-subject",
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