<template>
	<view class="page bg-grey">
		<view class="back"></view>
		<view class="cus-gap"></view>
		<view class="ticket-cont">
			<view class="ticket-date pa-lg flex-column flex-jst-center flex-ali-center">
				<text class="text-18 text-bold">{{date}}</text>
				<text class="text-14 text-grey-1">{{week}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import dayjs from 'dayjs'
	export default {
		name: 'trainOrderDetail',
		data () {
			return {}
		},
		computed: {
			...mapState(['lang', 'curOrderDetail']),
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			date() {
				const date = this.curOrderDetail.start_date
				return dayjs(date).format('YYYY-MM-DD')
			},
			week() {
				const vm = this
				let result = []
				let list = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
				list.forEach(item => {
					result.push(vm._i18n.messages[vm.lang].basic[item])
				})
				const targetWeek = dayjs(vm.curOrderDetail.start_date).day()
				return result[targetWeek]
			}
		},
		watch: {
			lang (val) {
				if (val !== 'zh-CN') {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[this.lang].commonOrder.orderDetail
					})
				}
			}
		},
		onShow () {
			console.log(this.curOrderDetail)
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100vw;
		height: 100vh;
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
		.ticket-cont{
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
		}
	}
</style>
