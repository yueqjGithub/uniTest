<template>
	<view class="bg-grey my-order">
		<u-tabs-swiper ref="uTabs" :list="typeList" :is-scroll="lang==='en-US'" active-color="#00BE87" inactive-color="#AAAAAA" :name="langType"
		 :current="curType" @change="tabsChange"></u-tabs-swiper>
		 <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-container">
		 	<swiper-item class="swiper-item" v-for="(item, index) in typeList" :key="index">
		 		<order-show :type='item.type' :url="listUrl" :orderType="orderType"></order-show>
		 	</swiper-item>
		 </swiper>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import urls from '@/service/urls.js'
	import orderShow from './orderShow.vue'
	export default {
		name: 'commonOrder',
		components: {
			orderShow
		},
		data() {
			return {
				curType: 0,
				swiperCurrent: 0,
				typeList: [],
				listUrl: '',
				orderType: '',
				orderTypeList: [
					{ type: 'phone', pageName: 'phonePage', typeUrl: urls.phoneOrderType, listUrl: urls.phoneOrderList },
					{ type: 'train', pageName: 'trainPage', typeUrl: urls.trainOrderType, listUrl: urls.trainOrderList },
					{ type: 'air', pageName: 'airPage', typeUrl: urls.airOrderType, listUrl: urls.airOrderList },
					{ type: 'electric', pageName: 'elePage', typeUrl: urls.eleOrderType, listUrl: urls.queryEleOrder }
				]
			}
		},
		onShow () {
			const vm = this
			const options = getCurrentPages()[getCurrentPages().length - 1].options
			if (options.type) {
				const target = this.orderTypeList.find(item => item.type === options.type)
				 uni.setNavigationBarTitle({ // 设置页面标题
					title: vm._i18n.messages[vm.lang].commonOrder[target.pageName]
				 })
				 vm.listUrl = target.listUrl
				 vm.orderType = options.type
				vm.queryTypeList(target.typeUrl)
			}
		},
		computed: {
			...mapState(['lang']),
			langType() {
				return this.lang === 'zh-CN' ? 'name_cn' : 'name'
			}
		},
		methods: {
			queryTypeList (url) {
				const vm = this
				vm.$get(url, {}).then(res => {
					vm.typeList = [...res.data]
				})
			},
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				// let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.curType = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
.swiper-container{
	height: calc(100vh - 40px);
}
</style>
