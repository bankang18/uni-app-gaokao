<template>
	<view class="collage-container" @click="onItemClick" v-if="collage">
		<view class="title">{{ collage.name }}</view>
		<view class="desc">
			<text class="info">{{ collage.province }} - {{ collage.city }}</text>
			<text class="info" v-if="!collage.is_sili"> | 公立院校</text>
			<text class="info" v-else> | 私立院校</text>
			<text class="info" v-if="collage.local_org != '-'"> | {{ collage.local_org }}</text>
		</view>
		<view class="tabs">
			<text class="tab" v-if="collage.c_classify != '-'">{{ collage.c_classify }}</text>
			<text class="tab" v-if="collage.is_985 == 1">985</text>
			<text class="tab" v-if="collage.is_211 == 1">211</text>
			<text class="tab" v-if="collage.is_zhongdian == 1">重点院校</text>
			<text class="tab" v-if="collage.classify != '-'">{{ collage.classify }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: "collage-item",
	props: {
		collage: {
			type: Object,
			required: true
		}
	},
	data() {
		return {

		};
	},
	methods: {
		onItemClick: function () {
			uni.navigateTo({
				url: `/gaokao/pages/collage-info/collage-info?id=${this.collage.id}`
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.collage-container {
	margin: 20px;
	border-bottom: 1px solid #a49d9d;
	padding-bottom: 10px;

	.title {
		font-weight: bold;
		font-size: 20px;
		height: 25px;
		line-height: 25px;
		margin-bottom: 5px;
		color: #FF6500;
	}

	.desc {
		.info {
			margin-right: 5px;
			color: #a49d9d;
		}

		margin-bottom: 5px;
	}

	.tabs {
		margin-top: 10px;
		.tab {
			margin-right: 10px;
			padding: 2px;
			border-radius: 10%;
			color: rgb(68, 67, 67);
			background-color: rgba($color: #ded3c3, $alpha: .3);
			border: 1px solid #ded3c3;
		}
	}
}
</style>