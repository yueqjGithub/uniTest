<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="pa-col-md full-width">
				<view class="flex-jst-start flex-ali-center text-grey-1 text-12 ma-col-sm" :class="langFlex">{{$t('feedback.title')}}</view>
				<u-input v-model="title" :class="inputClass" :custom-style="{fontSize: '14px'}" border :maxlength="60"
				 placeholder-style="color: #aaaaaa;font-family: 'cus-font', 'yahei'" :placeholder="$t('feedback.titTips')" type="text"
				 ></u-input>
			</view>
			<view class="pa-col-md full-width">
				<view class="flex-jst-start flex-ali-center text-grey-1 text-12 ma-col-sm" :class="langFlex">{{$t('feedback.content')}}</view>
				<u-input v-model="content" type="textarea" :custom-style="{fontSize: '14px', textAlign: lang==='zh-CN' ? 'left' : 'right'}"
				 border :maxlength="200" :placeholder="$t('feedback.contTips')" height="300"
				 placeholder-style="color: #aaaaaa;font-family: 'cus-font', 'yahei'"
				 auto-height></u-input>
			</view>
			<view class="full-width pa-lg border-box flex-row flex-jst-center flex-ali-center">
				<button type="normal" :class="couldSub ? 'my-btn-primary text-white' : 'my-btn-normal text-dk-grey'" class="text-14"
				 :disabled="!couldSub" @click="subFeed">{{$t('basic.submit')}}</button>
			</view>
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
		name: 'feedBack',
		data() {
			return {
				title: '',
				content: ''
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			couldSub() {
				return this.title !== '' && this.content !== ''
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].mine.feedback
						})
					}
				}
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async subFeed () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						// token: token,
						title: vm.title,
						content: vm.content
					}
					uni.showLoading()
					vm.$post(urls.subFeedback, obj).then(res => {
						if (res.success) {
							uni.showToast({
								icon: 'success'
							})
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
	.page {
		width: 100vw;
		height: 100vh;

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
			margin: 17px auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 55.55rpx;
		}
	}
</style>
