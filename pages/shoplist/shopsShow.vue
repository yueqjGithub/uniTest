<template>
	<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
		<view class="shops-container flex-row flex-wrap flex-jst-btw flex-ali-start" v-if="list.length > 0">
			<goodsItem v-for="(k, index) in list" :goods="k" class="goods-item" :key="index"></goodsItem>
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
	import goodsItem from '@/cusComponents/goodsItem.vue'
	export default {
		name: 'showsShow',
		props: ['type', 'cateId'],
		components: {
			goodsItem
		},
		data () {
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
		mounted () {
			this.queryIndex()
		},
		methods: {
			queryIndex () { // 请求首页
				const vm = this
				vm.final = false
				vm.status = 'loading'
				vm.page = 1
				const obj = {
					pagenum: vm.page,
					pagesize: vm.pageSize,
					cate_id: vm.cateId,
					type: vm.type
				}
				vm.loading = true
				vm.$get(urls.queryStoreList, obj).then(res => {
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
			loadMore () { // 加载下一页
				const vm = this
				if (!vm.final) { // 是否可加载
					vm.loading = true
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						cate_id: vm.cateId,
						type: vm.type
					}
					vm.$get(urls.queryStoreList, obj).then(res => {
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
		height: calc(100vh - 44px);
		box-sizing: border-box;
	}
	.shops-container{
		padding: 18px;
		.loading-bar{
			width: 100%;
		}
		.goods-item{
			margin-bottom: 10px;
		}
	}
</style>
