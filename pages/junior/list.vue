<template>
	<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
		<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
			<view v-for="(k, idx) in list" :key="k.nickname" class="junior-item full-width pa-col-sm ma-sm border-box flex-row flex-jst-center flex-ali-center">
				<view :class="langFlex" class="flex-jst-btw flex-ali-center full-width">
					<view class="junior-left flex-jst-btw flex-ali-center" :class="langFlex">
						<text class="text-14 text-grey-1">{{idx+1}}</text>
						<u-avatar :src="k.profile_photo" class="ma-row-md"></u-avatar>
						<text class="text-14">{{k.nickname}}</text>
					</view>
					<view class="junior-right text-14 text-grey-1">{{k.createtime}}</view>
				</view>
			</view>
			<view v-if="loading" class="loading-bar flex-row flex-jst-center flex-ali-center">
				<u-loadmore :status="status" bg-color="bg-color" color="#AAAAAA" :load-text="loadText" icon-type="flower"/>
			</view>
		</view>
		<view v-else class="pa-lg">
			<u-empty mode="history" text=" "></u-empty>
		</view>
	</scroll-view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'list',
		props: ['type'],
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
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		mounted () {
			this.queryIndex()
		},
		methods: {
			...mapActions(['checkLogin']),
			async queryIndex () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						type: vm.type,
						token: token
					}
					vm.$post(urls.queryJunior, obj).then(res => {
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
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			async loadMore () { // 加载下一页
				const vm = this
				const token = await uni.getStorageSync('token')
				if (!vm.final) { // 是否可加载
					vm.loading = true
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						type: vm.type,
						token: token
					}
					vm.$post(urls.queryJunior, obj).then(res => {
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

<style>
	.cus-scroll-content{
		width: 100%;
		height: 83vh;
		box-sizing: border-box;
	}
	.junior-item{
		
	}
</style>
