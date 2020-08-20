import urls from './urls.js'
const Fly = require("flyio/dist/npm/wx")
const fly = new Fly()

fly.config.baseURL = urls.baseUrl
fly.config.timeout = 10000
//添加请求拦截器
fly.interceptors.request.use(request => {
    //给所有请求添加自定义header
	fly.lock();
	if (wx.getStorageSync('access_token')) {
		// 给所有请求添加自定义header
		request.headers = {
		  'content-type': 'application/json',
		  'X-Tag': 'flyio',
		  'access-token': wx.getStorageSync('access_token'),
			'refresh-token': wx.getStorageSync('refresh_token')
		};
		fly.unlock();//解锁请求
	} else {
		fly.unlock();//解锁请求
	}
	return request
})

fly.interceptors.response.use(response => {
	const status = response.status
	if (status >= 200 && status < 300) {
		return response.data
	}
}, err => {
	const status = err.status || ''
	if (status === 401) {
		uni.showToast({
			title: '登录过期',
			duration: 3000,
			icon: 'none'
		})
		throw new Error('登录过期')
	} else {
		throw new Error('请求出错')
	}
})

const httpPost = (url, data) => {
	return fly.request({
		url: url,
		method: 'post',
		data: data
	})
}

const httpGet = (url, params) => {
	return fly.request({
		url: url,
		method: 'get',
		params
	})
}

export { httpPost, httpGet }