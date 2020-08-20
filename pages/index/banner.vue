<template>
	<view class="banner-container pa-row-md">
		<u-swiper :list="list" class="my-swiper"></u-swiper>
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
		transform: translate(0, 55%);
		box-sizing: border-box;
		.my-swiper{
			width: 95%;
			height: 100%;
			margin: 0 auto;
			position: relative;
		}
	}
</style>
