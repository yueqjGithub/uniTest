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
		<view class="content-item content border-box flex-column flex-jst-start flex-ali-center">
			<view class="full-width pa-md flex-column flex-jst-start flex-ali-center">
				<view class="full-width flex-row flex-jst-center flex-ali-base">
					<text class="text-primary text-14 text-bold">￥</text>
					<text class="text-primary text-24 text-bold">{{personal.account_balance || 0}}</text>
				</view>
				<text class="text-grey-1 text-12">{{$t('pullPage.balance')}}</text>
			</view>
			<view class="full-width pa-row-lg flex-jst-ard flex-ali-center" :class="langFlex">
				<view class="flex-column flex-jst-start flex-ali-center">
					<view class="full-width flex-row flex-jst-center flex-ali-base">
						<text class="text-12">￥</text>
						<text class="text-18">{{personal.account_balance || 0}}</text>
					</view>
					<text class="text-grey-1 text-14">{{$t('pullPage.withdraw')}}</text>
				</view>
				<view class="flex-column flex-jst-start flex-ali-center">
					<view class="full-width flex-row flex-jst-center flex-ali-base">
						<text class="text-12">￥</text>
						<text class="text-18">{{personal.withdraw_deposit || 0}}</text>
					</view>
					<text class="text-grey-1 text-14">{{$t('pullPage.deposit')}}</text>
				</view>
			</view>
		</view>
		<view class="content-item border-box flex-jst-btw flex-ali-center pa-md" :class="langFlex">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon custom-prefix="iconfont" name="weibiaoti--7" class="text-primary ma-row-md" size="40"></u-icon>
				<text class="font-12">{{$t('pullPage.inviter')}}</text>
			</view>
			<view :class="langFlex" class="flex-jst-start flex-ali-center">
				<text class="text-12 text-grey-1 ma-row-sm">{{personal.inviter.nickname}}</text>
				<u-avatar :src="personal.inviter.profile_photo"></u-avatar>
			</view>
		</view>
		<!-- 成员 -->
		<view class="content-item border-box flex-jst-btw flex-ali-center pa-md" :class="langFlex" @click="toPath('/pages/junior/junior')">
			<view class="flex-jst-start flex-ali-center" :class="langFlex">
				<u-icon custom-prefix="iconfont" name="weibiaoti--9" class="text-primary ma-row-md" size="40"></u-icon>
				<text class="font-12">{{$t('junior.pageName')}}</text>
			</view>
			<view class="flex-row flex-jst-start flex-ali-center junior-container">
				<view v-for="k in personal.subordinate.data" class="junior-item flex-row flex-jst-center flex-ali-center">
					<u-avatar :src="k.profile_photo" class="my-avatar"></u-avatar>
				</view>
				<u-badge type="error" :count="personal.subordinate.count" :offset='[20,-5]'></u-badge>
			</view>
		</view>
		<!-- menuList -->
		<view class="content-item border-box pa-md flex-jst-start flex-ali-start flex-wrap" :class="langFlex">
			<view class="menu-item flex-column flex-jst-start flex-ali-center" v-for="k in menuList">
				<u-icon custom-prefix="iconfont" :name="k.iconName" :style="{color: k.color}" size="55"></u-icon>
				<text class="text-12">{{$t(`pullPage.${k.keyName}`)}}</text>
			</view>
		</view>
		<!-- tabbar-->
		<view class='tab-add'></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'coin',
		components: {
			cusTabbar
		},
		data() {
			return {
				show: true,
				personal: {
					subordinate: {
						data: [],
						count: 0
					}
				},
				menuList: [
					{ keyName: 'total', iconName: 'weibiaoti--31', color: '#E74C3C', path: '' },
					{ keyName: 'order', iconName: 'weibiaoti--33', color: '#3498DB', path: '' },
					{ keyName: 'record', iconName: 'weibiaoti--50', color: '#F39C12', path: '' },
					{ keyName: 'link', iconName: 'ABSxitong-weixintubiao', color: '#00BE87', path: '' },
					{ keyName: 'picture', iconName: 'weibiaoti--28', color: '#9B59B6', path: '' },
				]
			}
		},
		watch: {},
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			langFlexEn () {
				return this.lang !== 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			pageName() {
				return this._i18n.messages[this.lang].pullPage.pageName
			}
		},
		onShow() {
			this.queryInfo()
		},
		methods: {
			...mapActions(['checkLogin']),
			toPath (path) {
				uni.navigateTo({
					url: path
				})
			},
			async queryInfo() {
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
						if (res.success) {
							vm.personal = res.data
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
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
	.page {
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

		.content-item {
			width: 90%;
			background: #FFFFFF;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			margin: 15px auto;
			&.content {
				margin: -260rpx auto 0 auto;
				padding: 48.61rpx 41.66rpx;
			}
			.menu-item{
				width: 33%;
				margin-bottom: 27rpx;
			}
			.junior-container{
				position: relative;
				.junior-item{
					border-radius: 50%;
					border: 2px solid #FFFFFF;
					position: relative;
					&:not(:first-child){
						margin-left: -38rpx;
					}
				}
			}
		}
	}
</style>
