<template>
	<view class="bg-grey mine-container">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
		</view>
		<!-- 头部 -->
		<view class="head-bar flex-column flex-jst-start flex-ali-center">
			<u-avatar :src="person.profile_photo" size="large"></u-avatar>
			<view class="full-width ma-col-sm flex-row flex-jst-center">
				<text class="text-white text-bold text-14" v-if="isLogin">{{person.nickname}}</text>
				<button type="default" class="plain-btn text-white text-14" v-else open-type="getUserInfo" @getuserinfo="login()">{{$t('basic.login')}}</button>
			</view>
			<view class="user-id text-light-grey" v-if="isLogin">ID:{{person.user_number}}</view>
			<!-- 统计 -->
			<view class="flex-row flex-jst-ard flex-ali-center full-width pa-md">
				<view class="total-item flex-column flex-jst-btw flex-ali-center">
					<text class="text-18 text-bold text-white">{{person.collect || 0}}</text>
					<text class="text-12 text-light-grey">{{$t('mine.collect')}}</text>
				</view>
				<view class="total-item flex-column flex-jst-btw flex-ali-center">
					<text class="text-18 text-bold text-white">{{person.income || 0}}</text>
					<text class="text-12 text-light-grey">{{$t('mine.earnings')}}</text>
				</view>
				<view class="total-item flex-column flex-jst-btw flex-ali-center">
					<text class="text-18 text-bold text-white">{{person.account_balance || 0}}</text>
					<text class="text-12 text-light-grey">{{$t('mine.balance')}}</text>
				</view>
			</view>
			<!-- VIP -->
		</view>
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
				isLogin: false,
				person: {
					collect: 0,
					earnings: 0,
					balance: 0,
					is_vip: false
				}
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
						this.person = res.data
					})
				}
			},
			login () {
				const vm = this
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
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
		// height: 452.08rpx;
		background: linear-gradient(80deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
	}
}
</style>
