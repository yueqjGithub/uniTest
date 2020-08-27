<template>
	<view class="bg-grey mine-container">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
		</view>
		<!-- 头部 -->
		<view class="head-bar"></view>
		<!-- 底部 -->
		<view class="tab-add"></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import urls from '@/service/urls.js'
	export default {
		name: 'mine',
		components: {
			cusTabbar
		},
		data() {
			return {
				isLogin: false
			}
		},
		onShow () {
			this.queryMine()
		},
		methods: {
			async queryMine () {
				const vm = this
				const token = await uni.getStorageSync('token')
				if (token) {
					this.isLogin = true
					const obj = {
						token: token
					}
					vm.$post(urls.queryMineInfo, obj).then(res => {
						console.log(res)
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.mine-container{
	width: 100%;
	min-height: calc(100vh - 56px);
	.status_bar {
		// position: fixed;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 175rpx;
		background: linear-gradient(80deg, #19C882, #23AF8C);
		z-index: 10;
		.status_null {
			width: 100%;
			height: 44px;
		}
	}
	.head-bar{
		margin-top: 175rpx;
		width: 100%;
		height: 552.08rpx;
		background: linear-gradient(80deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
	}
}
</style>
