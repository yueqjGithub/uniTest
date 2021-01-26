<template>
	<view class="page bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="head-bg"></view>
		<view class="cont-item pa-md flex-column flex-jst-center flex-ali-center">
			<view class="full-width border-box flex-row flex-jst-btw flex-ali-center">
				<view class="menu-item flex-column flex-jst-center flex-ali-center" v-for="k in menuList" :key="k.label" :class="menuChoose === k.label ? 'menu-choose' : ''"
				 @click="menuClickHandler(k)">
					<u-icon custom-prefix="iconfont" :name="k.icon" size="55" :color="k.color"></u-icon>
					<text class="text-12">{{$t(`oilCenter.${k.label}`)}}</text>
				</view>
			</view>
			<view class="pa-col-md full-width flex-row flex-jst-btw flex-ali-center card-list">
				<view class="card-item pa-row-md border-box flex-row flex-jst-center flex-ali-center" v-for="k in oilList" :key="k.id"
				 :class="curOilType === k.oil_card_number ? 'type-choose' : ''" @click="chooseType(k.oil_card_number)">
					<image :src="k.thumb_image" mode="aspectFill" class="oil-logo ma-col-sm"></image>
					<u-icon custom-prefix="iconfont" name="xuanze" size="35" class="type-icon"></u-icon>
				</view>
			</view>
			<view class="pa-col-md border-box full-width flex-jst-start flex-ali-center text-12" :class="langFlex">{{$t('oilCenter.priceChoose')}}</view>
			<view class="full-width flex-row flex-wrap flex-jst-start flex-ali-start price-list">
				<view v-for="k in priceList" :key="k.shop_number" class="price-item pa-md border-box flex-column flex-jst-center flex-ali-center"
				 @click="choosePrice = k.shop_number" :class="k.shop_number === choosePrice ? 'choose-price' : ''">
					<view class="flex-row flex-jst-center flex-ali-base">
						<text class="text-12 text-bold">￥</text>
						<text class="text-18 text-bold">{{k.denomination}}</text>
					</view>
					<text class="discount text-12 text-bold">{{$t('store.discount')}}</text>
					<text class="discount text-12 text-bold">{{k.price}}</text>
				</view>
			</view>
			<!-- 用户协议 -->
<!-- 			<view class="pa-sm"></view>
			<view class="full-width flex-jst-start flex-ali-center pa-col-md no-ma-checkbox" :class="langFlex">
				<u-checkbox-group active-color="#00BE88" shape="circle">
					<u-checkbox v-model="sure" name="true"></u-checkbox>
				</u-checkbox-group>
				<text class="text-12 text-grey-1 ma-row-sm">{{$t('electricIndex.makeSure')}}</text>
			</view> -->
			<!-- 按钮 -->
			<view class="pa-row-lg ma-col-md border-box full-width flex-row flex-jst-center flex-ali-center">
				<button type="default" class="my-btn-primary text-white text-14" @click="doCharge">{{$t('basic.charge')}}</button>
			</view>
			<!-- 选择卡 -->
			<u-popup v-model="showModal" mode="center" width="580" height="auto" border-radius="15">
				<card-list v-if="showModal" :priceId="priceId" @closeModal='closeModal'></card-list>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import cardList from './cardList.vue'
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		name: 'center',
		components: {
			cardList
		},
		data() {
			return {
				showModal: false,
				menuChoose: 'charge',
				sure: false,
				menuList: [{
						label: 'addCard',
						icon: 'weibiaoti--12',
						color: '#f89913',
						path: '/oil/card/card'
					},
					{
						label: 'cardList',
						icon: 'xinyongqiahuankuan',
						color: '#3998d6',
						path: '/oil/myCard/myCard'
					},
					{
						label: 'charge',
						icon: 'weibiaoti--31',
						color: '#23AF8C'
					}
				],
				priceList: [],
				choosePrice: ''
			}
		},
		computed: {
			...mapState(['lang', 'oilList', 'curOilType']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			priceId () {
				return this.choosePrice
			}
		},
		onShow () {
			this.queryPirceList()
		},
		watch: {
			lang: {
				immediate: true,
				handler: function (val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].oilCenter.pageName
						})
					}
				}
			},
			curOilType: {
				immediate: false,
				handler: function(val) {
					if (val !== '') {
						this.queryPirceList()
					}
				}
			}
		},
		methods: {
			...mapMutations(['setOilType']),
			...mapActions(['checkLogin']),
			closeModal () {
				this.showModal = false
			},
			doCharge () {
				const vm = this
				if (vm.choosePrice === '') {
					this.$refs.uTips.show({
						title: this._i18n.messages[this.lang].oilCenter.priceChoose,
						type: 'error',
						duration: '2300'
					})
					return false
				}
				// if (!vm.sure) {
				// 	this.$refs.uTips.show({
				// 		title: this._i18n.messages[this.lang].basic.aggrement,
				// 		type: 'error',
				// 		duration: '2300'
				// 	})
				// 	return false
				// }
				vm.showModal = true
			},
			menuClickHandler(target) {
				if (target.path) {
					uni.navigateTo({
						url: target.path
					})
				}
			},
			chooseType(id) {
				this.setOilType(id)
			},
			async queryPirceList() {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						oil_card_number: vm.curOilType
					}
					vm.$post(urls.queryOilPrice, obj).then(res => {
						if (res.success) {
							vm.priceList = [...res.data]
						}
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
			padding: 55.55rpx;

			.menu-item {
				&.menu-choose {
					color: $uni-color-primary;

					text {
						border-bottom: 2px solid $uni-color-primary;
					}
				}
			}

			.card-list {
				.oil-logo {
					width: 15vw;
					height: 15vw;
				}

				.card-item {
					width: 48%;
					border: 1px solid #d5d5d5;
					color: #d5d5d5;
					border-radius: 13.88rpx;
					position: relative;

					.type-icon {
						position: absolute;
						right: 4px;
						top: 4px;
					}

					&.type-choose {
						border: 1px solid #23AF8C;
						color: #23AF8C;
					}
				}
			}

			.price-list {
				.price-item {
					width: 32%;
					// height: calc((90vw - 55.4rpx) * 0.28);
					border-radius: 10.41rpx;
					border: 1px solid #d5d5d5;
					margin-bottom: 7px;

					.discount {
						color: #d5d5d5;
					}

					&:nth-child(3n-1) {
						margin-left: 2%;
						margin-right: 2%;
					}

					&.choose-price {
						border: 1px solid #23AF8C;
						color: #23AF8C;

						.discount {
							color: #23AF8C;
						}
					}
				}
			}
		}
	}
</style>
