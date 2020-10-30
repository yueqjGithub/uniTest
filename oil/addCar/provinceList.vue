<template>
	<View class="p-container flex-row flex-wrap flex-jst-start flex-ali-start pa-md border-box">
		<view v-for='(k, idx) in dataList' :key='idx' class="flex-row text-14 pa-md border-box flex-jst-center flex-ali-center ma-sm p-item"
		 :class="choose === k ? 'p-choose' : ''" @click="chooseProvince(k)">
			<span :class="choose === k ? 'text-primary' : 'text-grey-1'">{{k}}</span>
		</view>
	</View>
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
	.p-container {
		.p-item {
			border: 1px solid #aaaaaa;
			border-radius: 13.88rpx;

			&.p-choose {
				border: 1px solid #23AF8C;
			}
		}
	}
</style>
