<template>
	<view class="page bg-grey">
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'withdrawHis',
		data() {
			return {
			}
		},
		computed: {
			...mapState(['lang']),
			inputClass() {
				return this.lang === 'zh-CN' ? '' : ' my-text-right'
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			lang: {
				immediate: true,
				handler: function(val) {
					if (val !== 'zh-CN') {
						uni.setNavigationBarTitle({
							title: this._i18n.messages[val].pullPage.record
						})
					}
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.page{
	width: 100vw;
	height: 100vh;
}
</style>
