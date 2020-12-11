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
			<view class="user-id text-light-grey ma-col-sm" v-if="isLogin">ID:{{person.user_number}}</view>
			<!-- VIP -->
			<view class="buy-vip flex-row flex-jst-btw flex-ali-center pa-md">
				<button type="default" class="become-vip" @click="toVip">{{person.is_vip ? $t('mine.extended') : $t('mine.become')}}</button>
				<text class="text-12 become-tip">{{person.is_vip ? $t('mine.alreadyTips') : $t('mine.becomeTips')}}</text>
			</view>
		</view>
		<!-- body -->
		<view class="text-14 text-grey-1 text-center ma-md">{{$t('vip.chooseTip')}}</view>
		<view class="full-width">
			<vip-list @toBuy="openPay"></vip-list>
		</view>
		<!---图标行-->
		<view class="vip-introduce flex-row flex-jst-btw flex-ali-center">
			<view class="flex-column flex-jst-btw flex-ali-center">
				<u-icon name="qian" custom-prefix="iconfont" size="80" class="text-gold"></u-icon>
				<text class="text-12 pa-sm">{{$t('vip.cheap')}}</text>
			</view>
			<view class="flex-column flex-jst-btw flex-ali-center">
				<u-icon name="icon_safety_fill" custom-prefix="iconfont" size="80" class="text-gold"></u-icon>
				<text class="text-12 pa-sm">{{$t('vip.safe')}}</text>
			</view>
			<view class="flex-column flex-jst-btw flex-ali-center">
				<u-icon name="icon_certification_f" custom-prefix="iconfont" size="80" class="text-gold"></u-icon>
				<text class="text-12 pa-sm">{{$t('vip.reliable')}}</text>
			</view>
		</view>
		<!-- list栏 -->
		<view class="vip-feedback pa-col-sm">
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toPage('/pages/help/help?type=user_xy')">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="renwuzhongxin-huodepinglun" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text class="ma-row-sm text-12">{{$t('vip.agreement')}}</text>
				</view>
				<button type="default" class="plain-btn">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon"></u-icon>
				</button>
			</view>
			<button class="cus-plain-btn fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" open-type="contact">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="kefuzhongxin" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text class="ma-row-sm text-12">{{$t('vip.service')}}</text>
				</view>
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon"></u-icon>
			</button>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toPage('/pages/help/help?type=my_help')">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="bangzhu" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text class="ma-row-sm text-12">{{$t('vip.support')}}</text>
				</view>
				<button type="default" class="plain-btn">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon"></u-icon>
				</button>
			</view>
		</view>
		<!-- 底部 -->
		<view class="tab-add"></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import urls from '@/service/urls.js'
	import vipList from './list.vue'
	import { mapState } from 'vuex'
	export default {
		name: 'buyVip',
		components: {
			cusTabbar,
			vipList
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
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			transIcon () {
				return this.lang === 'zh-CN' ? 'tran-icon' : ''
			}
		},
		onShow () {
			this.queryMine()
		},
		methods: {
			openContact () {
				this.$refs.contact.click()
			},
			toVip () {
			},
			toPage (path) {
				uni.navigateTo({
					url: path
				})
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
						this.person = res.data
					})
				}
			},
			async openPay (number) {
				const vm = this
				const token = await uni.getStorageSync('token')
				if (token) {
					const obj = {
						token: token,
						vip_group_number: number
					}
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.becomeVip, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							if (res.data.err_code_des === '' || !res.data.err_code_des) {
								uni.requestPayment({ // 调用支付
								    provider: 'wxpay',
								    timeStamp: res.data.timeStamp,
								    nonceStr: res.data.nonceStr,
								    package: res.data.package,
								    signType: 'MD5',
								    paySign: res.data.paySign,
								    success: function (result) {
											vm.queryMine()
								    },
								    fail: function (err) {
											uni.showToast({
												icon: 'none',
												title: vm._i18n.messages[vm.lang].makeOrder.payFail
											})
								    }
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: vm._i18n.messages[vm.lang].makeOrder.payFail
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine-container{
	width: 100%;
	min-height: calc(100vh - 175rpx);
	.text-gold{
		color: #DCB46E;
	}
	.status_bar {
		// position: fixed;
		// position: fixed;
		// top: 0;
		// left: 0;
		width: 100vw;
		height: 175rpx;
		background: linear-gradient(80deg, #282C32, #14181E);
		z-index: 10;
		.status_null {
			width: 100%;
			height: 44px;
		}
	}
	.head-bar{
		// margin-top: 175rpx;
		width: 100%;
		// height: 452.08rpx;
		overflow: hidden;
		background: linear-gradient(80deg, #282C32, #14181E);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
		.buy-vip{
			width: 90%;
			height: 132.77rpx;
			margin-top: 10px;
			background: linear-gradient(90deg, #F5E1BE, #DCB46E);
			border-radius: 27.77rpx;
			.become-vip{
				background: linear-gradient(90deg, #DCB46E, #DCB46E);
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
	.vip-introduce{
		width: 75%;
		margin: 27.7rpx auto;
	}
	.vip-feedback{
		width: 85%;
		margin: 0 auto 20px auto;
		background: #FFFFFF;
		border-radius: 13.88rpx;
		.fb-item{
			&:not(:last-child){
				border-bottom: 1px solid #f3f3f3;
			}
			button{
				margin: 0;
				padding: 0;
			}
			.tran-icon{
				transform: rotate(180deg);
			}
		}
	}
}
</style>
