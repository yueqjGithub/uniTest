<template>
	<view class="menu-item flex-column flex-ali-center flex-jst-start" @click="toPage(item)">
		<view class="menu-icon flex-row flex-jst-center flex-ali-center" :style="{background: bg, boxShadow: boxShadow}">
			<u-icon :name="iconName" color="#ffffff" size="50" custom-prefix="iconfont"></u-icon>
		</view>
		<text class="menu-name">{{menuName}}</text>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'menuItem',
		props: ['item'],
		data() {
			return {}
		},
		computed: {
			...mapState(['lang']),
			// bg() {
			// 	return 'red'
			// }
			bg() {
				return `linear-gradient(-55deg,${this.item.apply_start_background},${this.item.apply_end_background})`
			},
			iconName() {
				return `${this.item.apply_iconfont.split('icon-')[1]}`
			},
			boxShadow () {
				return `0px 1px 2px 1px ${this.item.apply_end_background}`
			},
			menuName () {
				let result = ''
				if (this.lang === 'zh-CN') {
					result = this.item.apply_nickname_cn
				} else {
					result = this.item.apply_nickname
				}
				return result
			}	
		},
		methods: {
			toPage (path) {
				uni.navigateTo({
					url: path.apply_path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		.menu-icon {
			width: 90.27rpx;
			height: 90.27rpx;
			border-radius: 50%;
			position: relative;
		}
		.menu-name{
			margin-top: 6px;
			font-size: 12px;
		}
	}
</style>
