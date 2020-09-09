<template>
	<view class="train-item full-width border-box">
		<!-- top -->
		<view class="full-width flex-jst-btw flex-ali-start" :class="langFlex">
			<view class="ads flex-column flex-jst-start flex-ali-end flex-3">
				<!-- ads第一排 -->
				<view class="full-width flex-row flex-jst-btw flex-ali-end">
					<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{train.start_time}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box">
						<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
						<text>{{train.train_num}}</text>
					</view>
					<text class="text-18 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{train.end_time}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-row flex-jst-btw flex-ali-center ma-top-5">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?train.start_station_name_cn:train.start_station_name}}
					</text>
					<view class="flex-1">{{trapTime}}</view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
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
		<view class="ma-col-md my-gap"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import dayjs from 'dayjs'
	export default {
		name: 'trainItem',
		props: ['train'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-reverse'
			},
			trapTime () {
				const vm = this
				const str = `HH${vm._i18n[vm.lang].messages.basic.hour}mm${vm._i18n[vm.lang].messages.basic.minute}`
				return dayjs(vm.train.run_time).format(str)
			}
		},
		methods: {}
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
</style>
