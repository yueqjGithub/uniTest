<template>
	<view class="page bg-grey">
		<view class="back"></view>
		<view class="cus-gap"></view>
		<view class="cont-item pa-md basic-info">
			<view class="basic-tit border-box pa-col-md flex-jst-btw flex-ali-center" :class="langFlex">
				<text class="text-grey-1 text-12">{{$t('train.orderNum')}}</text>
				<text class="text-grey-1 text-12">{{order_number}}</text>
			</view>
			<!-- 出行详细 -->
			<view class="basic-date pa-col-md border-box flex-column flex-jst-start flex-ali-center">
				<!-- date -->
				<view :class="langFlex" class="flex-jst-btw flex-ali-center full-width">
					<text class="text-grey-1 text-14">{{startDate[0]}}</text>
					<text class="text-grey-1 text-14">{{endDate[0]}}</text>
				</view>
				<!-- week -->
				<view :class="langFlex" class="flex-jst-btw flex-ali-center full-width pa-col-sm border-box">
					<text class="text-grey-1 text-12">{{startDate[1]}}</text>
					<text class="text-grey-1 text-12">{{endDate[1]}}</text>
				</view>
				<!-- time -->
				<view :class="langFlex" class="basic-time flex-jst-btw flex-ali-end full-width ma-col-sm">
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{curTrap.trap.start_time}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{curTrap.trap.train_num}}</text>
						</view>
					</view>
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
				</view>
				<!-- ads -->
				<view :class="langFlex" class="basic-ads flex-jst-btw flex-ali-start full-width">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?curTrap.trap.start_station_name_cn:curTrap.trap.start_station_name}}
					</text>
					<view class="flex-1 text-center text-grey">{{trapTime}}</view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?curTrap.trap.end_station_name_cn:curTrap.trap.end_station_name}}
					</text>
				</view>
			</view>
		</view>
		<button type="default" @click="openBuy">测试购买</button>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import dayjs from 'dayjs'
	import urls from '@/service/urls.js'
	export default {
		name: 'trainOrderInfo',
		data () {
			return {
				order_number: ''
			}
		},
		computed: {
			...mapState(['lang', 'curSeat', 'curTrap', 'curPassenger']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			weekList () {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				return result
			},
			startDate () {
				const date = this.curTrap.date
				const days = dayjs(`${date.year}-${date.month}-${date.date}`).format('YYYY-MM-DD')
				const week = this.weekList[date.week]
				return [days, week]
			},
			endDate () {
				const date = this.curTrap.date
				const take = this.curTrap.trap.takeDays
				const days = dayjs(`${date.year}-${date.month}-${date.date}`).add(take, 'day').format('YYYY-MM-DD')
				const week = this.weekList[date.week + 1]
				return [days, week]
			},
			endTime() {
				const vm = this
				const diff = vm.curTrap.trap.takeDays
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.curTrap.trap.end_time}${through}`
			},
			trapTime() {
				const vm = this
				const arr = vm.curTrap.trap.run_time.split(':')
				const hour = vm._i18n.messages[vm.lang].basic.hour
				const min = vm._i18n.messages[vm.lang].basic.minute
				const result = vm.lang === 'zh-CN' ? `${arr[0]}${hour}${arr[1]}${min}` : `${min}${arr[1]}${hour}${arr[0]}`
				return result
			}
		},
		watch: {
			lang () {
				uni.setNavigationBarTitle({
					title: this._i18n.message[this.lang].train.orderPageName
				})
			}
		},
		onShow () {
			const vm = this
			vm.order_number = getCurrentPages()[getCurrentPages().length - 1].options.order
		},
		methods: {
			...mapActions(['checkLogin']),
			async openBuy () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						order_number: vm.order_number,
						token: token
					}
					vm.$post(urls.trainBuy, obj).then(res => {
						console.log(res)
					}, err => {
						console.log(err)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		min-height: 100vh;
		position: relative;
	
		.back {
			width: 100%;
			height: 350rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 7vh;
			border-bottom-right-radius: 50vw 7vh;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
		.cus-gap {
			width: 100%;
			height: 5px;
		}
		.cont-item{
			width: 90%;
			margin: 0 auto 10px auto;
			box-shadow: 0 6.94rpx 6.94rpx -2px rgba(152, 152, 152, 0.15);
			border-radius: 20.83rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 2;
			background: #FFFFFF;
		}
		.basic-info{
			.basic-tit{
				border-bottom: 1px solid #e3e3e3;
			}
			.basic-time{
				.throw-container {
					position: relative;
					border-bottom: 2px solid $uni-color-primary;
								
					.cus-icon {
						width: 2px;
						height: 8px;
						background: $uni-color-primary;
						position: absolute;
						bottom: -2px;
								
						&.throw-right {
							right: 2px;
							transform: rotate(-45deg);
						}
								
						&.throw-left {
							left: 2px;
							transform: rotate(45deg);
						}
					}
				}
			}
		}
	}
</style>
