<template>
	<view class="order-container bg-grey">
		<view class="order-header-container pa-row-md">
			<!-- 头部信息 -->
			<view class="head-info pa-md flex-jst-start flex-ali-center" :class="langFlex">
				<image :src="goods.cover_image" mode="" class="head-image"></image>
				<view class='head-content flex-1 flex-column flex-ali-start flex-jst-btw pa-row-md'>
					<text class="head-name full-width" :class="langFlex">{{headName}}</text>
					<view class="flex-row full-width flex-ali-center" :class="langFlex">
						<text class='single-price'>{{Number(goods.activity_price) === 0 ? goods.commodity_price : goods.activity_price}}</text>
						<view class="flex-jst-start flex-ali-center" :class="langFlex">
							<button type="primary" size="mini" :plain="true" class="control-btn" :disabled="count === goods.inventory" @click="changeCount(1)">+</button>
							<text class="count-show">{{count}}</text>
							<button type="primary" class="control-btn"  size="mini" :plain="true" :disabled="count === 1" @click="changeCount(0)">-</button>
						</view>
					</view>
					<view class="goods-price full-width flex-jst-start text-primary" :class="langFlex">￥{{price}}</view>
				</view>
			</view>
			<!-- 头部信息 -->
			<!-- body -->
			<view class="body-info ma-col-md flex-column flex-jst-start flex-ali-center bg-white">
				<view class="address-icon flex-row flex-jst-center flex-ali-center">
					<u-icon name="map-fill" size="90" class="text-primary"></u-icon>
				</view>
				<text class="form-tips full-width text-center">{{$t('makeOrder.addressTips')}}</text>
				<address-bar class="full-width" :address="addressList[0]"></address-bar>
				<!-- 余额 -->
				<view class="balance flex-row flex-jst-btw flex-ali-center full-width ma-col-md">
					<view class="balance-left flex-ali-center" :class="langFlex">
						<text class="text-grey-1 ma-row-sm">{{$t('makeOrder.myBalance')}}</text>
						<text class="text-grey-1">￥{{balance}}</text>
					</view>
					<view class="balance-right">
						<text class="ma-row-sm">{{$t('makeOrder.chooseBalance')}}</text>
						<switch :checked="useBalance" color="#00BE88" @change="setBalance"></switch>
					</view>
				</view>
				<!-- 总金额显示 -->
				<view class="full-width flex-jst-start flex-ali-center" :class="langFlex">
					<text class="text-grey-1">{{$t('makeOrder.price')}}</text>
					<text class="price-all text-primary ma-row-sm">￥{{price}}</text>
				</view>
				<!-- 按钮 -->
				<view class="full-width flex-row flex-jst-center flex-ali-center pa-lg">
					<button type="default" class="my-btn-primary text-white" @click="createComplate">{{$t('makeOrder.compltate')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import addressBar from './addressBar.vue'
	import urls from '@/service/urls.js'
	export default {
		components: {
			addressBar
		},
		data() {
			return {
				goods: '',
				count: 1,
				addressList: [],
				balance: '',
				useBalance: false
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse text-right'
			},
			headName () {
				return this.lang === 'zh-CN' ? this.goods.shop_name_cn : this.goods.shop_name
			},
			price () {
				const num = Number(this.goods.activity_price) === 0 ? Number(this.goods.commodity_price) : Number(this.goods.activity_price)
				const result = Math.round(this.count * num * 1000) / 1000
				return result
			}
		},
		onShow () {
			const vm = this
			vm.goods = JSON.parse(getCurrentPages()[getCurrentPages().length - 1].options.goods)
			uni.setNavigationBarTitle({
				title: vm.lang === 'zh-CN' ? vm.goods.shop_name_cn : vm.goods.shop_name
			})
			this.queryInfo()
		},
		methods: {
			setBalance (val) {
				this.useBalance = val.detail.value
			},
			changeCount (type) {
				const vm = this
				if (type === 1) {
					vm.count++
				} else {
					vm.count--
				}
			},
			async queryInfo () {
				const vm = this
				const token = await uni.getStorageSync('token')
				const obj = {
					token: token
				}
				vm.$post(urls.getAddressList, obj).then(res => {
					if (res.success) {
						if (res.data.address) {
							const addressObj = {
								address: res.data.address,
								address_number: res.data.address_number,
								addressee: res.data.addressee,
								mobile: res.data.mobile
							}
							vm.addressList = [addressObj]
						}
						vm.balance = res.data.account_balance
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})
			},
			async createComplate () {
				const vm = this
				if (!vm.addressList[0]) {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].makeOrder.addressTips
					})
					return false
				}
				const token = await uni.getStorageSync('token')
				const obj = {
					shop_number: vm.goods.shop_number,
					address_number: vm.addressList[0].address_number,
					balance: vm.useBalance,
					shop_num: vm.count,
					token: token
				}
				vm.loading = true
				vm.$post(urls.createOrder, obj).then(res => {
					if (res.success) {
						if (res.data.err_code_des === '') {
							uni.requestPayment({ // 调用支付
							    provider: 'wxpay',
							    timeStamp: res.data.timeStamp,
							    nonceStr: res.data.nonceStr,
							    package: res.data.package,
							    signType: 'MD5',
							    paySign: res.data.paySign,
							    success: function (result) {
										uni.requestSubscribeMessage({ // 订阅消息
										  tmplIds: ['En-7bas-r4mg27-294HfVlowAEAiEKevtMDjN6iqBlQ', 'coOc-anFykZ0v5TEHHObHATvTc0g9kyylsSQUWuT55Y', 'OD2vTAHKUUUSeLsLqFukzNiDNLMcnFpHbDrMMoEQAC4'],
										  success (result) {
												uni.redirectTo({
													url: '/pages/myOrder/myOrder'
												})
											},
											fail (err) {
												uni.redirectTo({
													url: '/pages/myOrder/myOrder'
												})
											}
										})
							    },
							    fail: function (err) {
										uni.showToast({
											icon: 'none',
											title: vm._i18n.messages[vm.lang].makeOrder.payFail
										})
							    }
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: vm._i18n.messages[vm.lang].makeOrder.payFail
							})
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-container{
	min-height: 100vh;
	.order-header-container{
		box-sizing: border-box;
		width: 100%;
		height: 286.8rpx;
		border-bottom-left-radius: 50vw 5vh;
		border-bottom-right-radius: 50vw 5vh;
		padding-top: 20rpx;
		margin-bottom: 30rpx;
		background: linear-gradient(0deg, #19C882, #23AF8C);
		.head-info{
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 1px 10px 30px 0px rgba(152,152,152,0.15);
			border-radius: 13.88rpx;
			.head-image{
				width: 243.61rpx;
				height: 243.61rpx;
				border-radius: 13.88rpx;
				background: $u-type-info;
			}
			.head-content{
				min-height: 243.61rpx;
				.goods-price{
					font-weight: bold;
					font-size: 16px;
				}
				.single-price{
					color: $u-type-info-dark;
				}
				.control-btn{
					width: 20px;
					height: 20px;
					line-height: 18px;
					text-align: center;
					padding: 0;
					margin: 0 3px;
					border-radius: 50%;
				}
			}
		}
	}
	.body-info{
		box-shadow:0px 10px 35px 0px rgba(170,170,170,0.1);
		border-radius: 20.83rpx;
		padding: 55.55rpx 27.77rpx;
		.price-all{
			font-size: 18px;
			font-weight: bold;
		}
		.address-icon{
			border:1px solid rgba(207, 207, 207, 1);
			border-radius: 13.88rpx;
			width: 138.88rpx;
			height: 138.88rpx;
		}
		.form-tips{
			font-size: 14px;
			color: #aaaaaa;
			margin: 16px auto;
		}
	}
}
</style>
