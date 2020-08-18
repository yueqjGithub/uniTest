<template>
	<view>
		<button type="default" @click="setLang('zh-CN')">变更</button>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			...mapActions(['setLang'])
		}
	}
</script>

<style lang="scss">

</style>
