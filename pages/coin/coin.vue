<template>
	<view>
		<button type="default" @click="myShare">分享</button>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	export default {
		name: 'coin',
		components: {
			cusTabbar
		},
		data() {
			return {
				
			}
		},
		methods: {
			myShare () {

			}
		}
	}
</script>

<style>

</style>
