<template>
	<view class="order-item pa-md" @click="toDetail">
		<view class="order-top pa-col-md flex-jst-btw flex-ali-center" :class="langFlex">
			<image :src="collect.cover_image" mode="" class="order-image"></image>
			<view class="order-cont flex-2 pa-row-md flex-column flex-jst-start flex-ali-start">
				<text class="shop-name full-width text-12" :class="langFlex">{{shopName}}</text>
				<view class="order-time flex-jst-btw full-width flex-ali-base ma-col-md" :class="langFlex">
					<text class="total-price text-16 text-bold text-primary">￥{{collect.commodity_price || 0}}</text>
					<u-icon name="weibiaoti--32" size="24" custom-prefix="iconfont" @click="delCollect"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'collectItem',
		props: ['collect'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			shopName () {
				return this.lang === 'zh-CN' ? this.collect.shop_name_cn : this.collect.shop_name
			}
		},
		methods: {
			toDetail () {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?number=${this.collect.shop_number}`
				})
			},
			async delCollect () {
				const vm = this
				const token = uni.getStorageSync('token')
				const obj = {
					token: token,
					shop_number: vm.collect.shop_number
				}
				vm.$post(urls.changeCollect, obj).then(res => {
					if (res.success) {
						uni.showToast({
							title: '',
							icon: 'success'
						})
						vm.$emit('delSuccess', vm.collect.shop_number)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item{
		background-color: #FFFFFF;
		box-shadow:0px 10px 30px 0px rgba(152,152,152,0.15);
		border-radius:13.88rpx;
		.order-top{
			.order-image{
				width: 173.61rpx;
				height: 173.61rpx;
				border-radius: 13.88rpx;
				background: #aaaaaa;
			}
			.order-cont{
				height: 173.61rpx;
				.shop-name{}
			}
		}
	}
</style>
