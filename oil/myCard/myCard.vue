<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center" v-for="(k, idx) in typeList" :key="idx">
			<image :src="k.thumb_image" mode="aspectFill" class="oil-logo"></image>
			<text class="text-grey-1 text-14">{{lang==='zh-CN' ? k.name_cn : k.name}}</text>
			<text class="text-grey-1 text-14">{{k.oil_card}}</text>
			<!-- <text class="text-grey-1 text-14">{{k.oil_card_number}}</text> -->
			<view class="pa-row-md border-box full-width flex-row flex-jst-center flex-ali-center">
				<view class="action flex-row flex-jst-center flex-ali-center" @click="chooseForDel(k)">
					<u-icon name="weibiaoti--32" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
				<view class="action flex-row flex-jst-center flex-ali-center" @click="editCard(k)">
					<u-icon name="weibiaoti--67" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
			</view>
		</view>
		<!-- 说明 -->
		<view class="contact-tip flex-column flex-jst-start flex-ali-start pa-col-md uni-border">
			<view class="full-width tip-tit text-14 text-bold" :class="rightClass">{{$t('basic.tip')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('oilIndex.tip1')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('oilIndex.tip2')}}</view>
		</view>
		<!-- 弹出 -->
		<u-modal v-model="delModal" :content="delTip" @confirm="delCard" :show-cancel-button="true" :confirm-text="$t('basic.ok')"
		 :cancel-text="$t('basic.cancel')"></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'oilIndex',
		data() {
			return {
				delModal: false,
				typeList: [],
				target: ''
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].oilIndex.pageName
						})
					}
				}
			}
		},
		computed: {
			...mapState(['lang', 'curOilType']),
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			},
			delTip() {
				return this._i18n.messages[this.lang].oilIndex.delConfirm
			}
		},
		onShow() {
			this.queryType()
		},
		methods: {
			...mapMutations(['setOilType', 'setOilCard']),
			...mapActions(['checkLogin']),
			chooseForDel(target) {
				this.target = target
				this.delModal = true
			},
			editCard(target) {
				this.setOilCard(target)
				uni.navigateTo({
					url: '/oil/card/card'
				})
			},
			async delCard() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						id: vm.target.id
					}
					uni.showLoading()
					vm.$post(urls.delOilCard, obj).then(res => {
						if (res.success) {
							vm.queryInfo()
						} else {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					}, err => {
						uni.hideLoading()
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			toCenter(id) {
				this.setOilType(id)
				uni.navigateTo({
					url: '/oil/center/center'
				})
			},
			async queryType() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						pagenum: 1,
						pagesize: 50
					}
					uni.showLoading()
					vm.$post(urls.queryOilCardList, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							vm.typeList = [...res.data.data]
						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					}, err => {
						uni.hideLoading()
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
		width: 100%;
		height: 100vh;
		padding-top: 17px;

		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 256.8rpx;
			border-bottom-left-radius: 50vw 5vh;
			border-bottom-right-radius: 50vw 5vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}

		.cont-item {
			position: relative;
			z-index: 2;
			width: 90%;
			margin: 50rpx auto;
			background: #FFFFFF;
			box-shadow: 0px 10px 24.3rpx 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;

			.oil-logo {
				width: 20vw;
				height: 20vw;
			}

			.action {
				margin-left: 5px;
				margin-right: 5px;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 1px solid #d5d5d5;
			}
		}

		.contact-tip {
			width: 90%;
			margin: 0 auto;
		}
	}
</style>
