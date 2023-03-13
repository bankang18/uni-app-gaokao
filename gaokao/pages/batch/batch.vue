<template>
	<view>
		<u-sticky bgColor="#f5f5f5">
			<view @click="show = true" class="left">
				<text class="weizhi">{{ year }}</text>
				<image src="@/static/image/arrow-down.png" mode="scaleToFill" class="weizhi-icon" />
			</view>
			<view class="right" @click="showType = true">
				<text class="weizhi">{{ type }}</text>
				<image src="@/static/image/arrow-down.png" mode="scaleToFill" class="weizhi-icon" />
			</view>
		</u-sticky>
		<view class="tabel-container">
			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">批次</uni-th>
					<uni-th align="center">分数线</uni-th>
					<uni-th align="center">分科</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item, index) in batchList">
					<uni-td>{{ item.batch }}</uni-td>
					<uni-td>{{ item.grade }}</uni-td>
					<uni-td>{{ item.type }}</uni-td>
				</uni-tr>

			</uni-table>
		</view>

		<u-picker :show="show" :columns="columns" @confirm="Confirm" ref="uPicker" :closeOnClickOverlay="true"
			@close="show = false"></u-picker>
		<u-picker :show="showType" :columns="columnsType" @confirm="ConfirmType" :closeOnClickOverlay="true"
			@close="showType = false"></u-picker>
	</view>
</template>

<script>
import { getBatchList } from '@/api/batch.js';

export default {
	data() {
		return {
			year: 2021,
			type: '理科',
			showType: false,
			columns: [
				['2021', '2020', '2019', '2018', '2017', ' 2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008']
			],
			columnsType: [
				['理科', '文科']
			],
			show: false,
			batchList: []
		};
	},
	created: function () {
		this.getList();
	},
	watch: {
		type() {
			this.getList();
		},
		year() {
			this.getList();
		}
	},
	methods: {
		Confirm: function (e) {
			this.show = false;
			this.year = e.value[0];
		},
		ConfirmType: function (e) {
			this.showType = false;
			this.type = e.value[0];
		},
		getList: async function () {
			const { data } = await getBatchList({
				year: this.year,
				type: this.type
			});
			console.log(data.list);
			this.batchList = data.list;
		}
	}
}
</script>

<style lang="scss" scoped>
.left {
	display: inline-block;
	width: 375rpx;
	height: 40px;
	border-bottom: 1px solid #8a8a8a;
	border-top: 1px solid #8a8a8a;

	.weizhi {
		float: left;
		font-size: 15px;
		margin-top: 14px;
		line-height: 15px;
		margin-left: 140rpx;
		color: #8a8a8a;
	}

	.weizhi-icon {
		float: left;
		margin-top: 12px;
		margin-left: 10px;
		height: 20px;
		width: 20px;
	}
}

.right {
	display: inline-block;
	width: 375rpx;
	height: 40px;
	border-bottom: 1px solid #8a8a8a;
	border-top: 1px solid #8a8a8a;

	.weizhi {
		float: left;
		font-size: 15px;
		margin-top: 14px;
		line-height: 15px;
		margin-left: 140rpx;
		color: #8a8a8a;
	}

	.weizhi-icon {
		float: left;
		margin-top: 12px;
		margin-left: 10px;
		height: 20px;
		width: 20px;
	}


}
</style>
