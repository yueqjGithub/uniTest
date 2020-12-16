<template>
	<view class="full-width flex-row flex-jst-btw flex-ali-center">
		<view class='tab-item flex-column flex-jst-btw flex-ali-center' v-for="(k, index) in tabList" :key="index" @click="turnPage(k)">
			<u-icon :name="k.icon" custom-prefix="iconfont" size="50" :style="{color: k.color}"></u-icon>
			<text class="text-grey text-12">{{k.name}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'orderTabItem',
		data () {
			return {
				list: [
					{
						name: 'all',
						icon: 'tianchongxing-28',
						color: '#AF41FF',
						path: '',
						id: 0,
						type: 0
					},
					{
						name: 'waitSure',
						icon: 'icon-35',
						color: '#FF7D00',
						path: '',
						id: 0,
						type: 3
					},
					{
						name: 'already',
						icon: 'tianchongxing-9',
						color: '#FF3232',
						path: '',
						id: 0,
						type: 4
					},
					{
						name: 'noPay',
						icon: 'tianchongxing-66',
						color: '#00AFFF',
						path: '',
						id: 0,
						type: 1
					}
				]
			}
		},
		computed: {
			...mapState(['lang']),
			tabList () {
				const vm = this
				const newList = [...this.list]
				newList.forEach(item => {
					item.name = vm._i18n.messages[vm.lang].mine[item.name]
				})
				return vm.lang === 'zh-CN' ? newList : [...newList].reverse()
			}
		},
		methods: {
			...mapActions(['checkLogin']),
			makePath (target) {
				return `/pages/myOrder/myOrder?type=${target.type}&id=${target.id}`
			},
			async turnPage (target) {
				const vm = this
				const result = await vm.checkLogin()
				if (result) {
					const path = vm.makePath(target)
					uni.navigateTo({
						url: path,
						fail(reason) {
							console.log(reason)
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style>
</style>
