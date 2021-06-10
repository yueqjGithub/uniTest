<template>
	<view class="login-container flex-column flex-jst-ard flex-ali-center pa-lg border-box">
		<u-image src='/static/images/logo.png' width='30vw' height='11vw' mode='scaleToFill' :fade="true" duration="450"></u-image>
		<view class="full-width flex-row flex-jst-center flex-ali-center">
			<u-button type="normal" shape='circle' @click="login" class='cus-login-btn full-width text-primary' :hair-line='false'
			:custom-style='cusStyle'
			:ripple='true'
			>
			<u-icon name='weixin-circle-fill' size='50' class='ma-rt-5'></u-icon>
			{{$t('basic.login')}}</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cusStyle: {
				color: '#23AF8C',
				position: 'relative',
				overflow: 'hidden',
				border: 'none'
			}
		}
	},
	methods: {
		login () {
			const vm = this
			uni.getUserProfile({
			  desc: '获取你的昵称、头像、地区及性别',
			  success: function (infoRes) {
			    const user = infoRes.userInfo;
					vm.$store.dispatch('loginHandler', user)
			  },
				fail:function(value){
					console.log(value)
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.login-container{
	width: 100%;
	height: 100vh;
	background: linear-gradient(0deg, #19C882, #23AF8C);
}
</style>
