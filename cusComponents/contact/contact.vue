<template>
	<!-- 联系人模块 -->
	<view class="full-width">
		<view class="c-tit" :class="langFlex">
			<text class="text-grey-1 text-14">{{$t('contact.titTip')}}</text>
		</view>
		<view class="pa-md border-box flex-row flex-jst-center flex-ali-center" v-if="form.pis_number === ''">
			<u-icon custom-prefix="iconfont" name="weibiaoti--12" size="45" class="text-primary" @click="toEditPage"></u-icon>
		</view>
		<view :class="langFlex" class="flex-jst-btw flex-ali-center c-cont" v-else>
			<view class="flex-jst-center flex-column flex-ali-start flex-3 pa-col-md border-box" @click="toEditPage">
				<text class="text-14 ma-col-sm">{{form.pis_full_name}}</text>
				<text class="text-14">{{form.pis_id_card}}</text>
			</view>
			<view class="flex-1 flex-row flex-jst-center flex-ali-center">
				<view class="del-icon-out flex-row flex-jst-center flex-ali-center" @click="delContact">
					<u-icon custom-prefix="iconfont" name="tianchongxing-32" size="35" class="text-grey-1"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import urls from '@/service/urls.js'
	export default {
		name: 'contact',
		props: ['commitSymbol'], // 变更即触发提交
		data () {
			return {
				showNull: false,
				form: {
					pis_number: '',
					pis_id_card: '',
					pis_full_name: '' // 姓名
				}
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			}
		},
		watch: {
			commitSymbol: {
				immediate: false,
				deep: true,
				handler: function (val) {
					this.$emit('commit', this.form.pis_number)
				}
			}
		},
		mounted () {
			this.initInfo()
		},
		methods: {
			...mapActions(['checkLogin']),
			async initInfo () {
				const vm = this
				uni.showLoading({
					title: ''
				})
				const token = await vm.checkLogin()
				if (token) {
					let obj = {
						token: token
					}
					vm.$post(urls.queryContact, obj).then(res => {
						uni.hideLoading()
						if (res.data.length > 0 ) {
							for (let k in vm.form) {
								vm.form[k] = res.data[0][k]
							}
						} else {
							vm.showNull = true
						}
					}, err => {
						uni.hideLoading()
					})
				} else {
					uni.hideLoading()
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			toEditPage () {
				uni.navigateTo({
					url: '/trainTicket/passenger/passenger'
				})
			},
			async delContact () {
				const vm = this
				const token = await vm.checkLogin()
				if (token) {
					uni.showLoading({
						title: ''
					})
					const obj = {
						token: token,
						pis_number: vm.form.pis_number
					}
					vm.$post(urls.delContact, obj).then(res => {
						uni.hideLoading()
						if (res.success) {
							vm.form = {
								pis_number: '',
								pis_id_card: '',
								pis_full_name: '' // 姓名
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: ''
							})
						}
					}, err => {
						uni.hideLoading()
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

<style lang="scss" scoped>
	.c-cont{
		.del-icon-out{
			width: 55.55rpx;
			height: 55.55rpx;
			background: #FFFFFF;
			border: 1px solid #D0D0D0;
			border-radius: 50%;
		}
	}
</style>
