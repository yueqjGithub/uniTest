<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<!-- body -->
		<view class="content-container pa-md border-box">
			<view v-html="cont"></view>
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
				cont: ''
			};
		},
		computed: {
			...mapState(['lang'])
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
				vm.$get(urls.queryHelp, obj).then(res => {
					uni.hideLoading()
					vm.cont = res.code.telephone_fare
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
    height: 94vh;
    margin-top: 28rpx;
    margin-left: auto;
    margin-right: auto;
    border-radius: 13.88rpx;
    background: #FFFFFF;
    overflow-y: scroll;
    position: relative;
    z-index: 2;
	}
}
</style>
