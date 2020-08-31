<template>
	<view class="pa-md flex-column flex-jst-start flex-ali-center charge-container full-width">
		<view class="full-width flex-row flex-jst-end flex-ali-center">
			<u-icon custom-prefix="iconfont" name="weibiaoti--14" size="35" class="text-grey" @click="closeHandler"></u-icon>
		</view>
		<view class="flex-column full-width flex-jst-start flex-ali-center">
			<view class="full-width flex-row flex-jst-center flex-ali-base">
				<text class="text-primary text-12 text-bold">￥</text>
				<text class="text-primary text-24 text-bold">{{target.face_value}}</text>
			</view>
			<text class="full-width text-center ma-col-sm text-grey text-12">{{$t('mobileCharge.chargeValue')}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
 	export default {
		name: 'charge',
		props: {
			target: {
				default: function () {
					return {}
				}
			},
			phone: {
				default: ''
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
		mounted () {
			console.log(this.target)
		},
		methods:{
			closeHandler () {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.charge-container{
		background: #FFFFFF;
	}
</style>
