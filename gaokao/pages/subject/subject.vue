<template>
	<view>
		<u-sticky bgColor="#f5f5f5">
			<view @click="showPro = true" class="left">
				<text class="weizhi">专业层次</text>
				<image src="@/static/image/arrow-down.png" mode="scaleToFill" class="weizhi-icon" />
			</view>
			<view class="right" @click="show = true">
				<text class="weizhi">专业类别</text>
				<image src="@/static/image/arrow-down.png" mode="scaleToFill" class="weizhi-icon" />
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
		<!-- 专业列表 -->
		<view class="list">
			<subject-item v-for="(item, index) in subjectList" :key="index" :subject="item"></subject-item>
		</view>
		<view v-if="!hasMore">
			<text style="text-align: center; width: 750rpx;">没有更多了</text>
		</view>

		<u-picker :show="showPro" ref="uPickerPro" :closeOnClickOverlay="true" @close="showPro = false" :loading="loading"
			:columns="proColumns" @confirm="proConfirm"  @change="changeHandler"></u-picker>
		<u-picker :show="show" :columns="columns" @confirm="Confirm" ref="uPicker" :closeOnClickOverlay="true" @close="show = false"></u-picker>
	</view>
</template>

<script>
import {
	getFirstSubject,
	getSecondSubject,
	getSubjectList
} from '@/api/subject';

export default {
	data() {
		return {
			show: false,
			showPro: false,
			first_subject_list: [],
			subject_data_list: [],
			columns: [
				['本科', '专科']
			],
			proColumns: [
				[],
				['哲学类']
			],
			cityColumn: [],
			loading: false,
			page: 0,
			tabs: [],
			subjectList: [],
			hasMore: true
		};
	},
	watch: {
		tabs() {
			this.getList();
		}
	},
	created: async function () {
		// 获取省列表
		const {
			data
		} = await getFirstSubject();
		var list = [];
		this.first_subject_list = data.list;
		data.list.forEach(item => {
			list.push(item.name);
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
				const {
					data: res
				} = await getSubjectList(data);
				this.subjectList = this.subjectList.concat(res.list);
				this.hasMore = res.has_more;
			}
		},
		Confirm(e) {
			this.show = false;
			this.tabs.push({
				class: 'type',
				name: e.value[0]
			});
			// TODO 发送请求
			this.getList();
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
				if (!this.subject_data_list[index]) {
					this.loading = true
					const {
						data
					} = await getSecondSubject({
						first: this.proColumns[0][index]
					});
					this.subject_data_list[index] = data.list;
					this.second_subject_list = data.list;
					this.setSecondSubject(index);
					this.loading = false;
				} else {
					if (!this.cityColumn[index]) {
						this.second_subject_list = this.subject_data_list[index];
						this.setSecondSubject(index);
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
				if (item.class === 'subject') {
					this.tabs.splice(index, 1);
				}
			});
			this.tabs.push({
				class: 'subject',
				name: e.value[1],
			});
			// TODO 发送请求
			this.getList();
		},
		// 设置省份对应城市数组
		setSecondSubject: function (index) {
			var list = [];
			this.second_subject_list.forEach(item => {
				list.push(item.name);
			});
			this.cityColumn[index] = list;
		},
		getList: async function () {
			let data = {}
			this.page = 0;
			this.tabs.forEach(item => {
				data[item.class] = item.name;
			});
			data['page'] = this.page;
			this.page++;
			const {
				data: res
			} = await getSubjectList(data);
			this.subjectList = res.list;
			this.hasMore = res.has_more;
		},
		onCloseClick: function (index, class_name, name) {
			this.tabs.splice(index, 1)
		},
		onClearClick: function () {
			this.tabs = [];
		},
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
