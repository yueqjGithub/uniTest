<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center" @click="scanCode">
				<u-icon name="saomiao" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<view class="width-80 text-center ma-col-md pa-row-md text-grey-1 text-12">
				{{$t('carCenter.scanTips')}}
			</view>
		</view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="full-width pa-col-md flex-row flex-jst-center flex-ali-center">
				<u-input v-model="wz_number" size="small" type="text" :class="rightClass" :border="true" class="my-input-fill" :placeholder="tips" :clearable="false"></u-input>
			</view>
			<view class="width-80 pa-md border-box flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-14 text-white" @click="searchInfo" :loading="loading" :disabled="loading">{{$t('basic.submit')}}</button>
			</view>
		</view>
		<!-- 说明 -->
		<view class="contact-tip flex-column flex-jst-start flex-ali-start pa-col-md uni-border">
			<view class="full-width tip-tit text-14 text-bold" :class="rightClass">{{$t('basic.tip')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('carCenter.Wztip1')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('carCenter.Wztip2')}}</view>
		</view>
	</view>
</template>
 
<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'wzPay',
		data() {
			return {
				wz_number: '',
				loading: false
			};
		},
		computed: {
			...mapState(['lang']),
			tips () {
				return this._i18n.messages[this.lang].carCenter.wzTips
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
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
			...mapMutations(['setCurWz']),
			...mapActions(['checkLogin']),
			scanCode () {
				const vm = this
				uni.scanCode({
					success (res) {
						vm.wz_number = res.result
					},
					fail (err) {
						vm.$refs.uTips.show({
							title: vm._i18n.messages[vm.lang].basic.faild,
							type: 'error',
							duration: 2000
						})
					}
				})
			},
			async searchInfo () {
				const vm = this
				if (!vm.wz_number) {
					vm.$refs.uTips.show({
						title: vm._i18n.messages[vm.lang].carCenter.wzTips,
						type: 'error',
						duration: 2000
					})
					return false
				}
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						finenum: vm.wz_number
					}
					vm.loading = true
					vm.$post(urls.searchWzInfo, obj).then(res => {
						vm.loading = false
						if (res.success) {
							vm.setCurWz(res.data)
							uni.navigateTo({
								url: '/oil/wzDetail/wzDetail'
							})
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
		}
		.contact-tip{
			width: 90%;
			margin: 0 auto;
		}
	}
</style>
