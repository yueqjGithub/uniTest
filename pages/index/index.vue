<template>
	<view class="container">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
			<status-bar></status-bar>
			<!--弧形占位-->
			<view class="circle-bottom"></view>
			<!-- banner -->
			<banner :list="bannerList"></banner>
		</view>
		<!-- tabbar-->
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import statusBar from './statusBar.vue'
	import banner from './banner.vue'
	import urls from '@/service/urls.js'
	import { mapState } from 'vuex'
	export default {
		name: 'index',
		components: {
			cusTabbar,
			statusBar,
			banner
		},
		data() {
			return {
				bannerList: []
			}
		},
		computed: {
			 ...mapState(['lang'])  
		},
		created () {
			this.queryIndex()
		},
		mounted () {
		},
		methods: {
			queryIndex () {
				const vm = this
				vm.$get(urls.queryIndex, {}).then(res => {
					vm.bannerList = [...res.data.banner]
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.status_bar{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 319.44rpx;
			background: linear-gradient(45deg,rgba(25,200,130,1),rgba(35,175,140,1));
			.status_null{
				width: 100%;
				height: var(--status-bar-height);
			}
			.circle-bottom{
				width: 100%;
				height: 10%;
				background: #ffffff;
				position: absolute;
				bottom: 0;
				border-top-left-radius: 50vw 5vh;
				border-top-right-radius: 50vw 5vh;
			}
		}
	}
</style>
