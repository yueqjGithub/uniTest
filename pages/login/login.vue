<template>
	<view class="login-container flex-row flex-jst-center flex-ali-center">
		<u-button type="primary" @click="login">{{$t('basic.login')}}</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		login () {
			const vm = this
			uni.getSetting({ // 1.检测是否有UserINfo权限
				success(result) {
					if (result.authSetting['scope.userInfo']) { // 有userInfo权限
						vm.$store.dispatch('loginHandler')
					} else { // 没有就强行有
						uni.openSetting({
							complete() {
							}
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.login-container{
	width: 100%;
	height: 100vh;
}
</style>
