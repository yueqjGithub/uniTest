<template>
	<view class="order-item pa-md">
		<view class="order-top pa-col-md flex-jst-btw flex-ali-center" :class="langFlex">
			<u-icon name="shuidian" custom-prefix="iconfont" class="order-image flex-row flex-jst-center flex-ali-center"></u-icon>
			<view class="order-cont flex-2 pa-row-md flex-column flex-jst-btw flex-ali-start">
				<text class="shop-name full-width text-12 text-bold" :class="langFlex">{{$t('commonOrder.eleCharge')}}</text>
				<text class="shop-price full-width text-grey-1" :class="langFlex">
					{{order.address}}
				</text>
				<text class="text-14 text-grey-1">{{order.mobile}}</text>
				<view class="order-time flex-jst-btw full-width flex-ali-base" :class="langFlex">
					<text class="total-price text-16 text-bold text-primary">￥{{order.payment_amount}}</text>
					<text class="time-show text-grey-1 text-12">{{order.createtime}}</text>
				</view>
			</view>
		</view>
		<!-- 下 -->
		<view class="flex-jst-btw flex-ali-center" :class="langFlex">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<text class="text-12 text-grey-1">{{$t('myOrder.orderNumber')}}</text>
				<text class="text-12 text-grey-1 ma-row-sm">{{order.order_number}}</text>
			</view>
			<text class="text-12" :style="{color: statusColor}">{{statusName}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'eleItem',
		props: ['order'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			ispName () {
				return this.lang === 'zh-CN' ? this.order.isp : this.order.isp
			},
			statusName () {
				return this.lang === 'zh-CN' ? this.order.status.name_cn : this.order.status.name
			},
			statusColor () {
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
			}
		},
		mounted() {
			console.log(this.order)
		},
		methods:{
			toDetail () {
				this.$store.commit('setCurOrderNum', this.order.order_number)
				uni.navigateTo({
					url: '/pages/logistics/logistics'
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
		height: 312.5rpx;
		margin-bottom: 8px;
		.order-top{
			border-bottom: 1px solid #CCCCCC;
			.order-image{
				width: 173.61rpx;
				height: 173.61rpx;
				border-radius: 13.88rpx;
				background: linear-gradient(-55deg, #2db996, #2deba0);
				color: #FFFFFF;
				font-size: 150rpx;
			}
			.order-cont{
				height: 173.61rpx;
				.shop-name{}
			}
		}
	}
</style>
