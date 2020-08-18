<template>
	<view class="container">
		<view class="intro text-primary">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：{{isLogin}}</text>
		<view class='iconfont icon-xuanze text-primary'></view>
		<uni-link :href="href" :text="href"></uni-link>
		<button type="default" @click="toAbout">变更</button>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.ioss/component/README?id=uniui'
			}
		},
		computed: {
			 ...mapState(['isLogin'])  
		},
		mounted () {
		},
		methods: {
			...mapMutations(['setLogin']),
			toAbout () {
				uni.navigateTo({
					url: '../about/about'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
