<template>
	<view class="container">
		<view class="status_bar">
			<!----------status占位---------->
			<view class="status_null"></view>
			<!-- navbar -->
			<status-bar></status-bar>
		</view>
		<!--tabbar -->
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import statusBar from './statusBar.vue'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'index',
		components: {
			cusTabbar,
			statusBar
		},
		data() {
			return {
			}
		},
		computed: {
			 ...mapState(['isLogin', 'lang'])  
		},
		mounted () {
		},
		methods: {
			...mapMutations(['setLogin']),
			test () {
				this.$store.dispatch('setLang', 'en-US')
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
		}
	}
</style>
