<template>
	<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
		<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
			<!-- 话费订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'phone' || orderType === 'traffic'">
				<phone-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index" :type='orderType'></phone-order>
			</view>
			<!-- 火车票订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'train'">
				<train-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></train-order>
			</view>
			<!-- 飞机票订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'air'">
				<air-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></air-order>
			</view>
			<!-- 水电费订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'electric'">
				<ele-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></ele-order>
			</view>
			<!-- 加油费订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'oil'">
				<oil-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></oil-order>
			</view>
			<!-- 汽车助手订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'car'">
				<car-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></car-order>
			</view>
			<!-- 信用卡订单 -->
			<view class="order-container-item full-width pa-md border-box" v-if="orderType === 'credit'">
				<credit-order v-for="(k, index) in list" :order="k" class="order-item full-width" :key="index"></credit-order>
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
	import phoneOrder from './phoneItem.vue'
	import trainOrder from './trainItem.vue'
	import airOrder from './airItem.vue'
	import eleOrder from './eleItem.vue'
	import oilOrder from './oilItem.vue'
	import carOrder from './carItem.vue'
	import creditOrder from './creditItem.vue'
	export default {
		name: 'orderShow',
		props: ['type', 'url', 'orderType'],
		components: {
			phoneOrder,
			trainOrder,
			airOrder,
			eleOrder,
			oilOrder,
			carOrder,
			creditOrder
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
			this.queryIndex(this.url)
		},
		methods: {
			async queryIndex (url) { // 请求首页
				const vm = this
				vm.final = false
				vm.status = 'loading'
				vm.page = 1
				const token = await uni.getStorageSync('token')
				const obj = {
					pagenum: vm.page,
					pagesize: vm.pageSize,
					type: vm.type,
					token: token
				}
				vm.loading = true
				vm.$post(url, obj).then(res => {
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
						type: vm.type,
						token: token
					}
					vm.$post(vm.url, obj).then(res => {
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
</style>
