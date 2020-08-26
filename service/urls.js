const urls = {
	authList: [], // 需要身份认证的接口
	md5List: ['/v1/api/public/login', '/v1/api/shop/details', '/v1/api/shop/collect', '/v1/api/shop/buy',
	'/v1/api/shop/pretreatment', '/v1/api/shippingaddress/edit', '/v1/api/shop/orderlist'
	], // 需要加密的接口2
	baseUrl: 'https://shopapi.apiself.com',
	// basic
	login: '/v1/api/public/login', // 登录2
	init: '/v1/api/public/init', // 初始化
	// index
	queryIndex: '/v1/api/index/index', // 首页
	queryNotice: '/v1/api/index/notify', // 首页消息
	// store
	queryStore: '/v1/api/shop/index', // 商城首页
	queryCate: '/v1/api/shop/cate', // 商品分类
	queryStoreList: '/v1/api/shop/list', // 商品列表
	queryShopDetail: '/v1/api/shop/details', // 商城详情2
	changeCollect: '/v1/api/shop/collect', // 收藏，取消收藏2
	// order
	createOrder: '/v1/api/shop/buy', // 订单创建2
	editAddress: '/v1/api/shippingaddress/edit', // 编辑添加收货地址2
	getAddressList: '/v1/api/shop/pretreatment', // 获取收货地址列表
	queryOrderType: '/v1/api/shop/ordercate', // 获取订单分类
	queryOrderList: '/v1/api/shop/orderlist' // 请求订单列表2
}

export default urls