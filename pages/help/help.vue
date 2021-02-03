<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<!-- body -->
		<view class="content-container pa-lg border-box flex-column flex-jst-center flex-ali-center">
			<u-icon name='bangzhu' color='#00BE88' custom-prefix='iconfont' size='108'></u-icon>
			<text class="text-12 text-bold" :class="myTextRight">{{$t('help.welcome')}}</text>
			<text class="text-12 text-grey-1 ma-col-sm" :class="myTextRight">{{$t('help.serviceMobile')}}</text>
			<view class="full-width flex-row flex-jst-center flex-ali-center">
				<u-icon color='#AAAAAA' custom-prefix='iconfont' name='-hour' size='40'></u-icon>
				<text class="text-grey-1 text-12 text-bold ma-row-sm">17799370072</text>
			</view>
		</view>
		<view class="content-container content-container-serv pa-md border-box" v-for="(k, idx) in contList" :key='idx'>
			<view class="flex-jst-start flex-ali-center tit" :class="langFlex">
				<u-icon color='#00BE88' custom-prefix='iconfont' name='renwuzhongxin-huodepinglun' size='40'></u-icon>
				<text class="text-14 text-bold ma-row-sm" :class="myTextRight">{{lang==='zh-CN' ? k.title_cn : k.title}}</text>
			</view>
			<view :class="myTextRight" class="text-14 ma-col-sm" v-html="lang==='zh-CN' ? k.content_en : k.content"></view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'helpCenter',
		data() {
			return {
				type: '',
				contList: []
			};
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			myTextRight () {
				return this.lang === 'zh-CN' ? '' : 'rtl'
			}
		},
		onShow () {
			this.init()
		},
		methods: {
			init () {
				const vm = this
				vm.type = getCurrentPages()[getCurrentPages().length - 1].options.type
				let pageName = ''
				switch (vm.type) {
					case 'user_xy':
					pageName = vm._i18n.messages[vm.lang].help.noticePageName
					break;
					case 'about_us':
					pageName = vm._i18n.messages[vm.lang].help.aboutPageName
					break;
					default:
					pageName = vm._i18n.messages[vm.lang].help.pageName
				}
				uni.setNavigationBarTitle({
					title: pageName
				})
				this.queryInfo()
			},
			queryInfo () {
				const vm = this
				const obj = { type: vm.type }
				uni.showLoading({
					title: ''
				})
				vm.$get(urls.helpList, obj).then(res => {
					uni.hideLoading()
					if (res.success) {
						vm.contList = [res.data]
					} else {
						vm.$refs.uTips.show({
							type: 'error',
							title: res.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	width: 100vw;
	height: 100vh;
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
	.content-container{
    width: 90%;
    margin-top: 28rpx;
    margin-left: auto;
    margin-right: auto;
    border-radius: 13.88rpx;
    background: #FFFFFF;
    overflow-y: scroll;
    position: relative;
    z-index: 2;
		&.content-container-serv{
			padding: 40rpx 27.7rpx;
			.tit{
				margin-bottom: 15rpx;
			}
		}
	}
}
</style>
