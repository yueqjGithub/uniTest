<template>
	<view class="page bg-grey">
		<view class="back"></view>
		<view class="cus-gap"></view>
		<view class="ticket-cont bg-white">
			<view class="ticket-date pa-lg flex-column flex-jst-center flex-ali-center">
				<text class="text-18 text-bold">{{date}}</text>
				<text class="text-14 text-grey-1">{{week}}</text>
			</view>
			<view class="ads pa-md border-box">
				<!-- ads第一排 -->
				<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{startTime}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
						</view>
					</view>
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-start ma-top-5" :class="langFlex">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?curOrderDetail.start_cn:curOrderDetail.start}}
					</text>
					<view class="flex-1 text-center text-grey"></view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?curOrderDetail.end_cn:curOrderDetail.end}}
					</text>
				</view>
			</view>
			<view class="flex-jst-center flex-ali-center ma-col-sm" :class="langFlex">
				<text class="text-14 text-grey-1">{{curOrderDetail.train_num}}</text>
				<text class="text-14 text-grey-1">/</text>
				<text class="text-14 text-grey-1">{{curOrderDetail.cat_number}}</text>
				<text class="text-14 text-grey-1">/</text>
				<text class="text-14 text-grey-1">{{curOrderDetail.seat_no}}</text>
			</view>
			<!-- price -->
			<view class="flex-row flex-jst-center flex-ali-base pa-md">
				<text class="text-primary text-bold text-14">￥</text>
				<text class="text-primary text-bold text-24">{{curOrderDetail.total}}</text>
			</view>
			<!-- passenger -->
			<view class="pa-col-lg ma-row-md border-box">
				<view :class="langFlex" class="flex-jst-start flex-ali-center">
					<text class="text-grey-1 text-12">{{$t('contact.titTip')}}</text>
				</view>
				<view :class="langFlex" class="flex-jst-start flex-ali-center ma-col-sm">
					<text class="text-14">{{curOrderDetail.passenger.pis_full_name}}</text>
				</view>
				<view :class="langFlex" class="flex-jst-start flex-ali-center">
					<text class="text-14">{{curOrderDetail.passenger.pis_id_card}}</text>
				</view>
			</view>
			<!-- 退票 -->
			<view class="pa-col-lg ma-row-md flex-row flex-jst-center flex-ali-center" v-if="curOrderDetail.status_type === 2">
				<view class="flex-row flex-jst-center flex-ali-center width-80">
					<button type="default" class="my-btn-primary text-white">{{$t('train.refund')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import dayjs from 'dayjs'
	export default {
		name: 'trainOrderDetail',
		data () {
			return {}
		},
		computed: {
			...mapState(['lang', 'curOrderDetail']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			date() {
				const date = this.curOrderDetail.start_date
				return dayjs(date).format('YYYY-MM-DD')
			},
			week() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				const targetWeek = dayjs(vm.curOrderDetail.start_date).day()
				return result[targetWeek]
			},
			startTime () {
				return dayjs(this.curOrderDetail.start_date).format('hh:mm')
			},
			endTime () {
				const vm = this
				const diff = vm.runTimeToMinute(vm.curOrderDetail.start_date, vm.curOrderDetail.end_date)
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.curOrderDetail.end_date.split(' ')[1]}${through}`
			}
		},
		watch: {
			lang (val) {
				if (val !== 'zh-CN') {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[this.lang].commonOrder.orderDetail
					})
				}
			}
		},
		onShow () {
			console.log(this.curOrderDetail)
		},
		methods: {
			runTimeToMinute (start, end) {
				const startHour = dayjs(start).hour()
				const diff = dayjs(end).diff(dayjs(start)) // 运行毫秒
				const spend = Math.ceil(diff / 1000 / 60 / 60)
				return parseInt((startHour + spend) / 24)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100vw;
		height: 100vh;
		position: relative;
		
		.back {
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
		
		.cus-gap {
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
			.ticket-date {
				background: #F3F3F3;
			}
			.ads{
				width: 80%;
				margin: 0 auto;
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
		}
	}
</style>
