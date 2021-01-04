<template>
	<view class="cus-switch flex-row flex-jst-ard flex-ali-center flex-nowrap" @click="changeLanguage">
		<text class="switch-bk">中</text>
		<text class="switch-bk">
			ئۇ
		</text>
		<view class="switch-control" :class="isCN ? 'left' : 'right'">
			<text>
			{{isCN ? '中' : 'ئۇ'}}
			</text>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'cusSwitch',
	data() {
		return {
			
		};
	},
	computed: {
		...mapState(['lang']),
		isCN () {
			if (this.lang === 'zh-CN') {
				return true
			} else {
				return false
			}
		}
	},
	created () {
		const vm = this
		const lang = uni.getStorageSync('lang')
		if (lang) {
			vm.$store.dispatch('setLang', lang)
		}
	},
	methods: {
		changeLanguage () {
			const vm = this
			if (vm.lang === 'zh-CN') {
				vm.$store.dispatch('setLang', 'en-US')
				uni.setStorageSync('lang', 'en-US')
			} else {
				vm.$store.dispatch('setLang', 'zh-CN')
				uni.setStorageSync('lang', 'zh-CN')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.cus-switch{
	width: 97.22rpx;
	height: 48.61rpx;
	border-radius: 24.3rpx;
	background-color: rgba(0, 0, 0, 0.3);
	position: relative;
	.switch-bk{
		color: #FFFFFF;
	}
	.switch-control{
		width: 50%;
		height: 100%;
		position: absolute;
		border-radius: 24.3rpx;
		background: #FFFFFF;
		text-align: center;
		line-height: 48.61rpx;
		color: $uni-color-primary;
		transition: all 1s linear;
		&.left{
			left: 0;
		}
		&.right{
			right: 0;
		}
	}
}
</style>
