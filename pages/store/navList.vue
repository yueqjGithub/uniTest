<template>
	<view class="nav-container flex-row flex-jst-btw flex-ali-center">
		<view class="nav-item flex-column flex-jst-btw flex-ali-center" v-for="k in navList" :key="k.type" @click="toCatePage(k)">
			<view class="nav-circle" :style="{background: k.bgColor, boxShadow: k.boxShadow}">
				<u-icon :name="k.icon" color="#ffffff" size="50" custom-prefix="iconfont"></u-icon>
			</view>
			<text class="nav-name">{{k.name}}</text>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'navList',
	data () {
		return {
			typeList: [
				{name: 'type', icon: 'weibiaoti--35', type: 1, id: 0, start_bg: '#FF4B4B', end_bg: '#FF9696'},
				{name: 'discount', icon: 'weibiaoti--46', type: 3, id: 0, start_bg: '#FF9632', end_bg: '#FFD232'},
				{name: 'suggestion', icon: 'weibiaoti--34', type: 2, id: 0,start_bg: '#00AFFF', end_bg: '#00D7FF'}
			]
		}
	},
	computed: {
		...mapState(['lang']),
		navList () {
			const vm = this
			const result = []
			this.typeList.forEach(item => {
				const obj = {
					name: vm._i18n.messages[vm.lang].store[item.name],
					icon: item.icon,
					type: item.type,
					id: item.id,
					start_bg: item.start_bg,
					end_bg: item.end_bg,
					bgColor: `linear-gradient(0deg,${item.start_bg},${item.end_bg});`,
					boxShadow: `0px 2px 5px 1px ${item.end_bg}`
				}
				result.push(obj)
			})
			return result
		}
	},
	methods: {
		toCatePage (obj) {
			uni.navigateTo({
				url: `/pages/shoplist/shoplist?type=${obj.type}&id=${obj.id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.nav-container{
		width: 100%;
		.nav-item{
			padding: 4px;
			.nav-circle{
				margin: 4px 0;
				width: 90.27rpx;
				height: 90.27rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 90.27rpx;
			}
			.nav-name{
				font-size: 12px;
			}
		}
	}
</style>
