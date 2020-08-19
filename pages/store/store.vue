<template>
	<view>
		<button type="default" @click="setLang('zh-CN')">变更</button>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	export default {
		name: 'store',
		components: {
			cusTabbar
		},
		data() {
			return {
			};
		},
		mounted () {
		},
		methods: {
			...mapActions(['setLang'])
		}
	}
</script>

<style lang="scss">

</style>
