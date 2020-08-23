<template>
	<view class="bg-grey">
		<u-tabs-swiper ref="uTabs" :list="typeList" :is-scroll="false" active-color="#00BE87" inactive-color="#AAAAAA" :name="langType"
		 :current="curType" @change="tabsChange"></u-tabs-swiper>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-container">
			<swiper-item class="swiper-item" v-for="(item, index) in typeList" :key="index">
				<showsShow :type='item.type' :cateId="item.id"></showsShow>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import normalHead from '@/cusComponents/normalHead.vue'
	import showsShow from './shopsShow.vue'
	import urls from '@/service/urls.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'shoplist',
		components: {
			// normalHead
			showsShow
		},
		data() {
			return {
				curType: 0,
				swiperCurrent: 0,
				typeList: []
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
						title: this._i18n.messages[val].shopList.titName
					});
				}
			}
		},
		mounted() {
			this.queryTypeList()
		},
		methods: {
			queryTypeList() {
				const vm = this
				vm.$get(urls.queryCate, {}).then(res => {
					const urlType = getCurrentPages()[getCurrentPages().length - 1].options
					if (urlType) {
						const target = res.data.data.find(item => item.type === Number(urlType.type) && item.id === Number(urlType.id))
						vm.curType = res.data.data.indexOf(target)
						vm.swiperCurrent = vm.curType
					}
					vm.typeList = [...res.data.data]
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				// let dx = e.detail.dx;
				// this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
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
