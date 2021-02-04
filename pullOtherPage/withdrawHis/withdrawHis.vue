<template>
	<view class="page bg-grey">
		<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
			<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
				<!-- 话费订单 -->
				<view class="his-item ma-col-sm pa-row-md border-box full-width" v-for="k in list" :key="k.id">
					<view class="item-container pa-md border-box flex-row flex-jst-btw flex-ali-center" :class="langFlex">
						<view class="flex-row flex-jst-center flex-ali-base">
							<text class="text-14 text-bold text-primary">￥</text>
							<text class="text-32 text-bold text-primary">{{k.amount}}</text>
						</view>
						<view class="flex-column flex-jst-btw" :class="lang==='zh-CN' ? 'flex-ali-end' : 'flex-ali-start'">
							<text class="text-14" :style='{color: statusColor(k.status)}'>{{statusShow(k.status)}}</text>
							<text class="text-grey text-12">{{k.createtime}}</text>
						</view>
					</view>
				</view>
				<view v-if="loading" class="loading-bar flex-row flex-jst-center flex-ali-center">
					<u-loadmore :status="status" bg-color="bg-color" color="#AAAAAA" :load-text="loadText" icon-type="flower" />
				</view>
			</view>
			<view v-else class="pa-lg">
				<u-empty mode="favor" text=" "></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'withdrawHis',
		data() {
			return {
				page: 1,
				pageSize: 10,
				list: [],
				final: false, // 是否已全部加载
				loading: false, // 加载中状态展示
				status: 'loading', // 加载控件状态控制
				loadText: {
					loadmore: '',
					loading: '',
					nomore: ''
				}
			}
		},
		computed: {
			...mapState(['lang']),
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].pullPage.record
						})
					}
				}
			}
		},
		onShow () {
			this.queryIndex()
		},
		methods: {
			statusColor (target) {
				let color = '#00AFFF'
				switch (target) {
					case '已完成':
					color = '#00BE87'
					break
					case '申请中':
					color = '#00AFFF'
					break
					default:
					color = '#FF4B4B'
				}
				return color
			},
			statusShow (target) {
				const vm = this
				let result = ''
				switch (target) {
					case '已完成':
					result = vm._i18n.messages[vm.lang].withdraw.suc
					break
					case '申请中':
					result = vm._i18n.messages[vm.lang].withdraw.loading
					break
					default:
					result = '申请中'
				}
				return result
			},
			async queryIndex() { // 请求首页
				const vm = this
				vm.final = false
				vm.status = 'loading'
				vm.page = 1
				const token = await uni.getStorageSync('token')
				const obj = {
					pagenum: vm.page,
					pagesize: vm.pageSize,
					token: token
				}
				vm.loading = true
				vm.$post(urls.withdrawList, obj).then(res => {
					console.log(res)
					const len = res.data.data.length
					if (len === vm.pageSize) { // 首次请求数量填满一页
						vm.list = [...vm.list, ...res.data.data]
						vm.page++
					} else if (len > 0 && len < vm.pageSize) { // 有数据，但不足一页
						vm.list = [...vm.list, ...res.data.data]
						vm.final = true
						vm.status = 'nomore'
					} else {
						vm.final = true
					}
					vm.loading = false
				})
			},
			async loadMore() { // 加载下一页
				const vm = this
				const token = await uni.getStorageSync('token')
				if (!vm.final) { // 是否可加载
					vm.loading = true
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						token: token
					}
					vm.$post(urls.withdrawList, obj).then(res => {
						const len = res.data.data.length
						if (len === vm.pageSize) { // 首次请求数量填满一页
							vm.list = [...vm.list, ...res.data.data]
							vm.page++
							vm.loading = false
						} else if (len > 0 && len < vm.pageSize) { // 有数据，但不足一页
							vm.list = [...vm.list, ...res.data.data]
							vm.final = true
							vm.status = 'nomore'
						} else {
							vm.final = true
							vm.loading = true
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;

		.cus-scroll-content {
			width: 100%;
			height: calc(100vh - 44px);
			box-sizing: border-box;

			.his-item {
				.item-container {
					background: #FFFFFF;
					border-radius: 8px;
					box-shadow: 1px 5px 20.83rpx 0px rgba(152, 152, 152, 0.1);
				}
			}
		}
	}
</style>
