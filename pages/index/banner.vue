<template>
	<view class="banner-container pa-row-md">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="my-swiper" :circular="true" :indicator-color="'#000000'" indicator-active-color="#ffffff" >
			<swiper-item v-for="k in list" :key="k.id" class="my-swiper-item">
				<image :src="k.image" mode="" class="item-image"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'banner',
		props: {
			list: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data () {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.banner-container{
		width: 100%;
		position: absolute;
		bottom: 0;
		height: 277.77rpx;
		z-index: 2;
		transform: translate(0, 40%);
		box-sizing: border-box;
		.my-swiper{
			width: 95%;
			height: 100%;
			margin: 0 auto;
			border-radius: 17.36rpx;
			overflow: hidden;
			position: relative;
			box-shadow: 0 7px 7px -5px rgba(0,0,0,0.7);
			.my-swiper-item{
				width: 100%;
				height: 100%;
				.item-image{
					width: 100%;
					height: 100% ;
					border-radius: 17.36rpx;
				}
			}
		}
	}
</style>
