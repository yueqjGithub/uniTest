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
					<u-input v-model="name" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
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
				<u-input v-model="vin" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
				 :placeholder="$t('addCar.engineTips')" type="text"></u-input>
			</view>
			<!-- 注册时间 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="reg_time" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" disabled @click="showTimes=true"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('addCar.timeTips')" type="text"></u-input>
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
				provinceChoose: '',
				carNum: '', // 车牌号
				vin: '', // 车架号
				engine_number: '', // 发动机号
				reg_time: '', // 注册时间
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
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
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].addCar.pageName
						})
					}
				}
			}
		},
		onShow() {
			if (this.provinceChoose === '') {
				this.provinceChoose = this.provinceList[0]
			}
		},
		methods: {
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
