<template>
	<view>
		<u-sticky bgColor="#f5f5f5">
			<view @click="showPro = true" class="left">
				<text class="weizhi">位 置</text>
				<image src="@/static/image/arrow-down.png" mode="scaleToFill" class="weizhi-icon" />
			</view>
			<view class="right" @click="show = true">
				<text class="weizhi">筛 选</text>
				<image src="@/static/image/check.png" mode="scaleToFill" class="weizhi-icon" />
			</view>
			<view class="tabs-container">
				<view class="tabs" v-for="(item, index) in tabs" :key="index"
					@click="onCloseClick(index, item.class, item.name)">
					<text class="tab-text">{{ item.name }}</text>
					<image src="@/static/image/close.png" mode="scaleToFill" class="tab-close" />
				</view>
				<view class="tabs-clear" @click="onClearClick" v-if="tabs[0]">
					<image src="@/static/image/trash.png" mode="scaleToFill" class="tab-clear" />
					<text class="clear-text">清除</text>
				</view>
			</view>
		</u-sticky>
		<!-- 学校列表 -->
		<view class="list">
			<collage-item v-for="(item, index) in collageList" :key="index" :collage="item"></collage-item>
		</view>
		<view v-if="!hasMore">
			<text style="text-align: center; width: 750rpx;">没有更多了</text>
		</view>
		<u-picker :show="showPro" ref="uPickerPro" :closeOnClickOverlay="true" @close="showPro = false" :loading="loading"
			:columns="proColumns" @confirm="proConfirm" @change="changeHandler"></u-picker>
		<u-popup :show="show" @close="close">
			<button type="primary" class="btn" @click="onConfirmClick">确定</button>
			<view class="pop-box" style="margin: 20px">
				<view class="pop-title">
					办学类型
				</view>
				<view>
					<text class="check-box" v-for="(item, index) in banxueTab" :class="{ active: item.active }" :key="index"
						@click="onBanXueItemClick(index)">{{ item.name }}</text>
				</view>
				<view class="pop-title">
					院校特色</view>
				<view>
					<text class="check-box" v-for="(item, index) in speacialTab" :class="{ active: item.active }"
						:key="index" @click="onSpeacialItemClick(index)">{{ item.name }}</text>
				</view>
				<view class="pop-title">
					办学类型</view>
				<view>
					<text class="check-box" v-for="(item, index) in classifyTab" :class="{ active: item.active }"
						:key="index" @click="onClassifyItemClick(index)">{{ item.name }}</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { getProvince, getCity, getCollageList } from '@/api/collage';

export default {
	data() {
		return {
			page: 0,
			showPro: false,
			show: false,
			province: [],
			city: [],
			province_data_list: [],
			proColumns: [
				[],
				['北京市']
			],
			cityColumn: [],
			banxueTab: [
				{
					active: false,
					name: '私立院校'
				},
				{
					active: false,
					name: '公立院校'
				}
			],
			speacialTab: [
				{
					active: false,
					name: '985'
				},
				{
					active: false,
					name: '211'
				},
				{
					active: false,
					name: '重点院校'
				}
			],
			classifyTab: [
				{
					active: false,
					name: '综合'
				},
				{
					active: false,
					name: '理工'
				},
				{
					active: false,
					name: '农林'
				},
				{
					active: false,
					name: '医药'
				},
				{
					active: false,
					name: '师范'
				},
				{
					active: false,
					name: '语言'
				},
				{
					active: false,
					name: '财经'
				},
				{
					active: false,
					name: '政法'
				},
				{
					active: false,
					name: '体育'
				},
				{
					active: false,
					name: '艺术'
				},
				{
					active: false,
					name: '民族'
				},
				{
					active: false,
					name: '军事'
				},
			],
			tabs: [],
			collageList: [],
			hasMore: true
		}
	},
	watch: {
		tabs() {
			this.getList();
		}
	},
	created: async function () {
		// 获取省列表
		const { data } = await getProvince();
		this.province = data.list;
		var list = [];
		data.list.forEach(item => {
			list.push(item.province);
		});
		this.proColumns[0] = list;

		this.getList();
	},
	methods: {
		onReachBottom: async function () {
			if (this.hasMore) {
				let data = {}

				this.tabs.forEach(item => {
					data[item.class] = item.name;
				});

				data['page'] = this.page;
				this.page++;
				const { data: res } = await getCollageList(data);
				this.collageList = this.collageList.concat(res.list);
				this.hasMore = res.has_more;
			}
		},
		close: function () {
			this.show = false;
		},
		async changeHandler(e) {
			const that = this;
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPickerPro
			} = e;
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				if (!this.province_data_list[index]) {
					this.loading = true
					const { data } = await getCity({ province: this.proColumns[0][index] });
					this.province_data_list[index] = data.list;
					this.city = data.list;
					this.setCity(index);
					this.loading = false;
				} else {
					if (!this.cityColumn[index]) {
						this.city = this.province_data_list[index];
						this.setCity(index);
					}
				}
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.cityColumn[index]);
			}
		},
		// 回调参数为包含columnIndex、value、values
		proConfirm(e) {
			this.showPro = false;


			// TODO 添加tab
			this.tabs.forEach((item, index) => {
				if (item.class === 'city') {
					this.tabs.splice(index, 1);
				}
			});
			this.tabs.push({
				class: 'city',
				name: e.value[1],
			});
			// TODO 发送请求
			this.getList();
		},
		// 设置省份对应城市数组
		setCity: function (index) {
			var list = [];
			this.city.forEach(item => {
				list.push(item.city);
			});
			this.cityColumn[index] = list;
		},
		onBanXueItemClick: function (index) {
			if (!this.banxueTab[index].active) {
				this.banxueTab.forEach(item => {
					item.active = false;
				});
				this.banxueTab[index].active = !this.banxueTab[index].active;
			} else {
				this.banxueTab[index].active = false;
			}
			// TODO 发送请求

			// TODO 添加tab
		},
		onSpeacialItemClick: function (index) {
			if (!this.speacialTab[index].active) {
				this.speacialTab.forEach(item => {
					item.active = false;
				});
				this.speacialTab[index].active = !this.speacialTab[index].active;
			} else {
				this.speacialTab[index].active = false;
			}
			// TODO 发送请求

			// TODO 添加tab
		},
		onClassifyItemClick: function (index) {
			if (!this.classifyTab[index].active) {
				this.classifyTab.forEach(item => {
					item.active = false;
				});
				this.classifyTab[index].active = !this.classifyTab[index].active;
			} else {
				this.classifyTab[index].active = false;
			}
			// TODO 发送请求

			// TODO 添加tab
		},
		onCloseClick: function (index, class_name, name) {
			this.tabs.splice(index, 1)
			if (class_name === 'banxue') {
				this.banxueTab.forEach((item, i) => {
					if (item.name === name) {
						this.banxueTab[i].active = false;
					}
				});
			}
			if (class_name === 'speacial') {
				this.speacialTab.forEach((item, i) => {
					if (item.name === name) {
						this.speacialTab[i].active = false;
					}
				});
			}
			if (class_name === 'classify') {
				this.classifyTab.forEach((item, i) => {
					if (item.name === name) {
						this.classifyTab[i].active = false;
					}
				});
			}
		},
		onClearClick: function () {
			this.tabs = [];
			this.tabs.forEach((item, index) => {
				if (item.class != 'city') {
					this.tabs.splice(index, 1);
				}
			});
			this.classifyTab.forEach((item, i) => {
				if (item.name === name) {
					this.classifyTab[i].active = false;
				}
			});
			this.speacialTab.forEach((item, i) => {
				if (item.name === name) {
					this.speacialTab[i].active = false;
				}
			});
			this.banxueTab.forEach((item, i) => {
				if (item.name === name) {
					this.banxueTab[i].active = false;
				}
			});
		},
		onConfirmClick: function () {
			// TODO 添加tab
			this.tabs.forEach((item, index) => {
				if (item.class != 'city') {
					this.tabs.splice(index, 1);
				}
			});

			this.banxueTab.forEach(item => {
				if (item.active) {
					this.tabs.push({
						class: 'banxue',
						name: item.name,
					});
				}
			});

			this.speacialTab.forEach(item => {
				if (item.active) {
					this.tabs.push({
						class: 'speacial',
						name: item.name,
					});
				}
			});

			this.classifyTab.forEach(item => {
				if (item.active) {
					this.tabs.push({
						class: 'classify',
						name: item.name,
					});
				}
			});
			this.show = false;
			// TODO 发送请求
			this.getList();
		},
		getList: async function () {
			let data = {}
			this.page = 0;
			this.tabs.forEach(item => {
				data[item.class] = item.name;
			});
			data['page'] = this.page;
			this.page++;
			const { data: res } = await getCollageList(data);
			this.collageList = res.list;
			this.hasMore = res.has_more;
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

.btn {
	margin-top: 20px;
	width: 700rpx;
	text-align: center;
}

.pop-box {
	margin: 20px;

	.pop-title {
		font-size: 20px;
		height: 20px;
		font-weight: bold ! important;
		line-height: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.check-box {
		display: inline-block;
		height: 50px;
		margin: 10px;
		margin-right: 10px;
		border-radius: 5px;
		font-size: 18px;
		line-height: 50px;
		text-align: center;
		width: 80px;
		background-color: rgba($color: #aaa2a2, $alpha: 1);
	}
}

.active {
	background-color: rgba($color: #e1a37a, $alpha: .3) !important;
	color: #FF6500;
}

.tabs-container {
	height: auto;
	background-color: rgba($color: #b0a9a9, $alpha: .1);

	.tabs {
		display: inline-flex;
		height: 35px;
		width: 90px;
		margin: 10px;
		margin-right: 5px;
		background-color: #fff;
		border-radius: 10px;

		.tab-text {
			text-align: center;
			margin-left: 3px;
			line-height: 35px;
			font-size: 15px;
		}

		.tab-close {
			margin-top: 10px;
			margin-left: 10px;
			float: right;
			height: 16px;
			width: 16px;
			text-align: center;
		}
	}

	.tabs-clear {
		float: right;
		margin-left: 20px;
		margin-right: 20px;
		display: inline-flex;

		.tab-clear {
			height: 25px;
			width: 25px;
		}

		.clear-text {
			line-height: 25px;
		}
	}
}
</style>
