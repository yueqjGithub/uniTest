<template>
	<view class="recommended-container pa-md">
		<view class="re-tit flex-jst-btw flex-ali-center" :class="rowDirection">
			<text class="re-tit-word">{{titName}}</text>
			<view>滚动control</view>
		</view>
		<!-- 轮播 -->
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="my-swiper">
			<swiper-item v-for='k in steps' :key="k">
				<view class="swiper-item flex-row flex-jst-start flex-ali-center flex-nowrap" :class="goodsList[k * 2 + 1] ? 'flex-jst-btw' : 'flex-jst-start'">
					<goodsItem :goods="goodsList[k * 2]" class="goods-item"></goodsItem>
					<goodsItem :goods="goodsList[k * 2 + 1]" v-if="goodsList[k * 2 + 1]" class="goods-item"></goodsItem>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import goodsItem from './goodsItem.vue'
	export default {
		name: 'recommended',
		components: {
			goodsItem
		},
		props: {
			info: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			rowDirection () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			titName () {
				return this.lang === 'zh-CN' ? this.info.name_cn : this.info.name
			},
			goodsList () {
				return [...this.info.data]
			},
			steps () { // 横向轮播总屏数
				return Math.ceil(this.goodsList.length / 2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommended-container{
		.re-tit{
			.re-tit-word{
				font-weight: bold;
			}
		}
		.my-swiper{
			box-sizing: border-box;
			height: 451.38rpx;
			.goods-item{
			}
		}
	}
</style>
