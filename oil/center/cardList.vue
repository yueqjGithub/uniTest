<template>
	<view class="full-width pa-md border-box">
		<view class="pa-col-sm border-box card-tit flex-row flex-jst-center flex-ali-center text-16">{{$t('oilCenter.cardList')}}</view>
		<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
			<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
				<view class="card-item flex-jst-btw flex-ali-center pa-sm border-box" :class="langFlex" v-for="(k, idx) in list" :key="idx">
					1
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'cardList',
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
			...mapState(['lang', 'oilList', 'curOilType']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		mounted () {
			this.queryIndex()
		},
		methods: {
			async queryIndex () { // 请求首页
				const vm = this
				vm.final = false
				vm.status = 'loading'
				vm.page = 1
				const token = await uni.getStorageSync('token')
				const obj = {
					token: token,
					pagenum: vm.page,
					pagesize: vm.pageSize,
					oil_card_number: vm.curOilType
				}
				debugger
				vm.loading = true
				vm.$post(urls.queryOilCardList, obj).then(res => {
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
						token: token,
						pagenum: vm.page,
						pagesize: vm.pageSize,
						oil_card_number: vm.curOilType
					}
					vm.$post(urls.queryOilCardList, obj).then(res => {
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
	.card-tit{
		border-bottom: 1px solid #d3d3d3;
	}
	.cus-scroll-content{
		width: 100%;
		height: 50vh;
		box-sizing: border-box;
		.card-item{
			border-radius: 10.41rpx;
			border: 1px solid #d5d5d5;
		}
	}
</style>
