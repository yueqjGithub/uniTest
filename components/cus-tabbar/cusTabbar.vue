<template>
	<view class="cus-tab-container bg-white flex-row flex-nowrap flex-jst-ard flex-ali-center" :class="hide ? 'hide-tab' : ''">
		<view class="tab-item flex-column flex-jst-center flex-ali-center" v-for="k in curTabList" :key='k.name' @click="toPage(k.path)">
			<image :src="curRoute === k.path ? k.yIcon : k.nIcon" mode="" class="tab-item-img"></image>
			<text class="tab-word" :class="curRoute === k.path ? 'text-primary' : 'text-grey'">{{k.word}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'cusTabbar',
		props: {
		},
		data() {
			return {
				hide: true,
				curRoute: 'pages/index/index',
				tabList: [{
						name: 'index',
						path: 'pages/index/index',
						yIcon: '../../static/images/Home-fill.png',
						nIcon: '../../static/images/Home-line.png',
					},
					{
						name: 'store',
						path: 'pages/store/store',
						yIcon: '../../static/images/car-fill.png',
						nIcon: '../../static/images/car-line.png'
					},
					{
						name: 'coin',
						path: 'pages/coin/coin',
						yIcon: '../../static/images/Money-fill.png',
						nIcon: '../../static/images/Money-line.png'
					},
					{
						name: 'mine',
						path: 'pages/mine/mine',
						yIcon: '../../static/images/My-fill.png',
						nIcon: '../../static/images/My-line.png'
					},
				]
			}
		},
		computed: {
			...mapState(['lang']),
			curTabList() {
				const vm = this
				const arr = [...vm.tabList]
				arr.forEach(item => {
					item.word = vm._i18n.messages[vm.lang].tab[item.name]
				})
				if (vm.lang === 'zh-CN') {
					return arr
				} else {
					return arr.reverse()
				}
			}
		},
		mounted () {
			this.hide = false
			this.curRoute = getCurrentPages().pop().route
		},
		beforeDestroy () {
			this.hide = true
		},
		methods: {
			toPage (path) {
				uni.reLaunch({
					url: `/${path}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	.cus-tab-container {
		&.hide-tab{bottom: -56px;}
		height: 56px;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: 1px 0px 2px #aaaaaa;
		padding: 4px;
		box-sizing: border-box;
		transition: all .5s linear;
		.tab-item {
			width: 25%;
			padding: 2px;
			.tab-item-img {
				width: 25px;
				height: 25px;
			}
			.tab-word{
				font-size: 12px;
				font-weight: bold;
			}
		}
	}
</style>
