<template>
	<view class="ads-container border-box">
		<!-- 地理位置获取弹出 -->
		<u-modal v-model="show" :content="noAuthTips" @confirm="openset" show-cancel-button :title="$t('basic.tip')"
		 :confirm-text="$t('basic.ok')" :cancel-text="$t('basic.cancel')"></u-modal>
		<view class="text-center ads-tit text-16">{{titName}}</view>
		<view :class="langFlex" class="full-width text-12 text-grey ma-col-md">{{$t('train.stationTit')}}</view>
		<add-list @chooseHandler="setChoose" :choose="current"></add-list>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import {
		mapState
	} from 'vuex'
	import addList from './addressList.vue'
	const amapFile = require('../../utils/amap-wx.js')
	export default {
		name: 'addressBar',
		components: {
			addList
		},
		data() {
			return {
				show: false,
				pagenum: 1,
				pagesize: 10,
				search_key: '',
				result: '',
				current: ''
			}
		},
		computed: {
			...mapState(['lang', 'mapKey']),
			titName() {
				return this._i18n.messages[this.lang].train.addressTit
			},
			langFlex() {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			noAuthTips() {
				return this._i18n.messages[this.lang].train.locationTips
			}
		},
		mounted() {
			this.checkSysLocation()
		},
		methods: {
			setChoose (city) { // 设置当前选择城市
				this.current = city
			},
			openset() { // 打开用户授权设置
				const vm = this
				uni.openSetting({
					success(res) {
						if (res.authSetting['scope.userLocation']) {
							vm.getSysLocation()
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			checkSysLocation() { // 检测地理信息授权
				const vm = this
				uni.authorize({
					scope: 'scope.userLocation',
					success(res) {
						vm.getSysLocation()
					},
					fail(err) {
						vm.show = true
					}
				})
			},
			getSysLocation() { // 逆编码
				const vm = this
				uni.getLocation({
					success(res) {
						const myAmapFun = new amapFile.AMapWX({
							key: vm.mapKey
						})
						myAmapFun.getRegeo({
							success: function(data) {
								console.log(data)
							},
							fail: function(info) {
								//失败回调
								console.log(info)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ads-container {
		width: 100%;
		padding: 10px 10px 0 10px;
	}
</style>
