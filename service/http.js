import urls from './urls.js'
import { generatorHandler, getDataHandler } from '@/utils/key.js'
const Fly = require("flyio/dist/npm/wx")
const fly = new Fly()


fly.config.baseURL = urls.baseUrl
fly.config.timeout = 10000
//添加请求拦截器
fly.interceptors.request.use(request => {
    //给所有请求添加自定义header
	if (urls.md5List.includes(request.url)) { // 加密传输
		const result = generatorHandler(JSON.stringify(request.body))
		request.headers.token = result[0]
		request.body = {
			data: result[1]
		}
	}
	// console.log(request)
	fly.lock();
	if (wx.getStorageSync('access_token')) {
		// 给所有请求添加自定义header
		request.headers = {
			...request.headers,
		  'content-type': 'application/x-www-form-urlencoded',
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
		// 解密操作
		if (urls.md5List.includes(response.request.url)) {
			// 后端返回200，执行解密
			if (response.data.success) {
				const result = getDataHandler(response.data.data)
				response.data.data = JSON.parse(result)
				return response.data
			} else {
				return response.data
			}
		}
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
	} else {
		uni.showToast({
			title: '请求出错',
			duration: 3000,
			icon: 'none'
		})
	}
})

const httpPost = (url, data) => {
	return fly.request(url, data, {
		method: 'post'
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