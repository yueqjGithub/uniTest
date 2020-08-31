<template>
	<view class="page-container bg-grey">
		<view class="head-container flex-row flex-jst-center flex-ali-center">
			<view class="phone-container">
				<u-input v-model="phone" class="text-white" :custom-style="{color: '#ffffff', fontSize: '18px'}" :placeholder="numberTip"></u-input>
				<view class="bottom-gap"></view>
			</view>
		</view>
		<!-- body -->
		<view class="content-container pa-md flex-column flex-jst-start flex-ali-center">
			<button type="default" class="search-btn text-primary" @click='queryBalance(1)'>{{$t('mobileCharge.queryBalance')}}</button>
			<!-- 面额列表 -->
			<view class="face-list flex-row flex-wrap flex-jst-start flex-ali-start full-width">
				<view class="face-item flex-row flex-jst-center flex-ali-center" v-for="k in priceList" :key="k.id" :class="k.id === currentFace.id && 'cur-face'" @click="chooseCur(k)">
					<text class="text-12 text-bold">￥</text>
					<text class="text-24 text-bold">{{k.face_value}}</text>
				</view>
			</view>
			<!-- 充值按钮 -->
			<button type="default" class="charge-btn" @click="openCharge">{{$t('mobileCharge.charge')}}</button>
		</view>
		<!-- 弹出层话费查询 -->
		<u-popup mode="center" v-model="showBalance" width="88%" border-radius="20.83" :mask-close-able="false">
			<view class="pa-md flex-column flex-jst-start flex-ali-center balance-container full-width">
				<view class="balance-show flex-row flex-jst-center flex-ali-base full-width">
					<text class="text-bold text-12 text-primary">￥</text>
					<text class="text-bold text-24 text-primary">{{account_balance}}</text>
				</view>
				<view class="full-width text-center text-12 text-grey ma-col-sm">{{$t('mobileCharge.balanceTit')}}</view>
				<view class="ma-col-sm btn-group flex-column flex-ali-center flex-jst-btw">
					<button type="default" class="my-btn-primary text-white text-14" @click="showBalance = false">{{$t('mobileCharge.charge')}}</button>
					<view class="full-width ma-col-sm"></view>
					<button type="default" class="my-btn-normal text-grey text-14" @click="showBalance = false">{{$t('basic.cancel')}}</button>
				</view>
			</view>
		</u-popup>
		<!-- 充值弹出层 -->
		<u-popup  mode="center" v-model="showCharge" width="88%" border-radius="20.83" :mask-close-able="false">
			<charge :target="currentFace" :phone="phone" v-if="showCharge" @close="showCharge = false"></charge>
		</u-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	import charge from './charge.vue'
	export default {
		name: 'mobileCharge',
		components: {
			charge
		},
		data() {
			return {
				phone: '',
				account_balance: '',
				showBalance: false, // 是否显示余额
				showCharge: false, // 是否显示充值面板
				priceAll: '',
				currentFace: '', // 当前选择的面额id
				provider: 'china_mobile' // 运营商标识
			}
		},
		computed: {
			...mapState(['lang']),
			inputClass () {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			numberTip () {
				return this._i18n.messages[this.lang].mobileCharge.numberTips
			},
			priceList () {
				let result = []
				if (this.priceAll !== '') {
					result = this.priceAll[this.provider]
				}
				return result
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].mobileCharge.pageName
					});
				}
			},
			phone (val) {
				if (this.$u.test.mobile(val)) {
					this.queryBalance(2)
				}
			}
		},
		onShow() {
			this.queryPrice()
		},
		methods: {
			...mapActions(['checkLogin']),
			chooseCur (target) {
				this.currentFace = target
			},
			async openCharge () {
				const vm = this
				if (this.currentFace === '') {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].mobileCharge.chooseTips
					})
					return false
				}
				if (this.phone === '') {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].mobileCharge.numberErrTips
					})
					return false
				}
				const result = await this.checkLogin()
				if (result) {
					this.showCharge = true
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			async queryPrice () {
				const vm = this
				const token = await uni.getStorageSync('token')
				if (token) {
					const obj = {
						token: token
					}
					vm.$post(urls.queryPriceList, obj).then(res => {
						if (res.success) {
							vm.priceAll = res.data
						}
					})
				}
			},
			async queryBalance (type) {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					if (vm.$u.test.mobile(vm.phone)) {
						const obj = {
							token: token,
							mobile: vm.phone
						}
						uni.showLoading({
							title: ''
						})
						vm.$post(urls.searchPhoneInfo, obj).then(res => {
							console.log(res)
							if (res.success) {
								vm.account_balance = res.data.account_balance
								if (type === 1) {
									vm.showBalance = true
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: res.message
								})
							}
							uni.hideLoading()
						})
					} else {
						if (type === 1) {
							uni.showToast({
								icon: 'none',
								title: vm._i18n.messages[vm.lang].mobileCharge.numberErrTips
							})
						}
					}
				} else {
					if (type === 1) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.balance-container{
	// width: 85%;
	box-sizing: border-box;
	background: #ffffff;
	.btn-group{
		width: 70%;
	}
}
.page-container{
	width: 100%;
	min-height: 100vh;
	.head-container{
		width: 100%;
		padding: 100rpx 0;
		box-sizing: border-box;
		background: linear-gradient(0deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
		.phone-container{
			width: 90%;
			.bottom-gap{
				opacity: 0.25;
				width: 100%;
				height: 1px;
				background: #FFFFFF;
			}
		}
	}
	.content-container{
		box-sizing: border-box;
		width: 90%;
		background: #FFFFFF;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
		margin: -70rpx auto 10px auto;
		.search-btn{
			width: 40%;
			font-size: 12px;
			border: 1px solid #cfcfcf;
			padding: 5.97rpx 50.41rpx;
			background: #FFFFFF;
			margin: 0 auto 7px auto;
			border-radius: 38.19rpx;
			color: $uni-color-primary;
		}
		.charge-btn{
			width: 40%;
			font-size: 12px;
			padding: 5.97rpx 50.41rpx;
			background: linear-gradient(90deg, #24af7e, #24e196);
			margin: 7px auto 7px auto;
			border-radius: 38.19rpx;
			color: #FFFFFF;
		}
		.face-list{
			.face-item{
				width: 30%;
				height: calc((90vw - 55.4rpx) * 0.27);
				margin: 0 1.6% 5px 1.6%;
				box-sizing: border-box;
				border: 1px solid #D0D0D0;
				border-radius: 13.88rpx;
				&.cur-face{
					border-color: $uni-color-primary;
				}
			}
		}
	}
}
</style>
