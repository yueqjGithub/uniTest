<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-start flex-ali-center">
			<!-- swiper -->
			<swiper :current="swiperCurrent" @animationfinish="animationfinish" class="full-width cus-swiper">
				<swiper-item class="swiper-item">
					<view class="full-height full-width flex-column flex-jst-center flex-ali-center">
						<view class="address-icon flex-row flex-jst-center flex-ali-center">
							<u-icon name="qiche" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
						</view>
						<text class="text-grey-1 text-12 ma-col-sm">{{$t('wgIndex.addTips')}}</text>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" v-for="k in carList" :key='k'>
					<view>{{k}}</view>
				</swiper-item>
			</swiper>
			<view class="full-width pa-row-md border-box flex-row flex-jst-center flex-ali-center">
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
		mapState
	} from 'vuex'
	import urls from '@/service/urls.js'
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
				return this.carList.length + 1
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
		methods: {
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.tabIdx = current;
			},
			manualAdd () {
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
								console.log(JSON.parse(uploadFileRes.data));
							},
							fail: err => {
								uni.hideLoading()
								vm.$refs.uTips.show({
									title: err.errMsg,
									duration: 2000
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
				height: 25vh;
				.swiper-item{
					height: 100%;
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
