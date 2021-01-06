<template>
	<view class="train-page bg-grey">
		<view class="train-head">
			<!--status占位-->
			<view class="status-bar flex-column flex-jst-end flex-ali-center">
				<text class="text-14 text-white ma-col-sm">{{pageName}}</text>
			</view>
			<!-- navbar -->
		</view>
		<!-- body -->
		<view class="content border-box flex-column flex-jst-start flex-ali-center">
			<!-- 站点选择 -->
			<view class="full-width flex-jst-btw flex-ali-end pa-row-md" :class="langFlex">
				<view class='train-adrees flex-column flex-ali-center flex-jst-btw flex-1' @click="chooseStation(0)">
					<text class="text-14 text-bold ma-col-sm">{{startStationShow}}</text>
					<text class="text-12 text-grey">{{$t('train.startStation')}}</text>
				</view>
				<view class="flex-2 flex-row flex-jst-center flex-ali-end">
					<u-icon custom-prefix="iconfont" name="feiji800" class="text-primary" size="85"></u-icon>
				</view>
				<view class='train-adrees flex-column flex-ali-center flex-jst-btw flex-1' @click="chooseStation(1)">
					<text class="text-14 text-bold ma-col-sm">{{endStationsShow}}</text>
					<text class="text-12 text-grey">{{$t('train.endStation')}}</text>
				</view>
			</view>
			<!-- 时间选择 -->
			<view class="full-width time-ma flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-normal bg-white ma-col-md full-width" @click="showTimes = true">
					<text class="text-bold text-14">{{trainDate}}</text>
				</button>
			</view>
			<!-- 查询按钮 -->
			<view class="full-width search-btn flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-white ma-col-md full-width" @click="setTrapOptions">
					<text class="text-bold text-14">{{$t('basic.search')}}</text>
				</button>
			</view>
			<!-- 要点 -->
			<view class="full-width flex-row flex-jst-btw flex-ali-center pa-row-md border-box">
				<view class="flex-column flex-jst-btw flex-ali-center">
					<u-icon custom-prefix="iconfont" name="qian" color="#FF3C3C" size="75"></u-icon>
					<text class="text-12 text-bold ma-col-sm">{{$t('train.affordable')}}</text>
				</view>
				<view class="flex-column flex-jst-btw flex-ali-center">
					<u-icon custom-prefix="iconfont" name="icon_safety_fill" color="#23AF8C" size="75"></u-icon>
					<text class="text-12 text-bold ma-col-sm">{{$t('train.safe')}}</text>
				</view>
				<view class="flex-column flex-jst-btw flex-ali-center">
					<u-icon custom-prefix="iconfont" name="icon_certification_f" color="#FF8723" size="75"></u-icon>
					<text class="text-12 text-bold ma-col-sm">{{$t('train.credit')}}</text>
				</view>
			</view>
		</view>
		<!-- 链接列表 -->
		<view class="vip-feedback pa-col-sm ma-col-md">
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="weibiaoti--46" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.vipGuide')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/buyVip/buyVip')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="weibiaoti--50" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.promoteGuide')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/coin/coin')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="bangzhu" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
					<text class="ma-row-sm text-12">{{$t('mobileCharge.helpCenter')}}</text>
				</view>
				<button type="default" class="plain-btn" @click="toPage('/pages/help/help?type=fj_help')">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
				</button>
			</view>
		</view>
		<!-- 地址选择弹出 -->
		<u-popup v-model="showAddress" mode="bottom" :closeable="false" border-radius="15">
			<address-bar v-if="showAddress" :target="setStataus" @setStation="setStation" :type="1"></address-bar>
		</u-popup>
		<!-- 时间选择弹出 -->
		<u-popup v-model="showTimes" mode="bottom" :closeable="false" border-radius="15">
			<cus-calendar :name="$t('train.timeChooseTit')" :weekNames="weekList" :btnText="$t('basic.ok')" @choose="setTrainTime"></cus-calendar>
		</u-popup>
		<!-- 底部 -->
		<view class="tab-add"></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import cusCalendar from '@/cusComponents/myCalendar/calendar.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	import addressBar from '@/cusComponents/myAddressBar/addressBar.vue'
	import urls from '@/service/urls.js'
	import dayjs from 'dayjs'
	export default {
		name: 'trainIndex',
		components: {
			cusTabbar,
			addressBar,
			cusCalendar
		},
		data() {
			return {
				showTimes: false,
				showAddress: false,
				startAds: '', // 始发
				endAds: '', // 到达
				setStataus: 0, // 0-start 1-end
				trainDate: '' // 出行日期
			}
		},
		onShareAppMessage(res) {
			const result = getCurrentPages().pop()
			return {
				title: 'kolay',
				path: result.$page.fullPath
			}
		},
		mounted () {
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		computed: {
			...mapState(['lang']),
			transIcon () {
				return this.lang === 'zh-CN' ? 'tran-icon' : ''
			},
			pageName() {
				return this._i18n.messages[this.lang].air.pageName
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			startStationShow() {
				let result = this._i18n.messages[this.lang].basic.chooseTip
				if (this.startAds !== '') {
					result = this.lang === 'zh-CN' ? this.startAds.name_cn : this.startAds.name
				}
				return result
			},
			endStationsShow() {
				let result = this._i18n.messages[this.lang].basic.chooseTip
				if (this.endAds !== '') {
					result = this.lang === 'zh-CN' ? this.endAds.name_cn : this.endAds.name
				}
				return result
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
		created() {
			this.trainDate = dayjs().format('YYYY-MM-DD') // 初始化出行日期
		},
		methods: {
			...mapActions(['checkLogin']),
			toPage (path) {
				uni.navigateTo({
					url: path
				})
			},
			async setTrapOptions () { // 提交各项参数到vuex，在trapList页面使用参数进行查询
				const vm = this
				if (vm.startAds === '') {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].train.noStart
					})
					return false
				} else if (vm.endAds === '') {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].train.noEnd
					})
					return false
				} else if (vm.trainDate === '') {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].train.noTime
					})
					return false
				}
				const result = {
					start: vm.startAds,
					end: vm.endAds,
					date: vm.trainDate
				}
				const token = await vm.checkLogin()
				if (token) {
					vm.$store.commit('setCurrentTrapOptions', result)
					uni.navigateTo({
						url: '/trainTicket/trapList/trapList?searchType=1'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			setStation(result) { // 设置站点
				const status = result.status
				if (status === 0) {
					this.startAds = result.station
				} else {
					this.endAds = result.station
				}
				this.showAddress = false
			},
			chooseStation(status) {
				this.setStataus = status // 设置当前选择站点是出发还是到达
				this.showAddress = true // 打开站点选择
			},
			setTrainTime(result) { // 设置出发时间
				this.trainDate = result
				this.showTimes = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip-feedback{
		width: 90%;
		margin: 18px auto 20px auto;
		background: #FFFFFF;
		border-radius: 13.88rpx;
		.fb-item{
			&:not(:last-child){
				border-bottom: 1px solid #f3f3f3;
			}
			button{
				margin: 0;
				padding: 0;
			}
			.tran-icon{
				transform: rotate(180deg);
			}
		}
	}
	.train-page {
		width: 100%;
		min-height: calc(100vh - 56px);

		.train-head {
			height: 479.16rpx;
			background: linear-gradient(45deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 3vh;
			border-bottom-right-radius: 50vw 3vh;

			.status-bar {
				width: 100%;
				height: 175rpx;
				position: relative;
				box-sizing: border-box;
				padding-bottom: 4px;
			}
		}

		.content {
			width: 90%;
			margin: -260rpx auto 0 auto;
			padding: 48.61rpx 41.66rpx;
			background: #FFFFFF;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;

			.time-ma {
				margin-top: 20px;
				margin-bottom: 35px;
			}

			.search-btn {
				margin: 10px auto 30px auto
			}
		}
	}
</style>
