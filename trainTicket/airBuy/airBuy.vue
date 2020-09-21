<template>
	<view class="page bg-grey">
		<view class="back"></view>
		<view class="cus-gap"></view>
		<!-- ticket -->
		<view class="ticket-cont">
			<view class="ticket-date pa-lg flex-column flex-jst-center flex-ali-center">
				<text class="text-18 text-bold">{{date}}</text>
				<text class="text-14 text-grey-1">{{week}}</text>
			</view>
			<view class="ticket-ads pa-lg border-box flex-column flex-jst-center">
				<!-- ads第一排 -->
				<view class="full-width flex-jst-btw flex-ali-end" :class="langFlex">
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{startTime}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{curTrap.trap.run_time}}</text>
						</view>
					</view>
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-start ma-top-5" :class="langFlex">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?curTrap.trap.start_station_name_cn:curTrap.trap.start_station_name}}
					</text>
					<view class="flex-1"></view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?curTrap.trap.end_station_name_cn:curTrap.trap.end_station_name}}
					</text>
				</view>
				<!-- 第三排 -->
				<view class="full-width flex-jst-center flex-ali-center" :class="langFlex">
					<text class="text-grey-1 text-12">{{curTrap.trap.train_num}}</text>
					<text class="text-grey-1 text-12 ma-row-sm">/</text>
					<text class="text-grey-1 text-12">{{curTrap.trap.plane_cn_name}}</text>
				</view>
			</view>
			<!-- 价格显示 -->
			<view class="ticket-price pa-row-lg ma-col-md border-box flex-column flex-jst-center flex-ali-center">
				<text class="text-24 text-primary text-bold">￥{{curSeat.price}}</text>
				<text class="text-18 pa-col-sm text-bold">
					{{priceDetail}}
				</text>
			</view>
			<!-- 乘车人 -->
			<view class="ticket-person pa-lg border-box">
				<my-contact v-if="showPassenger" :commitSymbol="passengerControl" @commit="getPis"></my-contact>
			</view>
		</view>
		<!-- 联系人 -->
		<view :class="langFlex" class="bg-white ticket-contact flex-jst-start flex-ali-center pa-md border-box" @click="toContact">
			<u-icon custom-prefix="iconfont" name="weibiaoti--6" size="40" class="text-primary"></u-icon>
			<text>{{contact.name}}</text>
		</view>
		<view :class="langFlex" class="bg-white ticket-contact flex-jst-start flex-ali-center pa-md border-box" @click="toContact">
			<u-icon custom-prefix="iconfont" name="shouji1" size="40" class="text-primary"></u-icon>
			<text>{{contact.mobile}}</text>
		</view>
		<!-- 提交按钮 -->
		<view class="btn-container flex-row flex-jst-center flex-ali-center pa-md border-box full-width">
			<view class="flex-row flex-jst-center flex-ali-center width-80">
				<button type="default" class="my-btn-primary text-white text-14" @click="toOrder" v-if="buySuc">{{$t('train.buySuccess')}}</button>
				<button v-else type="default" class="my-btn-primary text-white text-14" @click="subOrder" :loading="btnLoading" :disabled="btnLoading">{{$t('basic.submit')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	import myContact from '../../cusComponents/contact/contact.vue'
	import dayjs from 'dayjs'
	export default {
		name: 'airBuy',
		components: {
			myContact
		},
		data() {
			return {
				showPassenger: false,
				passengerControl: true, // 点击提交时变更此值，控制contact组件提交乘客编号
				btnLoading: false,
				contact: {
					mobile: '', // 联系人电话
					name: '' // 联系人姓名
				},
				passenger: {
					pis_number: '',
					pis_id_card: '',
					pis_full_name: '' // 姓名
				},
				buySuc: false // 是否购买成功
			}
		},
		computed: {
			...mapState(['lang', 'curSeat', 'curTrap', 'trapSetting']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			date() {
				const date = this.curTrap.date
				return dayjs(`${date.year}-${date.month}-${date.date}`).format('YYYY-MM-DD')
			},
			week() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				return result[vm.curTrap.date.week]
			},
			startTime () {
				return this.curTrap.trap.start_time.split(' ')[1]
			},
			endTime () {
				const vm = this
				const diff = vm.runTimeToMinute(vm.curTrap.trap.start_time, vm.curTrap.trap.run_time)
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.curTrap.trap.end_time.split(' ')[1]}${through}`
			},
			priceDetail () { // 价格组成
				const vm = this
				const fuelTax = vm._i18n.messages[vm.lang].air.fuelTax
				const airportTax = vm._i18n.messages[vm.lang].air.airportTax
				const fuelPrice = vm.curSeat.fuelTax
				const airportPrice = vm.curSeat.airportTax
				const str = vm.lang === 'zh-CN' ? `${fuelTax}:￥${fuelPrice} ${airportTax}:￥${airportPrice}` :
				`${airportPrice}￥:${airportTax} ${fuelTax}￥:${fuelTax}`
				return str
			}
		},
		onShow() {
			this.setPageName()
			this.queryInfo()
			this.showPassenger = true
		},
		onHide() {
			this.showPassenger = false
		},
		methods: {
			...mapActions(['checkLogin']),
			runTimeToMinute (start, run) {
				const arr1 = dayjs(start).hour()
				const arr2 = run.split(':')
				return parseInt((Number(arr1) + Number(arr2[0])) / 24)
			},
			toOrder () {
				uni.navigateTo({
					url: '/pages/commonOrder/commonOrder?type=air'
				})
			},
			getPis (target) { // 乘客编号设置
				Object.assign(this.passenger, target)
			},
			toContact () {
				uni.navigateTo({
					url: '/pages/memberAddress/memberAddress'
				})
			},
			setPageName() {
				const vm = this
				if (vm.lang !== 'zh-CN') {
					uni.setNavigationBarTitle({
						title: vm._i18n.messages[vm.lang].train.ticketPageName
					})
				}
			},
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
							this.contact.name = res.data.addressee // 联系人姓名
							this.contact.mobile = res.data.mobile
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
			async subOrder() {
				const vm = this
				vm.passengerControl = !vm.passengerControl
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						token: token,
						pis_number: vm.passenger.pis_number,
						mobile: vm.contact.mobile,
						policyId: vm.curSeat.policyId,
						train_num: vm.curTrap.trap.train_num,
						start_time: vm.curTrap.trap.start_time,
						end_time: vm.curTrap.trap.end_time,
						originating_station: vm.trapSetting.start.code,
						terminus: vm.trapSetting.end.code,
						seatCode: vm.curSeat.seatCode,
						attention: vm.contact.name,
						price: vm.curSeat.price,
						airportTax: vm.curSeat.airportTax,
						fuelTax: vm.curSeat.fuelTax,
						date: vm.date
					}
					// 验证数据完整性
					for (let k in obj) {
						if (obj[k] === '') {
							uni.showToast({
								icon: 'none',
								title: vm._i18n.messages[vm.lang].train.buyTip
							})
							return false
						}
					}
					// 执行提交
					vm.btnLoading = true
					vm.$post(urls.commitAirOrder, obj).then(res => {
						vm.btnLoading = false
						if (res.data.result_code === 'SUCCESS') {
							uni.showLoading({
								title: ''
							})
							vm.toPay(res.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: vm._i18n.messages[vm.lang].train.makeOrderFail
							})
						}
					}, err => {
						vm.btnLoading = false
						uni.showToast({
							icon: 'none',
							title: vm._i18n.messages[vm.lang].train.makeOrderFail
						})
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			toPay (info) {
				const vm = this
				uni.requestPayment({ // 调用支付
					provider: 'wxpay',
					timeStamp: info.timeStamp,
					nonceStr: info.nonceStr,
					package: info.package,
					signType: 'MD5',
					paySign: info.paySign,
					success: function (result) {
						vm.buySuc = true
						uni.hideLoading()
						uni.showToast({
							icon: 'success',
							title: ''
						})
						uni.requestSubscribeMessage({ // 订阅消息 
						  tmplIds: ['9UTQnyosblyWEn16aJ5GT9DbjClzWU6yljBWXncAPIk'],
						  success (result) {
							},
							fail (err) {
							}
						})
					},
					fail: function (err) {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: vm._i18n.messages[vm.lang].makeOrder.payFail
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		min-height: 100vh;
		position: relative;

		.back {
			width: 100%;
			height: 300rpx;
			background: linear-gradient(0deg, #19C882, #23AF8C);
			border-bottom-left-radius: 50vw 7vh;
			border-bottom-right-radius: 50vw 7vh;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}

		.cus-gap {
			width: 100%;
			height: 5px;
		}

		.ticket-cont {
			position: relative;
			z-index: 2;
			width: 90%;
			margin: 20px auto 10px auto;
			box-shadow: 0 6.94rpx 6.94rpx -2px rgba(152, 152, 152, 0.15);
			border-radius: 20.83rpx;
			overflow: hidden;
			background-image: url(../../static/images/ticket-bg.png);
			background-size: 100% 100%;

			.ticket-date {
				background: #F3F3F3;
			}

			.ticket-ads {
				.trap-num {
					.throw-container {
						position: relative;
						border-bottom: 2px solid $uni-color-primary;

						.cus-icon {
							width: 2px;
							height: 8px;
							background: $uni-color-primary;
							position: absolute;
							bottom: -2px;

							&.throw-right {
								right: 2px;
								transform: rotate(-45deg);
							}

							&.throw-left {
								left: 2px;
								transform: rotate(45deg);
							}
						}
					}
				}
			}

			.ticket-price {}

			.ticket-person {
				border-top: 1px dashed #D0D0D0;
			}
		}

		.ticket-contact {
			width: 90%;
			margin: 0 auto 10px auto;
			box-shadow: 0 6.94rpx 6.94rpx -2px rgba(152, 152, 152, 0.15);
			border-radius: 20.83rpx;
		}

		.btn-container {
			position: fixed;
			bottom: 0;
			background: #FFFFFF;
		}
	}
</style>
