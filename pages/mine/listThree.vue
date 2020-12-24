<template>
	<view class="vip-feedback pa-col-sm">
		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/memberAddress/memberAddress')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--37" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.address')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view>
		<!-- 推广海报 -->
		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/pullPoster/pullPoster')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="renwuzhongxin-fabuneirong" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.earingPost')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view>
		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/feedback/feedback')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="renwuzhongxin-huodepinglun" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.feedback')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view>
		<!-- 收藏 -->
		<button class="cus-plain-btn fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" open-type="contact">
			<view class="flex-jst-start flex-ali-center" :class="langFlex" ref='myContact1'>
				<u-icon name="kefuzhongxin" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.service')}}</text>
			</view>
			<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
		</button>
		<!-- 地址管理 -->
		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/help/help?type=my_help')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="bangzhu" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.support')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view>
		<!-- 推广海报 -->
		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/help/help?type=about_us')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--16" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.about')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'listThree',
		data () {
			return {}
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
		methods: {
			...mapActions(['checkLogin']),
			openContact () {
			},
			async toAuthPage (path) {
				const vm = this
				const result = await vm.checkLogin()
				if (result) {
					uni.navigateTo({
						url: path
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
	.vip-feedback{
		width: 90%;
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
</style>
