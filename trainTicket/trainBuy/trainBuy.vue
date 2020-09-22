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
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">{{curTrap.trap.start_time}}</text>
					<view class="flex-1 text-14 text-primary trap-num text-center pa-col-sm border-box flex-row flex-jst-center">
						<view class="throw-container width-80">
							<view class="cus-icon" :class="lang==='zh-CN' ? 'throw-right' : 'throw-left'"></view>
							<text>{{curTrap.trap.train_num}}</text>
						</view>
					</view>
					<text class="text-16 text-bold flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">{{endTime}}</text>
					<!-- <text class="text-14">{{lang === 'zh-CN' ? train.start_station_name_cn : train.start_station_name}}</text> -->
				</view>
				<!-- ads第二排 -->
				<view class="full-width flex-jst-btw flex-ali-center ma-top-5" :class="langFlex">
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-left' : 'text-right'">
						{{lang==="zh-CN"?curTrap.trap.start_station_name_cn:curTrap.trap.start_station_name}}
					</text>
					<view class="flex-1 text-center text-grey">{{trapTime}}</view>
					<text class="text-14 flex-1" :class="lang==='zh-CN' ? 'text-right' : 'text-left'">
						{{lang==="zh-CN"?curTrap.trap.end_station_name_cn:curTrap.trap.end_station_name}}
					</text>
				</view>
			</view>
			<!-- 价格显示 -->
			<view class="ticket-price pa-row-lg ma-col-md border-box flex-column flex-jst-center flex-ali-center">
				<text class="text-24 text-primary text-bold">￥{{curSeat.price}}</text>
				<text class="text-grey-1 text-14 pa-col-sm">{{lang === 'zh-CN' ? curSeat.seatName.name_cn : curSeat.seatName.name}}</text>
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
				<button type="default" class="my-btn-primary text-white text-14" @click="subOrder" :loading="btnLoading" :disabled="btnLoading">{{$t('basic.submit')}}</button>
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
		name: 'trainBuy',
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
				mySocket: '',
				skOpen: false,
				commitSuccess: false, // 是否接收到socket成功返回
				skTimeout: '' // open后开启定时，超时后关闭socket
			}
		},
		computed: {
			...mapState(['lang', 'curSeat', 'curTrap']),
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
			endTime() {
				const vm = this
				const diff = vm.curTrap.trap.takeDays
				const through = diff > 0 ? `(+${diff})` : ''
				return `${vm.curTrap.trap.end_time}${through}`
			},
			trapTime() {
				const vm = this
				// const str = `HH${vm._i18n[vm.lang].messages.basic.hour}mm${vm._i18n[vm.lang].messages.basic.minute}`
				// return dayjs(vm.train.run_time).format(str)
				const arr = vm.curTrap.trap.run_time.split(':')
				const hour = vm._i18n.messages[vm.lang].basic.hour
				const min = vm._i18n.messages[vm.lang].basic.minute
				const result = vm.lang === 'zh-CN' ? `${arr[0]}${hour}${arr[1]}${min}` : `${min}${arr[1]}${hour}${arr[0]}`
				return result
			}
		},
		onShow() {
			this.setPageName()
			this.queryInfo()
			this.showPassenger = true
		},
		onHide() {
			this.showPassenger = false
			this.skTimeout = ''
		},
		methods: {
			...mapActions(['checkLogin']),
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
						attention: vm.contact.name,
						start_station_name: vm.curTrap.trap.start_station_name_cn,
						end_station_name: vm.curTrap.trap.end_station_name_cn,
						end_time: vm.curTrap.trap.end_time,
						startdate: vm.date,
						start_time: vm.curTrap.trap.start_time,
						seatName: vm.curSeat.seatName.name_cn,
						price: vm.curSeat.price,
						takeDays: vm.curTrap.trap.takeDays,
						run_time: vm.curTrap.trap.run_time,
						train_num: vm.curTrap.trap.train_num,
						trainType: vm.curTrap.trap.trainType,
						endStation: vm.curTrap.trap.endStation,
						startStation: vm.curTrap.trap.startStation
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
					uni.showLoading({
						title: vm._i18n.messages[vm.lang].train.waitingSuc
					})
					vm.$post(urls.commitTrainOrder, obj).then(res => {
						const socketInfo = {
							token: token,
							order_number: res.data.order_number
							// order_number: 'TT1600759153600347'
						}
						vm.createSocket(socketInfo)
					}, err => {
						uni.hideLoading()
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
			async createSocket(order) {
				const vm = this
				const token = await vm.checkLogin()
				vm.mySocket = uni.connectSocket({
					url: urls.socket,
					fail: function () { // socket打开失败
						uni.showToast({
							icon: 'none',
							title: vm._i18n.messages[vm.lang].train.makeOrderFail
						})
						vm.btnLoading = false
					}
				});
				vm.mySocket.onOpen(function(res) {
					vm.skOpen = true
					vm.mySocket.send({
						data: JSON.stringify(order)
					});
					// 超时，关闭socket
					// 开启定时
					vm.skTimeout = setTimeout(() => {
						if (!vm.commitSuccess) { // 没有收到返回
							vm.skOpen = false
							vm.mySocket.close()
						}
					}, 125000)
				});
				vm.mySocket.onMessage(function (res) {
				  vm.skOnMessage(res)
				});
				vm.mySocket.onClose(function (res) {
					uni.hideLoading()
				  vm.skCloase(res)
				});
				vm.mySocket.onError(function(err){
					console.log(err)
				})
			},
			skOnMessage (msg) {
				const vm = this
				vm.commitSuccess = true
				const response = JSON.parse(msg.data)
				if (response.success && response.data.train_order_passenger) { // 后台返回成功
					vm.$store.commit('setCurPassenger', response.data)
					uni.navigateTo({
						url: `/trainTicket/trainOrderInfo/trainOrderInfo?order=${response.data.order_number}`
					})
					// const newObj = JSON.parse(JSON.stringify(vm.cur))
				} else { // 后台返回了，但未成功
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].train.makeOrderFail
					})
				}
				vm.btnLoading = false
				clearTimeout(vm.skTimeout) // 收到消息，清除定时器
				vm.mySocket.close({
					code: 3002,
					reason: '收到消息，正常关闭'
				})
			},
			skCloase (msg) {
				console.log(msg)
				const vm = this
				if (msg.code === 1006) {
					uni.showToast({
						icon: 'none',
						title: vm._i18n.messages[vm.lang].train.makeOrderFail
					})
				}
				vm.skOpen = false
				vm.btnLoading = false
				vm.commitSuccess = false
				clearTimeout(this.skTimeout) // 清除定时器
				// uni.closeSocket()
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
