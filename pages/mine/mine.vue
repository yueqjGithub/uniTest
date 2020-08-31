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
			<view class="buy-vip flex-row flex-jst-btw flex-ali-center pa-md">
				<button type="default" class="become-vip" @click="toVip">{{person.is_vip ? $t('mine.extended') : $t('mine.become')}}</button>
				<text class="text-12 become-tip">{{person.is_vip ? $t('mine.alreadyTips') : $t('mine.becomeTips')}}</text>
			</view>
		</view>
		<!-- body -->
		<view class="order-bar pa-md">
			<order-tab></order-tab>
		</view>
		<view class="list-bar pa-sm" v-if="person.apply">
			<menu-list :list="person.apply"></menu-list>
		</view>
		<list-one></list-one>
		<list-two></list-two>
		<list-three></list-three>
		<!-- 底部 -->
		<view class="tab-add"></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import urls from '@/service/urls.js'
	import { mapActions } from 'vuex'
	import orderTab from './orderTabItem.vue'
	import menuList from './menuList.vue'
	import listOne from './listOne.vue'
	import listTwo from './listTwo.vue'
	import listThree from './listThree.vue'
	export default {
		name: 'mine',
		components: {
			cusTabbar,
			orderTab,
			menuList,
			listOne,
			listTwo,
			listThree
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
			...mapActions(['checkLogin']),
			async toVip () {
				const result = await this.checkLogin()
				if (result) {
					uni.reLaunch({
						url: '/pages/buyVip/buyVip'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
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
		.buy-vip{
			width: 90%;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 27.77rpx;
			margin-bottom: -20px;
			.become-vip{
				background: linear-gradient(90deg, #F5E1BE, #DCB46E);
				border-radius: 34.72rpx;
				color: #643200;
				font-size: 14px;
				margin: 0;
			}
			.become-tip{
				color: #643200;
			}
		}
	}
	.order-bar{
		box-sizing: border-box;
		width: 90%;
		box-sizing: border-box;
		margin: 35px auto 15px auto;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
		background: #FFFFFF;
	}
	.list-bar{
		box-sizing: border-box;
		width: 90%;
		box-sizing: border-box;
		margin: 15px auto;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
		background: #FFFFFF;
	}
}
</style>
