<template>
	<view class="hot-container full-width flex-jst-start flex-ali-center flex-wrap" :class="langFlex">
		<view v-for="(k, idx) in hotList" :key='idx' class="hot-item flex-row flex-jst-center flex-ali-center" @click="chooseStation(k)" :class="choose.id === k.id ? 'text-primary' : ''">
			{{lang === 'zh-CN' ? k.name_cn : k.name}}
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'topCity',
		props: {
			hotList: {
				default: function () {
					return []
				}
			},
			choose: {
				default: function () {
					return {
						id: ''
					}
				}
			}
		},
		data () {
			return {}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		methods: {
			chooseStation (obj) {
				this.$emit('chooseHandler', obj)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container{
		.hot-item{
			border: 1px solid #CCCCCC;
			border-radius: 2px;
			padding: 5px 8px;
			color: #333333;
			box-sizing: border-box;
			margin: 0 5px 5px 5px;
			&.text-primary{
				color: $uni-color-primary;
				border-color: $uni-color-primary;
			}
		}
	}
</style>
