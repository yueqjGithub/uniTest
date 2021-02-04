<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="content-container border-box flex-column flex-jst-start flex-ali-center">
			<view class="full-width pa-md flex-column flex-jst-start flex-ali-center">
				<view class="full-width flex-row flex-jst-center flex-ali-base">
					<text class="text-primary text-14 text-bold">￥</text>
					<text class="text-primary text-24 text-bold">{{balance}}</text>
				</view>
				<text class="text-grey-1 text-12">{{$t('pullPage.balance')}}</text>
			</view>
			<view class="full-width pa-md border-box"></view>
			<view class="amount full-width flex-jst-start flex-ali-center" :class="langFlex">
				<u-input v-model="amount" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '16px'}" :clearable="false"
				 placeholder-style="color: #aaaaaa;font-family:'cus-font','yahei'" :placeholder="$t('pullPage.amountTips')" type="number"></u-input>
			</view>
			<view class="full-width pa-md flex-row flex-jst-center flex-ali-center border-box">
				<button type="normal" class="my-btn-primary text-white text-14" @click="doWithdraw">{{$t('pullPage.withdrawBtn')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'withdraw',
		data () {
			return {
				balance: '',
				amount: ''
			}
		},
		computed: {
			...mapState(['lang']),
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].pullPage.withdrawBtn
						})
					}
				}
			}
		},
		onShow () {
			const vm = this
			vm.balance = getCurrentPages()[getCurrentPages().length - 1].options.balance || 0
		},
		methods: {
			...mapActions(['checkLogin']),
			async doWithdraw () {
				const vm = this
				if (Number(vm.balance) === 0 || Number(vm.amount) > Number(vm.balance)) {
					uni.showToast({
						title: vm._i18n.messages[vm.lang].pullPage.withdrawTips
					})
					return false
				}
				if (Number(vm.amount) === 0 || !vm.amount) {
					uni.showToast({
						title: vm._i18n.messages[vm.lang].pullPage.withdrawTip2
					})
					return false
				}
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						amount: Number(vm.amount)
					}
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.submitWithdraw, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							uni.showToast({
								icon: 'success',
								title: ''
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					}, err => {
						uni.hideLoading()
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100vw;
		height: 100vh;
		padding-top: 17px;
		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 256.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}
		
		.content-container {
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 0 auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 55.55rpx;
			.amount{
				border-bottom: 1px solid #d5d5d5;
			}
		}
	}
</style>
