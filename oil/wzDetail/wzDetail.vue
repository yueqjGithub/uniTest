<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center" @click="scanCode">
				<u-icon name="honglvdengweizhang" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<!-- price -->
			<view class="flex-column flex-jst-center flex-ali-center border-box">
				<view class="flex-row flex-jst-center flex-ali-base ma-col-sm">
					<text class="text-primary text-14 text-bold">￥</text>
					<text class="text-primary text-32 text-bold">{{fkTotal}}</text>
				</view>
				<text class="text-grey-1 text-14">{{$t('carCenter.fkAmount')}}</text>
			</view>
			<!-- split -->
			<view class="full-width my-split"></view>
			<view class="pa-md full-width"></view>
			<!-- detail -->
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.fdbh')}}</text>
				<text class="text-blk text-14">{{curWz.jdsbh}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.wzPerson')}}</text>
				<text class="text-blk text-14">{{curWz.dsr}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.carNumber')}}</text>
				<text class="text-blk text-14">{{curWz.hphm}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.wzTime')}}</text>
				<text class="text-blk text-14">{{curWz.wfsj}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.wfdz')}}</text>
				<text class="text-blk text-14 flex-1">{{curWz.wfdz}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.fkje')}}</text>
				<text class="text-blk text-14">{{curWz.fkje}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.znj')}}</text>
				<text class="text-blk text-14">{{curWz.znj}}</text>
			</view>
			<view class="pa-col-sm border-box full-width flex-jst-start flex-ali-start" :class="langFlex">
				<text class="d-labels text-grey-1 text-14" :class="rightClass">{{$t('carCenter.servicePrice')}}</text>
				<text class="text-blk text-14">{{curWz.fee}}</text>
			</view>
			<view class="pa-md full-width"></view>
			<view class="full-width text-grey-1 text-14" :class="rightClass">{{$t('carCenter.wzDetailTips')}}</view>
			<view class="full-width my-split"></view>
			<view class="full-width text-grey-1 text-14" :class="rightClass">{{$t('carCenter.payTips')}}</view>
			<view class="width-80 pa-md border-box flex-row flex-jst-center flex-ali-center">
				<text class="text-16 text-primary" v-if="ended">{{$t('wgIndex.paieded')}}</text>
				<button v-else type="default" class="my-btn-primary text-14 text-white" :loading="loading" :disabled="loading" @click="subOrder">{{$t('basic.ok')}}</button>
			</view>
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
				loading: false,
				ended: false
			};
		},
		computed: {
			...mapState(['lang', 'curWz']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			},
			fkTotal () {
				const result = Number(this.curWz.fkje) + Number(this.curWz.znj)
				return Math.floor(result)
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].carCenter.illegalPay
					})
				}
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async queryDetail () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						finenum: vm.curWz.jdsbh
					}
					vm.loading = true
					vm.$post(urls.searchWzInfo, obj).then(res => {
						vm.loading = false
						if (res.success) {
							vm.setCurWz(res.data)
						} else {
							vm.$refs.uTips.show({
								title: res.message,
								type: 'error',
								duration: 2000
							})
						}
					}, err => {
						vm.loading = false
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			async subOrder () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						license: vm.curWz.hphm,
						peccancy_number: vm.curWz.jdsbh,
						peccancy_time: vm.curWz.wfsj,
						peccancy_info: vm.curWz.wfdz,
						fkje: vm.curWz.fkje,
						znj: vm.curWz.znj,
						type: vm.curWz.hpzlStr,
						name: vm.curWz.dsr
					}
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.commitWzOrder, obj).then(res => {
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
										title: vm._i18n.messages[vm.lang].basic.success,
										type: 'success',
										duration: 2300
									})
									vm.queryDetail()
									vm.ended = true
						    },
						    fail: function (err) {
									uni.hideLoading()
									vm.$refs.uTips.show({
										title: vm._i18n.messages[vm.lang].makeOrder.payFail,
										type: 'error',
										duration: 2300
									})
						    }
						});
					}, () => {
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
.page {
		width: 100%;
		min-height: 100vh;
		padding-top: 17px;
		padding-bottom: 17px;

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

		.cont-item {
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 17px auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 55.55rpx;

			.address-icon {
				border: 1px solid rgba(207, 207, 207, 1);
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}

			.oil-logo {
				width: 15vw;
				height: 15vw;
			}
			
			.my-split{
				height: 1px;
				background: #CFCFCF;
				margin: 20rpx auto;
			}
			
			.d-labels{
				width: 30%;
			}
		}
	}
</style>
