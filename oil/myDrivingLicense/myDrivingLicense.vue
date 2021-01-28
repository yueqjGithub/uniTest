<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-start flex-ali-center">
			<view class="full-width tit border-box text-center text-16 text-bold">{{$t('myDrivingLicense.title')}}</view>
			<view class="pa-lg border-box text-32 text-bold text-primary ma-row-md">{{12 - info.score}}</view>
			<view class="full-width flex-column pa-col-md border-box flex-jst-center flex-ali-center">
				<text class="text-grey-1 text-14 text-center" :class="rightClass">{{scoreTips}}</text>
				<text class="text-grey-1 text-14 text-center" :class="rightClass">{{scoreTips1}}</text>
				<text class="text-grey-1 text-14 text-center" :class="rightClass">{{scoreTips2}}</text>
			</view>
			<view class="pa-md border-box"></view>
			<view class="width-80 pa-row-md border-box flex-row flex-jst-center">
				<button type="default" class="my-btn-primary text-white text-14" @click="searchInfo">{{$t('myDrivingLicense.searchAgain')}}</button>
			</view>
			<view class="pa-lg ma-col-md border-box"></view>
			<view class="contact-tip flex-column flex-jst-start flex-ali-start pa-col-md uni-border full-width">
				<view class="full-width tip-tit text-14 text-bold ma-col-sm" :class="rightClass">{{$t('basic.tip')}}</view>
				<view class="full-width text-12 text-grey-1" :class="rightClass">{{$t('myDrivingLicense.tips1')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				info: {}
			};
		},
		computed: {
			...mapState(['lang']),
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'rtl'
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			scoreTips () {
				const vm = this
				const deduction = vm.info.score || 0
				return `${vm._i18n.messages[vm.lang].myDrivingLicense.result1}${deduction}${vm._i18n.messages[vm.lang].myDrivingLicense.score}`
			},
			scoreTips1 () {
				const vm = this
				const deduction = vm.info.score || 0
				const remain = 12 - deduction
				return `${vm._i18n.messages[vm.lang].myDrivingLicense.result2}${remain}${vm._i18n.messages[vm.lang].myDrivingLicense.score}`
			},
			scoreTips2 () {
				const vm = this
				return `${vm._i18n.messages[vm.lang].myDrivingLicense.result3}`
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].myDrivingLicense.pageName
					})
				}
			}
		},
		onShow () {
			const route = getCurrentPages().pop().options
			this.info = {...route}
		},
		methods: {
			...mapActions(['checkLogin']),
			async searchInfo () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						licenseid: vm.info.licenseid,
						licensenumber: vm.info.licensenumber
					}
					uni.showLoading()
					vm.$post(urls.kfSearch, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							obj.score = res.data.score
							vm.info = obj
						} else {
							vm.$refs.uTips.show({
								type: 'error',
								title: res.message
							})
						}
					}, err => {
						uni.hideLoading()
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].basic.faild
						})
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
			height: 256.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}

		.cont-item {
			min-height: 80vh;
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 17px auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 55.55rpx;
			.tit{
				border-bottom: 1px solid #efefef;
				padding-bottom: 30rpx;
			}
			.tab-item {
				.border-btm {
					height: 2px;
					background-color: $uni-color-primary;
					width: 0;
					transition: width linear .3s;
					margin-top: 10px;
				}

				&.tab-y {
					.border-btm {
						width: 100%;
					}
				}
			}
		}
	}	
</style>
