<template>
	<view class="vip-feedback pa-col-sm">
<!-- 		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/myOrder/myOrder')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--33" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.order')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view> -->
		<!-- 收藏 -->
<!-- 		<view class="fb-item flex-jst-btw flex-ali-center pa-row-md" :class="langFlex" @click="toAuthPage('/pages/collect/collect')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon name="weibiaoti--34" custom-prefix="iconfont" size="40" class="text-primary"></u-icon>
				<text class="ma-row-sm text-12">{{$t('mine.collect')}}</text>
			</view>
			<button type="default" class="plain-btn">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey"></u-icon>
			</button>
		</view> -->
		<!-- 地址管理 -->
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'listOne',
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
