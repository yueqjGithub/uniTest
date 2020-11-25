<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-modal v-model="showDel" ref="uModal" :content='delTips' :show-cancel-button='true' :confirm-text='okText'
		 :cancel-text='cancelText' :show-title='false' @confirm='removeHandler'></u-modal>
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
					<text class="font-12">{{$t('carCenter.searchScore')}}</text>
					<view class="border-btm"></view>
				</view>
			</view>
			<!-- swiper -->
			<swiper :current="swiperCurrent" @animationfinish="animationfinish" class="full-width cus-swiper">
				<swiper-item class="swiper-item">
					<add-license @scanCode='scanCode' @openAddLicense="toAddLicense"></add-license>
				</swiper-item>
				<swiper-item class="swiper-item">
					<pre-license :licenseList='licenseList' @remove='removeLicense' @edit='editDrivlingLicense' @showTip='headerTipsShow'></pre-license>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
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
				showDel: false,
				tabIdx: 1,
				swiperCurrent: 1,
				licenseList: []
			};
		},
		computed: {
			...mapState(['lang']),
			delTips() {
				return this._i18n.messages[this.lang].basic.delConfirm
			},
			okText () {
				return this._i18n.messages[this.lang].basic.ok
			},
			cancelText () {
				return this._i18n.messages[this.lang].basic.cancel
			}
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
		onShow() {
			this.queryMyLicense()
		},
		methods: {
			...mapMutations(['setCurDrivingLicense']),
			...mapActions(['checkLogin']),
			headerTipsShow (content) {
				this.$refs.uTips.show({
					type: content.type,
					title: content.title,
					duration: 2000
				})
			},
			editDrivlingLicense () {
				const vm = this
				if (vm.licenseList.length > 0) {
					const target = vm.licenseList[0]
					vm.setCurDrivingLicense(target)
					uni.navigateTo({
						url: '/oil/addCarLicense/addCarLicense'
					})
				} else {
					vm.$refs.uTips.show({
						type: 'error',
						title: vm._i18n.messages[vm.lang].addLicense.noLicense,
						duration: 2000
					})
				}
			},
			async removeHandler () { // 删除驾驶证
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						id: vm.licenseList[0].id
					}
					uni.showLoading()
					vm.$post(urls.delDrivingLicense, obj).then(res => {
						uni.hideLoading()
						vm.showDel = false
						if (res.success) {
							vm.licenseList = []
						} else {
							vm.$refs.uTips.show({
								type: 'error',
								title: res.message,
								duration: 2000
							})
						}
					}, err => {
						uni.hideLoading()
						vm.showDel = false
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].basic.faild,
							duration: 2000
						})
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			removeLicense() { // 删除驾驶证-confirm
				const vm = this
				if (vm.licenseList.length > 0) {
					this.showDel = true
				} else {
					vm.$refs.uTips.show({
						type: 'error',
						title: vm._i18n.messages[vm.lang].addLicense.noLicense,
						duration: 2000
					})
				}
			},
			async queryMyLicense() { // 驾驶证列表
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token
					}
					uni.showLoading()
					vm.$post(urls.driverLicenseList, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							vm.licenseList = res.data.data
						}
					}, err => {
						uni.hideLoading()
						vm.$refs.uTips.show({
							type: 'error',
							title: vm._i18n.messages[vm.lang].basic.faild,
							duration: 2000
						})
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			scanCode() { // 上传驾驶证供服务器识别
				const vm = this
				vm.checkLicenseStatus().then(() => {
					uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							uni.showLoading()
							uni.uploadFile({
								url: `${urls.baseUrl}${urls.uploadIdcard}?type=2`, //仅为示例，非真实的接口地址
								filePath: tempFilePaths[0],
								name: 'file',
								// formData: {
								// 	'type': '2'
								// },
								success: (uploadFileRes) => {
									uni.hideLoading()
									console.log(JSON.parse(uploadFileRes.data));
								},
								fail: err => {
									uni.hideLoading()
									vm.$refs.uTips.show({
										type: 'error',
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
				}, () => {
					vm.$refs.uTips.show({
						type: 'error',
						title: vm._i18n.messages[vm.lang].addLicense.hadAdded,
						duration: 2000
					})
				})
			},
			checkLicenseStatus() {
				const vm = this
				return new Promise((resolve, reject) => {
					if (vm.licenseList.length > 0) {
						reject()
					} else {
						resolve()
					}
				})
			},
			toAddLicense() { // 添加驾驶证
				const vm = this
				vm.checkLicenseStatus().then(() => {
					vm.setCurDrivingLicense(null)
					uni.navigateTo({
						url: '/oil/addCarLicense/addCarLicense'
					})
				}, () => {
					vm.$refs.uTips.show({
						type: 'error',
						title: vm._i18n.messages[vm.lang].addLicense.hadAdded,
						duration: 2000
					})
				})
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

			.cus-swiper {
				height: 70vh;

				.swiper-item {
					height: 100%;
				}
			}
		}
	}
</style>
