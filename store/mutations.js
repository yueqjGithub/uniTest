import Vue from '../main.js'

export const changeLang = (state, payload) => { // 通过dispatch setLang，触发全局lang变更，并更改Vue._i18n
	Vue._i18n.locale = payload
	state.lang = payload
}

export const changeInitStatus = (state, payload) => {
	state.initSuc = payload
}

export const setCurAddress = (state, payload) => { // 设置当前编辑状态的收货地址
	state.curAddress = payload
}

export const setCurOrderNum = (state, palyload) => { // 设置当前查看物流的订单号
	state.curOrderNumber = payload
}