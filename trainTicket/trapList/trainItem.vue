<template>
	<view class="train-item full-width border-box" @click="toChooseSeat">
		<!-- top -->
		<view class="full-width flex-jst-btw flex-ali-start" :class="langFlex">
			<view class="ads flex-column flex-jst-start flex-ali-end flex-3">
				<!-- ads第一排 -->
				<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
					<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{train.start_time}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{train.train_num}}</text>
						</view>
					</view>
					<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-start ma-top-5" :class="langFlex">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?train.start_station_name_cn:train.start_station_name}}
					</text>
					<view class="flex-1 text-center text-grey flex-row flex-jst-center">
						<text :class="lang==='zh-CN' ? '' : 'rtl'" class="width-80 text-wrap">{{trapTime}}</text>
					</view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?train.end_station_name_cn:train.end_station_name}}
					</text>
				</view>
			</view>
			<view class="price flex-1 flex-column">
				<text class="full-width text-primary text-bold text-18" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
					<text class="text-14">￥</text>
					{{train.seats[0].price || 0}}
				</text>
			</view>
		</view>
		<!-- gap -->
		<view class="ma-col-md my-gap"></view>
		<!-- bottom -->
		<view class="seat-container full-width">
			<scroll-view scroll-x="true" class="seat-list">
				<view class="seat-item pa-sm ma-row-sm text-12 flex-column flex-jst-center flex-ali-center" v-for="(item, idx) in train.seats" :key="idx">
					<view v-if="item.inventory > 0 && item.inventory <= 50" class="text-primary text-center text-bold">{{item.inventory}}</view>
					<view v-if="item.inventory > 50" class="text-center text-primary text-bold">{{$t('train.many')}}</view>
					<view v-if="item.inventory === 0" class="text-center">{{$t('train.no')}}</view>
					<view class="text-grey text-center">{{lang==="zh-CN"?item.seatName.name_cn:item.seatName.name}}</view>
				</view>
			</scroll-view>
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
			endTime () {
				const vm = this
				const diff = vm.train.takeDays
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.train.end_time}${through}`
			}
		},
		methods: {
			...mapMutations(['setCurTrap']),
			toChooseSeat () {
				const vm = this
				const obj = {
					date: vm.date,
					trap: vm.train
				}
				this.setCurTrap(obj)
				uni.navigateTo({
					url: '/trainTicket/seats/seats'
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
			background: #dddddd;
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
