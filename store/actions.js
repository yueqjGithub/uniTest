import urls from '@/service/urls.js'
import { httpPost } from '@/service/http.js'


export const setLang = (context, payload) => { // 变更语言
	context.commit('changeLang', payload)
}

export const loginHandler = (context) => { // 微信方登录获取userINFO
	uni.login({
	  provider: 'weixin',
	  success: function (loginRes) {
	    // 获取用户信息
			const code = loginRes.code
	    uni.getUserInfo({
	      provider: 'weixin',
	      success: function (infoRes) {
	        const user = infoRes.userInfo;
					context.dispatch('getLoginToken', {code: code, ...user})
	      },
				fail:function(value){
					console.log(value)
				}
	    });
	  },
		fail:function(value){
			console.log(value)
		}
	});
}

export const getLoginToken = (context, user) => { // 自定义登录
	const genderMap = [
		{ key: 0, value: '未知' },
		{ key: 1, value: '男' },
		{ key: 2, value: '女' }
	]
	const obj = {
		code: user.code,
		profile_photo: user.avatarUrl,
		nickname: user.nickName,
		sex: genderMap.find(item => item.key === user.gender).value,
		inviter: '',
		province: user.province,
		city: user.city,
		area: ''
	}
	httpPost(urls.login, obj).then(res => {
		if (res.success) {
			wx.setStorageSync('token', res.data.token)
			uni.navigateBack({
				delta: 1
			})
		} else {
			uni.showToast({
				title: res.message,
				duration: 3000,
				icon: 'none'
			})
		}
	}, err => {
		uni.showToast({
			title: err.message,
			duration: 3000,
			icon: 'none'
		})
	})
}