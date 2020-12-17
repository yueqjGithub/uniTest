<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content-container">
			<u-image mode="aspectFill" width="100%" height="70vh" src='/static/images/123.png'></u-image>
			<view class="full-width pa-lg flex-row flex-jst-center flex-ali-center border-box">
				<button type="normal" class="my-btn-primary text-white text-12" @click="test">{{$t('basic.saveShare')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				inviter: '',
				from: ''
			}
		},
		computed: {
			...mapState(['lang'])
		},
		onShow() {
			this.loginCheck()
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].pullPoster.pageName
						})
					}
				}
			}
		},
		onShareAppMessage(res) {
			return {
				title: '自定义分享标题',
				path: `pages/index/index?inviter=${this.inviter}`
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async loginCheck() {
				const vm = this
				const token = await vm.checkLogin()
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					// 设置分享code
					const inviter = await uni.getStorageSync('myInviterCode')
					vm.inviter = inviter
				}
				// 设置分享来源
				const options = getCurrentPages()[getCurrentPages().length - 1].options
				if (options.mode) {
					vm.from = options.mode
				}
			},
			test() {
				const vm = this
				uni.saveImageToPhotosAlbum({
					filePath: '/static/images/123.png',
					success: function() {
						vm.$refs.uTips.show({
							type: 'success',
							title: vm._i18n.messages[vm.lang].basic.success,
							duration: 2000
						})
					},
					fail(err) {
						vm.$refs.uTips.show({
							type: 'error',
							title: err.message,
							duration: 2000
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;
		padding-top: 17px;

		.head-bg {
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

		.content-container {
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 0 auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 55.55rpx 55.55rpx 0 55.55rpx;
		}
	}
</style>
