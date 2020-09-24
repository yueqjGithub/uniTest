<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<!-- body -->
		<view class="cus-gap full-width"></view>
		<view class="content-container flex-column flex-jst-start flex-ali-center pa-md">
			<!-- btn -->
			<view class="flex-jst-ard flex-ali-center full-width pa-col-md border-box" :class="langFlex">
				<view class="btn-container flex-row flex-jst-center">
					<button type="default" class="text-14" :class="level === 0 ? 'my-btn-primary text-white' : 'my-btn-normal text-blk'" @click="changeCur(0)">{{$t('junior.level_one')}}</button>
				</view>
				<view class="btn-container flex-row flex-jst-center">
					<button type="default" class="text-14" :class="level === 1 ? 'my-btn-primary text-white text-blk' : 'my-btn-normal'" @click="changeCur(1)">{{$t('junior.level_two')}}</button>
				</view>
			</view>
			<!-- 列表 -->
			<view class="flex-2 full-width list-container">
				<swiper :current="level" @transition="transition" @animationfinish="animationfinish" class="swiper-container">
					<swiper-item class="swiper-item">
						<item-list :type="lang === 'zh-CN' ? 1 : 2"></item-list>
					</swiper-item>
					<swiper-item class="swiper-item">
						<item-list :type="lang === 'zh-CN' ? 2 : 1"></item-list>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import itemList from './list.vue'
	import urls from '@/service/urls.js'
	export default {
		name: 'junior',
		components: {
			itemList
		},
		data() {
			return {
				level: 0
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].junior.pageName
					})
				}
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			changeCur (num) {
				this.level = num
			},
			transition(e) {
				// let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.level = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-blk{color: #000000;}
	.page {
		width: 100vw;
		min-height: 100vh;
		.head-bg{
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 356.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}
		.cus-gap{
			height: 4vh;
		}
		.content-container{
			position: relative;
			z-index: 2;
			height: 95vh;
			background: #ffffff;
			margin: 0 auto;
			box-shadow: 0px 10px 35px 0px rgba(170,170,170,0.1);
			border-radius:20.83rpx;
			width: 90%;
			box-sizing: border-box;
			.btn-container{
				width: 50%;
			}
			.list-container{
				height: 100%;
				.swiper-container{
					height: 84vh;
				}
			}
		}
	}
</style>
