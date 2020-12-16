<template>
	<!-- 乘客信息添加修改 -->
	<view class="page bg-grey">
		<view class="head-bg"></view>
		<!-- 内容 -->
		<view class="content-container flex-column flex-jst-start flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center" @click="upload">
				<u-icon name="camera-fill" size="90" class="text-primary"></u-icon>
			</view>
			<text class="text-14 ma-col-sm text-grey-1 text-center">{{$t('contact.idCardTips')}}</text>
			<u-form :border-bottom="false" :model="form" ref="myForm" class='full-width' :label-width="0" label-position="top" :error-type="errorType">
				<u-form-item prop="pis_id_card">
					<u-input v-model="form.pis_id_card" type="text" :class="rightClass" :border="true" class="my-input" :placeholder="numberTips"></u-input>
				</u-form-item>
				<u-form-item prop="pis_full_name">
					<u-input v-model="form.pis_full_name" type="text" :class="rightClass" :border="true" class="my-input" :placeholder="nameTips"></u-input>
				</u-form-item>
				<u-form-item prop="birthday">
					<u-input :disabled="true" v-model="form.birthday" type="phone" :class="rightClass" :border="true" class="my-input"
					 :placeholder="birthTips" @click="openTimePicker(0)"></u-input>
				</u-form-item>
				<u-form-item prop="pis_expire_date">
					<u-input :disabled="true" v-model="form.pis_expire_date" type="phone" :class="rightClass" :border="true" class="my-input"
					 :placeholder="expireTip" @click="openTimePicker(1)"></u-input>
				</u-form-item>
			</u-form>
			<!-- 提交按钮 -->
			<view class="full-width pa-md ma-top-5 flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-white text-14" @click="subInfo" :disabled="loading" :loading="loading">{{$t('basic.ok')}}</button>
			</view>
		</view>
		<!-- 说明 -->
		<view class="contact-tip flex-column flex-jst-start flex-ali-start pa-col-md uni-border">
			<view class="full-width tip-tit text-14 text-bold" :class="rightClass">{{$t('basic.tip')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('contact.tip1')}}</view>
			<view class="full-width text-12 text-grey-1 ma-col-sm" :class="rightClass">{{$t('contact.tip2')}}</view>
		</view>
		<!-- 时间选择弹出 -->
		<u-picker
		mode="time"
		v-model="showTimePicker"
		@confirm="timeConfirm"
		:confirm-text="okText"
		:cancel-text="cancelText"
		:show-time-tag="false"
		></u-picker>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import {
		mapState,
		mapActions
	} from 'vuex'
	import dayjs from 'dayjs'
	export default {
		name: 'passenger',
		data() {
			return {
				showTimePicker: false,
				timePickerTarget: 0, // 0-生日，1-有效期
				loading: false,
				pis_number: '', // 修改时传递
				form: {
					pis_id_card: '',
					pis_full_name: '', // 姓名
					birthday: '',
					pis_expire_date: '' // 有效期
				},
				rules: {
					pis_id_card: [{
						required: true,
						trigger: 'blur'
					}],
					pis_full_name: [{
						required: true,
						trigger: 'blur'
					}],
					birthday: [{
						required: true,
						trigger: 'blur'
					}],
					pis_expire_date: [{
						required: true,
						trigger: 'blur'
					}]
				},
				errorType: ['border']
			}
		},
		computed: {
			...mapState(['lang']),
			okText () {
				return this._i18n.messages[this.lang].basic.ok
			},
			cancelText () {
				return this._i18n.messages[this.lang].basic.cancel
			},
			rightClass() {
				return this.lang === 'zh-CN' ? '' : 'my-text-right'
			},
			numberTips() {
				return this._i18n.messages[this.lang].contact.cardNumberTips
			},
			nameTips() {
				return this._i18n.messages[this.lang].contact.nameTips
			},
			birthTips() {
				return this._i18n.messages[this.lang].contact.birthTips
			},
			expireTip() {
				return this._i18n.messages[this.lang].contact.expireTip
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].contact.titTip
					});
				}
			}
		},
		onReady() {
			this.$refs.myForm.setRules(this.rules);
			this.initInfo()
		},
		methods: {
			...mapActions(['checkLogin']),
			async initInfo () {
				const vm = this
				uni.showLoading({
					title: ''
				})
				const token = await vm.checkLogin()
				if (token) {
					let obj = {
						token: token
					}
					vm.$post(urls.queryContact, obj).then(res => {
						uni.hideLoading()
						if (res.data.length > 0 ) {
							for (let k in vm.form) {
								vm.form[k] = res.data[0][k]
							}
							vm.pis_number = res.data[0].pis_number
						}
					}, err => {
						uni.hideLoading()
					})
				} else {
					uni.hideLoading()
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			upload() { // 上传识别
				const vm = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success(res) {
						uni.showLoading({
							title: ''
						})
						uni.uploadFile({
							url: `${urls.baseUrl}${urls.uploadIdcard}?type=1`,
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(response) {
								const data = JSON.parse(response.data)
								const result = data.data.idcard || ''
								if (vm.$u.test.object(result)) {
									vm.form.pis_full_name = result.name
									vm.form.birthday = result.birth
									vm.form.pis_id_card = result.number
								} else {
									uni.showToast({
										icon: 'none',
										title: result
									})
								}
							},
							fail(errMsg) {
								uni.showToast({
									icon: 'none',
									title: vm._i18n.messages[vm.lang].contact.uploadFail
								})
							},
							complete() {
								uni.hideLoading()
							}
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			openTimePicker(target) { // 打开时间选择
				const vm = this
				vm.timePickerTarget = target
				vm.showTimePicker = true
			},
			timeConfirm(result) { // 时间选择
				const vm = this
				if (vm.timePickerTarget === 0) {
					vm.form.birthday = `${result.year}-${result.month}-${result.day}`
				} else {
					vm.form.pis_expire_date = `${result.year}-${result.month}-${result.day}`
				}
			},
			async subInfo () {
				const vm = this
				const token = await uni.getStorageSync('token')
				this.$refs.myForm.validate().then(valid => {
					if (valid) {
						const obj = {
							...vm.form,
							token: token
						}
						if (vm.pis_number) {
							obj['pis_number'] = vm.pis_number
						}
						vm.loading = true
						vm.$post(urls.saveContact, obj).then(res => {
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
	.page {
		width: 100%;
		min-height: 100vh;

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
		}
		.contact-tip{
			width: 90%;
			margin: 0 auto;
		}
	}
</style>
