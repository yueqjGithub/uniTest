<template>
	<view class="full-width pa-md border-box">
		<view class="pa-col-sm border-box card-tit flex-row flex-jst-center flex-ali-center text-16">{{$t('oilCenter.cardList')}}</view>
		<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
			<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
				<view class="full-width card-item ma-col-sm" :class="k.id === choose ? 'card-choose' : ''" v-for="(k, idx) in list" :key="idx" @click="choose=k.id">
					<view class="flex-jst-btw flex-ali-center pa-md border-box" :class="langFlex">
						<view class="card-cont flex-jst-start flex-ali-center" :class="langFlex">
							<image :src="k.thumb_image" mode="aspectFill" class="oil-logo"></image>
							<view class="flex-column flex-jst-center flex-ali-start ma-row-sm">
								<text class="text-12">{{lang==='zh-CN' ? k.name_cn : k.name}}</text>
								<text class="text-12 text-grey-1">{{k.user_name}}</text>
								<text class="text-12 text-grey-1">{{k.oil_card}}</text>
							</view>
						</view>
						<view class="card-confirm">
							<u-icon name="xuanze" custom-prefix="iconfont" v-if="choose === k.id" size="45" color="#23AF8C"></u-icon>
						</view>
					</view>
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
				},
				choose: '4'
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
				vm.loading = true
				vm.$post(urls.queryOilCardList, obj).then(res => {
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
			.card-confirm{
				width: 45rpx;
				height: 45rpx;
				border: 1px solid #d5d5d5;
				border-radius: 50%;
			}
			&.card-choose{
				border: 1px solid #23AF8C;
				.card-confirm{
					border: none;
				}
			}
			.oil-logo {
				width: 15vw;
				height: 15vw;
			}
		}
	}
</style>
