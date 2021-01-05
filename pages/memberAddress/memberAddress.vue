<template>
	<view class="address-container bg-grey">
		<view class="head-bg"></view>
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="map-fill" size="90" class="text-primary"></u-icon>
			</view>
			<text class="form-tips full-width text-center">{{$t('address.formTips')}}</text>
			<u-form :model="form" ref="myForm" class='full-width' :label-width="0" label-position="top" :error-type="errorType">
				<u-form-item prop="address">
					<u-input v-model="form.address" type="text" :class="rightClass" :border="true" class="my-input" :placeholder="addressTips"
					 placeholder-style="font-family: 'cusFont','yahei'"></u-input>
				</u-form-item>
				<u-form-item prop="addressee">
					<u-input v-model="form.addressee" type="text" :class="rightClass" :border="true" class="my-input" :placeholder="nameTips"
					 placeholder-style="font-family: 'cusFont','yahei'"></u-input>
				</u-form-item>
				<u-form-item prop="mobile">
					<u-input v-model="form.mobile" type="phone" :class="rightClass" :border="true" class="my-input" :placeholder="phoneTips"
					 placeholder-style="font-family: 'cusFont','yahei'"></u-input>
				</u-form-item>
			</u-form>
			<view class="full-width pa-md flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-white" @click="subAddress" :disabled="loading" :loading="loading">{{$t('address.btn')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'memberAddress',
		data() {
			return {
				loading: false,
				address_number: '', // 当前编辑的收件人编号，编辑时传递，从vuex中获取
				form: {
					address: '',
					addressee: '', // 姓名
					mobile: ''
				},
				rules: {
					address: [{
						required: true,
						trigger: 'blur'
					}],
					addressee: [{
						required: true,
						trigger: 'blur'
					}],
					mobile: [{
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						trigger: ['change', 'blur']
					}]
				},
				errorType: ['border']
			};
		},
		computed: {
			...mapState(['lang', 'curAddress']),
			addressTips() {
				return this._i18n.messages[this.lang].address.addressTips
			},
			nameTips() {
				return this._i18n.messages[this.lang].address.nameTips
			},
			phoneTips() {
				return this._i18n.messages[this.lang].address.phoneTips
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].address.pageName
					});
				}
			}
		},
		onReady() {
			this.$refs.myForm.setRules(this.rules);
			this.queryInfo()
		},
		methods: {
			async queryInfo() {
				const vm = this
				const token = await uni.getStorageSync('token')
				const obj = {
					token: token
				}
				uni.showLoading({
					title: ''
				});
				vm.$post(urls.getAddressList, obj).then(res => {
					if (res.success) {
						if (res.data.address) {
							this.address_number = res.data.address_number
							this.form.address = res.data.address
							this.form.addressee = res.data.addressee // 姓名
							this.form.mobile = res.data.mobile
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message
						})
					}
					uni.hideLoading()
				})
			},
			async subAddress() {
				const vm = this
				const token = await uni.getStorageSync('token')
				this.$refs.myForm.validate().then(valid => {
					if (valid) {
						const obj = {
							...vm.form,
							token: token
						}
						if (vm.address_number) {
							obj['address_number'] = vm.address_number
						}
						vm.loading = true
						vm.$post(urls.editAddress, obj).then(res => {
							if (res.success) {
								vm.loading = false
								uni.showToast({
									icon: 'success'
								})
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							} else {
								vm.loading = false
								uni.showToast({
									icon: 'none',
									title: res.message
								})
							}
						}, err => {
							vm.loading = false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-container {
		width: 100%;
		min-height: 100vh;
		padding-top: 100rpx;

		.head-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 356.8rpx;
			border-bottom-left-radius: 50vw 7vh;
			border-bottom-right-radius: 50vw 7vh;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
		}

		.content-container {
			position: relative;
			z-index: 2;
			background: #ffffff;
			margin: 0 auto;
			box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
			border-radius: 20.83rpx;
			width: 90%;
			box-sizing: border-box;
			padding: 83.33rpx 55.55rpx;

			.text-right {
				input {
					text-align: right !important;
				}
			}

			.address-icon {
				border: 1px solid rgba(207, 207, 207, 1);
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}

			.form-tips {
				font-size: 14px;
				color: #aaaaaa;
				margin: 16px auto;
			}
		}
	}
</style>
