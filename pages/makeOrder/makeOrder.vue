<template>
	<view class="order-container bg-grey">
		<view class="order-header-container pa-row-md">
			<!-- 头部信息 -->
			<view class="head-info pa-md flex-jst-start flex-ali-center" :class="langFlex">
				<image :src="goods.cover_image" mode="" class="head-image"></image>
				<view class='head-content flex-1 flex-column flex-ali-start flex-jst-btw pa-row-md'>
					<text class="head-name full-width" :class="langFlex">{{headName}}</text>
					<view class="flex-row full-width flex-ali-center" :class="langFlex">
						<text class='single-price'>{{goods.activity_price}}</text>
						<view class="flex-jst-start flex-ali-center" :class="langFlex">
							<button type="primary" size="mini" :plain="true" class="control-btn" :disabled="count === goods.inventory" @click="changeCount(1)">+</button>
							<text class="count-show">{{count}}</text>
							<button type="primary" class="control-btn"  size="mini" :plain="true" :disabled="count === 1" @click="changeCount(0)">-</button>
						</view>
					</view>
					<view class="goods-price full-width flex-jst-start text-primary" :class="langFlex">￥{{price}}</view>
				</view>
			</view>
			<!-- 头部信息 -->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex' 
	export default {
		data() {
			return {
				goods: '',
				count: 1
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse text-right'
			},
			headName () {
				return this.lang === 'zh-CN' ? this.goods.shop_name_cn : this.goods.shop_name
			},
			price () {
				return this.count * this.goods.activity_price
			}
		},
		mounted () {
			const vm = this
			vm.goods = JSON.parse(getCurrentPages()[getCurrentPages().length - 1].options.goods)
			uni.setNavigationBarTitle({
				title: vm.lang === 'zh-CN' ? vm.goods.shop_name_cn : vm.goods.shop_name
			})
		},
		methods: {
			changeCount (type) {
				const vm = this
				if (type === 1) {
					vm.count++
				} else {
					vm.count--
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-container{
	min-height: 40vh;
	.order-header-container{
		box-sizing: border-box;
		width: 100%;
		height: 286.8rpx;
		border-bottom-left-radius: 50vw 5vh;
		border-bottom-right-radius: 50vw 5vh;
		padding-top: 20rpx;
		margin-bottom: 30rpx;
		background: linear-gradient(0deg, #19C882, #23AF8C);
		.head-info{
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 1px 10px 30px 0px rgba(152,152,152,0.15);
			border-radius: 13.88rpx;
			.head-image{
				width: 243.61rpx;
				height: 243.61rpx;
				border-radius: 13.88rpx;
				background: $u-type-info;
			}
			.head-content{
				min-height: 243.61rpx;
				.goods-price{
					font-weight: bold;
					font-size: 16px;
				}
				.single-price{
					color: $u-type-info-dark;
				}
				.control-btn{
					width: 20px;
					height: 20px;
					line-height: 18px;
					text-align: center;
					padding: 0;
					margin: 0 3px;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
