<template>
	<view class="goods-container bg-white">{{goods.commodity_price}}</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'goodsItem',
		props: ['goods'],
		data () {
			return {}
		},
		computed: {
			...mapState(['lang'])
		}
	}
</script>

<style lang="scss" scoped>
	.goods-container{
		width: 312.5rpx;
		box-sizing: border-box;
		height: 451.38rpx;
	}
</style>
