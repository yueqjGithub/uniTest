<template>
	<view class="page bg-grey">
		<view class="train-head">
			<!--status占位-->
			<view class="status-bar flex-column flex-jst-end flex-ali-center">
				<text class="text-14 text-white ma-col-sm">{{pageName}}</text>
			</view>
			<!-- navbar -->
		</view>
		<!-- body -->
		<view class="content border-box flex-column flex-jst-start flex-ali-center">
		</view>
		<!-- tabbar-->
		<view class='tab-add'></view> 
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'coin',
		components: {
			cusTabbar
		},
		data() {
			return {
				show: true,
			}
		},
		watch: {
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			pageName() {
				return this._i18n.messages[this.lang].pullPage.pageName
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
					uni.showLoading({
						title: ''
					})
					vm.$post(urls.pullIndex, obj).then(res => {
						console.log(res)
						uni.hideLoading()
					}, err => {
						uni.hideLoading()
						console.log(err)
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
.page{
	width: 100vw;
	min-height: 100vh;
	.train-head {
		height: 479.16rpx;
		background: linear-gradient(45deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
	
		.status-bar {
			width: 100%;
			height: 175rpx;
			position: relative;
			box-sizing: border-box;
			padding-bottom: 4px;
		}
	}
	.content {
		width: 90%;
		margin: -260rpx auto 0 auto;
		padding: 48.61rpx 41.66rpx;
		background: #FFFFFF;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
	}
}
</style>
