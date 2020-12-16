<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-start flex-ali-center">
			<!-- swiper -->
			<swiper :current="swiperCurrent" @animationfinish="animationfinish" class="full-width cus-swiper">
				<swiper-item class="swiper-item" v-if="carList.length < 1">
					<view class="full-height full-width flex-column flex-jst-center flex-ali-center">
						<view class="address-icon flex-row flex-jst-center flex-ali-center">
							<u-icon name="qiche" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
						</view>
						<text class="text-grey-1 text-12 ma-col-sm text-center">{{$t('wgIndex.addTips')}}</text>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" v-for="(k, idx) in carList" :key='k'>
					<view class="flex-jst-btw flex-ali-center border-box pa-md" :class="langFlex">
						<view class="flex-jst-start flex-ali-center" :class="langFlex">
							<view class="address-icon flex-row flex-jst-center flex-ali-center">
								<u-icon name="qiche" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
							</view>
							<text class="text-18 text-bold text-primary ma-row-sm">{{k.prefix}}{{k.license}}</text>
						</view>
						<!-- 右侧 -->
						<view class="flex-jst-start flex-ali-center flex-row">
							<view class="action flex-row flex-jst-center flex-ali-center">
								<u-icon name="weibiaoti--32" custom-prefix="iconfont" color="#d5d5d5" size="30" @click='removeCarLicense(k)'></u-icon>
							</view>
							<view class="action flex-row flex-jst-center flex-ali-center">
								<u-icon name="weibiaoti--67" custom-prefix="iconfont" color="#d5d5d5" size="30" @click='editCarLicense(k)'></u-icon>
							</view>
						</view>
					</view>
					<view :class="langFlex" class="flex-jst-start flex-ali-base pa-row-md">
						<span>{{$t('wgIndex.wgTimes')}}</span>
						<span class='text-cus-error text-18 text-bold ma-row-sm'>{{k.wgTimes || '*'}}</span>
						<view class="action flex-row flex-jst-center flex-ali-center">
							<u-icon name="weibiaoti--4" custom-prefix="iconfont" color="#d5d5d5" size="30" @click='queryWgTimes(idx)'></u-icon>
						</view>
 					</view>
				</swiper-item>
			</swiper>
			<view class="flex-row flex-jst-btw flex-ali-center full-width pa-row-md border-box border-top">
				<view class="flex-column flex-jst-start flex-ali-center pa-col-md border-box flex-1">
					<u-icon name='icon_safety_fill' custom-prefix='iconfont' size='65' color='#f39c10'></u-icon>
					<text class="text-12 text-center full-width line2">{{$t('wgIndex.buyBx')}}</text>
				</view>
				<view class="flex-column flex-jst-start flex-ali-center pa-col-md border-box flex-1">
					<u-icon name='honglvdengweizhang' custom-prefix='iconfont' size='65' color='#3598db'></u-icon>
					<text class="text-12 text-center full-width line2">{{$t('wgIndex.wgRecord')}}</text>
				</view>
				<view class="flex-column flex-jst-start flex-ali-center pa-col-md border-box flex-1"  @click="toPage('/oil/wzPay/wzPay')">
					<u-icon name='qian' custom-prefix='iconfont' size='65' color='#ff4b4b'></u-icon>
					<text class="text-12 text-center full-width line2">{{$t('wgIndex.payForWg')}}</text>
				</view>
			</view>
			<view class="full-width pa-row-md border-box flex-row flex-jst-center flex-ali-center ma-col-sm">
				<view class="tab-control" v-for="k in tabLength" :key='k' :class="tabIdx === k ? 'tab-choose' : ''"></view>
			</view>
		</view>
		<!-- 拍照添加 -->
		<view class="cont-item pa-md flex-jst-btw flex-ali-center" :class="langFlex" @click="scanCode">
			<u-icon name="camera-fill" size="70" color='#3598db'></u-icon>
			<text class="flex-1 text-12 ma-sm" :class="rightClass">{{$t('wgIndex.scanTips')}}</text>
			<u-icon name='weibiaoti--11' size='40' :class="lang === 'zh-CN' ? 'tran-icon' : ''" custom-prefix='iconfont' color='#b1b1b1'></u-icon>
		</view>
		<!-- 手动添加 -->
		<view class="cont-item pa-md flex-jst-btw flex-ali-center" :class="langFlex" @click='manualAdd'>
			<u-icon name="plus-circle-fill" size="70" color='#f39c10'></u-icon>
			<text class="flex-1 text-12 ma-sm" :class="rightClass">{{$t('wgIndex.manual')}}</text>
			<u-icon name='weibiaoti--11' size='40' :class="lang === 'zh-CN' ? 'tran-icon' : ''" custom-prefix='iconfont' color='#b1b1b1'></u-icon>
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
	import dayjs from 'dayjs'
	export default {
		name: 'wgIndex',
		data() {
			return {
				carList: [1, 2, 3, 4],
				swiperCurrent: 0,
				tabIdx: 0
			};
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			rightClass () {
				return this.lang === 'zh-CN' ? 'text-left' : 'text-right'
			},
			tabLength () {
				return this.carList.length === 0 ? 1 : this.carList.length
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].wgIndex.pageName
					})
				}
			}
		},
		onShow () {
			this.queryList()
		},
		methods: {
			...mapActions(['checkLogin']),
			...mapMutations(['setCurCarLicense']),
			toPage (path) {
				uni.navigateTo({
					url: path
				})
			},
			async queryWgTimes (idx) {
				const vm = this
				const token = await vm.checkLogin()
				const obj = {
					id: vm.carList[idx].id,
					token: token
				}
				uni.showLoading()
				vm.$post(urls.wgTimesSearch, obj).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.data.result.illegalnum) {
						// vm.carList[idx].wgTimes = res.data.result.illegalnum
						vm.$set(vm.carList[idx], 'wgTimes', res.data.result.illegalnum)
					} else {
						vm.$refs.uTips.show({
							title: res.msg,
							duration: 2300,
							type: 'error'
						})
					}
				}, err => {
					uni.hideLoading()
					vm.$refs.uTips.show({
						title: vm._i18n.messages[vm.lang].basic.faild,
						duration: 2300,
						type: 'error'
					})
				})
			},
			editCarLicense (target) {
				const vm = this
				vm.setCurCarLicense(target)
				uni.navigateTo({
					url: '/oil/addCar/addCar'
				})
			},
			async removeCarLicense (target) {
				const vm = this
				const token = await vm.checkLogin()
				const obj = {
					token: token,
					id: target.id
				}
				uni.showLoading()
				vm.$post(urls.delCarLicense, obj).then(res => {
					uni.hideLoading()
					if (res.success) {
						vm.queryList()
					} else {
						vm.$refs.uTips.show({
							title: res.message,
							type: 'error',
							duration: 2000
						})
					}
				}, err => {
					vm.$refs.uTips.show({
						title: err.message,
						type: 'error',
						duration: 2000
					})
				})
			},
			async queryList () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token
					}
					vm.$post(urls.xszList, obj).then(res => {
						console.log(res)
						vm.carList = [...res.data.data]
					}, err => {
						vm.$refs.uTips.show({
							type: 'error',
							title: err.message,
							duration: 2300
						})
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.tabIdx = current;
			},
			manualAdd () {
				this.setCurCarLicense(null)
				uni.navigateTo({
					url: '/oil/addCar/addCar'
				})
			},
			scanCode () { // 上传驾驶证供服务器识别
				const vm = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading()
						uni.uploadFile({
							url: `${urls.baseUrl}${urls.uploadIdcard}?type=3`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								uni.hideLoading()
								const result = JSON.parse(uploadFileRes.data)
								if (result.data.xsz) {
									const target = {
										prefix: result.data.xsz.qz,
										license: result.data.xsz.cqhm,
										engine_number: result.data.xsz.VEHICLE_ENGINE_ID,
										vin: result.data.xsz.VEHICLE_IDENTIFICATION_CODE,
										reg_time: dayjs(result.data.xsz.VEHICLE_LICENSE_FIRST_DATE).format('YYYY-MM-DD'),
										mobile: '',
										type: '小车'
									}
									vm.setCurCarLicense(target)
									uni.navigateTo({
										url: '/oil/addCar/addCar'
									})
								} else {
									vm.$refs.uTips.show({
										title: result.message,
										duration: 2000,
										type: 'error'
									})
								}
							},
							fail: err => {
								uni.hideLoading()
								console.log(err)
								vm.$refs.uTips.show({
									title: err.errMsg,
									duration: 2000,
									type: 'error'
								})
							}
						});
					},
					fail(err) {
						console.log(err)
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.page {
		width: 100%;
		height: 100vh;
		padding-top: 17px;
		.line2{
			height: 26px;
		}
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
		.border-top{
			border-top: 1px solid #f6f6f6;
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
			
			.address-icon {
				border: 1px solid rgba(207, 207, 207, 0.6);
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}
			.tran-icon{
				transform: rotate(180deg);
			}
			.cus-swiper{
				height: 22vh;
				.swiper-item{
					height: 100%;
					.action {
						margin-left: 5px;
						margin-right: 5px;
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 1px solid #d5d5d5;
					}
				}
			}
			.tab-control{
				width: 15rpx;
				height: 15rpx;
				border-radius: 10rpx;
				margin: 0 3px;
				transition: all linear .3s;
				background: #AAAAAA;
				&.tab-choose{
					background: #19C882;
					width: 40rpx;
				}
			}
		}
	}
</style>
