<template>
	<view class="page bg-grey">
		<!-- <view class="head-bg"></view> -->
		<view class="cus-head pa-row-md">
			<view class="head-container bg-white">
				<view class="banner-container">
					<u-swiper :list="bannerList" :image-mode="'scaleToFill'"></u-swiper>
				</view>
				<!-- 分类入口 -->
				<nav-list></nav-list>
			</view>
		</view>
		<!-- 油价列表 -->
		<view class="full-width pa-md border-box flex-row flex-jst-center flex-ali-center oil-container">
			<view class="cont-item pa-md full-width border-box">
				<view class="full-width flex-row flex-jst-center flex-ali-center pa-col-sm border-box text-bold tex-14">{{$t('carCenter.oilTitle')}}</view>
				<view v-for="k in priceList" :key='k.name' :class="langFlex" class="flex-jst-btw flex-ali-center price-item pa-col-md">
					<view class="flex-row flex-jst-start flex-ali-center">
						<text class="oil-name text-16">{{lang === 'zh-CN' ? k.type.name_cn : k.type.name}}</text>
						<text class="oil-name ma-row-sm text-16">{{k.name}}</text>
					</view>
					<view class="flex-row flex-jst-center flex-ali-base">
						<text class="text-primary text-18 text-bold">{{k.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import navList from './navList.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'carCenter',
		components: {
			navList
		},
		data() {
			return {
				bannerList: [{
					id: "3",
					image: "/static/images/22222.png"
				}],
				priceList: [
				]
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].carCenter.pageName
					})
				}
			}
		},
		onShareAppMessage(res) {
			const result = getCurrentPages().pop()
			return {
				title: 'kolay',
				path: result.$page.fullPath
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		mounted() {
			this.queryStore()
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			queryStore() {
				const vm = this
				vm.$get(urls.queryCurrentOilPrice, {}).then(res => {
					this.priceList = [...res]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		height: 100vh;
		.cus-head {
			width: 100%;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			height: 352.77rpx;
			position: relative;
			padding-top: 35rpx;
			margin-bottom: 105rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			box-sizing: border-box;

			.head-container {
				box-sizing: border-box;
				border-radius: 27.77rpx;
				width: 100%;
				padding: 27.77rpx;
				box-shadow: 0px 6.94rpx 20.83rpx 0px rgba(152, 152, 152, 0.15);
			}
		}
		.cont-item{
			margin-top: 115rpx;
			background: #FFFFFF;
			box-shadow: 0px 6.94rpx 20.83rpx 0px rgba(152, 152, 152, 0.15);
			border-radius: 20.83rpx;
			.oil-name{
				font-weight: '700';
			}
		}
	}
</style>
