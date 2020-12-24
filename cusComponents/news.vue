<template>
	<view class="recommended-container pa-md">
		<view class="re-tit flex-jst-btw flex-ali-center" :class="rowDirection">
			<text class="re-tit-word">{{titName}}</text>
			<view class="flex-row flex-jst-btw flex-ali-center flex-nowrap">
				<view v-for="k in steps" :key="k" class="my-dot" :class="current === k ? 'cur-dot' : ''"></view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="shops-container flex-row flex-wrap flex-jst-btw flex-ali-start">
			<goods-item :goods="k" v-for="(k, index) in info.data" :key="index" class="goods-item"></goods-item>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import goodsItem from '@/cusComponents/goodsItem.vue'
	export default {
		name: 'news',
		components: {
			goodsItem
		},
		props: {
			info: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
			return {
				current: 0
			}
		},
		computed: {
			...mapState(['lang']),
			rowDirection () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			titName () {
				return this.lang === 'zh-CN' ? this.info.name_cn : this.info.name
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.recommended-container{
		.re-tit{
			margin-bottom: 10px;
			.re-tit-word{
				font-weight: bold;
			}
		}
		.shops-container{
			padding: 0 5px;
			.goods-item{
				margin-bottom: 10px;
			}
		}
	}
</style>
