<template>
	<view class="container bg-grey">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
			<status-bar :showChangeLanguage="false"></status-bar>
		</view>
		<!-- head -->
		<view class="cus-head pa-row-md">
			<view class="head-container bg-white">
				<view class="banner-container">
					<u-swiper :list="bannerList" :image-mode="'scaleToFill'"></u-swiper>
				</view>
				<!-- 分类入口 -->
				<nav-list></nav-list>
			</view>
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
	import { mapActions } from 'vuex'
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import statusBar from '@/pages/index/statusBar.vue'
	import banner from '@/pages/index/banner.vue'
	import navList from './navList.vue'
	import recommended from '@/cusComponents/recommended.vue'
	import news from '@/cusComponents/news.vue'
	import urls from '@/service/urls.js'
	export default {
		name: 'store',
		components: {
			cusTabbar,
			statusBar,
			banner,
			navList,
			recommended,
			news
		},
		data() {
			return {
				bannerList: [],
				recommendedGoods: '', // 推荐商品
				newsList: '' // 最新商品
			};
		},
		mounted () {
			this.queryStore()
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShareAppMessage(res) {
			const result = getCurrentPages().pop()
			return {
				title: 'kolay',
				path: result.$page.fullPath
			}
		},
		methods: {
			...mapActions(['setLang']),
			queryStore () {
				const vm = this
				vm.$get(urls.queryStore, {}).then(res => {
					this.bannerList = res.data.banner
					vm.recommendedGoods = res.data.shop.recommended_goods
					vm.newsList = res.data.shop.new_arrivals
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
		height: 352.77rpx;
		position: relative;
		margin-top: 175rpx;
		margin-bottom: 105rpx;
		border-bottom-left-radius: 50vw 5vh;
		border-bottom-right-radius: 50vw 5vh;
		box-sizing: border-box;
		.head-container{
			box-sizing: border-box;
			border-radius: 27.77rpx;
			width: 100%;
			padding: 27.77rpx;
		}
	}
}
</style>
