<template>
	<view class="pa-md flex-column flex-jst-start flex-ali-center charge-container full-width">
		<view class="full-width flex-row flex-jst-end flex-ali-center">
			<u-icon custom-prefix="iconfont" name="weibiaoti--14" size="45" class="text-grey" @click="closeHandler"></u-icon>
		</view>
		<view class="flex-column full-width flex-jst-start flex-ali-center">
			<view class="full-width flex-row flex-jst-center flex-ali-base">
				<text class="text-primary text-12 text-bold">￥</text>
				<text class="text-primary text-24 text-bold">{{target.face_value}}</text>
			</view>
			<text class="full-width text-center ma-col-sm text-grey text-12">{{$t('mobileCharge.chargeValue')}}</text>
			<view class="charge-row border-box pa-col-md full-width flex-jst-btw flex-ali-center" :class="langFlex">
				<text class="text-12 text-bold">{{$t('mobileCharge.chargePhone')}}</text>
				<text class="text-grey text-14">{{phone}}</text>
			</view>
			<view class="charge-row border-box pa-col-md full-width flex-jst-btw flex-ali-center" :class="langFlex">
				<text class="text-12 text-bold">{{$t('mobileCharge.normalPrice')}}</text>
				<text class="text-cus-error text-14">￥{{sellPrice}}</text>
			</view>
			<view class="charge-row border-box pa-col-md full-width flex-jst-btw flex-ali-center" :class="langFlex">
				<text class="text-12 text-bold">{{$t('mobileCharge.vipPrice')}}</text>
				<text class="text-primary text-14">￥{{target.member_price}}</text>
			</view>
			<view class="charge-row border-box pa-col-md full-width flex-jst-btw flex-ali-center" :class="langFlex" @click="showAd">
				<text class="text-12 text-bold">{{$t('mobileCharge.advertising')}}</text>
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</view>
			<button class="cus-plain-btn charge-row border-box full-width flex-jst-btw flex-ali-center" :class="langFlex" open-type="share">
					<text class="text-12 text-bold">{{$t('mobileCharge.promote')}}</text>
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
			<view class="charge-row border-box pa-col-md full-width flex-jst-btw flex-ali-center flex-row">
				<view class="balance-left flex-ali-center" :class="langFlex">
					<text class="text-grey text-12">{{$t('makeOrder.myBalance')}}</text>
					<view style="width: 2px;"></view>
					<text class="text-grey text-14">￥{{accountBalance}}</text>
				</view>
				<view class="balance-right flex-row flex-jst-center flex-ali-center">
					<text class="ma-row-sm text-12 text-bold">{{$t('makeOrder.chooseBalance')}}</text>
					<u-switch v-model="balance" active-color="#00BE88"></u-switch>
				</view>
			</view>
			<!-- 充值按钮 -->
			<view class="width-80 ma-col-md flex-row flex-jst-center">
				<button type="default" class="my-btn-primary text-white text-14" @click="doCharge">{{$t('mobileCharge.charge')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: 'charge',
		props: {
			target: {
				default: function() {
					return {}
				}
			},
			phone: {
				default: ''
			},
			accountBalance: {
				default: ''
			},
			savePhoneArea: {
				default: ''
			},
			isVip: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				ad: '', // 广告
				isLoaded: true, // 广告是否加载成功
				adv: false, // 是否观看完广告
				balance: false // 使用余额
			}
		},
		created () {
			this.ad = wx.createRewardedVideoAd({
				adUnitId: 'adunit-be9bafbf29884a63'
			})
			this.ad.onLoad(() => {
				this.isLoaded = true
				// console.log('onLoad event')
				// 当激励视频被关闭时，默认预载下一条数据，加载完成时仍然触发 `onLoad` 事件
			})
			this.ad.onError((err) => {
				console.log('onError event', err)
			})
			this.ad.onClose(res => {
				this.adv = res.isEnded
				// console.log('onClose event', res)
			})
		},
		watch: {
			isLoaded: {
				immediate: false,
				handler: function(val) {
					if (val === false) {
						this.ad.load()
					}
				}
			}
		},
		computed: {
			...mapState(['lang', 'shareForPhoneCharge']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			transIcon() {
				return this.lang === 'zh-CN' ? 'tran-icon' : ''
			},
			sellPrice () {
				let result = this.isVip ? this.target.member_price : this.target.regular_price
				if (this.adv) {
					result -= (this.target.preferential * 0.5)
				}
				if (this.shareForPhoneCharge) {
					result -= (this.target.preferential * 0.5)
				}
				return Number(result).toFixed(2)
			}
		},
		mounted() {
		},
		methods: {
			...mapMutations(['setSharePhone']),
			async doCharge () {
				const vm = this
				const token = await uni.getStorageSync('token')
				const obj = {
					token: token,
					id: vm.target.id,
					mobile: vm.phone,
					isp: vm.savePhoneArea,
					adv: vm.adv ? 'true' : 'false',
					sharing_preferences: vm.shareForPhoneCharge ? 'true' : 'false',
					balance: vm.balance ? 'true' : 'false'
				}
				uni.showLoading({
					title: ''
				})
				vm.$post(urls.chargeMobile, obj).then(res => {
					// console.log(res)
					if (res.success) {
						if (res.data.payment_amount) {
							uni.requestPayment({ // 调用支付
							    provider: 'wxpay',
							    timeStamp: res.data.timeStamp,
							    nonceStr: res.data.nonceStr,
							    package: res.data.package,
							    signType: 'MD5',
							    paySign: res.data.paySign,
							    success: function (result) {
										vm.setSharePhone(false)
										uni.hideLoading()
										uni.requestSubscribeMessage({ // 订阅消息 
										  tmplIds: ['hHQ35yIbe7sBoFuAgEjQlDo535oifx9xSrLYHLk_Dho', 'hqIPeCBZFzikumR_dtquNS-t1skRUwyHK1Hry53SZcA',
										  'rijw9_lPb0x_-2V3hEfYhfROMLMNHKPCnD6BX_pEgcg'],
										  success (result) {
												uni.showToast({
													title: vm._i18n.messages[vm.lang].basic.paySuc,
													icon: 'success'
												})
												vm.$emit('close')
											},
											fail (err) {
												uni.showToast({
													title: vm._i18n.messages[vm.lang].basic.paySuc,
													icon: 'success'
												})
												vm.$emit('close')
											}
										})
							    },
							    fail: function (err) {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: vm._i18n.messages[vm.lang].makeOrder.payFail
										})
							    }
							});
						} else if (res.data.payment_amount === 0) {
							uni.showToast({
								title: vm._i18n.message[vm.lang].basic.chargeSuc,
								icon: 'success'
							})
							vm.$emit('close')
						} else {
							uni.showToast({
								title: vm._i18n.messages[vm.lang].basic.faild,
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				}, () => {
					uni.hideLoading()
				})
			},
			promote () { // 推广
				const vm = this
				if (vm.shareForPhoneCharge) {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].mobileCharge.alreadyPull
					})
				} else {
					uni.navigateTo({
						url: '/pages/pullPoster/pullPoster?mode=phone'
					})
				}
			},
			showAd () { // 播放广告
				this.ad.show()
			},
			closeHandler() {
				this.setSharePhone(false)
				this.ad.destroy()
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.charge-container {
		background: #FFFFFF;
		.charge-row {
			&:not(:last-child){
				border-bottom: 1px solid #CCCCCC;
			}
			.tran-icon{
				transform: rotate(180deg);
			}
		}
	}
</style>
