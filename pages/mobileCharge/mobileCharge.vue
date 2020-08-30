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
			<button type="default" class="search-btn text-primary" @click='queryBalance'>{{$t('mobileCharge.queryBalance')}}</button>
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
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				phone: '',
				account_balance: '',
				showBalance: false
			}
		},
		computed: {
			...mapState(['lang']),
			inputClass () {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			numberTip () {
				return this._i18n.messages[this.lang].mobileCharge.numberTips
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
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async queryBalance () {
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
							if (res.success) {
								vm.account_balance = res.data.account_balance
								vm.showBalance = true
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
					uni.navigateTo({
						url: '/pages/login/login'
					})
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
			font-size: 12px;
			border: 1px solid #cfcfcf;
			padding: 5.97rpx 50.41rpx;
			background: #FFFFFF;
			margin: 0 auto 7px auto;
			border-radius: 38.19rpx;
			color: $uni-color-primary;
		}
	}
}
</style>
