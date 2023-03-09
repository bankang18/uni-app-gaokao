<template>
	<view class="container">
		<view class="tips">
			<uni-icons type="auth-filled" color="#FF6602" size="50" class="icon"></uni-icons>
			<text class="tip-text">完善资料内容用于精准推荐院校，为了您能获得更好的用户体验，请务必保证资料的准确性</text>
		</view>
		<view class="from">
			<u-form labelPosition="left" :model="model" :rules="rules" ref="form">
				<u-form-item label="高考年份" prop="userInfo.year" borderBottom @click="showYearBox = true;" ref="yearBox"
					labelWidth="150rpx" label-style="font-weight: bold">
					<u-input v-model="model.userInfo.year" disabled disabledColor="#f5f5f5" placeholder="请选择高考年份"
						border="none"></u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="成绩" prop="userInfo.grade" borderBottom ref="gradeBox" labelWidth="150rpx">
					<u-input v-model="model.userInfo.grade" border="none" placeholder="请输入高考成绩"></u-input>
				</u-form-item>
				<u-form-item label="位次" prop="userInfo.order">
					<u-input v-model="model.userInfo.order" border="none" placeholder="请输入高考位次"></u-input>
				</u-form-item>
				<u-form-item label="选科">
					<u-radio-group v-model="model.userInfo.classify">
						<u-radio shape="square" label="文科" :name=1 activeColor="#FF6602"></u-radio>
						<u-radio shape="square" label="理科" :name=0 activeColor="#FF6602"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="考生类型">
					<u-radio-group v-model="model.userInfo.normal">
						<u-radio shape="square" label="普通类" :name=0 activeColor="#FF6602"></u-radio>
						<u-radio shape="square" label="艺术类" :name=1 activeColor="#FF6602"></u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>
			<u-action-sheet :show="showYearBox" :actions="actions" title="选择参加高考的年份" description="请保证数据真实性"
				@close="showYearBox = false" @select="yearSelect">
			</u-action-sheet>
		</view>
		<view class="btn-box">
			<button class="btn" @click="submit">提交修改</button>
		</view>
	</view>
</template>

<script>
import { editStudentInfo } from '@/api/user';
import { mapMutations, mapState } from 'vuex';

export default {
	data() {
		return {
			showYearBox: false,
			model: {
				userInfo: {
					grade: '',
					year: '',
					order: '',
					classify: -1,
					normal: -1
				},
			},
			actions: [{
				name: '2020',
			},
			{
				name: '2021',
			},
			{
				name: '2022',
			},
			],
			rules: {
				'userInfo.grade': {
					type: 'string',
					required: true,
					message: '请填写成绩',
					trigger: ['blur', 'change']
				},
				'userInfo.year': {
					type: 'string',
					required: true,
					message: '请选择年份',
					trigger: ['blur', 'change']
				},
				'userInfo.order': {
					type: 'string',
					required: true,
					message: '请输入位次',
					trigger: ['blur', 'change']
				},
				'userInfo.classify': {
					type: 'number',
					min: 0,
					max: 1,
					required: true,
					message: '请选择分科',
					trigger: ['blur', 'change']
				},
				'userInfo.normal': {
					type: 'number',
					min: 0,
					max: 1,
					required: true,
					message: '请选择考生类型',
					trigger: ['blur', 'change']
				},
			},
			radio: '',
			switchVal: false
		};
	},
	computed: {
		...mapState('user', ['token', 'userInfo'])
	},
	created: function () {
		this.model.userInfo = this.userInfo;
	},
	methods: {
		...mapMutations('user', ['setUserInfo']),
		yearSelect(e) {
			this.model.userInfo.year = e.name;
			this.$refs.form.validateField('userInfo.year');
		},
		submit: function () {
			const that = this;
			uni.showModal({
				title: '提示',
				content: '请确保数据准确',
				success: function (res) {
					if (res.confirm) {
						that.$refs.form.validate().then(async res => {
							uni.showLoading({
								title: '提交中',
								mask: true,
							});
							console.log(that.model.userInfo);
							// TODO 提交
							const { data } = await editStudentInfo({
								grade: that.model.userInfo.grade,
								year: that.model.userInfo.year,
								order: that.model.userInfo.order,
								classify: that.model.userInfo.classify,
								normal: that.model.userInfo.normal,
								token: that.token
							});
							uni.hideLoading();
							uni.navigateBack();
						}).catch(errors => {
							uni.showToast({
								title: '请仔细检查信息是否正确',
								icon: 'error',
								duration: 2000
							});
						})

					} else if (res.cancel) {
						uni.showToast({
							title: '取消提交',
							icon: 'error',
							duration: 2000
						});
					}
				},
				complete: (complete) => {
					uni.hideToast();
				},
			});
		}
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		this.$refs.form.setRules(this.rules)
	}
};
</script>

<style lang="scss" scoped>
.container {
	.tips {
		height: 100rpx;
		background-color: rgba($color: #FF6602, $alpha: .1);
		margin-bottom: 20rpx;
		padding-top: 20rpx;

		.icon {
			float: left;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}

		.tip-text {
			height: 80rpx;
		}
	}

	.from {
		margin: 20rpx 20rpx;
	}

	.btn-box {
		margin: 20rpx 20rpx;

		.btn {
			background-color: #FF6602;
			color: #fff;
		}
	}
}
</style>
