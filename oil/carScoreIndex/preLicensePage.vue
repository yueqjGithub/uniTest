<template>
	<view class="pre-license full-width  ma-col-md">
		<view class="pa-lg border-box scan-container flex-column flex-jst-center" :class="lang === 'zh-CN' ? 'flex-ali-start' : 'flex-ali-end'"
		 v-if='licenseList[0]'>
			<view class="flex-jst-start flex-ali-start ma-col-sm" :class="langFlex">
				<text class="labels text-12 text-grey-1 ma-rt-5" :class="rightClass">{{$t('carCenter.licenseNumber')}}</text>
				<text class="text-12 text-bold" :class="rightClass">{{licenseList[0].idcard}}</text>
			</view>
			<view class="flex-jst-start flex-ali-start ma-col-sm" :class="langFlex">
				<text class="labels text-12 text-grey-1 ma-rt-5" :class="rightClass">{{$t('carCenter.fileNumber')}}</text>
				<text class="text-12 text-bold" :class="rightClass">{{licenseList[0].drivers_license_number}}</text>
			</view>
			<view class="ma-col-md full-width my-split"></view>
			<view class="pa-row-md border-box full-width flex-row flex-jst-center flex-ali-center">
				<view class="action flex-row flex-jst-center flex-ali-center" @click='removeLicense'>
					<u-icon name="weibiaoti--32" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
				<view class="action flex-row flex-jst-center flex-ali-center" @click='edit'>
					<u-icon name="weibiaoti--67" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
			</view>
		</view>
		<!-- 用户协议 -->
		<!-- 		<view class="pa-sm"></view>
		<view class="full-width flex-jst-start flex-ali-center pa-col-md no-ma-checkbox" :class="langFlex" v-if='licenseList[0]'>
			<u-checkbox-group active-color="#00BE88" shape="circle">
				<u-checkbox v-model="sure" name="true"></u-checkbox>
			</u-checkbox-group>
			<text class="text-12 text-grey-1 ma-row-sm">{{$t('electricIndex.makeSure')}}</text>
		</view> -->
		<!-- 按钮 -->
		<view class="pa-row-lg ma-col-md border-box full-width flex-row flex-jst-center flex-ali-center" v-if='licenseList[0]'>
			<button type="default" class="my-btn-primary text-white text-14" @click="searchInfo">{{$t('basic.search')}}</button>
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
		name: 'preLicensePage',
		data() {
			return {
				sure: false,
				licenseNumber: '',
				fileNumber: ''
			}
		},
		props: {
			licenseList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			...mapState(['lang', 'curDrivingLicense']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			rightClass() {
				return this.lang === 'zh-CN' ? 'text-left' : 'text-right'
			}
		},
		mounted() {},
		methods: {
			...mapActions(['checkLogin']),
			removeLicense() {
				this.$emit('remove')
			},
			edit() {
				this.$emit('edit')
			},
			async searchInfo() {
				const vm = this
				let content = null
				if (vm.licenseList.length < 1) {
					content = {
						type: 'error',
						title: vm._i18n.messages[vm.lang].addLicense.noLicense
					}
					vm.$emit('showTip', content)
					return false
				}
				// if (!vm.sure) {
				// 	content = {
				// 		type: 'error',
				// 		title: vm._i18n.messages[vm.lang].basic.aggrement
				// 	}
				// 	vm.$emit('showTip', content)
				// 	return false
				// }
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						licenseid: vm.licenseList[0].idcard,
						licensenumber: vm.licenseList[0].drivers_license_number
					}
					uni.showLoading()
					vm.$post(urls.kfSearch, obj).then(res => {
						uni.hideLoading()
						console.log(res)
						if (res.data.score) {
							obj.score = res.data.score
							vm.$u.route({
								url: '/oil/myDrivingLicense/myDrivingLicense',
								params: obj
							})
						} else {
							vm.$emit('showTip', {type: 'error', title: vm._i18n.messages[vm.lang].basic.faild})
						}
					}, err => {
						uni.hideLoading()
						console.log(err)
						vm.$emit('showTip', {type: 'error', title: vm._i18n.messages[vm.lang].basic.faild})
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
	.pre-license {
		.scan-container {
			border-radius: 10.41rpx;
			border: 1px solid #efefef;

			.labels {
				width: 150rpx;
			}

			.my-split {
				height: 1px;
				background: #efefef;
			}

			.action {
				margin-left: 10px;
				margin-right: 10px;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 1px solid #d5d5d5;
			}
		}
	}
</style>
