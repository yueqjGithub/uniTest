<template>
	<view class="page bg-grey">
		<view class="back"></view>
		<view class="cus-gap"></view>
		<!-- ticket -->
		<view class="ticket-cont">
			<view class="ticket-date pa-lg flex-column flex-jst-center flex-ali-center">
				<text class="text-18 text-bold">{{date}}</text>
				<text class="text-14 text-grey-1">{{week}}</text>
			</view>
			<view class="ticket-ads pa-lg border-box flex-column flex-jst-center">
				<!-- ads第一排 -->
				<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{curTrap.trap.start_time}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{curTrap.trap.train_num}}</text>
						</view>
					</view>
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-center ma-top-5" :class="langFlex">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?curTrap.trap.start_station_name_cn:curTrap.trap.start_station_name}}
					</text>
					<view class="flex-1 text-center text-grey">{{trapTime}}</view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?curTrap.trap.end_station_name_cn:curTrap.trap.end_station_name}}
					</text>
				</view>
			</view>
			<!-- 价格显示 -->
			<view class="ticket-price pa-row-lg ma-col-md border-box flex-column flex-jst-center flex-ali-center">
				<text class="text-24 text-primary text-bold">￥{{curSeat.price}}</text>
				<text class="text-grey-1 text-14 pa-col-sm">{{lang === 'zh-CN' ? curSeat.seatName.name_cn : curSeat.seatName.name}}</text>
			</view>
			<!-- 乘车人 -->
			<view class="ticket-person pa-lg border-box">
				<my-contact v-if="showPassenger"></my-contact>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState 
	} from 'vuex'
	import myContact from '../../cusComponents/contact/contact.vue'
	export default {
		name: 'trainBuy',
		components: {
			myContact
		},
		data() {
			return {
				showPassenger: false
			}
		},
		computed: {
			...mapState(['lang', 'curSeat', 'curTrap']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			date() {
				const date = this.curTrap.date
				return `${date.year}-${date.month}-${date.date}`
			},
			week() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				return result[vm.curTrap.date.week]
			},
			endTime () {
				const vm = this
				const diff = vm.runTimeToMinute(vm.curTrap.trap.start_time, vm.curTrap.trap.run_time)
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.curTrap.trap.end_time}${through}`
			},
			trapTime () {
				const vm = this
				// const str = `HH${vm._i18n[vm.lang].messages.basic.hour}mm${vm._i18n[vm.lang].messages.basic.minute}`
				// return dayjs(vm.train.run_time).format(str)
				const arr = vm.curTrap.trap.run_time.split(':')
				const hour = vm._i18n.messages[vm.lang].basic.hour
				const min = vm._i18n.messages[vm.lang].basic.minute
				const result = vm.lang === 'zh-CN' ? `${arr[0]}${hour}${arr[1]}${min}` : `${min}${arr[1]}${hour}${arr[0]}`
				return result
			}
		},
		onShow() {
			this.setPageName()
			this.showPassenger = true
		},
		onHide () {
			this.showPassenger = false
		},
		methods: {
			runTimeToMinute (start, run) {
				const arr1 = start.split(':')
				const arr2 = run.split(':')
				return parseInt((Number(arr1[0]) + Number(arr2[0])) / 24)
			},
			setPageName() {
				const vm = this
				if (vm.lang !== 'zh-CN') {
					uni.setNavigationBarTitle({
						title: vm._i18n.messages[vm.lang].train.ticketPageName
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
		.back{
			width: 100%;
			height: 300rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 7vh;
			border-bottom-right-radius: 50vw 7vh;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
		.cus-gap{
			width: 100%;
			height: 5px;
		}
		.ticket-cont{
			position: relative;
			z-index: 2;
			width: 90%;
			margin: 20px auto 10px auto;
			box-shadow: 0 6.94rpx 6.94rpx -2px rgba(152, 152, 152, 0.15);
			border-radius: 20.83rpx;
			overflow: hidden;
			background-image: url(../../static/images/ticket-bg.png);
			background-size: 100% 100%;
			.ticket-date{
				background: #F3F3F3;
			}
			.ticket-ads{
				.trap-num{
					.throw-container{
						position: relative;
						border-bottom: 2px solid $uni-color-primary;
						.cus-icon{
							width: 2px;
							height: 8px;
							background: $uni-color-primary;
							position: absolute;
							bottom: -2px;
							&.throw-right{
								right: 2px;
								transform: rotate(-45deg);
							}
							&.throw-left{
								left: 2px;
								transform: rotate(45deg);
							}
						}
					}
				}
			}
			.ticket-price{
			}
			.ticket-person{
				border-top: 1px dashed #D0D0D0;
			}
		}
	}
</style>
