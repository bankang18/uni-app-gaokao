<template>
	<view>
		<view class="search-box" @click="onToSearch">
			<!-- 搜索模块 -->
			<my-search placeholderText="搜大学 / 搜专业" />
		</view>
		<view class="my-app-box">
			<!-- 应用板块 -->
			<my-app class="my-app"></my-app>
		</view>
		<!-- 热门院校 -->
		<view class="hot-collage-box">
			<view class="collage-top" @click="onCollageClick">
				<text class="collage-top-left">热门院校</text>
				<text class="collage-top-right">更多 ></text>
			</view>
			<swiper next-margin="60px" style="height: 500px;">
				<!-- 数量取决于 tabData 所决定 -->
				<swiper-item v-for="key in 4" :key="key">
					<view>
						<!-- 加载动画 -->
						<!-- <uni-load-more status="loading" v-if="isLoading" /> -->
						<!-- <block v-else> -->
						<hot-collage :list="hotCollageList.slice(key * 5, (key + 1) * 5)" class="hot"></hot-collage>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<!-- 热门专业 -->
		<view class="hot-collage-box">
			<view class="collage-top" @click="onSubjectClick">
				<text class="collage-top-left">热门专业</text>
				<text class="collage-top-right">更多 ></text>
			</view>
			<swiper next-margin="60px" style="height: 500px;">
				<!-- 数量取决于 tabData 所决定 -->
				<swiper-item v-for="key in 4" :key="key">
					<view>
						<!-- 加载动画 -->
						<!-- <uni-load-more status="loading" v-if="isLoading" /> -->
						<!-- <block v-else> -->
						<hot-subject :list="hotSubjectList.slice(key * 5, (key + 1) * 5)" class="hot"></hot-subject>
					</view>
				</swiper-item>
			</swiper>

		</view>
	</view>
</template>

<script>
import { getHotCollage } from '@/api/collage'
import { getHotSubject } from '@/api/subject'
export default {
	data() {
		return {
			currentIndex: null,
			// 热门院校列表
			hotCollageList: [],
			hotSubjectList: []
		}
	},
	created: async function () {
		// 获取热门院校列表
		const { data } = await getHotCollage();
		this.hotCollageList = data.list;
		const {data:res} = await getHotSubject();
		this.hotSubjectList = res.list;
	},
	methods: {
		onCollageClick: function () {
			// 跳转到院校页面
			uni.navigateTo({ url: '/gaokao/pages/collage/collage' });
		},
		onSubjectClick: function () {
			uni.navigateTo({ url: '/gaokao/pages/subject/subject' });
		}
	}
}
</script>

<style lang="scss" scoped>
.my-app-box {
	height: 220px;
	padding: 20rpx;
	margin: 10px;
	// border-radius: 16px;
	// background: linear-gradient(145deg, #dddddd, #ffffff);
	// box-shadow: 10px 10px 20px #cbcbcb,
	// 	-10px -10px 20px #ffffff;
	background-color: #fff;
	border: 1px solid #eee;
	border-radius: 20px;
}

.hot-collage-box {
	height: 530px;
	margin: 10px;
	margin-top: 40rpx;
	background-color: #fff;
	border: 1px solid #eee;
	border-radius: 20px;

	.collage-top {
		margin-top: 30rpx;

		.collage-top-left {
			float: left;
			margin-left: 40rpx;
			font-size: 25px;
			font-weight: bold;
		}

		.collage-top-right {
			margin-top: 5rpx;
			float: right;
			margin-right: 20rpx;
		}
	}
}
</style>
