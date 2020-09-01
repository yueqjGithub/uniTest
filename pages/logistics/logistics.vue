<template>
	<view class="log-container bg-grey">
		<view class="log-bg"></view>
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="log-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="icon-35" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<view class="delivery-name text-primary text-14 full-width text-center ma-col-md">{{deliveryName}}</view>
			<view class="text-grey-1 full-width text-14 text-center pa-col-sm">ID:{{info.delivery_number}}</view>
			<view class="tell-container pa-md flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-white" @click="callDelivery">
					<view class="flex-row flex-nowrap flex-jst-center flex-ali-center">
						<u-icon name="tianchongxing-21" custom-prefix="iconfont" size="38" class="text-white"></u-icon>
						<text class="text-white text-14 ma-row-sm">{{$t('logistics.call')}}</text>
					</view>
				</button>
			</view>
			<view class="gap"></view>
			<view class="step-list" v-if="info.content">
				<view v-for="(k, index) in info.content" :key="index" class="step-item full-width flex-jst-start flex-ali-start" :class="langFlex">
					<view class="step-time text-grey-1 text-12">{{k.time}}</view>
					<view class="step-gap">
						<u-icon name="zhengque1" custom-prefix="iconfont" size="35" class="step-icon step-cur text-primary bg-white" v-if="index === 0"></u-icon>
						<view class="step-icon step-normal bg-primary" v-if="index === 1"></view>
					</view>
					<view class="flex-jst-start flex-ali-start full-height flex-1 text-12">{{k.context}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				info: ''
			}
		},
		computed: {
			...mapState(['lang', 'curOrderNumber']),
			deliveryName () {
				let result = ''
				if (this.info) {
					result = this.lang === 'zh-CN' ? this.info.delivery_name_cn : this.info.delivery_name
				}
				return result
			},
			langFlex () {
				return this.lang === "zh-CN" ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].logistics.pageName
					});
				}
			}
		},
		onShow () {
			this.queryInfo()
		},
		methods: {
			async queryInfo () {
				const vm = this
				const token = uni.getStorageSync('token')
				const obj = {
					token: token,
					order_number: vm.curOrderNumber
				}
				vm.$post(urls.logistics, obj).then(res => {
					if (res.success) {
						vm.info = res.data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			},
			callDelivery () {
				const vm = this
				uni.makePhoneCall({
				    phoneNumber: vm.info.mobile
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.log-container{
	width: 100%;
	min-height: 100vh;
	padding-top: 40rpx;
	.log-bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 380rpx;
		background: linear-gradient(0deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vh 7vh;
		border-bottom-right-radius: 50vh 7vh;
		z-index: 1;
	}
	.content-container{
		position: relative;
		z-index: 2;
		padding: 56.25rpx 51.38rpx;
		width: 94%;
		margin: 0 auto;
		box-sizing: border-box;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
		background: #FFFFFF;
		.log-icon{
			border:1px solid rgba(207, 207, 207, 1);
			border-radius: 13.88rpx;
			width: 138.88rpx;
			height: 138.88rpx;
		}
		.tell-container{
			width: 80%;
			margin: auto;
		}
		.gap{
			width: 90%;
			margin: 55.55rpx auto;
			height: 1px;
			background: #cfcfcf;
		}
		.step-list{
			width: 90%;
			margin: auto;
			.step-item{
				height: 54px;
				.step-time{
					width: 30%;
				}
				.step-gap{
					margin: 0 35rpx;
					height: 100%;
					width: 2px;
					background-color: $uni-color-primary;
					position: relative;
					.step-icon{
						position: absolute;
						top: 0;
						left: 50%;
						transform: translate(-50%, 0);
					}
					.step-cur{
					}
					.step-normal{
						width: 20rpx;
						height: 20rpx;
						border-radius: 100%;
					}
				}
			}
		}
	}
}
</style>
