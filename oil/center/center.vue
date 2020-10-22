<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'center',
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.page {
		width: 100%;
		height: 100vh;
		padding-top: 17px;

		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 256.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}

		.cont-item {
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 17px auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 83.33rpx 55.55rpx;
		}
	}
</style>
