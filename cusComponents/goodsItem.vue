<template>
	<view class="goods-container bg-white flex-column flex-jst-start flex-ali-center">
		<image :src="goods.cover_image" mode="" class="goods-image"></image>
		<view class='flex-column flex-jst-btw goods-btm flex-2' :class="wordFlex">
			<text class="font-sm goods-tit" :class='cusAlign'>{{goodsName}}</text>
			<text class="goods-price">￥{{goods.commodity_price}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'goodsItem',
		props: ['goods'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			wordFlex () {
				return this.lang === 'zh-CN' ? 'flex-ali-start' : 'flex-ali-end'
			},
			goodsName () {
				return this.lang === 'zh-CN' ? this.goods.shop_name_cn : this.goods.shop_name
			},
			cusAlign () {
				return this.lang === 'zh-CN' ? 'text-left' : 'text-right'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-container{
		border-radius: 13.88rpx;
		box-shadow: 0px 3px 7px -3px rgba(0,0,0,0.3);
		width: 312.5rpx;
		box-sizing: border-box;
		height: 451.38rpx;
		overflow: hidden;
		.goods-image{
			width: 100%;
			max-height: 312.5rpx;
		}
		.goods-btm{
			width: 100%;
			box-sizing: border-box;
			padding: 6.94rpx;
			.goods-tit{
				max-height: 34px;
				overflow-y: scroll;
			}
			.goods-price{
				color: $uni-color-primary;
				font-size: 14px;
				font-weight: bold;
			}
		}
	}
</style>
