import urls from '@/service/urls.js'

export const setLang = (context, payload) => { // 变更语言
	context.commit('changeLang', payload)
}

export const loginHandler = (context) => {
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
	      }
	    });
	  }
	});
}

export const getLoginToken = (context, user) => {
	// code	string	[必填]	 微信返回的
	// pic	string	[必填]	 头像
	// nickName	string	[必填]	 昵称
	// sex	string	[必填]	 性别:男 女
	// inviter	string	[必填]	 邀请人编号
	// province	string	[选填]	 ʡ
	// city	string	[选填]	 市
	// area	string	[选填]	 区
	// console.log(user)
	const obj = {
		code: user.code,
		pic: user.avatarUrl,
		nickName: user.nickName,
		sex: user.gender,
		inviter: '',
		province: user.province,
		city: user.city,
		area: ''
	}
	console.log(obj)
}