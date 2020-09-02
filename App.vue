<script>
	import urls from './service/urls.js'
	import {
		mapState
	} from 'vuex'
	export default {
		onLaunch: function() {
			this.$store.commit('changeInitStatus', 'false')
			const obj = {
				key: this.initKey,
				secret: this.initSecret
			}
			this.$get(urls.init, obj).then(res => {
				this.$store.commit('changeInitStatus', 'true')
				wx.setStorageSync('access_token', res.data.access_token)
				wx.setStorageSync('refresh_token', res.data.refresh_token)
			})
		},
		onShow: function(config) {
			console.log(config)
			const inviter = config.query.inviter || null
			if (inviter) {
				this.$store.commit('setInviter', inviter) // 如果进入时有inviter,提交至全局进行存放表示被邀请进入
			}
		},
		onHide: function() {
		},
		computed: {
			...mapState(['initKey', 'initSecret'])
		}
	};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
