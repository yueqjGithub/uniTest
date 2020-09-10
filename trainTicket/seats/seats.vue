<template>
	<view class="page bg-grey">
		<view class="head-bar">
			<view class="head-info border-box pa-md flex-column flex-jst-start flex-ali-center">
				<view class="head-top full-width pa-md border-box full-width flex-column flex-jst-start flex-ali-center">
					<text class="text-18 text-bold text-primary">{{date}}</text>
					<text class="text-14 text-grey">{{week}}</text>
				</view>
				<view class="full-width head-detail flex-column flex-jst-start flex-ali-end">
					<!-- ads第一排 -->
					<view class="full-width flex-row flex-jst-btw flex-ali-end">
						<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{curTrap.trap.start_time}}</text>
						<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{curTrap.trap.train_num}}</text>
						</view>
						<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{curTrap.trap.end_time}}</text>
						<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
					</view>
					<!-- ads第二排 -->
					<view class="full-width flex-row flex-jst-btw flex-ali-center ma-top-5">
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
		</view>
		<!-- 座位列表 -->
		<view class="seats-bar border-box pa-md">
			<view class="seats-tit text-center pa-md border-box">
				<text class="text-14">{{$t('train.chooseSeat')}}</text>
			</view>
			<!-- 列表 -->
			<view v-for="(item, idx) in curTrap.trap.seats" :key="idx" class="seat-item pa-col-md flex-jst-btw flex-ali-center"
			 :class="langFlex">
				<text class="flex-1 text-14" :class="lang==='zh-CN'?'text-left':'text-right'">{{lang==='zh-CN'?item.seatName.name_cn:item.seatName.name}}</text>
				<text class="flex-1 text-14 text-center" :class="item.inventory === 0 ? 'text-cus-error':'text-grey'">{{item.inventory === 0 ? $t('train.no'):$t('train.many')}}</text>
				<text class="flex-1 text-16 text-bold text-primary text-center">￥{{item.price}}</text>
				<view class="flex-1 flex-row" :class="lang!=='zh-CN'?'flex-jst-start':'flex-jst-end'">
					<button type="default" class="btn-cus btn-could text-white text-12" v-if="item.inventory !== 0">{{$t('train.choose')}}</button>
					<button type="default" class="btn-cus btn-not text-grey text-12" v-else :disabled="true">{{$t('train.choose')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'seats',
		data() {
			return {}
		},
		computed: {
			...mapState(['lang', 'curTrap']),
			langFlex() {
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
			trapTime() {
				const vm = this
				// const str = `HH${vm._i18n[vm.lang].messages.basic.hour}mm${vm._i18n[vm.lang].messages.basic.minute}`
				// return dayjs(vm.train.run_time).format(str)
				const arr = vm.curTrap.trap.run_time.split(':')
				const hour = vm._i18n.messages[vm.lang].basic.hour
				const min = vm._i18n.messages[vm.lang].basic.minute
				const result = vm.lang === 'zh-CN' ? `${arr[0]}${hour}${arr[1]}${min}` : `${min}${arr[1]}${hour}${arr[0]}`
				return result
			},
		},
		onShow() {
			console.log(this.curTrap)
			this.setPageName()
		},
		methods: {
			setPageName() {
				const vm = this
				if (vm.lang !== 'zh-CN') {
					uni.setNavigationBarTitle({
						title: vm._i18n.messages[vm.lang].train.trapInfo
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

		.seats-bar {
			width: 90%;
			margin: 100rpx auto 0 auto;
			border-radius: 20.83rpx;
			background: #FFFFFF;
			box-shadow: 1px 10px 35px 0px rgba(170, 170, 170, 0.1);

			.seat-item {
				border-top: 1px solid #e5e5e5;

				.btn-cus {
					width: 83%;
					margin: 0;
					border-radius: 41.66rpx;

					&.btn-could {
						background: linear-gradient(90deg, #24af7e, #24e196);
					}
					&.btn-not {
						background: #efefef;
					}
				}

			}
		}

		.head-bar {
			width: 100%;
			height: 280rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 6vh;
			border-bottom-right-radius: 50vw 6vh;

			.head-info {
				width: 90%;
				margin: 0 auto;
				border-radius: 20.83rpx;
				background: #FFFFFF;
				box-shadow: 1px 10px 35px 0px rgba(170, 170, 170, 0.1);

				.head-detail {
					border-top: 1px solid #e5e5e5;
					padding-top: 28rpx;

					.trap-num {
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
	}
</style>
