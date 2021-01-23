<template>
	<view class="ads-container border-box">
		<!-- 地理位置获取弹出 -->
		<u-modal v-model="show" :content="noAuthTips" @confirm="openset" show-cancel-button :title="$t('basic.tip')"
		 :confirm-text="$t('basic.ok')" :cancel-text="$t('basic.cancel')"></u-modal>
		 <!-- 标题 -->
		<view class="text-center ads-tit text-16">{{titName}}</view>
		<!-- 搜索 -->
		<view class="search-container flex-jst-btw flex-ali-center flex-row">
			<u-field :class="lang === 'zh-CN' ? '' : 'my-text-right'" :border-bottom="false" @input="changeSearch" :clearable="false"
			:placeholder="$t('train.searchPlaceholder')" :label-width="1" placeholder-style="font-family: 'cusFont','yahei';"
			 type="text"></u-field>
			 <u-icon custom-prefix="iconfont" name="weibiaoti--4" class="text-grey" size="35"></u-icon>
		</view>
		<!-- 地址显示 -->
		<view class="show-bar flex-row flex-jst-btw flex-ali-center pa-col-md">
			<view class="flex-row flex-jst-start flex-ali-center text-primary">
				<u-icon custom-prefix="iconfont" name="weibiaoti--37" size="34"></u-icon>
				<text class="text-primary text-14">{{chooseName}}</text>
			</view>
			<view class="text-14 text-grey-1">{{local}}</view>
		</view>
		<!-- 热门城市 -->
		<!-- <hot-city :list='hotList' @confirm='setChoose'></hot-city> -->
		<!-- 热门城市 -->
		<view :class="langFlex" class="full-width text-12 text-grey ma-col-md">{{$t('train.topCity')}}</view>
		<hot-list :hotList='topList' @chooseHandler="setChoose" :choose="current"></hot-list>
		<!-- 地址列表 -->
		<view :class="langFlex" class="full-width text-12 text-grey ma-col-md">{{$t('train.stationTit')}}</view>
		<add-list @chooseHandler="setChoose" :choose="current" :search="search_key" :type="type" @setTop='setTop'></add-list>
		<view class="full-width flex-row flex-jst-center flex-ali-center">
			<view class="width-80 flex-row flex-jst-center pa-col-md">
				<button type="default" class="my-btn-primary text-white text-14" @click="subStation">{{$t('basic.ok')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import {
		mapState
	} from 'vuex'
	import addList from './addressList.vue'
	import hotList from './topCity.vue'
	const amapFile = require('../../utils/amap-wx.js')
	export default {
		name: 'addressBar',
		components: {
			addList,
			hotList
		},
		props: ['target', 'type'], // 根据target决定是更新起始位置还是结束位置
		data() {
			return {
				show: false,
				pagenum: 1,
				pagesize: 10,
				search_key: '',
				result: '',
				current: '',
				local: '',
				topList: []
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
			},
			chooseName () {
				let result = this._i18n.messages[this.lang].basic.chooseTip
				if (this.current !== '') {
					result = this.lang === 'zh-CN' ? this.current.name_cn : this.current.name
				}
				return result
			}
		},
		mounted() {
			this.checkSysLocation()
		},
		methods: {
			setTop (list) {
				this.topList = list
			},
			changeSearch (val) {
				const vm = this
				vm.$u.debounce(() => {
					vm.search_key = val
				}, 500)
			},
			subStation () { // 向父组件传递站点
				const obj = {
					station: this.current,
					status: this.target
				}
				this.$emit('setStation', obj)
			},
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
								vm.local = data[0].regeocodeData.addressComponent.city
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
		.search-container{
			width: 90%;
			margin: 10px auto;
			background: #f3f3f3;
			height: 48px;
			border-radius: 24px;
			padding: 5px 24px;
			box-sizing: border-box;
		}
		.show-bar{
			border-top: 1px solid #CCCCCC;
			border-bottom: 1px solid #CCCCCC;
			padding-top: 10px;
			margin-top: 10px;
		}
	}
</style>
