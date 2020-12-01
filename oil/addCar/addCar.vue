<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="qiche" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<view class="pa-md"></view>
			<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
				<view class="province-choose flex-row flex-jst-center flex-ali-center text-14 text-primary" @click="showModal = true">{{provinceChoose}}</view>
				<view class="ma-row-sm"></view>
				<view class="input-item pa-col-sm border-box flex-1">
					<u-input v-model="carNum" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
					 class="input-item" :placeholder="$t('addCar.carNumTips')" type="text"></u-input>
				</view>
			</view>
			<!-- 车架号 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="vin" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
				 :placeholder="$t('addCar.vinTips')" type="text"></u-input>
			</view>
			<!-- 发动机号 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="engine_number" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
				 :placeholder="$t('addCar.engineTips')" type="text"></u-input>
			</view>
			<!-- 注册时间 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="reg_time" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" disabled
				 @click="showTimes=true" placeholder-style="color: #aaaaaa" :placeholder="$t('addCar.timeTips')" type="text"></u-input>
			</view>
			<!-- 电话号码 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="mobile" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('mobileCharge.numberTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
			<view class="full-width pa-col-sm border-box">
				<u-radio-group v-model="type" @change="radioGroupChange">
					<u-radio v-for="(item, index) in carType" :key="item.label" :name="item.label" active-color="#23AF8C">
						{{lang === 'zh-CN' ? item.label : item.label_en}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="full-width pa-md border-box flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-14 text-white" @click="saveCar">{{$t('basic.ok')}}</button>
			</view>
		</view>
		<!-- 省选择弹出 -->
		<u-popup v-model="showModal" mode="bottom" :closeable="false" border-radius="15">
			<provinceModal :dataList='provinceList' :choose='provinceChoose' @choosePro='choosePro'></provinceModal>
		</u-popup>
		<!-- 时间选择弹出 -->
		<u-popup v-model="showTimes" mode="bottom" :closeable="false" border-radius="15">
			<cus-calendar :name="$t('train.timeChooseTit')" :weekNames="weekList" :btnText="$t('basic.ok')" @choose="setTrainTime"
			 :startDate="startDate" :endDate="endDate" :couldChooseYear="true"></cus-calendar>
		</u-popup>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import provinceModal from './provinceList.vue'
	import cusCalendar from '@/cusComponents/myCalendar/calendar.vue'
	import dayjs from 'dayjs'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'addCar',
		components: {
			provinceModal,
			cusCalendar
		},
		data() {
			return {
				startDate: dayjs('1990/01/01').format('YYYY/MM/DD'),
				endDate: dayjs().format('YYYY/MM/DD'),
				showTimes: false,
				showModal: false,
				provinceList: ['新', '京', '沪', '津', '渝', '鲁', '冀', '晋', '蒙', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '豫', '湘', '鄂',
					'粤', '桂', '琼', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '港', '澳', '台'
				],
				carType: [{
					label: '小车',
					label_en: 'كىچىك تىپتىكى ئاپتوموبىل'
				}, {
					label: '大车',
					lebel_en: 'چوڭ تىپتىكى ئاپتوموبىل'
				}],
				provinceChoose: '',
				carNum: '', // 车牌号
				vin: '', // 车架号
				engine_number: '', // 发动机号
				reg_time: '', // 注册时间
				type: '小车',
				mobile: ''
			}
		},
		computed: {
			...mapState(['lang', 'curCarLicense']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			weekList() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				return result
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].addCar.pageName
					})
				}
			}
		},
		onShow() {
			const vm = this
			if (this.provinceChoose === '') {
				this.provinceChoose = this.provinceList[0]
			}
			if (vm.curCarLicense) {
				vm.provinceChoose = vm.curCarLicense.license.substr(0, 1)
				vm.carNum = vm.curCarLicense.license.substr(1)
				vm.vin = vm.curCarLicense.vin
				vm.engine_number = vm.curCarLicense.engine_number
				vm.reg_time = vm.curCarLicense.reg_time
				vm.mobile = vm.curCarLicense.mobile
				vm.type = vm.curCarLicense.type
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async saveCar () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					if (!vm.carNum) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addCar.carNumTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					if (!vm.vin) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addCar.vinTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					if (!vm.engine_number) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addCar.engineTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					if (!vm.reg_time) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].addCar.timeTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					if (!vm.mobile) {
						vm.$refs.uTips.show({
							title: this._i18n.messages[this.lang].mobileCharge.numberTips,
							type: 'error',
							duration: '2300'
						})
						return false
					}
					const obj = {
						token: token,
						license: `${vm.provinceChoose}${vm.carNum}`,
						vin: vm.vin,
						engine_number: vm.engine_number,
						reg_time: vm.reg_time,
						type: vm.type,
						mobile: vm.mobile
					}
					// console.log(obj)
					if (vm.curCarLicense.id) {
						obj.id = vm.curCarLicense.id
					}
					vm.$post(urls.addCarForm, obj).then(res => {
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
			},
			setTrainTime(result) { // 设置出发时间
				this.reg_time = result
				this.showTimes = false
			},
			choosePro(k) {
				this.provinceChoose = k
				this.showModal = false
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
