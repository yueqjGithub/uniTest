const urls = {
	authList: [], // 需要身份认证的接口
	md5List: ['/v1/api/public/login'], // 需要加密的接口
	baseUrl: 'https://shopapi.apiself.com',
	// basic
	login: '/v1/api/public/login', // 登录
	init: '/v1/api/public/init', // 初始化
	// index
	queryIndex: '/v1/api/index/index', // 首页
	queryNotice: '/v1/api/index/notify', // 首页消息
	// store
	queryStore: '/v1/api/shop/index' // 商城首页
}

export default urls