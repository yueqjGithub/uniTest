<template>
	<view class="train-item full-width border-box" @click="toChooseSeat">
		<!-- top -->
		<view class="full-width flex-jst-btw flex-ali-start" :class="langFlex">
			<view class="ads flex-column flex-jst-start flex-ali-end flex-3">
				<!-- ads第一排 -->
				<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
					<text class="text-18 text-bold flex-1 text-center">{{startTime}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box  flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{train.run_time}}</text>
						</view>
					</view>
					<text class="text-18 text-bold flex-1 text-center">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-start ma-top-5" :class="langFlex">
					<text class="text-12 flex-1 text-center">
						{{lang==="zh-CN"?train.start_station_name_cn:train.start_station_name}}
					</text>
					<view class="flex-1 text-center text-grey"></view>
					<text class="text-12 flex-1 text-center">
						{{lang==="zh-CN"?train.end_station_name_cn:train.end_station_name}}
					</text>
				</view>
			</view>
			<view class="price flex-1 flex-column">
				<text class="full-width text-primary text-bold text-18" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
					<text class="text-14">￥</text>
					{{train.seats[0].price}}
				</text>
			</view>
		</view>
		<!-- gap -->
		<!-- <view class="ma-col-md my-gap"></view> -->
		<!-- bottom -->
		<view class="seat-container full-width text-grey text-12 ma-top-5 flex-jst-start flex-ali-base" :class="langFlex">
			<text>{{train.train_num}}</text>
			<text>/</text>
			<text>{{train.plane_cn_name}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import dayjs from 'dayjs'
	export default {
		name: 'trainItem',
		props: {
			train: {
				type: Object,
				default: () => {
					return {}
				}
			},
			date: {
				default: () => {
					return {}
				}
			}
		},
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			trapTime () {
				const vm = this
				// const str = `HH${vm._i18n[vm.lang].messages.basic.hour}mm${vm._i18n[vm.lang].messages.basic.minute}`
				// return dayjs(vm.train.run_time).format(str)
				const arr = vm.train.run_time.split(':')
				const hour = vm._i18n.messages[vm.lang].basic.hour
				const min = vm._i18n.messages[vm.lang].basic.minute
				const result = vm.lang === 'zh-CN' ? `${arr[0]}${hour}${arr[1]}${min}` : `${min}${arr[1]}${hour}${arr[0]}`
				return result
			},
			startTime () {
				return this.train.start_time.split(' ')[1]
			},
			endTime () {
				const vm = this
				const diff = vm.runTimeToMinute(vm.train.start_time, vm.train.run_time)
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.train.end_time.split(' ')[1]}${through}`
			}
		},
		methods: {
			...mapMutations(['setCurTrap']),
			runTimeToMinute (start, run) {
				const arr1 = dayjs(start).hour()
				const arr2 = run.split(':')
				return parseInt((Number(arr1) + Number(arr2[0])) / 24)
			},
			toChooseSeat () {
				const vm = this
				const obj = {
					date: vm.date,
					trap: vm.train
				}
				this.setCurTrap(obj)
				uni.navigateTo({
					url: '/trainTicket/airSeats/airSeats'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.train-item{
		background: #FFFFFF;
		padding: 27.77rpx;
		box-shadow: 1px 6.94rpx 20.83rpx 0px rgba(152, 152, 152, 0.15);
		border-radius: 13.88rpx;
		.my-gap{
			width: 100%;
			height: 1px;
			background: #CCCCCC;
		}
		.ads{
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
		.seat-container{
			.seat-list{
				white-space: nowrap;
				.seat-item{
					display: inline-block;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
