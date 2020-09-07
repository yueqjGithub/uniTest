<template>
	<view class="page">
		<view class="train-head">
			<!--status占位-->
			<view class="status-bar flex-column flex-jst-end flex-ali-center">
				<view class="flex-row flex-ali-center full-width pa-row-md">
					<view class="flex-1" @click="goBack">
						<u-icon name="weibiaoti--11" custom-prefix="iconfont" class="text-white" size="50"></u-icon>
					</view>
					<view class="flex-jst-center flex-ali-center flex-2" :class="langFlex">
						<text class="text-14 text-white ma-row-sm">{{startName}}</text>
						<u-icon name="jiantou_qiehuanzuo" custom-prefix="iconfont" class="text-white" size="50" :class="lang==='zh-CN' ? 'trans-icon-y' : ''"></u-icon>
						<text class="text-14 text-white ma-row-sm">{{endName}}</text>
					</view>
					<view class="flex-1"></view>
				</view>
			</view>
			<!-- 日期列表 -->
			<view class="full-width flex-row flex-ali-center pa-col-md date-container">
				<view class="date-list-tit date-item pa-md-2 border-box">
					<view class="cont full-width full-height flex-column flex-jst-center flex-ali-center">
						<u-icon name="tianchongxing-36" custom-prefix="iconfont" class="text-white" size="45"></u-icon>
						<text class="text-12 text-white">{{$t('train.calendar')}}</text>
					</view>
				</view>
				<view class="scroll-container">
					<scroll-view :scroll-x="true" class="flex-row date-list date-scroll flex-nowrap" :enable-flex="true" :scroll-into-view="intoindex">
							<view v-for="(item, idx) in dateList" :key="idx" :id="`item${idx}`">
								<view class="date-item pa-md-2 border-box">
									<view class="date-module full-width full-height flex-column flex-jst-center flex-ali-center text-white" :class="idx === curDate ? 'cur-date' :''" @click="changeDate(idx)">
										<text class="text-16">{{item.month}}-{{item.date}}</text>
										<text class="text-12">{{weekList[item.week]}}</text>
									</view>
								</view>
							</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- body -->
		<!-- LOADING -->
		<u-popup v-model="showLoading" mode="center" :closeable="false" class="trans-popup" width="258.33" height="258.33">
			<view class="loading-container flex-row flex-jst-center flex-ali-center">
				<view class="loading-bar flex-row flex-jst-center flex-ali-center">
					<image src="../../static/images/Kolay-logo.png" mode="aspectFit"></image>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'trapList',
		data () {
			return {
				intoindex: '',
				showLoading: false,
				dateList: [], // 时间列
				curDate: 0, // 当前选择时间的index
				searchType: 0 // 0-火车，1-飞机
			}
		},
		computed: {
			...mapState(['lang', 'trapSetting']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			startName () {
				return this.lang === 'zh-CN' ? this.trapSetting.start.name_cn : this.trapSetting.start.name
			},
			endName () {
				return this.lang === 'zh-CN' ? this.trapSetting.end.name_cn : this.trapSetting.end.name
			},
			weekList() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				return result
			},
			queryUrl () {
				return this.searchType === 0 ? urls.queryTrainList : urls.queryAirList
			}
		},
		onShow () {
			this.makeDaysList()
		},
		methods: {
			goBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			changeDate (idx) {
				const vm = this
				vm.curDate = idx
			},
			makeDaysList () {
				const vm = this
				const start = dayjs()
				const list = [{
					year: dayjs(start).year(),
					month: dayjs(start).month() + 1,
					date: dayjs(start).date(),
					week: dayjs(start).day()
				}]
				for (let i = 1; i < 30; i++) {
					const date = dayjs(start).add(i, 'day')
					list.push({
						year: dayjs(date).year(),
						month: dayjs(date).month() + 1,
						date: dayjs(date).date(),
						week: dayjs(date).day()
					})
				}
				this.dateList = [...list]
				this.curDate = dayjs(vm.trapSetting.date).diff(start, 'day') + 1
				this.intoindex = `item${this.curDate}`
				this.searchInfo()
			},
			searchInfo () {
				const vm = this
				let obj = {}
				const date = vm.dateList[vm.curDate]
				if (vm.searchType === 0) {
					obj = {
						originating_station: vm.trapSetting.start.name_cn,
						terminus: vm.trapSetting.end.name_cn,
						date: dayjs(`${date.year}-${date.month}-${date.date}`).format('YYYY-MM-DD')
					}
				} else {
					obj = {
						originating_station: vm.trapSetting.start.code,
						terminus: vm.trapSetting.end.code,
						date: dayjs(`${date.year}-${date.month}-${date.date}`).format('YYYY-MM-DD')
					}
				}
				console.log(obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading-container{
		width: 258.33rpx;
		height: 258.33rpx;
		.loading-bar{
			width: 200.55rpx;
			height: 200.55rpx;
			border-radius: 50%;
			background: #ffffff;
			box-shadow: 0px 0px 5px 0px rgba(0, 190, 136, 0.5);
			animation: shine 1.2s infinite;
			image{
				width: 80%;
				max-height: 200rpx;
			}
		}
	}
	.page{
		width: 100%;
		min-height: 100vh;
		.trans-icon-y{
			transform: rotateY(180deg);
		}
		.train-head {
			// height: 479.16rpx;
			padding-bottom: 69.44rpx;
			background: linear-gradient(45deg, #19C882, #23AF8C);
			.status-bar {
				width: 100%;
				height: 175rpx;
				position: relative;
				box-sizing: border-box;
				padding-bottom: 4px;
			}
		}
		.date-container{
			.date-item{
				width: 20vw;
				height: 20vw;
			}
			.date-list-tit{
				.cont{
					border-radius: 5px;
					border: 1px solid #FFFFFF;
				}
			}
			.scroll-container{
				width: calc(100% - 20vw);
				box-shadow: 11px 0 10px -10px rgba(0,0,0,0.2) inset;
				height: 20vw;
				.date-scroll{
					height: 20vw;
					white-space: nowrap;
					.date-item{
						display: inline-block;
					}
					.date-module{
						background: rgba(255,255,255,0.4);
						border-radius: 5px;
						&.cur-date{
							background: #ffffff;
							color: $uni-color-primary !important;
						}
					}
				}
			}
			
		}
	}
	@keyframes shine {
		0% {box-shadow: 0px 0px 8px 0px rgba(0, 190, 136, 0.5);}
		25% {box-shadow: 0px 0px 8px 4px rgba(0, 190, 136, 0.5);}
		50% {box-shadow: 0px 0px 8px 8px rgba(0, 190, 136, 0.5);}
		100% {box-shadow: 0px 0px 8px 4px rgba(0, 190, 136, 0.5);}
	}
</style>
