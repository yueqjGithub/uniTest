<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class='card-container flex-row flex-jst-start flex-ali-center'>
			<view class="card-num">{{credit_card}}</view>
		</view>
		<view class="balance-container flex-column flex-jst-center flex-ali-center pa-lg border-box">
			<view class="flex-row flex-jst-center flex-ali-base full-width ma-top-5">
				<text class="text-bold text-14 text-primary">￥</text>
				<text class="text-bold text-32 text-primary">{{credit_line}}</text>
			</view>
			<view class="full-width flex-row flex-jst-center flex-ali-center text-grey-1 text-12">
				{{$t('pullPage.balance')}}
			</view>
			<view class="full-width flex-row flex-jst-center flex-ali-center pa-row-lg ma-col-md">
				<button type="default" class="my-btn-primary text-white text-14" @click="openModal(1)">{{$t('credit.charge')}}</button>
			</view>
			<view class="full-width flex-row flex-jst-center flex-ali-center pa-row-lg pa-col-md">
				<button type="default" class="my-btn-normal text-14" @click="openModal(2)">{{$t('credit.withdraw')}}</button>
			</view>
			<u-popup v-model="show" mode="center" :border-radius='23'>
				<view class="modal-container">
					<view class="modal-tit bg-primary pa-md flex-row flex-jst-center flex-ali-center">
						<text class="text-14 text-white">{{modalTit}}</text>
					</view>
					<view class="flex-column flex-jst-center flex-ali-center pa-row-md border-box bg-white">
						<view class="full-width pa-col-md flex-row flex-jst-center flex-ali-center">
							<u-input v-model="amount" size="small" type="text" :class="rightClass" :border="true" class="my-input-fill" :placeholder="tips" :clearable="false"></u-input>
						</view>
						<view class="full-width pa-row-lg flex-row flex-jst-center flex-ali-center ma-col-sm">
							<button type="default" class="my-btn-primary text-white text-14" @click='doSub'>{{modalTit}}</button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				credit_card: '',
				credit_line: '',
				show: false,
				modalType: 1, // 1-充值，2提现
				amount: ''
			};
		},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			modalTit () {
				const type = this.modalType === 1 ? 'charge' : 'withdraw'
				return this._i18n.messages[this.lang].credit[type]
			},
			tips () {
				return this._i18n.messages[this.lang].credit.tips
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].addCar.pageName
						})
					}
				}
			}
		},
		onShow() {
			this.queryIndex()
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShareAppMessage(res) {
			const result = getCurrentPages().pop()
			return {
				title: 'kolay',
				path: result.$page.fullPath
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async doSub () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						amount: Number(vm.amount) || 0
					}
					if (obj.amount === 0) {
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].pullPage.withdrawTip2,
							duration: 2000
						})
						return false
					}
					const url = vm.modalType === 1 ? urls.chargeCredit : urls.withdrawCredit
					uni.showLoading({
						title: ''
					})
					vm.$post(url, obj).then(res => {
						debugger
						if (vm.modalType === 1) {
							if (res.data.result_code === 'SUCCESS') {
								uni.requestPayment({ // 调用支付
								    provider: 'wxpay',
								    timeStamp: res.data.timeStamp,
								    nonceStr: res.data.nonceStr,
								    package: res.data.package,
								    signType: 'MD5',
								    paySign: res.data.paySign,
								    success: function (result) {
											uni.hideLoading()
											vm.$refs.uTips.show({
												type: 'success',
												title: vm._i18n.messages[vm.lang].basic.success,
												duration: 2000
											})
											vm.queryIndex()
								    },
								    fail: function (err) {
											uni.hideLoading()
											vm.$refs.uTips.show({
												type: 'error',
												title: vm._i18n.messages[vm.lang].makeOrder.payFail,
												duration: 2000
											})
								    }
								});
							} else {
								uni.showToast({
									icon:'none',
									title: res.message || res.err_code_des
								})
							}
						} else {
							uni.hideLoading()
							if (res.success) {
								vm.$refs.uTips.show({
									type: 'success',
									title: res.message,
									duration: 2000
								})
								vm.queryIndex()
							} else {
								vm.$refs.uTips.show({
									type: 'error',
									title: res.message,
									duration: 2000
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			openModal (type) {
				this.modalType = type
				this.show = true
			},
			async queryIndex() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token
					}
					vm.$post(urls.queryVisaIndex, obj).then(res => {
						console.log(res)
						if (res.success) {
							vm.credit_line = res.data.credit_line
							vm.credit_card = res.data.credit_card
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						} 
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
	.page {
		width: 100%;
		height: 100vh;
		padding-top: 17px;

		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 306.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}

		.card-container {
			width: 90%;
			position: relative;
			z-index: 2;
			margin: 3vw auto 10vw auto;
			background: #0443E6;
			background-image: url('~static/images/Visa.png');
			background-size: 100%;
			border-radius: 20.83rpx;
			height: 50vw;
			.card-num{
				font-size: 22px;
				font-weight: bold;
				color: #FFFFFF;
				margin-left: 9%;
				letter-spacing: 2px;
			}
		}

		.balance-container {
			width: 90%;
			position: relative;
			z-index: 2;
			margin: 0 auto 1vw auto;
			background: #FFFFFF;
			border-radius: 20.83rpx;
			box-shadow: 0px 6.94rpx 24.3rpx 0px rgba(170, 170, 170, 0.1);
		}
		.modal-container{
			width: 80vw;
		}
	}
</style>
