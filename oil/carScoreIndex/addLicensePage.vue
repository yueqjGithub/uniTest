<template>
	<view class="full-width add-license-page ma-col-md">
		<view class="pa-lg border-box scan-container flex-column flex-jst-center flex-ali-center">
			<view class="address-icon flex-row flex-jst-center flex-ali-center" @click="scanCode">
				<u-icon name="camera-fill" size="90" class="text-primary"></u-icon>
			</view>
			<text class="text-12 text-grey-1 ma-col-sm">{{$t('carCenter.uploadLicenseTips')}}</text>
		</view>
		<view class="pa-lg border-box scan-container flex-column flex-jst-center flex-ali-center ma-col-lg">
			<text class="text-12 text-grey-1 ma-col-sm">{{$t('carCenter.manual')}}</text>
			<view class="width-80 flex-row flex-jst-center flex-ali-center ma-col-md">
				<button type="default" class="my-btn-primary text-white text-14">{{$t('carCenter.addLicense')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'addLicense',
		data () {
			return{
				
			}
		},
		methods: {
			scanCode () {
				this.$emit('scanCode')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-license-page{
		.scan-container{
			border-radius: 10.41rpx;
			border: 1px solid #efefef;
			.address-icon {
				border: 1px solid #efefef;
				border-radius: 13.88rpx;
				width: 138.88rpx;
				height: 138.88rpx;
			}
		}
	}
</style>
