<template>
	<view class="train-page bg-grey">
		<view class="train-head">
			<!--status占位-->
			<view class="status-bar flex-column flex-jst-end flex-ali-center">
				<text class="text-14 text-white ma-col-sm">{{pageName}}</text>
			</view>
			<!-- navbar -->
		</view>
		<!-- body -->
		<view class="content border-box pa-md flex-column flex-jst-start flex-ali-center">
			<view class="full-width flex-row flex-jst-btw flex-ali-end">
				<view class='train-adrees flex-column flex-ali-center flex-jst-btw'></view>
				<view class='train-adrees flex-column flex-ali-center flex-jst-btw'></view>
			</view>
		</view>
		<!-- 地址选择弹出 -->
		<u-popup v-model="showAddress" mode="bottom" :closeable="false" border-radius="15">
			<address-bar v-if="showAddress"></address-bar>
		</u-popup>
		<!-- 底部 -->
		<view class="tab-add"></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	import { mapState } from 'vuex'
	import addressBar from './addressBar.vue'
	import urls from '@/service/urls.js'
	export default {
		name: 'trainIndex',
		components: {
			cusTabbar,
			addressBar
		},
		data() {
			return {
				showAddress: true
			}
		},
		computed: {
			...mapState(['lang']),
			pageName () {
				return this._i18n.messages[this.lang].train.pageName
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.train-page{
	width: 100%;
	min-height: calc(100vh - 56px);
	.train-head{
		height: 479.16rpx;
		background: linear-gradient(45deg, #19C882, #23AF8C);
		border-bottom-left-radius: 50vw 3vh;
		border-bottom-right-radius: 50vw 3vh;
		.status-bar{
			width: 100%;
			height: 175rpx;
			position: relative;
			box-sizing: border-box;
			padding-bottom: 4px;
		}
	}
	.content{
		width: 90%;
		margin: -290rpx auto 0 auto;
		background: #FFFFFF;
		box-shadow: 0px 10px 35px 0px rgba(170, 170, 170, 0.1);
		border-radius: 30px;
	}
}
</style>
