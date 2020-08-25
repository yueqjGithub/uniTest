<template>
	<view class="order-container bg-grey">
		<view class="order-header-container pa-row-md">
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex' 
	export default {
		data() {
			return {
				goods: ''
			}
		},
		computed: {
			...mapState(['lang'])
		},
		mounted () {
			const vm = this
			vm.goods = JSON.parse(getCurrentPages()[getCurrentPages().length - 1].options.goods)
			uni.setNavigationBarTitle({
				title: vm.lang === 'zh-CN' ? vm.goods.shop_name_cn : vm.goods.shop_name
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.order-container{
	.order-header-container{
		box-sizing: border-box;
		width: 100%;
		height: 286.8rpx;
		border-bottom-left-radius: 50vw 5vh;
		border-bottom-right-radius: 50vw 5vh;
		background: linear-gradient(0deg, #19C882, #23AF8C);
	}
}
</style>
