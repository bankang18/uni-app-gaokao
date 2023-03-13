<template>
	<view class="subject-container" v-if="subject">
		<view class="title">{{ subject.third_name }} - {{ subject.code }}</view>
		<view class="desc">
			<text class="info">专业类别：{{ dict[subject.type] }} - {{ subject.first_name }} - {{ subject.second_name }}</text>
		</view>
		<view class="desc">
			<text class="info">授予学位：{{ subject.grant }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"subject-item",
		props: {
			subject: {
				type: Object,
				reqiured: true
			}
		},
		data() {
			return {
				dict: {
					0: '本科',
					1: '专科'
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
.subject-container {
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
			color: #a49d9d;
		}

		margin-bottom: 5px;
	}
}
</style>