<template>
	<view class="order-item pa-md">
		<view class="order-top pa-col-md flex-jst-btw flex-ali-center" :class="langFlex">
			<image :src="order.cover_image" mode="" class="order-image"></image>
			<view class="order-cont flex-2 pa-row-md flex-column flex-jst-btw flex-ali-start">
				<text class="shop-name full-width" :class="langFlex">{{shopName}}</text>
				<text class="shop-price full-width text-grey-1" :class="langFlex">
					{{order.shop_num}} x {{order.price}}
				</text>
				<view class="order-time flex-jst-btw full-width flex-ali-base" :class="langFlex">
					<text class="total-price text-16 text-bold text-primary">￥{{order.total}}</text>
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
		name: 'orderItem',
		props: ['order'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			shopName () {
				return this.lang === 'zh-CN' ? this.order.shop_name_cn : this.order.shop_name
			},
			statusName () {
				return this.lang === 'zh-CN' ? this.order.status.name_cn : this.order.status.name
			},
			statusColor () {
				let color = '#00AFFF'
				switch (this.order.status_type) {
					case 4:
					color = '#00BE87'
					break
					case 5:
					color = '#FF4B4B'
					break
					default:
					color = '#00AFFF'
				}
				return color
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
		.order-top{
			border-bottom: 1px solid #CCCCCC;
			.order-image{
				width: 173.61rpx;
				height: 173.61rpx;
				border-radius: 13.88rpx;
				background: #aaaaaa;
			}
			.order-cont{
				height: 173.61rpx;
				.shop-name{}
			}
		}
	}
</style>
