<template>
	<view class="flex-row flex-ali-center flex-jst-start pa-md status-container">
		<cus-switch class="flex-1"></cus-switch>
		<view class="flex-2 text-center">中</view>
		<view class="flex-1"></view>
	</view>
</template>

<script>
	import cusSwitch from '../../components/cus-switch.vue'
	export default {
		name: 'statusBar',
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
		
	}
</style>
