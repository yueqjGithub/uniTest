<template>
	<view class="address-container full-width flex-jst-btw flex-ali-center pa-md" :class="langFlex">
		<view class="flex-4">
			<text class="text-grey-1 full-width" :class="langFlex">{{address.address}}</text>
			<text class="text-grey-1 full-width" :class="langFlex">{{address.mobile}}</text>
		</view>
		<view class="flex-1">
			<button type="default" class="plain-btn" @click="toEditAddress">
				<u-icon name="tianchongxing-50" size="45" class="text-grey-1" custom-prefix="iconfont"></u-icon>
			</button>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import { mapState } from 'vuex'
	export default {
		name: 'addressBar',
		props: ['address'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		mounted () {
		},
		methods: {
			toEditAddress () {
				uni.navigateTo({
					url: '/pages/memberAddress/memberAddress'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-container{
		border:1px solid rgba(207, 207, 207, 1);
		border-radius: 13.88rpx;
	}
</style>
