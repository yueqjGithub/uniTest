<template>
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="shuidian" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<!-- 区域选择 -->
			<view class="pa-md"></view>
			<view class="full-width input-item flex-jst-btw flex-ali-center pa-col-md border-box" @click="showArea = true"
			 :class="langFlex">
				<view class="text-14 text-grey-1">{{address.label || $t('electricIndex.addressTips')}}</view>
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey-1"></u-icon>
			</view>
			<!-- 机构选择 -->
			<view class="pa-md"></view>
			<view class="full-width input-item flex-jst-btw flex-ali-center pa-col-md border-box" @click="showCompany = true"
			 :class="langFlex">
				<view class="text-14 text-grey-1">{{company.label || $t('electricIndex.companyTips')}}</view>
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="30" :class="transIcon" class="text-grey-1"></u-icon>
			</view>
			<!-- 电卡号输入 -->
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="cardNumber" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('electricIndex.numberTips')" type="text"></u-input>
			</view>
			<!-- 用户协议 -->
			<view class="pa-sm"></view>
			<view class="full-width flex-jst-start flex-ali-center pa-col-md no-ma-checkbox" :class="langFlex">
				<u-checkbox-group active-color="#00BE88" shape="circle">
					<u-checkbox v-model="sure" name="true"></u-checkbox>
				</u-checkbox-group>
				<text class="text-12 text-grey-1 ma-row-sm">{{$t('electricIndex.makeSure')}}</text>
			</view>
			<!-- 提交按钮 -->
			<view class="pa-lg border-box full-width flex-row flex-jst-center flex-ali-center">
				<button type="normal" class="my-btn-primary text-white text-14"
				 :disabled="!couldSubmit" @click="toDetail">{{$t('basic.ok')}}</button>
			</view>
		</view>
		<!-- 选择器区域 -->
		<!-- 地区选择 -->
		<u-select v-model="showArea" :list="areaPicker" :confirm-text="$t('basic.ok')" :cancel-text="$t('basic.cancel')"
		 :default-value="[0]" confirm-color="#00BE88" @confirm="chooseArea"></u-select>
		<!-- 机构选择 -->
		<u-select v-model="showCompany" :list="companyPicker" :confirm-text="$t('basic.ok')" :cancel-text="$t('basic.cancel')"
		 :default-value="[0]" confirm-color="#00BE88" @confirm="chooseCompany"></u-select>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'electicIndex',
		data() {
			return {
				address: undefined,
				areaList: [],
				showArea: false,
				company: undefined,
				companyList: [],
				showCompany: false,
				cardNumber: '',
				sure: false,
				pass: false
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].electricIndex.pageName
						})
					}
				}
			},
			cardNumber: {
				immediate: false,
				handler: function(val) {
					const vm = this
					setTimeout(function() {
						if (vm.cardNumber === val && vm.cardNumber !== '') {
							vm.queryInfoByCard()
						}
					}, 1200)
				}
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
			transIcon() {
				return this.lang === 'zh-CN' ? 'tran-icon' : ''
			},
			areaPicker() {
				const result = []
				if (this.areaList.length > 0) {
					this.areaList.forEach(item => {
						const name = this.lang === 'zh-CN' ? item.name_cn : item.name
						result.push({
							label: name,
							value: item.id
						})
					})
				}
				return result
			},
			areaPicker() {
				const result = []
				if (this.areaList.length > 0) {
					this.areaList.forEach(item => {
						const name = this.lang === 'zh-CN' ? item.name_cn : item.name
						result.push({
							label: name,
							value: item.id
						})
					})
					this.address = result[0]
				}
				return result
			},
			companyPicker() {
				const result = []
				if (this.companyList.length > 0) {
					this.companyList.forEach(item => {
						const name = this.lang === 'zh-CN' ? item.name_cn : item.name
						result.push({
							label: name,
							value: item.id
						})
					})
					this.company = result[0]
				}
				return result
			},
			couldSubmit() {
				return this.sure && this.pass
			}
		},
		onShow() {
			this.queryAreaList()
			this.queryCompanyList()
		},
		methods: {
			...mapActions(['checkLogin']),
			queryAreaList() { // 请求地址列表
				const vm = this
				uni.showLoading()
				vm.$get(urls.electricAreaList, {}).then(res => {
					uni.hideLoading()
					if (res.success) {
						vm.areaList = [...res.data]
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				}, err => {
					uni.hideLoading()
				})
			},
			queryCompanyList() { // 请求缴费机构列表
				const vm = this
				uni.showLoading()
				vm.$get(urls.electricCompanyList, {}).then(res => {
					uni.hideLoading()
					if (res.success) {
						vm.companyList = [...res.data]
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
				}, err => {
					uni.hideLoading()
				})
			},
			chooseArea(val) {
				const vm = this
				vm.address = val[0]
			},
			chooseCompany(val) {
				const vm = this
				vm.company = val[0]
			},
			async queryInfoByCard() { // 根据用户输入卡号查询相关信息
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						number: vm.cardNumber,
						address_name: vm.address.value,
						corporation_name: vm.company.value
					}
					uni.showLoading()
					vm.$post(urls.queryByCard, obj).then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.success) {
							vm.$store.commit('setCurElectricDetail', res.data)
							vm.pass = true
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
			},
			toDetail() {
				uni.navigateTo({
					url: '/electric/detail/detail'
				})
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
			padding: 83.33rpx 55.55rpx;

			.address-icon {
				border: 1px solid rgba(207, 207, 207, 1);
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}

			.input-item {
				border-bottom: 1px solid #D3D3D3;

				.tran-icon {
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
