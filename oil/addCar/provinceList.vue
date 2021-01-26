<template>
	<view>
		<view class="flex-row flex-jst-center flex-ali-center pa-md border-box border-btm ma-row-md">
			<text class="text-14 text-bold">{{$t('addCar.chooseProvince')}}</text>
		</view>
		<view class="p-container flex-row flex-wrap flex-jst-start flex-ali-start pa-md border-box">
			<view v-for='(k, idx) in dataList' :key='idx' class="flex-row text-14 pa-md border-box flex-jst-center flex-ali-center p-item"
			 :class="choose === k ? 'p-choose' : ''" @click="chooseProvince(k)">
				<span :class="choose === k ? 'text-primary' : 'text-grey-1'">{{k}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'provinceList',
		props: ['dataList', 'choose'],
		data() {
			return {}
		},
		methods: {
			chooseProvince(province) {
				this.$emit('choosePro', province)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.border-btm{
		border-bottom: 1px solid #e3e3e3;
	}
	.p-container {
		.p-item {
			border: 1px solid #aaaaaa;
			border-radius: 13.88rpx;
			margin: 0 12rpx 12rpx;
			width: calc(((100vw - 54rpx) / 7) - 24rpx);
			height: calc(((100vw - 54rpx) / 7) - 24rpx);
			&.p-choose {
				border: 1px solid #23AF8C;
			}
		}
	}
</style>
