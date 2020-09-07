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
				<scroll-view scroll-x class="flex-1 date-list date-scroll">
					<view class="flex-row flex-nowrap flex-jst-start flex-ali-center" :style="{width: `300vw`}">
						<view class="date-item pa-md-2 border-box" v-for="(item, idx) in dateList" :key="idx">
							<view class="date-module full-width full-height">{{idx}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- body -->
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import { mapState } from 'vuex'
	export default {
		name: 'trapList',
		data () {
			return {
				dateList: []
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
			makeDaysList () {
				const vm = this
				const start = vm.trapSetting.date
				const list = [{
					year: dayjs(start).year(),
					month: dayjs(start).month() + 1,
					date: dayjs(start).date(),
					week: dayjs(start).day()
				}]
				for (let i = 1; i < 15; i++) {
					const date = dayjs(start).add(i, 'day')
					list.push({
						year: dayjs(date).year(),
						month: dayjs(date).month() + 1,
						date: dayjs(date).date(),
						week: dayjs(date).day()
					})
				}
				this.dateList = [...list]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		min-height: 100vh;
		.trans-icon-y{
			transform: rotateY(180deg);
		}
		.train-head {
			// height: 479.16rpx;
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
			.date-scroll{
				box-shadow: 11px 0 10px -10px rgba(0,0,0,0.2) inset;
				width: calc(100% - 20vw);
				height: 20vw;
				.date-module{
					background: rgba(255,255,255,0.7);
					border-radius: 5px;
				}
			}
		}
	}
</style>
