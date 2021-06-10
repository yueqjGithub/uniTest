const urls = {
	// baseUrl: 'https://shopapi.apiself.com', // 请求主域名
	// socket: 'wss://wechat.shihuai.tech:9527', // 火车订单socket地址
	// baseUrl: 'https://wechat.altunyaprak.cn', // 请求主域名
	baseUrl: 'http://wechat.dev.altunyaprak.cn',
	socket: 'wss://wechat.altunyaprak.cn:9527', // 火车订单socket地址
	authList: [], // 需要身份认证的接口
	md5List: ['/v1/api/public/login', '/v1/api/shop/details', '/v1/api/shop/collect', '/v1/api/shop/buy', '/v1/api/driving/jszlist', '/v1/api/driving/del',
		'/v1/api/shop/pretreatment', '/v1/api/shippingaddress/edit', '/v1/api/shop/orderlist', '/v1/api/user/shopcollect', '/v1/api/driving/deljsz',
		'/v1/api/user/info', '/v1/api/vip/opening', '/v1/api/shop/delivery', '/v1/api/cecharge/attribution', '/v1/api/oilcard/orderlist', '/v1/api/traffic/denomination',
		'/v1/api/telephone/denomination', '/v1/api/publicity/subordinate', '/v1/api/publicity/config', '/v1/api/publicity/ranking', '/v1/api/driving/find',
		'/v1/api/cecharge/balance', '/v1/api/telephone/commit', '/v1/api/telephone/order', '/v1/api/public/delpis', '/v1/api/credit/add', '/v1/api/credit/order',
		'/v1/api/train/commit', '/v1/api/train/refund','/v1/api/vip/list', '/v1/api/electric/details', '/v1/api/withdraw/list', '/v1/api/driving/editjsz',
		'/v1/api/train/station', '/v1/api/train/find', '/v1/api/ticket/find', '/v1/api/ticket/station', '/v1/api/electric/orderlist', '/v1/api/driving/xszlist',
		'/v1/api/public/gitpis', '/v1/api/public/pis', '/v1/api/publicity/index', '/v1/api/electric/denomination', '/v1/api/oilcard/commit',
		'/v1/api/ticket/commit', '/v1/api/train/pay', '/v1/api/train/order', '/v1/api/ticket/order', '/v1/api/electric/commit', '/v1/api/driving/wzfind',
		'/v1/api/withdraw/commit', '/v1/api/credit/creditline', '/v1/api/credit/update', '/v1/api/oilcard/shop', '/v1/api/oilcard/cardlist', '/v1/api/oilcard/addoilcard', '/v1/api/driving/edit', '/v1/api/oilcard/del',
		'/v1/api/driving/kffind', '/v1/api/driving/wz', '/v1/api/traffic/commit', '/v1/api/traffic/order', '/v1/api/driving/wzordercreate', '/v1/api/driving/wzorder', '/v1/api/publicity/profitorder'
	], // 需要加密的接口2
	// basic
	login: '/v1/api/public/login', // 登录2
	init: '/v1/api/public/init', // 初始化
	// help
	queryHelp: '/v1/api/public/help', // 帮助中心
	helpList: '/v1/api/public/helplist', // 帮助中心列表
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
	trainOrderType: '/v1/api/train/cate', // 火车票订单分类
	trainOrderList: '/v1/api/train/order', // 火车票订单列表2
	// 个人中心
	queryMineInfo: '/v1/api/user/info', // 个人中心2
	// 会员
	becomeVip: '/v1/api/vip/opening', // 开通会员2
	queryVipList: '/v1/api/vip/list', // 获取会员类型列表2
	queryPriceList: '/v1/api/telephone/denomination', // 查询充值面额列表2
	queryTrafficPriceList: '/v1/api/traffic/denomination', // 流量面额列表2
	searchPhoneInfo: '/v1/api/cecharge/attribution', // 查询归属地？2
	queryPhoneBalance: '/v1/api/cecharge/balance', // 查询话费余额2
	chargeMobile: '/v1/api/telephone/commit', // 话费充值2
	// 火车票
	queryTrainStop: '/v1/api/train/station', // 火车站列表2
	queryTrainList: '/v1/api/train/find', // 火车票查询2
	commitTrainOrder: '/v1/api/train/commit', // 火车票订单提交2
	trainBuy: '/v1/api/train/pay', // 火车票支付2
	trainRefund: '/v1/api/train/refund', // 火车票退票2
	// 机票
	queryAirList: '/v1/api/ticket/find', // 航班查询2
	queryAirStation: '/v1/api/ticket/station', // 航站查询2
	commitAirOrder: '/v1/api/ticket/commit', // 机票订单提交2
	airOrderType: '/v1/api/ticket/cate', // 机票订单类型
	airOrderList: '/v1/api/ticket/order', // 机票订单列表2
	// 电费
	electricAreaList: '/v1/api/electric/address', // 请求电费缴纳区域
	electricCompanyList: '/v1/api/electric/corporation', // 请求电费缴费公司
	queryByCard: '/v1/api/electric/details', // 根据卡号获取详细信息2
	queryElePrice: '/v1/api/electric/denomination', // 电费冲值面额列表2
	subEleOrder: '/v1/api/electric/commit', // 提交电费订单2
	eleOrderType: '/v1/api/electric/ordercate', // 电费订单类型
	queryEleOrder: '/v1/api/electric/orderlist', // 电费订单列表2
	// 油卡
	queryOilType: '/v1/api/oilcard/cate', // 油费类型
	queryOilPrice: '/v1/api/oilcard/shop', // 油费面额列表2
	queryOilCardList: '/v1/api/oilcard/cardlist', // 油卡列表2
	addOilCard: '/v1/api/oilcard/addoilcard', // 添加油卡2
	delOilCard: '/v1/api/oilcard/del', // 删除油卡2
	commitOilOrder: '/v1/api/oilcard/commit', // 油卡充值2
	oilOrderType: '/v1/api/oilcard/ordercate', // 油费订单类型
	queryOilOrder: '/v1/api/oilcard/orderlist', // 油费订单
	// 联系人模块
	queryContact: '/v1/api/public/gitpis', // 获取乘客2
	uploadIdcard: '/v1/api/upload/image', // 身份证上传识别
	saveContact: '/v1/api/public/pis', // 保存联系人2
	delContact: '/v1/api/public/delpis', // 删除联系人2
	// 推广
	pullIndex: '/v1/api/publicity/index', // 推广首页2
	queryJunior: '/v1/api/publicity/subordinate', // 我的成员2
	pullSetting: '/v1/api/publicity/config', // 推广配置2
	submitWithdraw: '/v1/api/withdraw/commit', // 申请提现2
	withdrawList: '/v1/api/withdraw/list', // 提现记录2
	pullRank: '/v1/api/publicity/ranking', // 推广排行2
	pullOrder: '/v1/api/publicity/profitorder', // 盈利订单2
	// 反馈中心
	subFeedback: '/v1/api/public/feedback', // 提交反馈
	// 订单公共页
	phoneOrderType: '/v1/api/telephone/ordercate', // 获取话费充值订单类型
	phoneOrderList: '/v1/api/telephone/order', // 话费订单列表2
	// 信用卡
	queryVisaIndex: '/v1/api/credit/creditline', // 信用卡首页2
	chargeCredit: '/v1/api/credit/add', // 信用卡充值2
	withdrawCredit: '/v1/api/credit/update', // 信用卡提现2
	creditOrderType: '/v1/api/credit/ordercate', // 信用卡订单分类
	creditOrderList: '/v1/api/credit/order', // 信用卡订单列表2
	// 违章
	searchWzInfo: '/v1/api/driving/wzfind', // 查询违章详细2
	addCarForm: '/v1/api/driving/edit', // 添加车辆2
	uploadLicense: '/v1/api/upload/image', // 上传行驶证2
	setDriveLicense: '/v1/api/driving/editjsz', // 添加，编辑驾驶证2
	xszList: '/v1/api/driving/xszlist', // 行驶证列表2
	delCarLicense: '/v1/api/driving/del', // 删除行驶证2
	commitWzOrder: '/v1/api/driving/wzordercreate', // 提交违章订单2
	// 汽车助手
	queryCurrentOilPrice: '/v1/api/public/oil', // 今日油价
	driverLicenseList: '/v1/api/driving/jszlist', // 驾驶证列表2
	delDrivingLicense: '/v1/api/driving/deljsz', // 删除驾驶证2
	searchLicenseInfo: '/v1/api/driving/find', // 驾驶证信息查询2
	kfSearch: '/v1/api/driving/kffind', // 扣分查询2
	wgTimesSearch: '/v1/api/driving/wz', // 违章次数查询2
	carOrderType: '/v1/api/driving/wzordercate', // 汽车助手订单类型
	carOrderList: '/v1/api/driving/wzorder', // 汽车助手订单2
	// 流量
	chargeTraffic: '/v1/api/traffic/commit', // 充值流量2
	trafficOrderType: '/v1/api/traffic/ordercate', // 流量订单类型
	trafficOrderList: '/v1/api/traffic/order' // 流量订单列表2
}

export default urls
