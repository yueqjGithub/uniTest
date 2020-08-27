<template>
	<view class="bg-grey mine-container">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
		</view>
		<!-- 头部 -->
		<view class="head-bar"></view>
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
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="renwuzhongxin-huodepinglun" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text>{{$t('vip.agreement')}}</text>
				</view>
				<button type="default" class="plain-btn">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="kefuzhongxin" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text>{{$t('vip.service')}}</text>
				</view>
				<button type="default" class="plain-btn" open-type="contact">
					<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon"></u-icon>
				</button>
			</view>
			<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
				<view class="flex-jst-start flex-ali-center" :class="langFlex">
					<u-icon name="bangzhu" custom-prefix="iconfont" size="40" class="text-gold"></u-icon>
					<text>{{$t('vip.support')}}</text>
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
				isLogin: false
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
		},
		methods: {
			async openPay (number) {
				const vm = this
				const token = await uni.getStorageSync('token')
				if (token) {
					const obj = {
						token: token,
						vip_group_number: number
					}
					vm.$post(urls.becomeVip, obj).then(res => {
						console.log(res)
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
		position: fixed;
		top: 0;
		left: 0;
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
		margin-top: 175rpx;
		width: 100%;
		height: 382.63rpx;
		background: linear-gradient(80deg, #282C32, #14181E);
		border-bottom-left-radius: 50vw 4vh;
		border-bottom-right-radius: 50vw 4vh;
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
