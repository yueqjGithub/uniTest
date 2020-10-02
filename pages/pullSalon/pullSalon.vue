<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<!-- body -->
		<view class="cus-gap full-width"></view>
		<view class="head-img">
			<u-image :src="info.tg_img" width="100%" height="308.33" mode="widthFit"></u-image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'pullSalon',
		data() {
			return {
				info: ''
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].pullSalon.pageName
						})
					}
				}
			}
		},
		onShow () {
			this.queryInfo()
		},
		methods: {
			...mapActions(['checkLogin']),
			async queryInfo () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token
					}
					vm.$post(urls.pullSetting, obj).then(res => {
						if (res.success) {
							vm.info = res.data
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
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
.page {
		width: 100vw;
		min-height: 100vh;
		.head-bg{
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 356.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}
		.cus-gap{
			height: 4vh;
		}
		.head-img{
			width: 90%;
			height: 308.33rpx;
			margin: 0 auto;
			border-radius: 13.88rpx;
			background: #FFFFFF;
			display: block;
			position: relative;
			z-index: 2;
			overflow: hidden;
		}
		.cont-item{
			width: 90%;
			background: #FFFFFF;
			border-radius: 13.88rpx;
		}
	}
</style>
