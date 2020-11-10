<template>
	<view class="pre-license full-width  ma-col-md">
		<view class="pa-lg border-box scan-container flex-column flex-jst-center" :class="lang === 'zh-CN' ? 'flex-ali-start' : 'flex-ali-end'">
			<view class="flex-jst-start flex-ali-center ma-col-sm" :class="langFlex">
				<text class="labels text-12 text-grey-1" :class="rightClass">{{$t('carCenter.licenseNumber')}}</text>
				<text class="text-12" :class="rightClass">{{licenseNumber}}</text>
			</view>
			<view class="flex-jst-start flex-ali-center ma-col-sm" :class="langFlex">
				<text class="labels text-12 text-grey-1" :class="rightClass">{{$t('carCenter.fileNumber')}}</text>
				<text class="text-12" :class="rightClass">{{fileNumber}}</text>
			</view>
			<view class="ma-col-md full-width my-split"></view>
			<view class="pa-row-md border-box full-width flex-row flex-jst-center flex-ali-center">
				<view class="action flex-row flex-jst-center flex-ali-center">
					<u-icon name="weibiaoti--32" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
				<view class="action flex-row flex-jst-center flex-ali-center">
					<u-icon name="weibiaoti--67" custom-prefix="iconfont" color="#d5d5d5" size="35"></u-icon>
				</view>
			</view>
		</view>
		<!-- 用户协议 -->
		<view class="pa-sm"></view>
		<view class="full-width flex-jst-start flex-ali-center pa-col-md no-ma-checkbox" :class="langFlex">
			<u-checkbox-group active-color="#00BE88" shape="circle">
				<u-checkbox v-model="sure" name="true"></u-checkbox>
			</u-checkbox-group>
			<text class="text-12 text-grey-1 ma-row-sm">{{$t('electricIndex.makeSure')}}</text>
		</view>
		<!-- 按钮 -->
		<view class="pa-row-lg ma-col-md border-box full-width flex-row flex-jst-center flex-ali-center">
			<button type="default" class="my-btn-primary text-white text-14" @click="doCharge">{{$t('basic.search')}}</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'preLicensePage',
		data () {
			return {
				sure: false,
				licenseNumber: '',
				fileNumber: ''
			}
		},
		computed: {
			...mapState(['lang']),
			langFlex () {
				return this.lang === 'zh-CN' ? 'flex-row' : 'flex-row-reverse'
			},
			rightClass () {
				return this.lang === 'zh-CN' ? 'text-left' : 'text-right'
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.pre-license{
		.scan-container{
			border-radius: 10.41rpx;
			border: 1px solid #efefef;
			.labels{
				width: 100rpx;
			}
			.my-split{
				height: 1px;
				background: #efefef;
			}
			.action {
				margin-left: 10px;
				margin-right: 10px;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				border: 1px solid #d5d5d5;
			}
		}
	}
</style>
