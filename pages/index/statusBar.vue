<template>
	<view class="flex-row flex-ali-center flex-jst-start pa-row-md status-container">
		<cus-switch class="flex-1" v-if="showChangeLanguage"></cus-switch>
		<view class="switch-add flex-1" v-else></view>
		<view class="flex-2 text-center logo-container">
			<image src="~@/static/images/logo.png" mode="" class="logo-image"></image>
		</view>
		<view class="flex-1"></view>
	</view>
</template>

<script>
	import cusSwitch from '../../components/cus-switch.vue'
	export default {
		name: 'statusBar',
		props: {
			showChangeLanguage: {
				type: Boolean,
				default: true
			}
		},
		components:{
			cusSwitch
		},
		data () {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.status-container{
		.logo-container{
			.logo-image{
				width: 217.36rpx;
				height: 59.72rpx;
			}
		}
	}
</style>
