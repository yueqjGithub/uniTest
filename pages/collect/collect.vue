<template>
	<scroll-view scroll-y class="cus-scroll-content bg-grey" @scrolltolower="loadMore">
		<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
			<collect-item v-for="(k, index) in list" :collect="k" class="collect-item full-width" :key="index" @delSuccess="delSuccess"></collect-item>
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
	import collectItem from './collectItem.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'collectList',
		components: {
			collectItem
		},
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
			langType() {
				return this.lang === 'zh-CN' ? 'name_cn' : 'name'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					uni.setNavigationBarTitle({
						title: this._i18n.messages[val].myCollect.pageName
					});
				}
			}
		},
		mounted () {
			this.queryIndex()
		},
		methods: {
			delSuccess (target) { // 删除成功
				const vm = this
				const shop = vm.list.find(item => item.shop_number === target)
				const num = vm.list.indexOf(shop)
				if (num !== -1) {
					vm.list.splice(num, 1)
				}
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
					token: token
				}
				vm.loading = true
				vm.$post(urls.queryCollectList, obj).then(res => {
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
			async loadMore () { // 加载下一页
				const vm = this
				const token = await uni.getStorageSync('token')
				if (!vm.final) { // 是否可加载
					vm.loading = true
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						token: token
					}
					vm.$post(urls.queryCollectList, obj).then(res => {
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
	.cus-scroll-content{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
	}
	.shops-container{
		padding: 18px;
		.loading-bar{
			width: 100%;
		}
		.collect-item{
			margin-bottom: 10px;
		}
	}
</style>
