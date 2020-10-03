<template>
	<view class="vip-list full-width">
		<swiper :current="current" @change="setCurrent" previous-margin="20" next-margin="20">
			<swiper-item v-for="(k, index) in list" :key="index">
				<view class="swiper-item pa-md flex-column flex-jst-start flex-ali-center" :class="current === index ? 'current-item' : 'scale-item'">
					<view class="vip-price flex-row flex-jst-center flex-ali-base ma-col-md">
						<text class="text-16 text-bold text-gold">￥</text>
						<text class="text-32 text-bold text-gold">{{k.opening_price}}</text>
					</view>
					<view class="vip-name text-14 text-center full-width pa-sm">{{lang === 'zh-CN' ? k.name_cn : k.name}}</view>
					<view class="vip-remark full-width text-center pa-md text-grey-1 text-14">{{k.remarks}}</view>
					<view class="vip-btn-container ma-col-md full-width flex-row flex-jst-center">
						<button class="plain-btn vip-btn" @click="buyVip(k.user_group_number)">{{$t('vip.buy')}}</button>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'vipList',
		data () {
			return {
				current: 0,
				list: []
			}
		},
		computed: {
			...mapState(['lang'])
		},
		mounted () {
			this.queryList()
		},
		methods: {
			...mapActions(['checkLogin']),
			async queryList () {
				const vm = this
				const token = await vm.checkLogin()
				vm.$post(urls.queryVipList, {token: token}).then(res => {
					vm.list = res.data
				})
			},
			setCurrent (val) {
				this.current = val.detail.current
			},
			buyVip (number) {
				this.$emit('toBuy', number)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip-list{
		swiper{
			height: 486.11rpx;
		}
		// swiper-item{
		// 	width: 583.33rpx !important;
		// }
		.text-gold{color: #BE9664;}
		.vip-btn{
			background: linear-gradient(-90deg,rgba(245,225,190,1),rgba(220,180,110,1)) !important;
			width:347.22rpx;
			height:90.27rpx;
			border-radius: 45.13rpx;
			color: #5A331A;
		}
		.swiper-item{
			background: #FFFFFF;
			box-shadow:1px 10px 30px 0px rgba(152,152,152,0.15);
			border-radius: 20.83rpx;
			&.current-item{
				transform: scale(0.9);
			}
			&.scale-item{
				transform: scaleX(1.1) scaleY(0.8);
			}
		}
	}
</style>
