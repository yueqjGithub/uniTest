<template>
	<view class="page bg-grey">
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
			<view class="full-width input-item pa-col-sm border-box flex-jst-btw flex-ali-center" :class="langFlex">
				<u-input v-model="oil_card" :class="inputClass" :custom-style="{color: '#aaaaaa', fontSize: '14px'}"
				 placeholder-style="color: #aaaaaa" :placeholder="$t('oilCard.codeTips')" type="text"></u-input>
				 <text class="text-primary text-12">{{codeShow}}</text>
			</view>
			<view class="pa-col-lg full-width flex-row flex-jst-center flex-ali-start">
				<u-radio-group v-model="cardType" :wrap="false" class="full-width" width="50%"
				 active-color="#23AF8C" :label-disabled="false">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.value">
						<image :src="item.url" mode="aspectFill" class="oil-logo"></image>
					</u-radio>
				</u-radio-group>
			</view>
			<view class="full-width pa-row-lg border-box flex-row flex-jst-center">
				<button type="default" class="my-btn-primary text-white text-14">{{$t('basic.submit')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'card',
		data() {
			return {
				name: '',
				id_card: '',
				oil_card: '',
				cardType: 1,
				codeTime: 60,
				typeList: [{
						url: '../../static/images/oil1.png',
						value: 1
					},
					{
						url: '../../static/images/oil2.png',
						value: 2
					},
				],
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
		computed: {
			...mapState(['lang']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			codeShow () {
				let result = ''
				if (this.codeTime === 60) {
					result = this._i18n.messages[this.lang].basic.getValiCode
				} else {
					result = `${this.codeTime}s`
				}
				return result
			}
		},
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
