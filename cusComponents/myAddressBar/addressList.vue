<template>
	<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore" :enable-back-to-top="true">
		<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
			<view class="full-width border-box flex-column flex-jst-start flex-ali-start">
				<view
				v-for="(k, index) in list"
				class="address-item full-width flex-row flex-jst-btw flex-ali-center pa-col-md border-box"
				@click="chooseStation(k)"
				:key="index"
				:class="choose.id === k.id ? 'text-primary' : ''"
				>
					<text>{{k.name_cn}}</text>
					<text>{{lang !== 'zh-CN' ? k.name : ''}}</text>
				</view>
			</view>
			<view v-if="loading" class="loading-bar flex-row flex-jst-center flex-ali-center">
				<u-loadmore :status="status" bg-color="bg-color" color="#AAAAAA" :load-text="loadText" icon-type="flower"/>
			</view>
		</view>
		<view v-else class="pa-lg">
			<u-empty mode="favor" text=" "></u-empty>
		</view>
	</scroll-view>
</template>

<script>
	import urls from '@/service/urls.js'
	import { mapState } from 'vuex'
	export default {
		name: 'orderShow',
		props: ['choose', 'search', 'type'],
		components: {
		},
		data () {
			return {
				page: 1,
				pageSize: 20,
				list: [],
				search_key: '',
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
			requestUrl () {
				return this.type === 1 ? urls.queryAirStation : urls.queryTrainStop
			}
		},
		watch: {
			search (val) {
				this.search_key = val
				this.page = 1
				this.list = []
				this.queryIndex()
			}
		},
		mounted () {
			this.queryIndex()
		},
		methods: {
			chooseStation (obj) {
				this.$emit('chooseHandler', obj)
			},
			async queryIndex () { // 请求首页
				const vm = this
				vm.final = false
				vm.status = 'loading'
				vm.page = 1
				const token = await uni.getStorageSync('token')
				const obj = {
					pagenum: vm.page,
					pagesize: vm.pageSize,
					token: token,
					search_key: vm.search_key,
					lang: vm.lang === 'zh-CN' ? 0 : 1
				}
				vm.loading = true
				vm.$post(vm.requestUrl, obj).then(res => {
					const len = vm.type === 1 ? res.data.length : res.data.data.length
					const dataList = vm.type === 1 ? res.data : res.data.data
					if (len === vm.pageSize) { // 首次请求数量填满一页
						vm.list = [...vm.list, ...dataList]
						vm.page++
					} else if (len > 0 && len < vm.pageSize) { // 有数据，但不足一页
						vm.list = [...vm.list, ...dataList]
						vm.final = true
						vm.status = 'nomore'
					} else {
						vm.final = true
					}
					vm.loading = false
				})
			},
			async loadMore () { // 加载下一页
				const vm = this
				const token = await uni.getStorageSync('token')
				if (!vm.final) { // 是否可加载
					vm.loading = true
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						token: token,
						search_key: vm.search_key,
						lang: vm.lang === 'zh-CN' ? 0 : 1
					}
					vm.$post(vm.requestUrl, obj).then(res => {
						const len = vm.type === 1 ? res.data.length : res.data.data.length
						const dataList = vm.type === 1 ? res.data : res.data.data
						if (len === vm.pageSize) { // 首次请求数量填满一页
							vm.list = [...vm.list, ...dataList]
							vm.page++
							vm.loading = false
						} else if (len > 0 && len < vm.pageSize) { // 有数据，但不足一页
							vm.list = [...vm.list, ...dataList]
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
	.cus-scroll-content{
		height: 50vh;
		.address-item{
			border-bottom: 1px solid #dddddd;
		}
	}
</style>
