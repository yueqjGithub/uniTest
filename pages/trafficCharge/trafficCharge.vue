<template>
	<view class="page-container bg-grey">
		<view class="head-container flex-row flex-jst-center flex-ali-center">
			<view class="phone-container">
				<view class="text-white text-14 full-width text-right area-show">{{phoneArea}}</view>
				<u-input v-model="phone" class="text-white my-text-right" :custom-style="{color: '#ffffff', fontSize: '22px'}" :placeholder="numberTip"
				 type="text"></u-input>
				<view class="bottom-gap"></view>
			</view>
		</view>
		<!-- body -->
		<view class="content-container pa-md flex-column flex-jst-start flex-ali-center">
			<!-- <button type="default" class="search-btn text-primary" @click='queryBalance'>{{$t('mobileCharge.queryBalance')}}</button> -->
			<!-- 面额列表 -->
			<view class="face-list flex-row flex-wrap flex-jst-start flex-ali-start full-width">
				<view class="face-item flex-column flex-jst-center flex-ali-center" v-for="k in priceList" :key="k.id" :class="k.id === currentFace.id && 'cur-face'"
				 @click="chooseCur(k)">
					<text class="text-24 text-bold">{{k.face_value}}</text>
					<view class="flex-row flex-jst-center flex-ali-center ma-col-sm">
						<text class="text-12 text-grey-1">￥{{k.selling_price}}</text>
					</view>
				</view>
			</view>
			<!-- 充值按钮 -->
			<button type="default" class="charge-btn" @click="openCharge">{{$t('mobileCharge.charge')}}</button>
		</view>
		<!-- 链接列表 -->
		<view class="vip-feedback pa-col-sm ma-col-md">
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="weibiaoti--46" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.vipGuide')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/buyVip/buyVip')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="weibiaoti--50" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.promoteGuide')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/coin/coin')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="bangzhu" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.helpCenter')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/help/help?type=telephone_fare')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
		</view>
		<!-- 弹出层话费查询 -->
		<u-popup mode="center" v-model="showBalance" width="88%" border-radius="20.83" :mask-close-able="false">
			<view class="pa-md flex-column flex-jst-start flex-ali-center balance-container full-width">
				<view class="balance-show flex-row flex-jst-center flex-ali-base full-width">
					<text class="text-bold text-12 text-primary">￥</text>
					<text class="text-bold text-24 text-primary">{{phone_balance}}</text>
				</view>
				<view class="full-width text-center text-12 text-grey ma-col-sm">{{$t('mobileCharge.balanceTit')}}</view>
				<view class="ma-col-sm btn-group flex-column flex-ali-center flex-jst-btw">
					<button type="default" class="my-btn-primary text-white text-14" @click="openCharge">{{$t('mobileCharge.charge')}}</button>
					<view class="full-width ma-col-sm"></view>
					<button type="default" class="my-btn-normal text-grey text-14" @click="showBalance = false">{{$t('basic.cancel')}}</button>
				</view>
			</view>
		</u-popup>
		<!-- 充值弹出层 -->
		<u-popup mode="center" v-model="showCharge" width="88%" border-radius="20.83" :mask-close-able="false">
			<charge :target="currentFace" :phone="phone" v-if="showCharge" @close="showCharge = false" :accountBalance="account_balance"></charge>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
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
				phoneArea: '', // 归属地
				account_balance: '', // 用户余额
				phone_balance: 0, // 话费余额
				showBalance: false, // 是否显示余额
				showCharge: false, // 是否显示充值面板
				priceAll: '',
				currentFace: '', // 当前选择的面额id
				provider: 'china_mobile', // 运营商标识
				typeList: [{
						type: '联通',
						value: 'china_unicom'
					},
					{
						type: '电信',
						value: 'china_telecom'
					},
					{
						type: '移动',
						value: 'china_mobile'
					},
				]
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			transIcon () {
				return this.lang === 'zh-CN' ? 'tran-icon' : ''
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			numberTip() {
				return this._i18n.messages[this.lang].mobileCharge.numberTips
			},
			priceList() {
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
						title: this._i18n.messages[val].traffic.pageName
					});
				}
			},
			phone(val) {
				if (this.$u.test.mobile(val)) {
					this.queryBelone()
				} else {
					this.phoneArea = ''
				}
			}
		},
		onShow() {
			this.queryPrice()
		},
		methods: {
			...mapActions(['checkLogin']),
			toPage (path) {
				uni.navigateTo({
					url: path
				})
			},
			chooseCur(target) {
				this.currentFace = target
			},
			async openCharge() {
				const vm = this
				vm.showBalance = false
				if (vm.currentFace === '') {
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
			async queryPrice() { // 面额列表
				const vm = this
				const token = await uni.getStorageSync('token')
				if (token) {
					const obj = {
						token: token
					}
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.queryTrafficPriceList, obj).then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.success) {
							vm.priceAll = res.data
						}
					})
				}
			},
			async queryBelone() { // 归属地和用户余额
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
								vm.provider = vm.typeList.find(item => item.type === res.data.type).value
								vm.account_balance = res.data.account_balance
								vm.phoneArea = vm.lang === 'zh-CN' ? res.data.name_cn : res.data.name
							} else {
								uni.showToast({
									icon: 'none',
									title: res.message
								})
							}
							uni.hideLoading()
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: vm._i18n.messages[vm.lang].mobileCharge.numberErrTips
						})
					}
				} else {
					if (type === 1) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.balance-container {
		// width: 85%;
		box-sizing: border-box;
		background: #ffffff;

		.btn-group {
			width: 70%;
		}
	}

	.page-container {
		width: 100%;
		min-height: 100vh;

		.head-container {
			width: 100%;
			padding: 100rpx 0;
			box-sizing: border-box;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 3vh;
			border-bottom-right-radius: 50vw 3vh;
			
			.phone-container {
				width: 90%;
				.area-show{
					height: 20px;
				}
				.bottom-gap {
					opacity: 0.25;
					width: 100%;
					height: 1px;
					background: #FFFFFF;
				}
			}
		}
		.vip-feedback{
			width: 90%;
			margin: 18px auto 20px auto;
			background: #FFFFFF;
			border-radius: 13.88rpx;
			.fb-item{
				&:not(:last-child){
					border-bottom: 1px solid #f3f3f3;
				}
				button{
					margin: 0;
					padding: 0;
				}
				.tran-icon{
					transform: rotate(180deg);
				}
			}
		}
		.content-container {
			box-sizing: border-box;
			width: 90%;
			background: #FFFFFF;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			margin: -70rpx auto 10px auto;

			.search-btn {
				width: 60%;
				font-size: 12px;
				border: 1px solid #cfcfcf;
				padding: 5.97rpx 50.41rpx;
				background: #FFFFFF;
				margin: 0 auto 7px auto;
				border-radius: 38.19rpx;
				color: $uni-color-primary;
			}

			.charge-btn {
				width: 60%;
				font-size: 12px;
				padding: 5.97rpx 50.41rpx;
				background: linear-gradient(90deg, #24af7e, #24e196);
				margin: 7px auto 7px auto;
				border-radius: 38.19rpx;
				color: #FFFFFF;
			}

			.face-list {
				.face-item {
					width: 30%;
					height: 80px;
					margin: 0 1.6% 5px 1.6%;
					box-sizing: border-box;
					border: 1px solid #D0D0D0;
					border-radius: 13.88rpx;

					&.cur-face {
						border-color: $uni-color-primary;
					}
				}
			}
		}
	}
</style>
