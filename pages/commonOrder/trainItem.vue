<template>
	<view class="order-item pa-md" @click="toDetail">
		<view class="order-top pa-btm-md flex-jst-btw flex-ali-center" :class="langFlex">
			<u-icon name="huochepiao" custom-prefix="iconfont" class="order-image flex-row flex-jst-center flex-ali-center"></u-icon>
			<view class="order-cont flex-2 pa-row-md flex-column flex-jst-btw flex-ali-start">
				<text class="shop-name full-width text-12 text-bold" :class="langFlex">{{stations}}</text>
				<text class="shop-price full-width text-grey-1" :class="langFlex">
					{{order.start_date}}
				</text>
				<text class="text-12 text-grey-1">{{seatInfo}}</text>
				<view class="order-time flex-jst-btw full-width flex-ali-base" :class="langFlex">
					<text class="total-price text-16 text-bold text-primary">￥{{order.total}}</text>
					<text class="time-show text-grey-1 text-12">{{order.createtime}}</text>
				</view>
			</view>
		</view>
		<!-- 下 -->
		<view class="flex-jst-btw flex-ali-center order-bottom" :class="langFlex">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<text class="text-12 text-grey-1" :class="rtlClass">{{$t('myOrder.orderNumber')}}</text>
				<text class="text-12 text-grey-1 ma-row-sm">{{order.order_number}}</text>
			</view>
			<text class="text-12" :style="{color: statusColor}">{{statusName}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'trainItem',
		props: ['order'],
		data() {
			return {}
		},
		computed: {
			...mapState(['lang']),
			rtlClass () {
				return this.lang === 'zh-CN' ? '' : 'rtl'
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			statusName() {
				return this.lang === 'zh-CN' ? this.order.status.name_cn : this.order.status.name
			},
			statusColor() {
				let color = '#00AFFF'
				switch (this.order.status_type) {
					case 3:
						color = '#00BE87'
						break
					case 4:
						color = '#FF4B4B'
						break
					default:
						color = '#00AFFF'
				}
				return color
			},
			stations () {
				const left = this.lang === 'zh-CN' ? this.order.start_cn : this.order.end
				const right = this.lang === 'zh-CN' ? this.order.end_cn : this.order.start
				return `${left}-${right}`
			},
			seatInfo () {
				const seatType = this.lang === 'zh-CN' ? this.order.seat_name.name_cn : this.order.seat_name.name
				const cat = this.order.cat_number
				const seat = this.order.seat_no
				return this.lang === 'zh-CN' ? `${seatType}/${cat}${seat}` : `${seat}/${cat}${seatType}`
			}
		},
		methods: {
			toDetail () {
				this.$store.commit('setCurOrderDetail', this.order)
				uni.navigateTo({
					url: '/trainTicket/trainOrderDetail/trainOrderDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item{
		background-color: #FFFFFF;
		box-shadow:0px 10px 30px 0px rgba(152,152,152,0.15);
		border-radius:13.88rpx;
		// height: 312.5rpx;
		margin-bottom: 8px;
		.order-top{
			border-bottom: 1px solid #CCCCCC;
			.order-image{
				width: 173.61rpx;
				height: 173.61rpx;
				border-radius: 13.88rpx;
				background: linear-gradient(-55deg, #6f6fff, #b8b9ff);
				color: #FFFFFF;
				font-size: 100rpx;
			}
			.order-cont{
				height: 173.61rpx;
				.shop-name{}
			}
		}
	}
</style>
