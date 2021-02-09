<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content-container">
			<canvas id='myCav' canvas-id="myCav" style="width: 100%;height: calc((90vw - 50px) / 0.57)"></canvas>
			<canvas id='hide' canvas-id="hide" style="width: 38vw;height:38vw;"></canvas>
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
	import qrcode from '@/utils/uqrcode.js'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				inviter: '',
				sharePath: '',
				from: '',
				filePath: ''
			}
		},
		computed: {
			...mapState(['lang'])
		},
		onShow() {
			// this.loginCheck()
		},
		onReady () {
			this.queryInfo()
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
			async queryInfo () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					vm.inviter = uni.getStorageSync('myInviterCode')
					uni.showLoading()
					const obj = {
						token: token
					}
					vm.$post(urls.pullSetting, obj).then(res => {
						if (res.success) {
							vm.sharePath = res.data.tg_path
							vm.drawHandler()
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				} else {
					uni.hideLoading()
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			drawHandler () { // 绘制
				const vm = this
				const ctx = uni.createCanvasContext('myCav', this)
				// const img = new Image()
				// img.onload = function () {
				// 	ctx.drawImage(img, )
				// }
				uni.getSystemInfo({
					success(res) {
						const w = res.screenWidth * 0.9 - 50
						const h = w / 0.57
						uni.getImageInfo({
							src: '/static/images/pull-bg.png',
							success(info) {
								setTimeout(() => {
									ctx.drawImage('/static/images/pull-bg.png', 0, 0, w, h)
									// ctx.draw()
									vm.make(ctx, w, h)
								}, 0)
							},
							fail(err) {
								uni.hideLoading()
								vm.$refs.uTips.show({
									title: err.errMsg,
									type: 'error'
								})
							}
						})
					}
				})
			},
			test() { // 保存图片
				const vm = this
				if (vm.filePath === '') {
					vm.$refs.uTips.show({
						title: '图片未生成成功',
						type: 'error'
					})
					return false
				}
				uni.saveImageToPhotosAlbum({
					filePath: vm.filePath,
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
			},
			async make(ctx, w, h) { // 二维码生成
				const vm = this
				const shareUrl = `${vm.sharePath}?inviter=${vm.inviter}`
				debugger
				qrcode.make({
					canvasId: 'hide',
					componentInstance: this,
					text: shareUrl,
					size: w * 0.38,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: qrcode.errorCorrectLevel.H
				}).then(res => {
					ctx.drawImage(res, (w / 2) - (w * 0.19) , h - (w * 0.49), w * 0.38, w * 0.38)
					ctx.draw()
					setTimeout(() => {
						uni.canvasToTempFilePath({
							canvasId: 'myCav',
							success(file) {
								uni.hideLoading()
								vm.filePath = file.tempFilePath
							},
							fail (err) {
								console.log(err)
							}
						}, vm)
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		#hide{
			position: fixed;
			bottom: 100vw;
			right: 100vh;
			z-index: -999;
			opacity: 0;
		}
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
			padding: 25px 25px 0 25px;
		}
	}
</style>
