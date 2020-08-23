<template>
	<view class="status_bar">
		<!--status占位-->
		<view class="status_null"></view>
		<!-- navbar -->
		<view class="content-bar flex-row">
			<u-icon name="weibiaoti--11" size="40" custom-prefix="iconfont" class="flex-1 text-white" @click="back"></u-icon>
			<text class="tit-name flex-3">{{title}}</text>
			<view class="flex-1"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'normalHead',
		props: {
			title: {
				default: '',
				type: String
			}
		},
		data () {
			return {}
		},
		methods: {
			back () {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		// position: fixed;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		background: linear-gradient(45deg, #1BC384, #23AF8C);
		z-index: 10;
		.status_null {
			width: 100%;
			height: 44px;
		}
		.content-bar{
			box-sizing: border-box;
			padding: 5px 27.77rpx 32.11rpx 27.77rpx;
			.tit-name{
				font-size: 37.5rpx;
				color: #FFFFFF;
				font-weight: 400;
				text-align: center;
			}
		}
	}
</style>
