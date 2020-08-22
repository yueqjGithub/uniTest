<template>
	<view class="container bg-grey">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
			<status-bar></status-bar>
		</view>
		<view class="cus-head">
			<!-- fixed元素补位 -->
			<view class="fix-add"></view>
			<!--弧形占位-->
			<view class="banner-container">
				<view class="circle-bottom"></view>
				<!-- banner -->
				<banner :list="bannerList"></banner>
			</view>
		</view>
		<!-- fixed元素补位-弥补absolute轮播 -->
		<view class="fix-add-swiper"></view>
		<!-- menulist -->
		<view class="menu-list bg-white pa-row-md flex-row flex-wrap flex-jst-btw flex-ali-start">
			<view class="menu-item-container flex-row flex-jst-center flex-ali-start" v-for="(k, index) in applyList" :key="index">
				<Item :item="k"></Item>
			</view>
		</view>
		<!-- 消息栏 -->
		<notice></notice>
		<!-- 广告图 -->
		<view class="pa-row-md">
			<image :src="adv" mode="" class="adv-img"></image>
		</view>
		<!-- 推荐商品 -->
		<recommended :info='recommendedGoods' v-if="recommendedGoods"></recommended>
		<!-- 最新商品 -->
		<news :info="newsList" v-if="newsList"></news>
		<!-- tabbar-->
		<view class='tab-add'></view> 
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import statusBar from './statusBar.vue'
	import banner from './banner.vue'
	import Item from './menuItem.vue'
	import notice from './notice.vue'
	import recommended from '@/cusComponents/recommended.vue'
	import news from '@/cusComponents/news.vue'
	import urls from '@/service/urls.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'index',
		components: {
			cusTabbar,
			statusBar,
			banner,
			Item,
			notice,
			recommended,
			news
		},
		data() {
			return {
				bannerList: [],
				applyList: [],
				recommendedGoods: '', // 推荐商品
				newsList: '', // 最新商品
				adv: '' // 通知栏下的广告图片
			}
		},
		computed: {
			...mapState(['lang', 'initSuc'])
		},
		watch: {
			initSuc: {
				immediate: true,
				handler: function (val) {
					if (val === 'true') {
						this.queryIndex()
					}
				}
			}
		},
		mounted() {},
		methods: {
			queryIndex() {
				const vm = this
				vm.$get(urls.queryIndex, {}).then(res => {
					vm.bannerList = [...res.data.banner]
					vm.applyList = [...res.data.apply]
					vm.adv = res.data.adv
					vm.recommendedGoods = res.data.shop.recommended_goods
					vm.newsList = res.data.shop.new_arrivals
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.status_bar {
			// position: fixed;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 175rpx;
			background: linear-gradient(45deg, #19C882, #23AF8C);
			z-index: 10;
			.status_null {
				width: 100%;
				height: 44px;
			}
		}
		.cus-head{
			width: 100%;
			background: linear-gradient(135deg, #19C882, #23AF8C);
			position: relative;
			.fix-add {
				height: 175rpx;
				width: 100vw;
				background: #f3f3f3;
			}
			.banner-container{
				height: 277.77rpx;
				width: 100%;
				position: relative;
				.circle-bottom {
					width: 100%;
					height: 10%;
					background: #ffffff;
					position: absolute;
					bottom: 0;
					border-top-left-radius: 50vw 5vh;
					border-top-right-radius: 50vw 5vh;
				}
			}
		}
		.fix-add-swiper{
			width: 100%;
			height: 55.55rpx;
			background: #FFFFFF;
		}
		.menu-list {
			// margin-top: 319.44rpx;
			padding-top: 10px;
			.menu-item-container{
				width: 33%;
				margin-bottom: 38.88rpx;
			}
		}
		.adv-img{
			width: 100%;
			height: 138.88rpx;
			border-radius: 13.88rpx;
		}
	}
</style>
