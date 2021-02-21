<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="shuidian" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<!-- 余额显示 -->
			<view class="balance full-width border-box flex-column flex-jst-center flex-ali-center">
				<view>
					<text class="text-14 text-primary text-bold">￥</text>
					<text class="text-32 text-primary text-bold">{{curElectric.account_balance}}</text>
				</view>
				<text class="text-grey-1 text-12 text-bold">{{$t('electricIndex.balance')}}</text>
			</view>
			<!-- 详情显示 -->
			<view class="full-width detail-cont flex-column flex-jst-start flex-ali-center">
				<view class="detail-item full-width flex-jst-start flex-ali-start" :class="langFlex">
					<text class="flex-1 text-14 text-grey-1" :class="rightClass">{{$t('electricIndex.uName')}}</text>
					<text class="flex-2 text-14 ma-row-sm" :class="rightClass">{{curElectric.user_name}}</text>
				</view>
				<view class="detail-item full-width flex-jst-start flex-ali-start" :class="langFlex">
					<text class="flex-1 text-14 text-grey-1" :class="rightClass">{{$t('electricIndex.uNumber')}}</text>
					<text class="flex-2 text-14 ma-row-sm" :class="rightClass">{{curElectric.number}}</text>
				</view>
				<view class="detail-item full-width flex-jst-start flex-ali-start" :class="langFlex">
					<text class="flex-1 text-14 text-grey-1" :class="rightClass">{{$t('electricIndex.corporation')}}</text>
					<text class="flex-2 text-14 ma-row-sm" :class="rightClass">{{curElectric.corporation}}</text>
				</view>
				<view class="detail-item full-width flex-jst-start flex-ali-start" :class="langFlex">
					<text class="flex-1 text-14 text-grey-1" :class="rightClass">{{$t('electricIndex.ads')}}</text>
					<text class="flex-2 text-14 ma-row-sm" :class="rightClass">{{curElectric.address}}</text>
				</view>
			</view>
			<!-- 面额列表 -->
			<view class="price-list full-width flex-jst-start flex-ali-start flex-row">
				<view class="price-item flex-row flex-jst-center flex-ali-center ma-sm" v-for="k in priceList"
				 :key="k.id" :class="choose === k.id ? 'price-choose' : ''" @click="choosePrice(k)">{{k.face_value}}</view>
			</view>
			<!-- 输入面额 -->
			<view class="full-width pa-col-sm">
				<u-input v-model="cusPrice" type="number" :class="rightClass" :border="true" class="my-input" :placeholder="$t('electricIndex.inputTips')" :clearable="false"
				:custom-style="{fontWeight: 'bold', fontSize: '14px'}"
				placeholder-style="font-family: 'cusFont','yahei';font-weight:bold;"
				></u-input>
			</view>
			<!-- 提交按钮 -->
			<view class="pa-row-lg ma-col-md border-box full-width flex-row flex-jst-center flex-ali-center">
				<button type="normal" class="text-white my-btn-primary text-14" @click="doCharge">{{$t('basic.ok')}}</button>
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
		name: 'electicDetail',
		data() {
			return {
				priceList: [],
				choose: '',
				cusPrice: '' // 自定义面额
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].electricIndex.pageName
						})
					}
				}
			},
			cusPrice (val) {
				if (val !== '') {
					this.choose = ''
				}
			},
			choose (val) {
				if (val !== '') {
					this.cusPrice = ''
				}
			}
		},
		computed: {
			...mapState(['lang', 'curElectric']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			}
		},
		onShow() {
			this.queryPrice()
		},
		methods: {
			...mapActions(['checkLogin']),
			choosePrice (target) {
				console.log(target)
				this.curPrice = Number(target.face_value)
				this.choose = target.id
			},
			async queryPrice() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token
					}
					uni.showLoading()
					vm.$post(urls.queryElePrice, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							vm.priceList = [...res.data]
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
			},
			async doCharge () {
				const vm = this
				// 验证金额合法性
				if (vm.choose === '' && vm.cusPrice === '') {
					vm.$refs.uTips.show({
						type: 'error',
						title: vm._i18n.messages[vm.lang].electricIndex.tip1
					})
					return false
				}
				if (vm.cusPrice !== '') {
					const reg = /^[0-9.]{1,10}$/
					if (!reg.test(vm.cusPrice)) {
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].electricIndex.tip1
						})
						return false
					}
					if (vm.cusPrice < 10) {
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].electricIndex.priceLimit
						})
						return false
					}
				}
				// 提交订单
				const token = await vm.checkLogin()
				const obj = {
					token: token,
					card_number: vm.curElectric.number,
					recharge_amount: vm.cusPrice ? vm.cusPrice : vm.priceList.find(item => item.id === vm.choose).face_value,
					account_balance: vm.curElectric.account_balance,
					address: vm.curElectric.corporation,
					order_total: vm.cusPrice ? vm.cusPrice : vm.priceList.find(item => item.id === vm.choose).selling_price,
					type: vm.cusPrice ? 1 : 0
				}
				uni.showLoading()
				vm.$post(urls.subEleOrder, obj).then(res => {
					// console.log(res)
					if (res.success) {
						uni.hideLoading()
						if (res.data.result_code === 'SUCCESS') {
							vm.toPay(res.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.err_code_des
							})
						}
					} else {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})
			},
			subcrib () {
				uni.requestSubscribeMessage({ // 订阅消息
				  tmplIds: ['hHQ35yIbe7sBoFuAgEjQlDo535oifx9xSrLYHLk_Dho', 'hqIPeCBZFzikumR_dtquNS-t1skRUwyHK1Hry53SZcA',
				  'rijw9_lPb0x_-2V3hEfYhfROMLMNHKPCnD6BX_pEgcg'],
				  success (result) {
					},
					fail (err) {
						console.log(err)
					}
				})
			},
			toPay (info) {
				const vm = this
				uni.requestPayment({ // 调用支付
					provider: 'wxpay',
					timeStamp: info.timeStamp,
					nonceStr: info.nonceStr,
					package: info.package,
					signType: 'MD5',
					paySign: info.paySign,
					success: function (result) {
						vm.buySuc = true
						uni.hideLoading()
						uni.showToast({
							icon: 'success',
							title: ''
						})
						vm.subcrib()
					},
					fail: function (err) {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: vm._i18n.messages[vm.lang].makeOrder.payFail
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;

		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 356.8rpx;
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
			margin: 17px auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 83.33rpx 55.55rpx;

			.address-icon {
				border: 1px solid rgba(207, 207, 207, 1);
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}

			.balance {
				border-bottom: 1px solid #d5d5d5;
				padding: 5px 28px 5px 28px;
			}
			
			.detail-cont{
				padding: 27.7rpx 0 0 0;
			}

			.detail-item {
				margin-bottom: 8px;
			}

			.price-list {
				padding: 0 0 27.7rpx 0;
				.price-item {
					width: 50px;
					height: 50px;
					font-size: 16px;
					border-radius: 5px;
					border: 1px solid #d5d5d5;
					color: #d5d5d5;

					&.price-choose {
						border: 1px solid $uni-color-primary;
						color: $uni-color-primary;
					}
				}
			}
		}
	}
</style>
