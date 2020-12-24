<template>
	<view class="vip-feedback pa-col-sm">
<!-- 		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/buyVip/buyVip')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--46" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.become')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view> -->
		<!-- 收藏 -->
<!-- 		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--53" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.ticket')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view> -->
		<!-- 地址管理 -->
<!-- 		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/coin/coin')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--50" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.earing')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view> -->
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'listTwo',
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
