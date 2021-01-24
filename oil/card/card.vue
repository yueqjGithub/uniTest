<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center">
				<u-icon name="ditujiayouzhan" size="90" class="text-primary" custom-prefix="iconfont"></u-icon>
			</view>
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="name" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}" placeholder-style="color: #aaaaaa"
				 :placeholder="$t('oilCard.nameTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="id_card" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('oilCard.idcardTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="oil_card" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('oilCard.oilcardTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
			<view class="full-width input-item pa-col-sm border-box">
				<u-input v-model="mobile" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('oilCard.mobileTips')" type="text"></u-input>
			</view>
			<view class="pa-md"></view>
<!-- 			<view class="full-width input-item pa-col-sm border-box flex-jst-btw flex-ali-center" :class="langFlex">
				<u-input v-model="valiCode" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('oilCard.codeTips')" type="text"></u-input>
				<text class="text-primary text-12">{{codeShow}}</text>
			</view> -->
			<view class="pa-col-lg full-width flex-row flex-jst-center flex-ali-start">
				<u-radio-group v-model="cardType" :wrap="false" class="full-width" width="50%" active-color="#23AF8C"
				 :label-disabled="false">
					<u-radio v-for="(item, index) in oilList" :key="index" :name="item.oil_card_number">
						<image :src="item.thumb_image" mode="aspectFill" class="oil-logo"></image>
					</u-radio>
				</u-radio-group>
			</view>
			<view class="full-width pa-row-lg border-box flex-row flex-jst-center">
				<button type="default" class="my-btn-primary text-white text-14" @click="addCard">{{$t('basic.submit')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'card',
		data() {
			return {
				name: '',
				id_card: '',
				oil_card: '',
				cardType: '',
				valiCode: '',
				codeTime: 60,
				mobile: '',
				regExps: {
					idcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
				}
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].oilCard.pageName
						})
					}
				}
			}
		},
		onShow () {
			if (this.curOilCard) {
				this.cardType = this.curOilCard.oil_card_number
				this.name = this.curOilCard.user_name
				this.mobile = this.curOilCard.mobile
				this.id_card = this.curOilCard.id_card
				this.oil_card = this.curOilCard.oil_card
			}
		},
		computed: {
			...mapState(['lang', 'oilList', 'curOilCard']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			codeShow() {
				let result = ''
				if (this.codeTime === 60) {
					result = this._i18n.messages[this.lang].basic.getValiCode
				} else {
					result = `${this.codeTime}s`
				}
				return result
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			async addCard() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						name: vm.name,
						id_card: vm.id_card,
						oil_card: vm.oil_card,
						// code: vm.valiCode,
						oil_card_number: vm.cardType,
						mobile: vm.mobile
					}
					for (let k in obj) {
						if (!obj[k]) {
							this.$refs.uTips.show({
								title: this._i18n.messages[this.lang].basic.notFill,
								type: 'error',
								duration: '2300'
							})
							return false
						}
					}
					if (vm.curOilCard.id) {
						obj.id = vm.curOilCard.id
					}
					uni.showLoading()
					vm.$post(urls.addOilCard, obj).then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.success) {
							uni.showToast({
								icon: 'success',
								title: vm._i18n.messages[vm.lang].basic.success,
								success: () => {
									uni.navigateBack({
										delta: 1
									})
								}
							})
						} else {
							vm.$refs.uTips.show({
								title: res.message,
								type: 'error',
								duration: '2300'
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

			.oil-logo {
				width: 15vw;
				height: 15vw;
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
