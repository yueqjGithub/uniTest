<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="qiche" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<!-- 驾驶证号 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="licenseNumber" :custom-style="{fontWeight: 'bold', fontSize: '14px'}"
				:placeholder-style="placeholderStyle"
				 :placeholder="$t('addLicense.licenseNumberTips')" type="text"></u-input>
			</view>
			<!-- 档案编号 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="fileNumber" :custom-style="{fontWeight: 'bold', fontSize: '14px'}"
				:placeholder-style="placeholderStyle"
				 :placeholder="$t('addLicense.fileNumberTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
			<view class="full-width pa-col-sm border-box">
				<u-radio-group v-model="type">
					<u-radio v-for="(item, index) in carType" :key="item.label" :name="item.label" active-color="#23AF8C">
						{{lang === 'zh-CN' ? item.label : item.label_en}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="full-width pa-md border-box flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-14 text-white" @click="saveCar">{{$t('basic.ok')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import dayjs from 'dayjs'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'addCar',
		components: {
		},
		data() {
			return {
				startDate: dayjs('1990/01/01').format('YYYY/MM/DD'),
				endDate: dayjs().format('YYYY/MM/DD'),
				showTimes: false,
				showModal: false,
				carType: [{
					label: '小车',
					label_en: 'كىچىك ماشىنا '
				}, {
					label: '大车',
					label_en: 'چوڭ ماشىنا'
				}],
				licenseNumber: '', // 车架号
				fileNumber: '', // 档案编号
				reg_time: '', // 注册时间
				type: '小车',
				mobile: ''
			}
		},
		computed: {
			...mapState(['lang', 'curDrivingLicense']),
			placeholderStyle () {
				return `font-family:'cusFont','yahei';text-align:${this.lang==='zh-CN'?'' : 'right'}`
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].addLicense.pageName
						})
					}
				}
			}
		},
		onShow() {
			const vm = this
			if (vm.curDrivingLicense) {
				vm.licenseNumber = vm.curDrivingLicense.idcard
				vm.fileNumber = vm.curDrivingLicense.drivers_license_number
				vm.type = vm.curDrivingLicense.type
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async saveCar () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					if (!vm.licenseNumber) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addLicense.licenseNumberTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					if (!vm.fileNumber) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addLicense.fileNumberTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					const obj = {
						token: token,
						idcard: vm.licenseNumber,
						drivers_license_number: vm.fileNumber,
						type: vm.type
					}
					if (vm.curDrivingLicense) {
						obj.id = vm.curDrivingLicense.id
					}
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.setDriveLicense, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							vm.$refs.uTips.show({
								title: this._i18n.messages[this.lang].basic.success,
								type: 'success',
								duration: '2300'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						} else {
							vm.$refs.uTips.show({
								title: res.message,
								type: 'error',
								duration: '2300'
							})
						}
					}, err => {
						uni.hideLoading()
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].basic.faild,
							type: 'error',
							duration: '2300'
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

			.province-choose {
				border: 1px solid #23AF8C;
				border-radius: 13.88rpx;
				width: 88.88rpx;
				height: 88.88rpx;
				color: '#23AF8C'
			}

			.input-item {
				border-bottom: 1px solid #D3D3D3;
			}
		}
	}
</style>
