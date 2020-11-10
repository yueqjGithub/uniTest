<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-start flex-ali-center">
			<!-- 自定义tab -->
			<view class="full-width flex-row flex-jst-ard flex-jst-center">
				<view class="flex-column flex-jst-center flex-ali-center tab-item border-box" :class="tabIdx === 0 ? 'tab-y' : ''"
				 @click="changeTab(0)">
					<u-icon name="plus-circle-fill" size="65" color="#f39c12"></u-icon>
					<text class="font-12">{{$t('carCenter.addLicense')}}</text>
					<view class="border-btm"></view>
				</view>
				<view class="flex-column flex-jst-center flex-ali-center tab-item border-box" :class="tabIdx === 1 ? 'tab-y' : ''"
				 @click="changeTab(1)">
					<u-icon name="chaxunzimuhecailiao" custom-prefix="iconfont" size="65" color="#0fc28e"></u-icon>
					<text class="font-12">{{$t('carCenter.addLicense')}}</text>
					<view class="border-btm"></view>
				</view>
			</view>
			<!-- swiper -->
			<swiper :current="swiperCurrent" @animationfinish="animationfinish" class="full-width cus-swiper">
				<swiper-item class="swiper-item">
					<add-license @scanCode='scanCode'></add-license>
				</swiper-item>
				<swiper-item class="swiper-item">
					<pre-license></pre-license>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import addLicense from './addLicensePage.vue'
	import preLicense from './preLicensePage.vue' 
	import urls from '@/service/urls.js'
	export default {
		name: 'carScoreIndex', // 驾照分查询首页
		components: {
			addLicense,
			preLicense
		},
		data() {
			return {
				tabIdx: 0,
				swiperCurrent: 0
			};
		},
		computed: {
			...mapState(['lang'])
		},
		watch: {
			lang: {
				immedaite: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[this.lang].carCenter.myLicense
					})
				}
			}
		},
		methods: {
			scanCode() { // 上传驾驶证供服务器识别
				const vm = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading()
						uni.uploadFile({
							url: `${urls.baseUrl}${urls.uploadIdcard}?type=2`, //仅为示例，非真实的接口地址
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
					}
				});
			},
			changeTab(idx) {
				this.tabIdx = idx
				this.swiperCurrent = idx
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.tabIdx = current;
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
			.cus-swiper{
				height: 70vh;
				.swiper-item{
					height: 100%;
				}
			}
		}
	}
</style>
