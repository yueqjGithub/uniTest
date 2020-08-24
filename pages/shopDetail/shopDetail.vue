<template>
	<view class="detail-container bg-grey">
		<view class="detail-head-container pa-row-md">
			<view class="detail-head flex-column flex-jst-start flex-ali-start">
				<u-swiper :list="bannerList" :image-mode="'scaleToFill'" height="486.11" indicator-pos="bottomLeft" mode="number"
				 :autoplay="false" class="full-width"></u-swiper>
				<view class="full-width flex-1 flex-column flex-jst-start flex-ali-start price-container pa-md">
					<view class="full-width flex-jst-start flex-ali-center" :class="langFlex">
						<text class="text-primary a-price">
							<text class="price-symbol">￥</text>
							{{goods.activity_price}}
						</text>
						<text class="c-price">
							<text class="price-symbol">￥</text>
							{{goods.commodity_price}}
						</text>
					</view>
					<!-- 标题显示 -->
					<text class="shop-name full-width ma-top-5" :class="langFlex">{{lang === 'zh-CN' ? goods.shop_name_cn : goods.shop_name}}</text>
				</view>
			</view>
		</view>
		<!-- 运费显示 -->
		<view class="flex-jst-btw flex-ali-center pa-md ma-md detail-fare" :class="langFlex">
			<text class="fare-name">{{$t('shopDetai.fare')}}</text>
			<text class="fare-num">{{Number(goods.fare) === 0 ? $t('shopDetai.noFare') : `￥ ${goods.fare}`}}</text>
		</view>
		<!-- 库存显示 -->
		<view class="flex-jst-btw flex-ali-center pa-md ma-md detail-fare" :class="langFlex">
			<text class="fare-name">{{$t('shopDetai.inventory')}}</text>
			<text class="fare-num">{{goods.inventory}}</text>
		</view>
		<!-- 产品详细 -->
		<view class="pa-md ma-md goods-introduction">
			<view class="full-width flex-jst-start flex-ali-center intro-tit" :class="langFlex">{{$t('shopDetai.detail')}}</view>
			<u-parse :html="goods.content"></u-parse>
		</view>
		<!-- other -->
		<view class="pa-md ma-row-md others-container flex-row flex-wrap flex-jst-btw flex-ali-start">
			<goodsItem v-for="(k, index) in goods.other" :goods="k" class="goods-item" :key="index"></goodsItem>
		</view>
		<!-- tabbar-->
		<view class='tab-add'></view> 
		<view class="detail-tab">
			<button type="default" open-type="openSetting">222</button>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import goodsItem from '@/cusComponents/goodsItem.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			goodsItem
		},
		data() {
			return {
				shopNumber: '',
				bannerList: [],
				goods: ''
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		mounted() {
			this.shopNumber = getCurrentPages()[getCurrentPages().length - 1].options.number
			this.queryDetail()
		},
		methods: {
			async queryDetail() {
				const vm = this
				const obj = {
					shop_number: vm.shopNumber
				}
				const token = await wx.getStorageSync('token')
				if (token) {
					obj.token = token
				}
				vm.$post(urls.queryShopDetail, obj).then(res => {
					console.log(res)
					const pageName = vm.lang === 'zh-CN' ? res.data.shop_name_cn : res.data.shop_name
					// 设置店名
					uni.setNavigationBarTitle({
						title: pageName
					})
					vm.goods = res.data
					// 设置轮播图片组
					vm.bannerList = res.data.images.map(item => {
						return {
							title: '',
							image: item
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		.detail-head-container {
			box-sizing: border-box;
			width: 100%;
			height: 381.94rpx;
			margin-bottom: 348.39rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			background: linear-gradient(0deg, #19C882, #23AF8C);

			.detail-head {
				box-shadow: 0px 5px 7px 0px rgba(152, 152, 152, 0.15);
				height: 708.33rpx;
				overflow: hidden;
				width: 100%;
				border-radius: 20.83rpx;
				background: #FFFFFF;

				.price-container {
					.a-price {
						font-size: 18px;
						font-weight: 400;
					}

					.c-price {
						color: #aaaaaa;
						font-size: 12px;
						text-decoration: line-through;
						margin: 0 5px;
					}

					.price-symbol {
						font-size: 12px;
					}
				}
			}
		}
		.detail-fare{
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 13.88rpx;
			box-shadow: 0px 5px 7px 0px rgba(152,152,152,0.15);
			.fare-name{
				font-weight: bold;
				font-size: 14px;
			}
			.fare-num{
				font-size: 14px;
				color: #aaaaaa;
			}
		}
		.goods-introduction{
			border-radius: 13.88rpx;
			background: #FFFFFF;
			box-shadow: 0px 5px 7px 0px rgba(152,152,152,0.15);
			.intro-tit{
				padding: 3px;
				font-size: 14px;
				font-weight: bold;
				border-bottom: 1px solid #CFCFCF;
				margin-bottom: 8px;
			}
		}
		.others-container{
			.goods-item{
				margin-bottom: 10px;
			}
		}
		.tab-add{
			width: 100%;
			height: 56px;
		}
		.detail-tab{
			height: 56px;
			position: fixed;
			width: 100%;
			bottom: 0;
			background: #FFFFFF;
		}
	}
</style>
