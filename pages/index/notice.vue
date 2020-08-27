<template>
	<view class="notice-container pa-md">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="notice-module bg-white flex-ali-center" :class="rowClass">
			<u-icon name="tianchongxing-22" size="50" class="text-primary" :class="iconClass" custom-prefix="iconfont"></u-icon>
			<u-notice-bar
				:class="noticeWordControl"
				mode="vertical"
				:list="curList"
				type="none"
				:volume-icon="false"
				:close-icon="false"
				class="flex-2"
				font-size="14px"
				:duration="4000"
				:speed="1000"
			 ></u-notice-bar>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'notice',
		data() {
			return {
				list: [],
				timeout: ''
			}
		},
		computed: {
			...mapState(['lang', 'initSuc']),
			rowClass() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			iconClass() {
				return this.lang === 'zh-CN' ? '' : 'reverse-icon'
			},
			curList() {
				let arr = []
				arr = this.list.map(item => {
					return this.lang === 'zh-CN' ? item.content_cn : item.content
				})
				return arr
			},
			noticeWordControl () {
				return this.lang === 'zh-CN' ? '' : 'notice-reverse'
			},
			queryTime () {
				return this.list.length * 5000
			}
		},
		watch: {
			initSuc: {
				immediate: true,
				handler: function (val) {
					if (val === 'true') {
						this.queryList()
					}
				}
			}
		},
		beforeDestroy () {
			clearTimeout(this.timeout)
		},
		methods: {
			queryList() {
				const vm = this
				vm.$get(urls.queryNotice, {}).then(res => {
					vm.list = [...res.data]
					vm.timeout = setTimeout(() => {
						vm.queryList()
					}, vm.queryTime)
				}, err => {
					this.$refs.uTips.show({
						title: err.message,
						type: 'error',
						duration: '2000'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-container {
		.notice-module {
			padding: 8px 10px;
			box-sizing: border-box;
			width: 100%;
			height: 90.27rpx;
			border-radius: 13.88rpx;

			.reverse-icon {
				transform: rotate(180deg);
			}
		}
	}
</style>
