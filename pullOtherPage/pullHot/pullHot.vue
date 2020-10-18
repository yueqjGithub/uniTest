<template>
	<view class="bg-grey page-container">
		<view class="status_bar">
			<!--status占位-->
			<view class="status_null"></view>
			<!-- navbar -->
			<view class="full-width flex-row flex-jst-btw flex-ali-center pa-col-md border-box">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" class="text-white flex-1" size="45" @click="goBack"></u-icon>
				<text class="flex-2 text-center text-white">{{pageName}}</text>
				<view class="flex-1"></view>
			</view>
		</view>
		<!-- body -->
		<view class="head-bg flex-column flex-jst-end flex-ali-center">
			<!-- 图片预留 -->
		</view>
		<view class="cont-container mine-info pa-md border-box flex-jst-btw flex-ali-center" :class="langFlex">
			<view class="flex-row flex-jst-center flex-ali-center">
				<u-avatar :src="my_data.profile_photo" class="ma-rt-5"></u-avatar>
				<text class="font-12">{{my_data.nickname}}</text>
			</view>
			<view class="flex-column self-stretch flex-jst-ard flex-ali-center">
				<text class="text-12 text-grey-1">{{$t('pullHot.earn')}}</text>
				<view class="text-24 text-cus-error text-bold flex-row flex-jst-center flex-ali-base">
					<text class="text-12">￥</text>
					<text>{{my_data.money}}</text>
				</view>
			</view>
		</view>
		<!-- 榜单 -->
		<view class="cont-container pa-md border-box list-container ma-col-lg">
			<scroll-view scroll-y class="cus-scroll-content" @scrolltolower="loadMore">
				<view class="shops-container flex-column flex-jst-start flex-ali-center" v-if="list.length > 0">
					<view v-for="(k, idx) in list" :key="k.nickname" class="junior-item full-width pa-col-sm ma-sm border-box flex-row flex-jst-center flex-ali-center">
						<view :class="langFlex" class="flex-jst-btw flex-ali-center full-width">
							<view class="junior-left flex-jst-btw flex-ali-center" :class="langFlex">
								<view v-if="idx < 3" class="rank-top">
									<u-icon name="VIPhuiyuan" custom-prefix="iconfont" size="60" :color="colorList[idx]"></u-icon>
									<text class="font-12 text-white rank-idx">{{idx+1}}</text>
								</view>
								<text class="text-14 text-grey-1" v-else>{{idx+1}}</text>
								<u-avatar :src="k.profile_photo" class="ma-row-md"></u-avatar>
								<text class="text-14">{{k.nickname.substring(0, 2)}}***</text>
							</view>
							<view class="text-24 text-primary text-bold flex-row flex-jst-center flex-ali-base">
								<text class="text-12">￥</text>
								<text>{{k.money}}</text>
							</view>
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
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'pullHot',
		data() {
			return {
				page: 1,
				pageSize: 20,
				list: [],
				colorList: ['#FFA500', '#B4B4B4', '#AF877D'],
				my_data: '',
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
			pageName () {
				return this._i18n.messages[this.lang].pullHot.pageName
			}, 
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		onShow () {
			this.queryIndex()
		},
		methods: {
			...mapActions(['checkLogin']),
			goBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			async queryIndex () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					const obj = {
						pagenum: vm.page,
						pagesize: vm.pageSize,
						token: token
					}
					vm.$post(urls.pullRank, obj).then(res => {
						console.log(res)
						vm.my_data = res.data.my_data
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
						token: token
					}
					vm.$post(urls.pullRank, obj).then(res => {
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
.page-container{
	width: 100%;
	height: 100vh;
	min-height: calc(100vh - 175rpx);
	.text-gold{
		color: #DCB46E;
	}
	.status_bar {
		width: 100vw;
		height: 175rpx;
		background: linear-gradient(80deg, #A023C8, #E11932);
		z-index: 10;
		.status_null {
			width: 100%;
			height: 44px;
		}
	}
	.head-bg{
		width: 100vw;
		height: 275rpx;
		background: linear-gradient(80deg, #A023C8, #E11932);
		border-bottom-left-radius: 50vw 5vh;
		border-bottom-right-radius: 50vw 5vh;
	}
	.cont-container{
		width: 95%;
		background: #FFFFFF;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0px 10px 24.3rpx 0px rgba(170, 170, 170, 0.1);
		border-radius: 20.83rpx;
		&.mine-info{
			margin-top: -100rpx;
		}
		&.list-container{
			height: 60vh;
			.cus-scroll-content{
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				.rank-top{
					position: relative;
					.rank-idx{
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
			}
		}
	}
}
</style>
