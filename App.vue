<script>
import urls from './service/urls.js'
export default {
	onLaunch: function() {
		console.log('App Launch1');
	},
	onShow: function() {
		// this.$post(urls.test).then(res => {
		// 	console.log(res)
		// }, err => {
		// 	console.log('请求出错')
		// 	console.log(err)
		// })
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
