<template>
	<view class="full-width my-menu-grid">
		<u-grid :col="3" :border="false">
			<u-grid-item v-for="k in showList" :key="k.id" @click="toPage(k)">
				<u-icon :name="k.icon" custom-prefix="iconfont" :size="50" :style="{color: k.color}"></u-icon>
				<view class="text-12 text-grey">{{lang === 'zh-CN' ? k.name_cn : k.name}}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'menuList',
		props: {
			list: {
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
				menuList: [{
					id: 'A1598610570',
					color: '#FF5A96',
					path: '/pages/store/store',
					icon: 'tianchongxing-66',
					name_cn: '商城',
					name: 'بازار'
				},{
					id: 'A1597798942',
					color: '#FF8C28',
					path: '/pages/commonOrder/commonOrder?type=traffic',
					icon: 'liuliang',
					name_cn: '流量',
					name: "تور ئېقىمى"
				},{
					id: 'A1597798908',
					color: '#1ABC9C',
					path: '/pages/commonOrder/commonOrder?type=electric',
					icon: 'shuidian',
					name_cn: '水电费',
					name: 'توك،سۇ ھەققى'
				},{
					id: 'A1597798659',
					color: '#7864C8',
					path: '/pages/commonOrder/commonOrder?type=train',
					icon: 'huochepiao',
					name_cn: '火车票',
					name: 'پويىز بېلىتى'
				},{
					id: 'A1597798618',
					color: '#E74C3C',
					path: '/pages/commonOrder/commonOrder?type=air',
					icon: 'feiji800',
					name_cn: '机票',
					name: 'ئايروپىلان بېلىتى'
				},{
					id: 'A1597042954',
					color: '#3498DB',
					path: '/pages/commonOrder/commonOrder?type=phone',
					icon: 'shouji',
					name_cn: '手机充值',
					name: "تېلېفۇن ھەققى"
				},{
					id: 'A1603117092',
					color: '#FF7341',
					path: '/pages/commonOrder/commonOrder?type=oil',
					icon: 'ditujiayouzhan',
					name_cn: '油卡',
					name: 'ماي قاچىلاش'
				},{
					id: 'A1604643763',
					color: '#3498DB',
					path: '/pages/commonOrder/commonOrder?type=car',
					icon: 'qiche',
					name_cn: '汽车违章',
					name: "جەرىمانە تاپشۇرۇش"
				},{
					id: 'A1604147601',
					color: '#0ABEC8',
					path: '/pages/commonOrder/commonOrder?type=credit',
					icon: 'xinyongqiahuankuan',
					name_cn: '信用卡',
					name: 'ئىناۋەت كارتا'
				}]
			}
		},
		computed: {
			...mapState(['lang']),
			showList () {
				const vm = this
				return vm.menuList.filter(item => vm.list.includes(item.id))
			}
		},
		methods: {
			toPage (target) {
				uni.navigateTo({
					url: target.path
				})
			}
		}
	}
</script>

<style>
</style>
