<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center" v-for="k in typeList" :key="k.id">
			<image :src="k.thumb_image" mode="aspectFill" class="oil-logo"></image>
			<text class="text-grey-1 text-14 ma-col-md">{{lang==='zh-CN' ? k.name_cn : k.name}}</text>
			<!-- <text class="text-grey-1 text-14">{{k.oil_card_number}}</text> -->
			<view class="pa-row-md border-box full-width">
				<view class="pa-row-md flex-row flex-jst-center flex-ali-center">
					<button type="normal" class="my-btn-primary text-white text-12" @click="toCenter(k.oil_card_number)">{{$t('basic.charge')}}</button>
				</view>
			</view>
		</view>
		<!-- 说明 -->
		<view class="contact-tip flex-column flex-jst-start flex-ali-start pa-col-md uni-border">
			<view class="full-width tip-tit text-14 text-bold" :class="rightClass">{{$t('basic.tip')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('oilIndex.tip1')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('oilIndex.tip2')}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'oilIndex',
		data () {
			return {
				typeList: []
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].oilIndex.pageName
						})
					}
				}
			}
		},
		onShareAppMessage(res) {
			const result = getCurrentPages().pop()
			return {
				title: 'kolay',
				path: result.$page.fullPath
			}
		},
		computed: {
			...mapState(['lang']),
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			}
		},
		onShow () {
			this.queryType()
		},
		methods: {
			...mapMutations(['setOilType']),
			toCenter (id) {
				this.setOilType(id)
				uni.navigateTo({
					url: '/oil/center/center'
				})
			},
			queryType () {
				const vm = this
				uni.showLoading()
				vm.$get(urls.queryOilType, null).then(res => {
					uni.hideLoading()
					if (res.success) {
						vm.typeList = [...res.data]
						console.log(vm.typeList)
						vm.$store.commit('setOilList', vm.typeList)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				}, err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
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
		.cont-item{
			position: relative;
			z-index: 2;
			width: 90%;
			margin: 50rpx auto;
			background: #FFFFFF;
			box-shadow: 0px 10px 24.3rpx 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			.oil-logo{
				width: 20vw;
				height: 20vw;
			}
		}
		.contact-tip{
			width: 90%;
			margin: 0 auto;
		}
	}
</style>
