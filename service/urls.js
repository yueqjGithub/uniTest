const urls = {
	socket: 'wss://shopapi.apiself.com:9527', // 火车订单socket地址
	authList: [], // 需要身份认证的接口
	md5List: ['/v1/api/public/login', '/v1/api/shop/details', '/v1/api/shop/collect', '/v1/api/shop/buy',
	'/v1/api/shop/pretreatment', '/v1/api/shippingaddress/edit', '/v1/api/shop/orderlist', '/v1/api/user/shopcollect',
	'/v1/api/user/info', '/v1/api/vip/opening', '/v1/api/shop/delivery', '/v1/api/cecharge/attribution', '/v1/api/telephone/denomination',
	'/v1/api/cecharge/balance', '/v1/api/telephone/commit', '/v1/api/telephone/order', '/v1/api/public/delpis', '/v1/api/train/commit',
	'/v1/api/train/station', '/v1/api/train/find', '/v1/api/ticket/find', '/v1/api/ticket/station', '/v1/api/public/gitpis', '/v1/api/public/pis',
	'/v1/api/ticket/commit'
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
	queryCollectList: '/v1/api/user/shopcollect', // 收藏列表2
	logistics: '/v1/api/shop/delivery', // 物流信息2
	// order
	createOrder: '/v1/api/shop/buy', // 订单创建2
	editAddress: '/v1/api/shippingaddress/edit', // 编辑添加收货地址2
	getAddressList: '/v1/api/shop/pretreatment', // 获取收货信息
	queryOrderType: '/v1/api/shop/ordercate', // 获取订单分类
	queryOrderList: '/v1/api/shop/orderlist', // 请求订单列表2
	// 个人中心
	queryMineInfo: '/v1/api/user/info', // 个人中心2
	// 会员
	becomeVip: '/v1/api/vip/opening', // 开通会员2
	queryVipList: '/v1/api/vip/list', // 获取会员类型列表
	queryPriceList: '/v1/api/telephone/denomination', // 查询充值面额列表2
	searchPhoneInfo: '/v1/api/cecharge/attribution', // 查询归属地？2
	queryPhoneBalance: '/v1/api/cecharge/balance', // 查询话费余额2
	chargeMobile: '/v1/api/telephone/commit', // 话费充值2
	// 火车票
	queryTrainStop: '/v1/api/train/station', // 火车站列表2
	queryTrainList: '/v1/api/train/find', // 火车票查询2
	commitTrainOrder: '/v1/api/train/commit', // 火车票订单提交
	// 机票
	queryAirList: '/v1/api/ticket/find', // 航班查询2
	queryAirStation: '/v1/api/ticket/station', // 航站查询2
	commitAirOrder: '/v1/api/ticket/commit', // 机票订单提交2
	// 联系人模块
	queryContact: '/v1/api/public/gitpis', // 获取乘客2
	uploadIdcard: '/v1/api/upload/image', // 身份证上传识别
	saveContact: '/v1/api/public/pis', // 保存联系人2
	delContact: '/v1/api/public/delpis', // 删除联系人2
	// 订单公共页
	phoneOrderType: '/v1/api/telephone/ordercate', // 获取话费充值订单类型
	phoneOrderList: '/v1/api/telephone/order' // 话费订单列表2
}

export default urls