<template>
	<view class="my-search-container">
		<!-- 搜索输入框 -->
		<uni-search-bar v-if="isShowInput" class="my-search-bar" :placeholder="placeholderText" @confirm="onSearch"
			@focus="onFocus" @blur="onBlur" @clear="onClear" @cancel="onCancel" @input="onInput">
			<uni-icons slot="clearIcon" type="clear" color="#999999" />
		</uni-search-bar>
		<!-- 
		 1.具备输入框样式
		 2.不可输入
		 3.placeholder 内容在父组件定义
		 -->
		<!-- 搜索按钮 -->
		<view class="my-search-box" v-else>
			<!-- 搜索图标 -->
			<image src="@/static/image/search.png" class="icon"></image>
			<!-- placrholder -->
			<text class="placeholder">{{ placeholderText }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: "my-search",
	// 父向子传值
	props: {
		isShowInput: {
			type: Boolean,
			default: false
		},
		placeholderText: {
			type: String,
			default: '点击搜索'
		},
		config: {
			type: Object,
			default: () => {
				return {
					height: 36,
					backgroundColor: '#ffffff',
					icon: '/static/images/search.png',
					'textColor': '#454545',
					border: '1px solid #c9c9c9'
				}
			}
		}
	},
	data() {
		return {

		};
	},
	methods: {
		/**
		 * 点击搜索按钮触发
		 */
		onSearch() {
			this.$emit('search', this.value);
		},
		/**
		 * 输入框获取焦点触发
		 */
		onFocus() {
			this.$emit('focus', this.value);
		},
		/**
		 * 输入框失去焦点触发
		 */
		onBlur() {
			this.$emit('blur', this.value);
		},
		/**
		 * 点击输入框中的清空按钮时
		 */
		onClear() {
			this.$emit('clear', this.value);
		},
		/**
		 * 点击取消按钮时
		 */
		onCancel() {
			this.$emit('cancel', this.value);
		},
		/**
		 *  value 改变时触发事件
		 */
		onInput(val) {
			// input 的事件名称不可修改，与 props 中的 value 对应
			// 当同时存在：
			// props -> value
			// $emit('input', val)
			// 时，在组件外可以使用 v-model 完成双向数据绑定。
			// 即：用户输入内容时，父组件传递过来的 value 同步发生变化
			// 详细见 vue 中 v-model 指令：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
			this.$emit('input', val);
		}
	}
}
</script>

<style lang="scss" scoped>
.my-search-container {
	display: flex;
	align-items: center;

	.my-search-bar {
		width: 100%;
	}

	.my-search-box {
		margin: 20rpx;
		display: flex;
		align-items: center;
		padding: 0 $uni-spacing-base;
		height: 50px;
		width: 100%;
		background-color: $uni-bg-color;
		border-radius: 15px;
		border: 1px solid $uni-border-4;

		.icon {
			width: $uni-img-size-sm;
			height: $uni-img-size-sm;
		}

		.placeholder {
			font-size: 18px;
			margin-left: 20rpx;
			color: $uni-text-color-placeholder;
		}
	}
}
</style>